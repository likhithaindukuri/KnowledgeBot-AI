import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                <Bot size={22} />
              </div>

              <div>

                <h2 className="font-semibold text-lg text-black">
                  Nexus
                </h2>

                <p className="text-sm text-neutral-500">
                  Document Intelligence Platform
                </p>

              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-neutral-600 max-w-sm">
              Turn PDFs, policies, manuals, FAQs, and knowledge bases into
              AI-powered assistants that deliver instant answers with trusted
              source citations.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="font-semibold text-black mb-4">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-sm">

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

              <a
                href="#demo"
                className="text-neutral-600 hover:text-black transition"
              >
                Demo
              </a>

            </div>

          </div>

          {/* Account */}

          <div>

            <h3 className="font-semibold text-black mb-4">
              Account
            </h3>

            <div className="flex flex-col gap-3 text-sm">

              <Link
                to="/login"
                className="text-neutral-600 hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-neutral-600 hover:text-black transition"
              >
                Create Workspace
              </Link>

            </div>

          </div>

        </div>

        <div className="border-t border-neutral-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-neutral-500">
            © 2026 Nexus. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}