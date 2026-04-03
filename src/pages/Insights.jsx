import InsightTiles from "../components/InsightTiles";

export default function Insights() {
  return (
    <div className="space-y-5">
      <section className="fade-up surface-card rounded-3xl p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-400">Analysis</p>
        <h1 className="page-title mt-2 text-4xl font-bold text-slate-900 dark:text-slate-50">Insights</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-800 dark:text-slate-300">
          Highlights from your data: top spending category, month-wise comparison, and activity patterns.
        </p>
      </section>

      <InsightTiles />
    </div>
  );
}
