import InsightTiles from "../components/InsightTiles";

const Insights = () => {
  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Insights</h1>
        <p className="text-gray-400 text-lg">Patterns and observations from your financial data</p>
      </div>

      {/* Insight tiles */}
      <InsightTiles />

    </div>
  );
};

export default Insights;
