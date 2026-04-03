import BalanceTrendChart from "../components/BalanceTrendChart";
import SpendingPieChart from "../components/SpendingPieChart";
import SummaryCards from "../components/SummaryCards";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const { transactions } = useAppContext();

  return (
    <div className="space-y-5">
      <section className="fade-up surface-card rounded-3xl p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-400">Overview</p>
        <h1 className="page-title mt-2 text-4xl font-bold text-slate-900 dark:text-slate-50">Finance Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-800 dark:text-slate-300">
          Quick snapshot of balance, cash flow, and where most of the spending is happening.
        </p>
      </section>

      <SummaryCards />

      {transactions.length === 0 ? (
        <div className="surface-card rounded-3xl p-8 text-center">
          <p className="page-title text-2xl font-bold text-slate-900 dark:text-slate-50">No transactions found</p>
          <p className="mt-2 text-sm text-slate-800 dark:text-slate-300">Add a few entries from the Transactions page to populate charts and cards.</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          <article className="surface-card rounded-3xl p-5 sm:p-6">
            <h2 className="page-title text-2xl font-bold text-slate-900 dark:text-slate-50">Balance Trend</h2>
            <p className="mb-2 text-sm text-slate-800 dark:text-slate-300">Last 6 months of income and expense movement.</p>
            <BalanceTrendChart />
          </article>

          <article className="surface-card rounded-3xl p-5 sm:p-6">
            <h2 className="page-title text-2xl font-bold text-slate-900 dark:text-slate-50">Spending Breakdown</h2>
            <p className="mb-2 text-sm text-slate-800 dark:text-slate-300">Category split of total expense volume.</p>
            <SpendingPieChart />
          </article>
        </div>
      )}
    </div>
  );
}
