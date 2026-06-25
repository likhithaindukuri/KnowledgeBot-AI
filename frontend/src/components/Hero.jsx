import { Link } from "react-router-dom";
import {
  FileText,
  Bot,
  ShieldCheck,
  Search,
} from "lucide-react";
import heroImage from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 py-24">

      <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-16">

        {/* LEFT CONTENT */}

        <div className="flex-1 max-w-3xl">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-black">
            Turn Your Documents
            <br />
            Into an AI Assistant
          </h1>

          <p className="mt-8 text-lg text-neutral-600 leading-8 max-w-2xl">
            Upload PDFs, policies, manuals, FAQs, and knowledge bases.
            Create an AI assistant that instantly answers questions
            using your organization's content with accurate source citations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/register"
              className="bg-black text-white px-7 py-3 rounded-lg hover:bg-neutral-800 transition"
            >
              Create Workspace
            </Link>

            <button
              className="border border-neutral-300 px-7 py-3 rounded-lg hover:bg-neutral-50 transition"
            >
              View Demo
            </button>

          </div>

          {/* TRUST INDICATORS */}

          <div className="mt-12 flex flex-wrap gap-6 text-sm text-neutral-600">

            <div className="flex items-center gap-2">
              <FileText size={16} />
              Document-Based Answers
            </div>

            <div className="flex items-center gap-2">
              <Search size={16} />
              Source Citations
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              Organization Workspaces
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="flex-1 flex justify-center">

          <div className="relative">

            <img
              src={heroImage}
              alt="Nexus dashboard preview"
              className="w-full max-w-xl object-contain"
            />

          </div>

        </div>

      </div>

    </section>
  );
}