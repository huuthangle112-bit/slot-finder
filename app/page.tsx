import assignmentsData from "../data/assignments.json";
import leaveData from "../data/leave.json";
import projectsData from "../data/projects.json";
import specialistsData from "../data/specialists.json";
import { PlanningDashboard } from "../src/components/PlanningDashboard";
import type { Assignment } from "../src/types/assignment";
import type { Project } from "../src/types/project";
import type { Specialist } from "../src/types/specialist";

export default function Home() {
  return (
    <PlanningDashboard
      projects={projectsData as Project[]}
      specialists={specialistsData as Specialist[]}
      assignments={assignmentsData as Assignment[]}
      leaveRecordCount={leaveData.length}
    />
  );
}
