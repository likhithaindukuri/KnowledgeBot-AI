import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import PlatformAssistant from "./PlatformAssistant";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-6 py-12">

      {/* Logo - Top Left */}

      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-3"
      >
        <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
          <Bot size={20} />
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

      {/* Form */}

      <div className="w-full max-w-md">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-black">
            {title}
          </h2>

          <p className="mt-3 text-neutral-600 leading-7">
            {subtitle}
          </p>

        </div>

        <div className="mt-10">
          {children}
        </div>

      </div>

      <PlatformAssistant />

    </div>
  );
}