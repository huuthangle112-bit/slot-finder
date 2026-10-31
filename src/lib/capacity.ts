import { Assignment } from "../types/assignment";
import { Specialist } from "../types/specialist";

export function getAssignedEffort(
  specialistId: string,
  assignments: Assignment[]
): number {
  return assignments
    .filter((assignment) => assignment.specialistId === specialistId)
    .reduce((sum, assignment) => sum + assignment.effortDays, 0);
}

export function getUtilization(
  specialist: Specialist,
  assignments: Assignment[]
): number {
  const assignedEffort = getAssignedEffort(specialist.id, assignments);
  return assignedEffort / specialist.weeklyCapacity;
}

export function getUtilizationStatus(utilization: number): string {
  if (utilization > 1) return "Overallocated";
  if (utilization > 0.85) return "Near Capacity";
  if (utilization < 0.6) return "Underused";
  return "Healthy";
}
