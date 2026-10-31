"use client";

import { useMemo, useState } from "react";
import type { Assignment } from "../types/assignment";
import type { Project } from "../types/project";
import type { Recommendation } from "../types/recommendation";
import type { Specialist } from "../types/specialist";
import { generateRecommendation } from "../lib/recommendations";
import { CapacityBoard } from "./CapacityBoard";
import { RecommendationTable } from "./RecommendationTable";
import { ScenarioSimulator } from "./ScenarioSimulator";

const initialStartDate = "2026-11-10";

export function PlanningDashboard({
  projects,
  specialists,
  assignments,
  leaveRecordCount,
}: {
  projects: Project[];
  specialists: Specialist[];
  assignments: Assignment[];
  leaveRecordCount: number;
}) {
  const initialProject =
    projects.find((project) => project.status === "New") ?? projects[0];
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProject?.id ?? ""
  );
  const [startDate, setStartDate] = useState(initialStartDate);
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  const recommendation: Recommendation | null = useMemo(
    () =>
      selectedProject && startDate
        ? generateRecommendation(
            selectedProject,
            specialists,
            assignments,
            startDate
          )
        : null,
    [selectedProject, specialists, assignments, startDate]
  );

  const openProjects = projects.filter(
    (project) => project.status !== "Completed"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              Production operations
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              The Slot Finder
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Plan feasible project squads with a clear view of team capacity,
              workload, and schedule risk.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Mock planning data
          </div>
        </header>

        <section
          aria-label="Planning summary"
          className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <SummaryCard
            label="Open projects"
            value={openProjects}
            detail={`${projects.length} total in pipeline`}
            accent="indigo"
          />
          <SummaryCard
            label="Specialists"
            value={specialists.length}
            detail="Across delivery roles"
            accent="blue"
          />
          <SummaryCard
            label="Active assignments"
            value={assignments.length}
            detail="Current planning allocations"
            accent="violet"
          />
          <SummaryCard
            label="Leave records"
            value={leaveRecordCount}
            detail="Included in mock dataset"
            accent="amber"
          />
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Scenario planning
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Select a project and proposed start date
            </h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Incoming project
              </span>
              <select
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                value={selectedProjectId}
                onChange={(event) => setSelectedProjectId(event.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.id} · {project.name} · {project.status}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Proposed start date
              </span>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>
          </div>
          {selectedProject && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
              <span>
                Customer:{" "}
                <strong className="font-medium text-slate-800">
                  {selectedProject.customer}
                </strong>
              </span>
              <span>
                Deadline:{" "}
                <strong className="font-medium text-slate-800">
                  {selectedProject.deadline}
                </strong>
              </span>
              <span>
                Priority:{" "}
                <strong className="font-medium text-slate-800">
                  {selectedProject.priority}
                </strong>
              </span>
            </div>
          )}
        </section>

        <div className="mt-6 grid gap-6">
          {recommendation && (
            <RecommendationTable recommendation={recommendation} />
          )}
          {!startDate && selectedProject && (
            <p
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
            >
              Choose a proposed start date to calculate the squad recommendation.
            </p>
          )}
          <CapacityBoard
            specialists={specialists}
            assignments={assignments}
          />
          <ScenarioSimulator />
        </div>

        <footer className="mt-8 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
          Planning estimates use mock data. Validate staffing, availability,
          and deadline assumptions before approving an assignment.
        </footer>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: number;
  detail: string;
  accent: "indigo" | "blue" | "violet" | "amber";
}) {
  const accentColor = {
    indigo: "bg-indigo-50 text-indigo-700",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    amber: "bg-amber-50 text-amber-700",
  }[accent];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg font-semibold ${accentColor}`}
        >
          {value}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
