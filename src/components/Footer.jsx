export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[color:var(--line)] bg-[color:var(--surface-soft)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-4 py-5 text-sm text-slate-800 sm:flex-row sm:items-center sm:px-6 lg:px-8 dark:text-slate-400">
        <p className="font-semibold text-slate-800 dark:text-slate-200">Finance Desk by Zorvyn</p>
        <p>Responsive dashboard with RBAC, analytics, and local persistence.</p>
      </div>
    </footer>
  );
}
