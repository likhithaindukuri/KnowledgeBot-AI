import {
  FileText,
  Search,
  ShieldCheck,
  MessageSquare,
  Building2,
  Palette,
} from "lucide-react";

const features = [
  {
    title: "Upload Your Knowledge Base",
    desc: "Import PDFs, policies, manuals, FAQs, and internal documentation to build a centralized knowledge hub.",
    icon: FileText,
  },
  {
    title: "Instant Answers",
    desc: "Help users find information in seconds through natural language conversations instead of searching documents manually.",
    icon: Search,
  },
  {
    title: "Trusted Source Citations",
    desc: "Every response includes document references so users can verify information directly from the source.",
    icon: ShieldCheck,
  },
  {
    title: "Embeddable AI Assistant",
    desc: "Add your chatbot to any website with a simple integration and start answering questions immediately.",
    icon: MessageSquare,
  },
  {
    title: "Organization Workspaces",
    desc: "Each organization gets its own isolated documents, chatbot, settings, and conversation history.",
    icon: Building2,
  },
  {
    title: "Custom Branding",
    desc: "Personalize the chatbot with your organization's name, logo, colors, and welcome message.",
    icon: Palette,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-neutral-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Features
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-black">
            Everything You Need to Create an AI Knowledge Assistant
          </h2>

          <p className="mt-6 text-lg text-neutral-600 leading-8">
            Give students, customers, employees, and visitors instant access
            to information from your organization's documents.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="border border-neutral-200 rounded-2xl p-7 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >

                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-black">
                  {feature.title}
                </h3>

                <p className="mt-4 text-neutral-600 text-sm leading-7">
                  {feature.desc}
                </p>

              </div>
            );
          })}

        </div>

        {/* Bottom Highlight Section */}

        <div className="mt-20 border border-neutral-200 rounded-3xl bg-neutral-50 p-10">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-4xl font-bold text-black">
                PDFs
              </h3>

              <p className="mt-2 text-neutral-600 text-sm">
                Upload knowledge documents
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black">
                24/7
              </h3>

              <p className="mt-2 text-neutral-600 text-sm">
                Instant question answering
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black">
                1-Line
              </h3>

              <p className="mt-2 text-neutral-600 text-sm">
                Website integration
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black">
                Sources
              </h3>

              <p className="mt-2 text-neutral-600 text-sm">
                Answers backed by citations
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}