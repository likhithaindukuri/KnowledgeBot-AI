import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Code2,
  BarChart3,
  Settings,
  LogOut,
  Bot,
} from "lucide-react";

const menu = [
  {
    label: "Overview",
    path: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    path: "documents",
    icon: FileText,
  },
  {
    label: "Widget",
    path: "widget",
    icon: Code2,
  },
  {
    label: "Analytics",
    path: "analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "settings",
    icon: Settings,
  },
];

export default function Sidebar({ slug, orgName, onLogout }) {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-neutral-200 flex flex-col shrink-0 z-50">

      {/* TOP BRAND */}

      <div className="px-6 py-6 border-b border-neutral-200">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
            <Bot size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-black">
              Nexus
            </h2>

            <p className="text-xs text-neutral-500">
              Document Intelligence Platform
            </p>
          </div>

        </div>

        {/* Org Card */}

        <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-3">

          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Organization
          </p>

          <p className="mt-1 text-sm font-medium text-black truncate">
            {orgName}
          </p>

        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 px-3 py-6 space-y-1">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={`/org/${slug}/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition group ${
                  isActive
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`
              }
            >

              <Icon size={18} className="shrink-0" />

              <span>{item.label}</span>

            </NavLink>
          );
        })}

      </nav>

      {/* FOOTER */}

      <div className="border-t border-neutral-200 p-4">

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-3 text-sm font-medium hover:bg-neutral-100 transition"
        >
          <LogOut size={16} />
          Sign Out
        </button>

      </div>

    </aside>
  );
}