import { Assignment } from "../types/assignment";
import { Project } from "../types/project";
import { Specialist } from "../types/specialist";
import { getUtilization } from "./capacity";

export function calculateRoleCoverageScore(
  project: Project,
  squad: Specialist[]
): number {
  const squadRoles = squad.map((person) => person.role);
  const matchedRoles = project.requiredRoles.filter((role) =>
    squadRoles.includes(role)
  );

  return matchedRoles.length / project.requiredRoles.length;
}

export function calculateSkillMatchScore(
  project: Project,
  squad: Specialist[]
): number {
  const squadSkills = squad.flatMap((person) => person.skills);
  const matchedSkills = project.requiredSkills.filter((skill) =>
    squadSkills.includes(skill)
  );

  return matchedSkills.length / project.requiredSkills.length;
}

export function calculateCapacityScore(
  squad: Specialist[],
  assignments: Assignment[]
): number {
  const utilizationScores = squad.map((person) => {
    const utilization = getUtilization(person, assignments);

    if (utilization > 1) return 0;
    if (utilization > 0.85) return 0.5;
    return 1;
  });

  return (
    utilizationScores.reduce<number>((sum, score) => sum + score, 0) /
    utilizationScores.length
  );
}

export function calculateSlackScore(slackDays: number): number {
  if (slackDays < 0) return 0;
  if (slackDays === 0) return 0.2;
  if (slackDays <= 2) return 0.5;
  if (slackDays <= 5) return 0.8;
  return 1;
}

export function calculateSquadScore(params: {
  roleCoverageScore: number;
  skillMatchScore: number;
  capacityScore: number;
  slackScore: number;
}): number {
  const score =
    params.skillMatchScore * 0.3 +
    params.roleCoverageScore * 0.2 +
    params.capacityScore * 0.2 +
    params.slackScore * 0.15 +
    0.15;

  return Math.round(score * 100);
}
