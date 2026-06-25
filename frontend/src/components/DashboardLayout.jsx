import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { clearAuth } from "../utils/auth";

export default function DashboardLayout({ organization, title, children }) {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Sidebar (fixed, out of flow) */}
      <Sidebar
        slug={organization.slug}
        orgName={organization.name}
        onLogout={logout}
      />

      {/* Main Content (shifted right manually) */}
      <div className="ml-64 min-h-screen bg-neutral-50 flex flex-col">

        {/* Topbar */}
        <Topbar organization={organization} title={title} />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}