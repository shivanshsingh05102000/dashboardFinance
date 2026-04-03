import TransactionTable from "../components/TransactionTable";

export default function Transactions() {
  return (
    <div className="space-y-5">
      <section className="fade-up surface-card rounded-3xl p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-400">Records</p>
        <h1 className="page-title mt-2 text-4xl font-bold text-slate-900 dark:text-slate-50">Transactions</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-800 dark:text-slate-300">
          Search, sort, and filter transaction history. Admin mode enables add/edit/delete actions and CSV export.
        </p>
      </section>

      <TransactionTable />
    </div>
  );
}