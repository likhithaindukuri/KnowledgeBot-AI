import { Link } from "react-router-dom";
import { Bot, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top */}

        <div className="flex flex-col lg:flex-row justify-between gap-12">

          {/* Brand */}

          <div className="max-w-md">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                <Bot size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Nexus
                </h2>

                <p className="text-sm text-neutral-500">
                  Document Intelligence Platform
                </p>
              </div>

            </div>

            <p className="mt-6 text-neutral-600 leading-8">
              Turn PDFs, policies, manuals, FAQs, and knowledge bases into
              AI-powered assistants that deliver instant answers backed by
              trusted source citations.
            </p>

          </div>

          {/* Navigation */}

          <div className="flex gap-20">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-5">
                Navigation
              </p>

              <div className="flex flex-col gap-4">

                <a
                  href="#overview"
                  className="flex items-center gap-2 text-neutral-600 hover:text-black transition"
                >
                  Overview
                </a>

                <Link
                  to="/login"
                  className="flex items-center gap-2 text-neutral-600 hover:text-black transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 text-neutral-600 hover:text-black transition"
                >
                  Create Workspace
                  <ArrowUpRight size={16} />
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 pt-6 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-neutral-500">
            © 2026 Nexus. All rights reserved.
          </p>  

        </div>

      </div>
    </footer>
  );
}