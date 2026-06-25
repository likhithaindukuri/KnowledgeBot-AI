import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import PlatformAssistant from "./PlatformAssistant";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-white flex">

      {/* LEFT MARKETING PANEL */}

      <div className="hidden lg:flex lg:w-1/2 border-r border-neutral-200 bg-neutral-50 p-16 flex-col justify-between">

        <div>

          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              N
            </div>

            <div>
              <h1 className="text-lg font-bold text-black">
                Nexus
              </h1>

              <p className="text-xs text-neutral-500">
                Document Intelligence Platform
              </p>
            </div>

          </Link>

          {/* Main Heading */}

          <div className="mt-10">

            <h2 className="text-5xl font-bold leading-tight text-black">
              Build AI Chatbots
              <br />
              from Your Documents
            </h2>

            <p className="mt-8 text-lg leading-8 text-neutral-600 max-w-md">
              Turn PDFs, policies, FAQs, and internal knowledge into an AI assistant
              that answers questions instantly with trusted source citations.
            </p>

            {/* Feature Pills */}

            <div className="mt-10 flex flex-wrap gap-3 text-sm">

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200">
                <CheckCircle2 size={16} className="text-black" />
                Multi-Tenant
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200">
                <CheckCircle2 size={16} className="text-black" />
                RAG Powered
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200">
                <CheckCircle2 size={16} className="text-black" />
                Citations
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200">
                <CheckCircle2 size={16} className="text-black" />
                Widget Ready
              </div>

            </div>

          </div>

        </div>

        {/* Bottom small text */}

        <div className="text-xs text-neutral-500">
          Trusted by organizations to power internal knowledge systems.
        </div>

      </div>

      {/* RIGHT FORM SECTION */}

      <div className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}

          <Link to="/" className="lg:hidden flex items-center gap-3 mb-10">

            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              N
            </div>

            <div>
              <h1 className="font-bold text-black">
                Nexus
              </h1>

              <p className="text-xs text-neutral-500">
                Document Intelligence Platform
              </p>
            </div>

          </Link>

          {/* Heading */}

          <h1 className="text-3xl font-bold text-black">
            {title}
          </h1>

          <p className="mt-3 text-neutral-600 leading-7">
            {subtitle}
          </p>

          {/* Form */}

          <div className="mt-8">
            {children}
          </div>

        </div>

      </div>

      <PlatformAssistant />

    </div>
  );
}