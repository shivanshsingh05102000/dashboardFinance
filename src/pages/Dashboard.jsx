import SummaryCards from "../components/SummaryCards";
import BalanceTrendChart from "../components/BalanceTrendChart";
import SpendingPieChart from "../components/SpendingPieChart";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 text-lg">Your financial overview at a glance</p>
      </div>

      {/* Summary cards */}
      <SummaryCards />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Balance Trend</h2>
          <BalanceTrendChart />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Spending Breakdown</h2>
          <SpendingPieChart />
        </div>
      </div>

    </div>
  );
}