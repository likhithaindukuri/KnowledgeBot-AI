import DashboardLayout from "../components/DashboardLayout";

export default function Settings({ organization }) {
  const fields = [
    {
      label: "Organization Name",
      value: organization.name,
    },
    {
      label: "Email Address",
      value: organization.email,
    },
    {
      label: "Workspace Slug",
      value: organization.slug,
      mono: true,
    },
    {
      label: "Organization ID",
      value: organization.id,
      mono: true,
    },
    {
      label: "Dashboard URL",
      value: `/org/${organization.slug}/dashboard`,
      mono: true,
    },
  ];

  return (
    <DashboardLayout
      organization={organization}
      title="Settings"
    >
      {/* Header */}

      <div className="mb-10">

        <h2 className="text-3xl font-bold text-black">
          Organization Settings
        </h2>

        <p className="mt-3 text-neutral-600 max-w-2xl leading-7">
          View your organization profile and workspace information.
          Every organization has an isolated AI knowledge base,
          chatbot, and analytics dashboard.
        </p>

      </div>

      {/* Profile Card */}

      <div className="bg-white border border-neutral-200 rounded-2xl p-8 max-w-4xl">

        <div className="flex items-center gap-5 mb-8">

          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold">

            {organization.name.charAt(0).toUpperCase()}

          </div>

          <div>

            <h3 className="text-2xl font-semibold">
              {organization.name}
            </h3>

            <p className="text-neutral-500 mt-1">
              AI Knowledge Platform Workspace
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {fields.map((field) => (

            <div
              key={field.label}
              className="border border-neutral-200 rounded-xl p-5 bg-neutral-50"
            >

              <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
                {field.label}
              </p>

              <p
                className={`text-sm text-black ${
                  field.mono
                    ? "font-mono break-all"
                    : "font-medium"
                }`}
              >
                {field.value}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Workspace Info */}

      <div className="bg-white border border-neutral-200 rounded-2xl p-8 mt-8 max-w-4xl">

        <h3 className="text-xl font-semibold mb-5">
          Workspace Information
        </h3>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="border rounded-xl p-5">

            <div className="text-3xl mb-3">
              🤖
            </div>

            <h4 className="font-medium">
              AI Chatbot
            </h4>

            <p className="text-sm text-neutral-500 mt-2">
              Personalized chatbot powered by your uploaded documents.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <div className="text-3xl mb-3">
              📄
            </div>

            <h4 className="font-medium">
              Knowledge Base
            </h4>

            <p className="text-sm text-neutral-500 mt-2">
              PDFs are processed, chunked and indexed for RAG search.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <div className="text-3xl mb-3">
              📊
            </div>

            <h4 className="font-medium">
              Analytics
            </h4>

            <p className="text-sm text-neutral-500 mt-2">
              Monitor chatbot conversations and AI confidence scores.
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}