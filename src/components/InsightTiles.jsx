import { useAppContext } from "../context/AppContext";
import { getTopCategory, getMonthlyData, formatCurrency } from "../utils/finance";

export default function InsightTiles() {
  const { transactions } = useAppContext();

  const topCategory = getTopCategory(transactions);
  const monthlyData = getMonthlyData(transactions);
  const avgMonthlyExpense = monthlyData.length
    ? Math.round(monthlyData.reduce((sum, m) => sum + m.expense, 0) / monthlyData.length)
    : 0;

  const insights = [
    {
      title: "Top Spending Category",
      value: topCategory ? topCategory.name : "N/A",
      sub: topCategory ? formatCurrency(topCategory.value) : "",
      icon: "🏆",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Avg Monthly Expenses",
      value: formatCurrency(avgMonthlyExpense),
      sub: `${monthlyData.length} months`,
      icon: "📊",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Transactions",
      value: transactions.length,
      sub: `${transactions.filter(t => t.type === "income").length} income, ${transactions.filter(t => t.type === "expense").length} expenses`,
      icon: "📋",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`p-6 rounded-xl border border-gray-800 ${insight.bg} hover:bg-opacity-20 transition-all duration-200`}
        >
          <div className="flex items-center gap-4">
            <div className={`text-3xl ${insight.color}`}>{insight.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-400">{insight.title}</p>
              <p className={`text-xl font-bold ${insight.color} mt-1`}>{insight.value}</p>
              <p className="text-xs text-gray-500 mt-1">{insight.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
