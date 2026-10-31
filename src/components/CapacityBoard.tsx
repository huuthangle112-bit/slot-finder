import type { Assignment } from "../types/assignment";
import type { Specialist } from "../types/specialist";
import {
  getAssignedEffort,
  getUtilization,
  getUtilizationStatus,
} from "../lib/capacity";
import { RiskBadge } from "./RiskBadge";

export function CapacityBoard({
  specialists,
  assignments,
}: {
  specialists: Specialist[];
  assignments: Assignment[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Resource overview
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Team capacity board
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Current assigned effort compared with weekly capacity
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3">Specialist</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Booked / week</th>
              <th className="px-4 py-3">Utilization</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {specialists.map((person) => {
              const assignedEffort = getAssignedEffort(person.id, assignments);
              const utilization = getUtilization(person, assignments);
              const status = getUtilizationStatus(utilization);

              return (
                <tr key={person.id} className="text-slate-600">
                  <td className="px-6 py-4">
                    <span className="block font-medium text-slate-900">
                      {person.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-400">
                      {person.seniority} · {person.id}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {person.role}
                  </td>
                  <td className="max-w-xs px-4 py-4">
                    <span className="line-clamp-2">{person.skills.join(", ")}</span>
                  </td>
                  <td className="px-4 py-4 tabular-nums">
                    {assignedEffort} / {person.weeklyCapacity} days
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"
                        role="progressbar"
                        aria-label={`${person.name} utilization`}
                        aria-valuenow={Math.round(utilization * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`h-full rounded-full ${
                            utilization > 1
                              ? "bg-rose-500"
                              : utilization > 0.85
                                ? "bg-amber-500"
                                : "bg-indigo-500"
                          }`}
                          style={{
                            width: `${Math.min(utilization * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="w-10 tabular-nums text-slate-700">
                        {Math.round(utilization * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RiskBadge status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
