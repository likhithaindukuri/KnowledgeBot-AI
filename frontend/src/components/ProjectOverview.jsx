import {
  Building2,
  FileText,
  Palette,
  Bot,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Register Your Organization",
    description:
      "Create a dedicated workspace for your university, company, hospital, or business with complete data isolation.",
    icon: Building2,
  },
  {
    title: "Upload Your Documents",
    description:
      "Import PDFs, policies, FAQs, manuals, and knowledge base documents. AI indexes everything automatically.",
    icon: FileText,
  },
  {
    title: "Customize Your Chatbot",
    description:
      "Add your organization logo, chatbot name, colors, welcome message, and branding to match your website.",
    icon: Palette,
  },
  {
    title: "AI Builds Your Knowledge Base",
    description:
      "Nexus processes every document using AI so users receive accurate answers with source citations.",
    icon: Bot,
  },
  {
    title: "Deploy Anywhere",
    description:
      "Copy one embed script and add your AI assistant to your website within minutes.",
    icon: Globe,
  },
];

export default function ProjectOverview() {
  return (
    <section
      id="overview"
      className="border-t border-neutral-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Heading */}

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="mt-8 text-4xl md:text-5xl font-bold text-black">
            From Documents to an AI Assistant in Minutes
          </h2>

          <p className="mt-6 text-lg text-neutral-600 leading-8">
            Nexus transforms your organization's documents into a
            fully branded AI assistant that can answer questions instantly,
            provide trusted citations, and be embedded on any website.
          </p>

        </div>

        {/* Timeline */}

        <div className="mt-20">

          <div className="grid lg:grid-cols-5 gap-8">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative"
                >
                  <div className="border border-neutral-200 rounded-3xl p-7 bg-white hover:shadow-xl transition duration-300 h-full">

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Icon size={24} />
                    </div>

                    <div className="mt-6">

                      <p className="text-xs uppercase tracking-widest text-neutral-400">
                        Step {index + 1}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-sm text-neutral-600 leading-7">
                        {step.description}
                      </p>

                    </div>

                  </div>

                  {index !== steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-7 -translate-y-1/2 text-neutral-400">
                      <ArrowRight size={30} />
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}