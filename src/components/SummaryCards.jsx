import { useAppContext } from "../context/AppContext";
import { getTotalIncome, getTotalExpense, getBalance, getSavingsRate, formatCurrency } from "../utils/finance";

export default function SummaryCards() {
  const { transactions } = useAppContext();

  const income     = getTotalIncome(transactions);
  const expense    = getTotalExpense(transactions);
  const balance    = getBalance(transactions);
  const savings    = getSavingsRate(transactions);

  const cards = [
    {
      label:    "Total Balance",
      value:    formatCurrency(balance),
      sub:      `${savings}% savings rate`,
      color:    "text-indigo-400",
      bg:       "bg-indigo-500/10",
      border:   "border-indigo-500/20",
      icon:     "💰",
    },
    {
      label:    "Total Income",
      value:    formatCurrency(income),
      sub:      `${transactions.filter(t => t.type === "income").length} transactions`,
      color:    "text-emerald-400",
      bg:       "bg-emerald-500/10",
      border:   "border-emerald-500/20",
      icon:     "📈",
    },
    {
      label:    "Total Expenses",
      value:    formatCurrency(expense),
      sub:      `${transactions.filter(t => t.type === "expense").length} transactions`,
      color:    "text-rose-400",
      bg:       "bg-rose-500/10",
      border:   "border-rose-500/20",
      icon:     "📉",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map((card) => (
    <div
      key={card.label}
      className={`
        rounded-2xl 
        border ${card.border} 
        ${card.bg}
        p-6 
        flex flex-col justify-between
        shadow-sm hover:shadow-lg 
        transition-all duration-300
        min-h-[140px]
      `}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          {card.label}
        </span>

        <div className="text-lg bg-white/10 p-2 rounded-lg backdrop-blur-sm">
          {card.icon}
        </div>
      </div>

      {/* Value */}
      <p className={`text-3xl font-semibold ${card.color} mt-2`}>
        {card.value}
      </p>

      {/* Subtext */}
      <p className="text-xs text-gray-500 mt-1">
        {card.sub}
      </p>
    </div>
  ))}
</div>
  );
}