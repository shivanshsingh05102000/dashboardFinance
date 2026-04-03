import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppContext } from "../context/AppContext";
import { formatCurrency, getRecentMonthlyData } from "../utils/finance";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="surface-strong rounded-xl p-3 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-slate-800 dark:text-slate-400">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="text-sm text-slate-800 dark:text-slate-200">
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

export default function BalanceTrendChart() {
  const { transactions, theme } = useAppContext();
  const data = getRecentMonthlyData(transactions, 6);

  if (!data.length) {
    return <p className="text-sm text-slate-800 dark:text-slate-400">No monthly trend available.</p>;
  }

  const colors =
    theme === "dark"
      ? {
          income: "#34d399",
          expense: "#fb7185",
          grid: "#223048",
          tick: "#94a3b8",
        }
      : {
          income: "#059669",
          expense: "#e11d48",
          grid: "#dbe5ee",
          tick: "#475569",
        };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.income} stopOpacity={0.35} />
              <stop offset="100%" stopColor={colors.income} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.expense} stopOpacity={0.3} />
              <stop offset="100%" stopColor={colors.expense} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke={colors.grid} strokeDasharray="4 4" />
          <XAxis dataKey="label" tick={{ fill: colors.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: colors.tick, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${Math.round(value / 1000)}k`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />

          <Area type="monotone" dataKey="income" name="Income" stroke={colors.income} fill="url(#incomeGradient)" strokeWidth={2.2} />
          <Area type="monotone" dataKey="expense" name="Expense" stroke={colors.expense} fill="url(#expenseGradient)" strokeWidth={2.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}