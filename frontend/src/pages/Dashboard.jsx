import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatsCard from "../components/StatsCard";
import { fetchAnalytics } from "../utils/api";
import { API_BASE } from "../utils/auth";

import {
  FileText,
  Palette,
  Code2,
} from "lucide-react";

export default function Dashboard({ organization }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics()
      .then(setStats)
      .catch(() => null);
  }, []);

  const base = `/org/${organization.slug}`;

  const embedCode = `<!-- Nexus Widget -->\n<script src="${API_BASE}/widget.js" data-token="${organization.widget_token}" defer></script>`;

  return (
    <DashboardLayout organization={organization} title="Overview">

      {/* HERO WELCOME */}

      <div className="mb-10">

        <h2 className="text-3xl font-bold text-black">
          Welcome back, {organization.name}
        </h2>

        <p className="mt-3 text-neutral-600 max-w-2xl leading-7">
          Manage your knowledge base, configure your chatbot,
          and track real user conversations from a single dashboard.
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <StatsCard
          title="Documents"
          value={stats ? stats.documents : 0}
          hint="Uploaded knowledge files"
          icon={FileText}
        />

        <StatsCard
          title="Chats Today"
          value={stats ? stats.chats_today : 0}
          hint="User conversations"
        />

        <StatsCard
          title="AI Confidence"
          value={stats ? `${stats.confidence}%` : "0%"}
          hint="Answer reliability score"
        />

      </div>

      {/* QUICK SETUP */}

      <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">

        <h3 className="text-xl font-semibold mb-6">
          Quick Setup
        </h3>

        <div className="grid md:grid-cols-3 gap-5">

          <Link
            to={`${base}/documents`}
            className="group border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition bg-white"
          >

            <FileText className="w-5 h-5 text-neutral-700 mb-4 group-hover:text-black" />

            <h4 className="font-semibold text-black">
              Upload Documents
            </h4>

            <p className="text-sm text-neutral-500 mt-2 leading-6">
              Add PDFs, FAQs, policies, and knowledge sources.
            </p>

          </Link>

          <Link
            to={`${base}/widget`}
            className="group border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition bg-white"
          >

            <Palette className="w-5 h-5 text-neutral-700 mb-4 group-hover:text-black" />

            <h4 className="font-semibold text-black">
              Customize Widget
            </h4>

            <p className="text-sm text-neutral-500 mt-2 leading-6">
              Configure branding, theme, and chatbot appearance.
            </p>

          </Link>

          <Link
            to={`${base}/widget`}
            className="group border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition bg-white"
          >

            <Code2 className="w-5 h-5 text-neutral-700 mb-4 group-hover:text-black" />

            <h4 className="font-semibold text-black">
              Embed Chatbot
            </h4>

            <p className="text-sm text-neutral-500 mt-2 leading-6">
              Copy a single script and add it to your website.
            </p>

          </Link>

        </div>

      </div>

      {/* EMBED CODE */}

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">

        {/* HEADER */}

        <div className="p-6 border-b border-neutral-100">

          <h3 className="text-xl font-semibold text-black">
            Embed Code
          </h3>

          <p className="text-sm text-neutral-500 mt-1">
            Add this script to your website before closing{" "}
            <code className="px-2 py-1 bg-neutral-100 rounded text-xs">
              &lt;/body&gt;
            </code>
          </p>

        </div>

        {/* CODE BLOCK */}

        <div className="p-6">

          <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-5 overflow-x-auto text-sm leading-7">
{embedCode}
          </pre>

          <div className="mt-5">

            <Link
              to={`${base}/widget`}
              className="inline-flex items-center px-5 py-3 bg-black text-white rounded-xl hover:bg-neutral-800 transition"
            >
              Open Widget Settings
            </Link>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}