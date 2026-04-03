import { useAppContext } from "../context/AppContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useAppContext();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-sm font-semibold text-slate-700 transition hover:border-[color:var(--line-strong)] hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}