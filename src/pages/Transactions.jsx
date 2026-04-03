import TransactionTable from "../components/TransactionTable";

export default function Transactions() {
  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Transactions</h1>
        <p className="text-gray-400 text-lg">Your financial transaction history</p>
      </div>

      {/* Transaction table */}
      <TransactionTable />

    </div>
  );
}