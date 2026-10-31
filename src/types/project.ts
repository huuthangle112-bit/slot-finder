export type ProjectPriority = "P0" | "P1" | "P2";
export type ProjectSize = "Small" | "Medium" | "Large";
export type ProjectComplexity = "Low" | "Medium" | "High";
export type ProjectStatus = "New" | "Assigned" | "In Progress" | "At Risk" | "Completed";

export interface Project {
  id: string;
  name: string;
  customer: string;
  priority: ProjectPriority;
  deadline: string;
  size: ProjectSize;
  complexity: ProjectComplexity;
  requiredRoles: string[];
  requiredSkills: string[];
  estimatedEffortByRole: Record<string, number>;
  status: ProjectStatus;
}
