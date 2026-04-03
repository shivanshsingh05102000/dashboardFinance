import { useAppContext } from "../context/AppContext";

const ROLES = [
  { value: "viewer", label: "Viewer" },
  { value: "admin", label: "Admin" },
];

export default function RoleSwitcher({ compact = false }) {
  const { role, setRole } = useAppContext();

  return (
    <label className={`flex items-center gap-2 ${compact ? "w-full" : ""}`}>
      {!compact && <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Role</span>}

      <select
        value={role}
        onChange={(event) => setRole(event.target.value)}
        className="h-10 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 text-sm font-semibold text-slate-700 outline-none ring-0 transition hover:border-[color:var(--line-strong)] focus:border-cyan-400 dark:text-slate-200"
      >
        {ROLES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}