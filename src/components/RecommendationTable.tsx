import type { Recommendation } from "../types/recommendation";
import { RiskBadge } from "./RiskBadge";

export function RecommendationTable({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Planning output
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Squad recommendation
          </h2>
        </div>
        <RiskBadge status={recommendation.riskLevel} />
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-5 rounded-xl bg-indigo-50/70 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-indigo-950">
              Recommended squad · Option {recommendation.optionId}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              {recommendation.explanation}
            </p>
          </div>
          <div className="shrink-0 sm:text-right">
            <p className="text-3xl font-semibold tracking-tight text-slate-950">
              {recommendation.score}
              <span className="ml-1 text-base font-medium text-slate-400">
                / 100
              </span>
            </p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Fit score
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500">Schedule slack</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {recommendation.slackDays}{" "}
              <span className="text-sm font-medium text-slate-500">days</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500">Risk level</p>
            <div className="mt-2">
              <RiskBadge status={recommendation.riskLevel} />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500">Risk flags</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {recommendation.riskFlags.length}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">
            Proposed squad
          </h3>
          {recommendation.squad.length > 0 ? (
            <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
              {recommendation.squad.map((member) => (
                <li
                  key={member.specialistId}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {member.role} · {member.assignedEffort} effort days
                    </p>
                  </div>
                  <p className="text-sm text-slate-600">
                    Current utilization:{" "}
                    <span className="font-semibold text-slate-900">
                      {Math.round(member.utilizationAfterAssignment * 100)}%
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
              No squad members match this project&apos;s required roles.
            </p>
          )}
        </div>

        {recommendation.riskFlags.length > 0 && (
          <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <h3 className="text-sm font-semibold text-rose-900">Risk flags</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-rose-800">
              {recommendation.riskFlags.map((flag) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
