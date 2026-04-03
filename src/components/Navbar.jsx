import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import RoleSwitcher from "./RoleSwitcher";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/insights", label: "Insights" },
];

function getLinkClasses(isActive) {
  return [
    "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
    isActive
      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
  ].join(" ");
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role } = useAppContext();

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-[color:var(--surface-soft)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 shadow-md shadow-cyan-400/30">
            <span className="page-title text-base font-bold text-slate-900">FD</span>
          </div>

          <div>
            <p className="page-title text-lg font-bold text-slate-900 dark:text-slate-50">Finance Desk</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Role: {role === "admin" ? "Admin" : "Viewer"}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} end={item.to === "/"} to={item.to} className={({ isActive }) => getLinkClasses(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <RoleSwitcher />
          <ThemeToggle />
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--line)] text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          type="button"
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-4 md:hidden">
          <nav className="mb-4 grid gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                end={item.to === "/"}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => getLinkClasses(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-3">
            <RoleSwitcher compact />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}