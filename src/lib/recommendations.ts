import { Assignment } from "../types/assignment";
import { Project } from "../types/project";
import { Recommendation } from "../types/recommendation";
import { Specialist } from "../types/specialist";
import { getUtilization } from "./capacity";
import { calculateSlackDays, getSlackRiskLevel } from "./slack";
import {
  calculateCapacityScore,
  calculateRoleCoverageScore,
  calculateSkillMatchScore,
  calculateSlackScore,
  calculateSquadScore,
} from "./scoring";

export function generateRecommendation(
  project: Project,
  specialists: Specialist[],
  assignments: Assignment[],
  startDate: string
): Recommendation {
  const squad = project.requiredRoles
    .map((role) => specialists.find((person) => person.role === role))
    .filter((person): person is Specialist => person !== undefined);

  const slackDays = calculateSlackDays(project, startDate);
  const riskLevel = getSlackRiskLevel(slackDays);

  const roleCoverageScore = calculateRoleCoverageScore(project, squad);
  const skillMatchScore = calculateSkillMatchScore(project, squad);
  const capacityScore = calculateCapacityScore(squad, assignments);
  const slackScore = calculateSlackScore(slackDays);

  const score = calculateSquadScore({
    roleCoverageScore,
    skillMatchScore,
    capacityScore,
    slackScore,
  });

  const riskFlags: string[] = [];

  if (riskLevel !== "Low") {
    riskFlags.push(`Slack risk is ${riskLevel}`);
  }

  squad.forEach((person) => {
    const utilization = getUtilization(person, assignments);
    if (utilization > person.maxUtilization) {
      riskFlags.push(`${person.name} is near or above utilization threshold`);
    }
  });

  return {
    optionId: "A",
    squad: squad.map((person) => ({
      specialistId: person.id,
      name: person.name,
      role: person.role,
      assignedEffort: project.estimatedEffortByRole[person.role] || 0,
      utilizationAfterAssignment: getUtilization(person, assignments),
    })),
    score,
    slackDays,
    riskLevel,
    riskFlags,
    explanation: `This squad is recommended because it covers the required roles, matches key skills, and has ${slackDays} days of slack.`,
  };
}
