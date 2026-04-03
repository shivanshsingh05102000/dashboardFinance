import { useAppContext } from "../context/AppContext";
import { formatCurrency, formatDate } from "../utils/finance";

export default function TransactionTable() {
  const { transactions, filters, role } = useAppContext();

  // Apply filters
  const filteredTransactions = transactions.filter((tx) => {
    if (filters.type !== "all" && tx.type !== filters.type) return false;
    if (filters.category !== "all" && tx.category !== filters.category) return false;
    if (filters.search && !tx.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Sort
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (filters.sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (filters.sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (filters.sortBy === "amount-desc") return b.amount - a.amount;
    if (filters.sortBy === "amount-asc") return a.amount - b.amount;
    return 0;
  });

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-300">{formatDate(tx.date)}</td>
                <td className="px-4 py-3 text-sm text-white font-medium">{tx.description}</td>
                <td className="px-4 py-3 text-sm text-gray-400">{tx.category}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    tx.type === "income"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`px-4 py-3 text-sm font-semibold text-right ${
                  tx.type === "income" ? "text-green-400" : "text-red-400"
                }`}>
                  {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  );
}
