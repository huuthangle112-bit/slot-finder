import { Project } from "../types/project";
import { Specialist } from "../types/specialist";

export function checkRoleCoverage(
  project: Project,
  squad: Specialist[]
): string[] {
  const squadRoles = squad.map((person) => person.role);
  return project.requiredRoles.filter((role) => !squadRoles.includes(role));
}

export function checkSkillCoverage(
  project: Project,
  squad: Specialist[]
): string[] {
  const squadSkills = squad.flatMap((person) => person.skills);
  return project.requiredSkills.filter((skill) => !squadSkills.includes(skill));
}

export function hasRequiredCoverage(
  project: Project,
  squad: Specialist[]
): boolean {
  return (
    checkRoleCoverage(project, squad).length === 0 &&
    checkSkillCoverage(project, squad).length === 0
  );
}
