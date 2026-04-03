import { useEffect, useState } from "react";

const EMPTY_FORM = {
  date: "",
  description: "",
  category: "",
  type: "expense",
  amount: "",
};

function buildInitialForm(initialData, categories) {
  if (!initialData) {
    return {
      ...EMPTY_FORM,
      category: categories[0] ?? "",
      date: new Date().toISOString().slice(0, 10),
    };
  }

  return {
    date: initialData.date,
    description: initialData.description,
    category: initialData.category,
    type: initialData.type,
    amount: String(initialData.amount),
  };
}

export default function TransactionModal({ mode, initialData, categories, onClose, onSubmit }) {
  const [form, setForm] = useState(() => buildInitialForm(initialData, categories));
  const [error, setError] = useState("");

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [onClose]);

  const isEdit = mode === "edit";

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!form.date || !form.description.trim() || !form.category || !form.type || amount <= 0) {
      setError("Please complete all fields with a valid amount.");
      return;
    }

    onSubmit({
      date: form.date,
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      amount,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="surface-card w-full max-w-lg rounded-3xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="page-title text-2xl font-bold text-slate-900 dark:text-slate-50">
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line)] text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(event) => handleChange("date", event.target.value)}
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-slate-700 outline-none transition focus:border-cyan-400 dark:text-slate-100"
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Description / Note</span>
            <input
              value={form.description}
              onChange={(event) => handleChange("description", event.target.value)}
              placeholder="e.g., Freelance design sprint"
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-slate-700 outline-none transition focus:border-cyan-400 dark:text-slate-100"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Type</span>
              <select
                value={form.type}
                onChange={(event) => handleChange("type", event.target.value)}
                className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-slate-700 outline-none transition focus:border-cyan-400 dark:text-slate-100"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Category</span>
              <select
                value={form.category}
                onChange={(event) => handleChange("category", event.target.value)}
                className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-slate-700 outline-none transition focus:border-cyan-400 dark:text-slate-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Amount</span>
            <input
              type="number"
              min="1"
              value={form.amount}
              onChange={(event) => handleChange("amount", event.target.value)}
              placeholder="Amount in INR"
              className="h-11 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-slate-700 outline-none transition focus:border-cyan-400 dark:text-slate-100"
              required
            />
          </label>

          {error && <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</p>}

          <div className="mt-1 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[color:var(--line)] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              {isEdit ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}