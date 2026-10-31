import { Project } from "../types/project";

export function estimateProjectDuration(project: Project): number {
  const efforts = Object.values(project.estimatedEffortByRole);
  return Math.max(...efforts);
}

export function calculateSlackDays(project: Project, startDate: string): number {
  const start = new Date(startDate);
  const deadline = new Date(project.deadline);

  const duration = estimateProjectDuration(project);
  const estimatedFinish = new Date(start);
  estimatedFinish.setDate(start.getDate() + duration);

  const differenceMs = deadline.getTime() - estimatedFinish.getTime();
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
}

export function getSlackRiskLevel(
  slackDays: number
): "Low" | "Medium" | "High" | "Critical" | "Late" {
  if (slackDays < 0) return "Late";
  if (slackDays === 0) return "Critical";
  if (slackDays <= 2) return "High";
  if (slackDays <= 5) return "Medium";
  return "Low";
}
