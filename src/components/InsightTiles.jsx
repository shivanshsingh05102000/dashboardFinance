import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppContext } from "../context/AppContext";
import {
  formatCurrency,
  getHighestExpenseTransaction,
  getMonthlyData,
  getMostActiveMonth,
  getSummary,
  getTopCategoryStats,
} from "../utils/finance";

function InsightsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="surface-strong rounded-xl p-3 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-slate-800 dark:text-slate-400">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="text-sm text-slate-800 dark:text-slate-200">
          <span style={{ color: item.color }} className="font-semibold">
            {item.name}
          </span>
          {": "}
          {formatCurrency(item.value)}
        </p>
      ))}
    </div>
  );
}

export default function InsightTiles() {
  const { transactions, theme } = useAppContext();

  if (!transactions.length) {
    return (
      <div className="surface-card rounded-3xl p-8 text-center">
        <p className="page-title text-2xl font-bold text-slate-900 dark:text-slate-50">No data available for insights</p>
        <p className="mt-2 text-sm text-slate-800 dark:text-slate-300">Add transactions to unlock trends and performance metrics.</p>
      </div>
    );
  }

  const summary = getSummary(transactions);
  const monthlyData = getMonthlyData(transactions);
  const topCategory = getTopCategoryStats(transactions);
  const largestExpense = getHighestExpenseTransaction(transactions);
  const activeMonth = getMostActiveMonth(transactions);

  const metrics = [
    {
      title: "Net Savings Rate",
      value: `${summary.savingsRate}%`,
      detail: `Balance ${formatCurrency(summary.balance)}`,
    },
    {
      title: "Biggest Single Expense",
      value: largestExpense ? formatCurrency(largestExpense.amount) : "-",
      detail: largestExpense ? `${largestExpense.description} (${largestExpense.category})` : "No expenses logged",
    },
    {
      title: "Most Active Month",
      value: activeMonth ? activeMonth.label : "-",
      detail: activeMonth ? `${activeMonth.count} transactions` : "No monthly activity",
    },
  ];

  const axisColor = theme === "dark" ? "#94a3b8" : "#0f172a";
  const gridColor = theme === "dark" ? "#223048" : "#cbd5e1";
  const legendColor = theme === "dark" ? "#cbd5e1" : "#0f172a";

  return (
    <section className="space-y-4">
      <article className="surface-card rounded-3xl p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-400">Highest Spending Category</p>
        <p className="page-title mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{topCategory ? topCategory.name : "No expense data"}</p>
        <p className="mt-1 text-sm text-slate-800 dark:text-slate-300">
          {topCategory
            ? `${formatCurrency(topCategory.value)} - ${topCategory.percentage}% of total expenses`
            : "Add expense transactions to see category share."}
        </p>
      </article>

      <article className="surface-card rounded-3xl p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="page-title text-2xl font-bold text-slate-900 dark:text-slate-50">Monthly Income vs Expense</h3>
          <p className="text-sm text-slate-800 dark:text-slate-300">Compare month-over-month cash movement and spending pressure.</p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={8}>
              <CartesianGrid stroke={gridColor} strokeDasharray="4 4" />
              <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: axisColor, fontSize: 12, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
              />
              <Tooltip content={<InsightsTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px", color: legendColor, fontWeight: 600 }} />
              <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="#f43f5e" radius={[8, 8, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.title} className="surface-card rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-400">{metric.title}</p>
            <p className="page-title mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-800 dark:text-slate-300">{metric.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}