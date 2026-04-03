import { NavLink } from "react-router-dom";
import RoleSwitcher from "./RoleSwitcher";
import ThemeToggle from "./ThemeToggle";
import img from "../assets/image.png";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/insights", label: "Insights" },
];

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={img}
            alt="Logo"
            className="h-8 w-auto max-w-[200px] object-contain"
          />
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <RoleSwitcher />
          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
}