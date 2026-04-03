import { useAppContext } from "../context/AppContext";
import { formatCurrency, getSummary } from "../utils/finance";

function CardIcon({ type }) {
  if (type === "balance") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h18M6 3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3z" />
        <path d="M16 14h.01" />
      </svg>
    );
  }

  if (type === "income") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 7l10 10" />
      <path d="M17 7H7v10" />
    </svg>
  );
}

export default function SummaryCards() {
  const { transactions } = useAppContext();
  const summary = getSummary(transactions);

  const incomeCount = transactions.filter((item) => item.type === "income").length;
  const expenseCount = transactions.filter((item) => item.type === "expense").length;

  const cards = [
    {
      id: "balance",
      title: "Total Balance",
      value: formatCurrency(summary.balance),
      hint: `${summary.savingsRate}% savings rate`,
      accent: "from-cyan-500/15 to-teal-500/20",
      valueColor: "text-slate-900 dark:text-slate-100",
      iconColor: "text-teal-700 dark:text-teal-300",
    },
    {
      id: "income",
      title: "Total Income",
      value: formatCurrency(summary.totalIncome),
      hint: `${incomeCount} income transactions`,
      accent: "from-emerald-500/15 to-lime-500/20",
      valueColor: "text-slate-900 dark:text-slate-100",
      iconColor: "text-emerald-700 dark:text-emerald-300",
    },
    {
      id: "expense",
      title: "Total Expenses",
      value: formatCurrency(summary.totalExpense),
      hint: `${expenseCount} expense transactions`,
      accent: "from-rose-500/15 to-orange-500/20",
      valueColor: "text-slate-900 dark:text-slate-100",
      iconColor: "text-rose-700 dark:text-rose-300",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <article key={card.id} className={`surface-card fade-up rounded-3xl bg-gradient-to-br p-5 ${card.accent}`}>
          <div className="mb-4 flex items-start justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-800 dark:text-slate-400">{card.title}</p>
            <div className={`rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-2 ${card.iconColor}`}>
              <CardIcon type={card.id} />
            </div>
          </div>

          <p className={`page-title text-3xl font-bold leading-none ${card.valueColor}`}>{card.value}</p>
          <p className="mt-2 text-sm text-slate-800 dark:text-slate-300">{card.hint}</p>
        </article>
      ))}
    </section>
  );
}
