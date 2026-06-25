import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import StatsCard from "../components/StatsCard";
import { fetchAnalytics } from "../utils/api";
import { FileText, MessageSquare, Gauge, Clock } from "lucide-react";

export default function Analytics({ organization }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then(setStats)
      .catch(() => setError("Could not load analytics."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout organization={organization} title="Analytics">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">
          Conversation insights
        </h2>
        <p className="mt-2 text-neutral-600 leading-relaxed">
          Monitor how visitors use your embedded chatbot, review answers, and
          inspect source citations with confidence scores.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatsCard
          title="Documents indexed"
          value={loading ? "—" : stats?.documents ?? 0}
          hint="Knowledge sources in your workspace"
          icon={FileText}
        />
        <StatsCard
          title="Chats today"
          value={loading ? "—" : stats?.chats_today ?? 0}
          hint="Widget conversations since midnight UTC"
          icon={MessageSquare}
        />
        <StatsCard
          title="Average confidence"
          value={loading ? "—" : `${stats?.confidence ?? 0}%`}
          hint="Retrieval match quality across all chats"
          icon={Gauge}
        />
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Recent conversations</h3>
            <p className="text-sm text-neutral-500 mt-0.5">
              Latest questions from your embedded widget
            </p>
          </div>
          {stats?.recent_chats?.length > 0 && (
            <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
              {stats.recent_chats.length} shown
            </span>
          )}
        </div>

        {!loading && (!stats || stats.recent_chats.length === 0) ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <MessageSquare size={20} />
            </div>
            <p className="text-base font-medium text-neutral-900">No conversations yet</p>
            <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              Embed your widget on a website and visitor questions will appear here with
              answers, citations, and confidence scores.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {stats?.recent_chats.map((chat, index) => (
              <article key={index} className="px-6 py-5 hover:bg-neutral-50/80 transition">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                    Conversation {stats.recent_chats.length - index}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      chat.confidence >= 70
                        ? "bg-emerald-50 text-emerald-700"
                        : chat.confidence >= 40
                        ? "bg-amber-50 text-amber-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {chat.confidence}% confidence
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 mb-1.5">Question</p>
                    <p className="text-sm text-neutral-800 leading-relaxed">{chat.question}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 mb-1.5">Answer</p>
                    <p className="text-sm text-neutral-800 leading-relaxed">{chat.answer}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-neutral-600">
                  {chat.source_filename && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1">
                      <FileText size={12} />
                      {chat.source_filename}
                      {chat.source_page ? ` · p.${chat.source_page}` : ""}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1">
                    <Clock size={12} />
                    {new Date(chat.created_at).toLocaleString()}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
