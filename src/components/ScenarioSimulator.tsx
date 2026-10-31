const scenarios = [
  {
    title: "QA specialist goes on leave",
    detail:
      "A planned absence reduces QA availability during an active delivery window.",
    impact:
      "QA bottleneck increases and project risk rises.",
    tone: "text-rose-700",
  },
  {
    title: "Deadline moves earlier",
    detail:
      "A customer brings the delivery date forward after work has been planned.",
    impact: "Schedule slack decreases and deadline risk increases.",
    tone: "text-amber-700",
  },
  {
    title: "Project size increases",
    detail:
      "New requirements add effort to one or more specialist roles.",
    impact:
      "Utilization increases and some roles may become overallocated.",
    tone: "text-rose-700",
  },
];

export function ScenarioSimulator() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
          Change management
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">
          What-if replanning
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
          Review common changes that can affect delivery feasibility. These
          examples are explanatory and do not modify the current planning data.
        </p>
      </div>

      <div className="grid gap-3 p-5 md:grid-cols-3">
        {scenarios.map((scenario, index) => (
          <article
            key={scenario.title}
            className="rounded-xl border border-slate-200 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Scenario {index + 1}
            </p>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">
              {scenario.title}
            </h3>
            <p className="mt-1.5 text-sm leading-5 text-slate-600">
              {scenario.detail}
            </p>
            <p className={`mt-3 text-sm font-medium leading-5 ${scenario.tone}`}>
              Expected impact: {scenario.impact}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
