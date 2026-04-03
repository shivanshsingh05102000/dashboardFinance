import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "../data/mockTransactions";
import { useAppContext } from "../context/AppContext";
import { formatCurrency, getExpenseBreakdown } from "../utils/finance";

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { name, value, payload: row } = payload[0];

  return (
    <div className="surface-strong rounded-xl p-3 shadow-lg">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{name}</p>
      <p className="text-sm text-slate-600 dark:text-slate-300">{formatCurrency(value)}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{row.percentage}% of expenses</p>
    </div>
  );
}

function PieLegend({ payload }) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="truncate">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function SpendingPieChart() {
  const { transactions } = useAppContext();
  const data = getExpenseBreakdown(transactions);

  if (!data.length) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">No expense categories to chart yet.</p>;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={54}
            outerRadius={94}
            paddingAngle={2}
            stroke="transparent"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#64748b"} />
            ))}
          </Pie>

          <Tooltip content={<PieTooltip />} />
          <Legend content={<PieLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}