export interface Specialist {
  id: string;
  name: string;
  role: string;
  skills: string[];
  seniority: "Junior" | "Mid" | "Senior";
  weeklyCapacity: number;
  maxUtilization: number;
}
