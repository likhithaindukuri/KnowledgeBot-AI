import { TrendingUp } from "lucide-react";

export default function StatsCard({ title, value, hint, icon: Icon = TrendingUp }) {
  return (
    <div className="group bg-white border border-neutral-200 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1">

      {/* Header */}

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-neutral-500">
          {title}
        </p>

        <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-black group-hover:text-white transition">
          <Icon size={18} />
        </div>

      </div>

      {/* Value */}

      <h3 className="mt-6 text-4xl font-bold tracking-tight text-black">
        {value}
      </h3>

      {/* Hint */}

      {hint && (
        <p className="mt-4 text-sm text-neutral-500 leading-6">
          {hint}
        </p>
      )}

    </div>
  );
}