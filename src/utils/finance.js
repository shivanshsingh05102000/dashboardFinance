// ─── FORMATTERS ──────────────────────────────────────────────────────────────
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style:    "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  });
}

// ─── AGGREGATES ──────────────────────────────────────────────────────────────
export function getTotalIncome(transactions) {
  return transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
}

export function getTotalExpense(transactions) {
  return transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
}

export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpense(transactions);
}

export function getSavingsRate(transactions) {
  const income  = getTotalIncome(transactions);
  const expense = getTotalExpense(transactions);
  if (income === 0) return 0;
  return (((income - expense) / income) * 100).toFixed(1);
}

// ─── GROUPING ─────────────────────────────────────────────────────────────────
export function groupByMonth(transactions) {
  const grouped = {};
  transactions.forEach((tx) => {
    const key = tx.date.slice(0, 7); // "YYYY-MM"
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(tx);
  });
  return grouped;
}

// Returns array sorted by month for charts
// [{ month, label, income, expense, net }]
export function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach((tx) => {
    const key = tx.date.slice(0, 7);
    if (!map[key]) map[key] = { income: 0, expense: 0 };
    map[key][tx.type] += tx.amount;
  });

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      label: new Date(month + "-01").toLocaleString("en-IN", {
        month: "short",
        year:  "2-digit",
      }),
      income:  data.income,
      expense: data.expense,
      net:     data.income - data.expense,
    }));
}

// Returns [{ name, value }] for pie chart
export function getCategoryBreakdown(transactions) {
  const map = {};
  transactions
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      map[tx.category] = (map[tx.category] || 0) + tx.amount;
    });

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
}

export function getTopCategory(transactions) {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown[0] || null;
}