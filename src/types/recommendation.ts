export interface SquadMember {
  specialistId: string;
  name: string;
  role: string;
  assignedEffort: number;
  utilizationAfterAssignment: number;
}

export interface Recommendation {
  optionId: string;
  squad: SquadMember[];
  score: number;
  slackDays: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical" | "Late";
  explanation: string;
  riskFlags: string[];
}
