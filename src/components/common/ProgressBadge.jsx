export default function ProgressBadge({ progress }) {
  const pct = Math.round(progress * 100);
  if (pct === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-500">{pct}%</span>
    </div>
  );
}
