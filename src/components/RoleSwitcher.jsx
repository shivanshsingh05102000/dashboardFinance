import { useAppContext } from "../context/AppContext";

const ROLES = [
  { value: "viewer", label: "👁️  Viewer" },
  { value: "admin",  label: "⚡  Admin"  },
];

export default function RoleSwitcher() {
  const { role, setRole } = useAppContext();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400 hidden sm:block">Role:</span>

      <div className="relative">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="appearance-none cursor-pointer bg-gray-800 border border-gray-700 text-white text-sm font-medium rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-colors"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Live pill */}
      <span className={`hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
        role === "admin"
          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
          : "bg-gray-800 text-gray-400 border-gray-700"
      }`}>
        <span className={`w-2 h-2 rounded-full ${role === "admin" ? "bg-indigo-400" : "bg-gray-500"}`} />
        {role === "admin" ? "Admin" : "Viewer"}
      </span>
    </div>
  );
}