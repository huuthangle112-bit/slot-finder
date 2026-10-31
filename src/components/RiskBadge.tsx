export function RiskBadge({ status }: { status: string }) {
  const color =
    status === "Low" || status === "Healthy" || status === "Available"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
      : status === "Medium" || status === "Near Capacity"
        ? "bg-amber-50 text-amber-700 ring-amber-600/20"
        : "bg-rose-50 text-rose-700 ring-rose-600/20";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${color}`}
    >
      {status}
    </span>
  );
}
