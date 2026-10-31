import { LeaveRecord } from "../types/leave";

export function isOnLeave(
  specialistId: string,
  leaveRecords: LeaveRecord[]
): boolean {
  return leaveRecords.some((leave) => leave.specialistId === specialistId);
}

export function getLeaveStatus(
  specialistId: string,
  leaveRecords: LeaveRecord[]
): string {
  return isOnLeave(specialistId, leaveRecords) ? "On Leave" : "Available";
}
