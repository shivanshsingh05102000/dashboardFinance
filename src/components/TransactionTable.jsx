import { useEffect, useMemo, useState } from "react";
import { useAppContext, useFilteredTransactions } from "../context/AppContext";
import { downloadTransactionsCsv, formatCurrency, formatDate } from "../utils/finance";
import TransactionModal from "./TransactionModal";

const SORT_OPTIONS = [
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc", label: "Oldest first" },
  { value: "amount-desc", label: "Highest amount" },
  { value: "amount-asc", label: "Lowest amount" },
];

function TypePill({ value }) {
  const isIncome = value === "income";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        isIncome
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : "bg-rose-500/15 text-rose-700 dark:text-rose-300",
      ].join(" ")}
    >
      {value}
    </span>
  );
}

function DeleteConfirm({ transaction, onClose, onConfirm }) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="surface-card w-full max-w-md rounded-2xl p-5">
        <h4 className="page-title text-xl font-bold text-slate-900 dark:text-slate-50">Delete Transaction?</h4>
        <p className="mt-2 text-sm text-slate-800 dark:text-slate-300">
          This will remove <span className="font-semibold">{transaction.description}</span> from your records.
        </p>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[color:var(--line)] px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TransactionTable() {
  const {
    transactions,
    categories,
    filters,
    isAdmin,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setFilters,
    resetFilters,
  } = useAppContext();

  const filteredTransactions = useFilteredTransactions();
  const [searchInput, setSearchInput] = useState(filters.search);
  const [modalState, setModalState] = useState({ open: false, mode: "add", item: null });
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchInput });
    }, 280);

    return () => clearTimeout(timer);
  }, [searchInput, setFilters]);

  const tableSummary = useMemo(
    () => ({
      total: transactions.length,
      shown: filteredTransactions.length,
    }),
    [transactions.length, filteredTransactions.length],
  );

  const openAddModal = () => {
    setModalState({ open: true, mode: "add", item: null });
  };

  const openEditModal = (item) => {
    setModalState({ open: true, mode: "edit", item });
  };

  const closeModal = () => {
    setModalState({ open: false, mode: "add", item: null });
  };

  const handleModalSubmit = (payload) => {
    if (modalState.mode === "edit" && modalState.item) {
      editTransaction({ ...payload, id: modalState.item.id });
      return;
    }

    addTransaction(payload);
  };

  const handleExport = () => {
    const fileDate = new Date().toISOString().slice(0, 10);
    downloadTransactionsCsv(filteredTransactions, `transactions-${fileDate}.csv`);
  };

  const clearFilters = () => {
    resetFilters();
    setSearchInput("");
  };

  return (
    <section className="space-y-4">
      <div className="surface-card fade-up rounded-3xl p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="page-title text-2xl font-bold text-slate-900 dark:text-slate-50">Transaction Explorer</h2>
            <p className="text-sm text-slate-800 dark:text-slate-300">
              Showing {tableSummary.shown} of {tableSummary.total} transactions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button
                type="button"
                onClick={openAddModal}
                className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Add Transaction
              </button>
            )}

            {isAdmin && (
              <button
                type="button"
                onClick={handleExport}
                className="rounded-xl border border-[color:var(--line)] px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Export CSV
              </button>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-[color:var(--line)] px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">
              Search
            </span>
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Description or category"
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:text-slate-100"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">Type</span>
            <select
              value={filters.type}
              onChange={(event) => setFilters({ type: event.target.value })}
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:text-slate-100"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">Category</span>
            <select
              value={filters.category}
              onChange={(event) => setFilters({ category: event.target.value })}
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:text-slate-100"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">Sort</span>
            <select
              value={filters.sortBy}
              onChange={(event) => setFilters({ sortBy: event.target.value })}
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:text-slate-100"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {!isAdmin && (
          <p className="mt-3 rounded-xl border border-[color:var(--line)] bg-slate-500/10 px-3 py-2 text-xs text-slate-800 dark:text-slate-300">
            Viewer mode is read-only. Switch to Admin to add, edit, delete, and export data.
          </p>
        )}
      </div>

      <div className="surface-card fade-up-delay overflow-hidden rounded-3xl">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-100/85 dark:bg-slate-900/70">
              <tr>
                {[
                  "Date",
                  "Description",
                  "Category",
                  "Type",
                  "Amount",
                  isAdmin ? "Actions" : "",
                ].map((head) => (
                  <th
                    key={head || "empty"}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((item) => (
                <tr key={item.id} className="border-t border-[color:var(--line)]">
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-300">{formatDate(item.date)}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">{item.description}</td>
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-300">{item.category}</td>
                  <td className="px-4 py-3">
                    <TypePill value={item.type} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                    {item.type === "expense" ? "-" : "+"}
                    {formatCurrency(item.amount)}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="rounded-lg border border-[color:var(--line)] px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
                          className="rounded-lg border border-rose-400/35 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 p-4 md:hidden">
          {filteredTransactions.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{item.description}</p>
                <TypePill value={item.type} />
              </div>

              <p className="mt-1 text-xs text-slate-800 dark:text-slate-400">
                {formatDate(item.date)} - {item.category}
              </p>

              <p className="mt-2 text-base font-bold text-slate-800 dark:text-slate-100">
                {item.type === "expense" ? "-" : "+"}
                {formatCurrency(item.amount)}
              </p>

              {isAdmin && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="rounded-lg border border-[color:var(--line)] px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="rounded-lg border border-rose-400/35 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-300"
                  >
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center">
            <p className="page-title text-xl font-semibold text-slate-800 dark:text-slate-100">No transactions match these filters.</p>
            <p className="mt-1 text-sm text-slate-800 dark:text-slate-300">Try resetting filters or adding a new transaction.</p>
          </div>
        )}
      </div>

      {modalState.open && (
        <TransactionModal
          mode={modalState.mode}
          initialData={modalState.item}
          categories={categories}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}

      <DeleteConfirm
        transaction={itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          deleteTransaction(itemToDelete.id);
          setItemToDelete(null);
        }}
      />
    </section>
  );
}
