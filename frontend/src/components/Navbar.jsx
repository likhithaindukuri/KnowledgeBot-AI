import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import { getOrganization, getToken } from "../utils/auth";

export default function Navbar() {
  const organization = getOrganization();
  const loggedIn = getToken() && organization?.slug;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
            <Bot size={22} />
          </div>

          <div className="flex items-center gap-2">

            <div>
              <h1 className="text-lg font-bold text-black">
                Nexus
              </h1>

              <p className="text-xs text-neutral-500 hidden md:block">
                Document Intelligence Platform
              </p>
            </div>

          </div>
        </Link>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <a
            href="#features"
            className="text-neutral-600 hover:text-black transition"
          >
            Features
          </a>

          <a
            href="#use-cases"
            className="text-neutral-600 hover:text-black transition"
          >
            Use Cases
          </a>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {loggedIn ? (
            <>
              <div className="hidden sm:flex flex-col text-right">

                <span className="text-sm font-medium text-black">
                  {organization?.name}
                </span>

                <span className="text-xs text-neutral-500">
                  Organization Workspace
                </span>

              </div>

              <Link
                to={`/org/${organization.slug}/dashboard`}
                className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-neutral-300 px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition"
              >
                Create Workspace
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}