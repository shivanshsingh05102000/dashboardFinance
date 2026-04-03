export const DEFAULT_CURRENCY = "INR";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: DEFAULT_CURRENCY,
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatCurrency(value = 0) {
  return currencyFormatter.format(Number(value) || 0);
}

export function formatDate(value) {
  if (!value) return "-";
  return dateFormatter.format(new Date(value));
}

export function createMonthLabel(monthKey) {
  return new Date(`${monthKey}-01`).toLocaleDateString("en-IN", {
    month: "short",
    year: "2-digit",
  });
}

export function getSummary(transactions) {
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Number(((balance / totalIncome) * 100).toFixed(1)) : 0;

  return {
    totalIncome,
    totalExpense,
    balance,
    savingsRate,
  };
}

export function getMonthlyData(transactions) {
  const grouped = transactions.reduce((accumulator, item) => {
    const key = item.date.slice(0, 7);
    if (!accumulator[key]) {
      accumulator[key] = { income: 0, expense: 0, count: 0 };
    }

    accumulator[key][item.type] += item.amount;
    accumulator[key].count += 1;
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({
      month,
      label: createMonthLabel(month),
      income: value.income,
      expense: value.expense,
      net: value.income - value.expense,
      count: value.count,
    }));
}

export function getRecentMonthlyData(transactions, limit = 6) {
  const monthlyData = getMonthlyData(transactions);
  return monthlyData.slice(Math.max(0, monthlyData.length - limit));
}

export function getExpenseBreakdown(transactions) {
  const expenseMap = transactions.reduce((accumulator, item) => {
    if (item.type !== "expense") return accumulator;
    accumulator[item.category] = (accumulator[item.category] || 0) + item.amount;
    return accumulator;
  }, {});

  const totalExpense = Object.values(expenseMap).reduce((sum, value) => sum + value, 0);

  return Object.entries(expenseMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpense > 0 ? Number(((value / totalExpense) * 100).toFixed(1)) : 0,
    }));
}

export function getTopCategoryStats(transactions) {
  const breakdown = getExpenseBreakdown(transactions);
  return breakdown[0] ?? null;
}

export function getHighestExpenseTransaction(transactions) {
  return transactions
    .filter((item) => item.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0] ?? null;
}

export function getMostActiveMonth(transactions) {
  const monthlyData = getMonthlyData(transactions);
  return monthlyData.sort((a, b) => b.count - a.count)[0] ?? null;
}

export function sortTransactions(transactions, sortBy) {
  return [...transactions].sort((left, right) => {
    if (sortBy === "date-asc") return new Date(left.date) - new Date(right.date);
    if (sortBy === "date-desc") return new Date(right.date) - new Date(left.date);
    if (sortBy === "amount-asc") return left.amount - right.amount;
    if (sortBy === "amount-desc") return right.amount - left.amount;
    return 0;
  });
}

export function applyFilters(transactions, filters) {
  const searchTerm = filters.search.trim().toLowerCase();

  const filtered = transactions.filter((item) => {
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.category !== "all" && item.category !== filters.category) return false;

    if (!searchTerm) return true;

    return (
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  });

  return sortTransactions(filtered, filters.sortBy);
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  if (stringValue.includes('"') || stringValue.includes(",") || stringValue.includes("\n")) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

export function toTransactionsCsv(transactions) {
  const header = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((item) => [
    item.date,
    item.description,
    item.category,
    item.type,
    item.amount,
  ]);

  return [header, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n");
}

export function downloadTransactionsCsv(transactions, filename = "transactions.csv") {
  const csv = toTransactionsCsv(transactions);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}