export default function Topbar({
  organization,
  title = "Overview",
}) {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-neutral-200 sticky top-0 z-10">

      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* LEFT */}

        <div>

          <p className="text-xs text-neutral-500">
            Dashboard
          </p>

          <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-black">
            {title}
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            {organization.name}
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {/* Workspace Badge */}

          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl border border-neutral-200 bg-neutral-50">

            <div className="text-xs uppercase tracking-wide text-neutral-500">
              Workspace
            </div>

            <div className="text-sm font-medium text-black max-w-[140px] truncate">
              {organization.slug}
            </div>

          </div>

          {/* Avatar */}

          <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center font-semibold shadow-sm">
            {organization.name?.charAt(0)?.toUpperCase()}
          </div>

        </div>

      </div>

    </header>
  );
}