import {
  GraduationCap,
  Hospital,
  Landmark,
  Shield,
  Building2,
  Briefcase,
} from "lucide-react";

const useCases = [
  {
    title: "Universities",
    desc: "Help students instantly find information about admissions, fees, hostel rules, academic policies, and campus services.",
    icon: GraduationCap,
  },
  {
    title: "Hospitals",
    desc: "Provide quick access to patient guidelines, insurance information, departments, services, and hospital policies.",
    icon: Hospital,
  },
  {
    title: "Banks",
    desc: "Answer customer questions about accounts, loans, eligibility criteria, documentation, and banking services.",
    icon: Landmark,
  },
  {
    title: "Insurance Companies",
    desc: "Make policy details, claim procedures, coverage information, and FAQs easily accessible to customers.",
    icon: Shield,
  },
  {
    title: "Enterprises",
    desc: "Enable employees to find internal documentation, SOPs, HR policies, and company knowledge instantly.",
    icon: Building2,
  },
  {
    title: "Knowledge Bases",
    desc: "Transform large collections of documents into searchable AI assistants that provide accurate answers.",
    icon: Briefcase,
  },
];

export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="border-t border-neutral-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Use Cases
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-black">
            Built for Every Organization
          </h2>

          <p className="mt-6 text-lg text-neutral-600 leading-8">
            From universities and hospitals to banks and enterprises,
            Nexus helps organizations unlock information from
            their documents through conversational AI.
          </p>

        </div>

        {/* Use Case Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

          {useCases.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="border border-neutral-200 rounded-2xl p-7 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >

                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-black">
                  {item.title}
                </h3>

                <p className="mt-4 text-neutral-600 text-sm leading-7">
                  {item.desc}
                </p>

              </div>
            );
          })}

        </div>

        {/* Bottom Section */}

        <div className="mt-20 border border-neutral-200 rounded-3xl bg-neutral-50 p-10">

          <div className="text-center max-w-3xl mx-auto">

            <h3 className="text-3xl font-bold text-black">
              One Platform, Multiple Industries
            </h3>

            <p className="mt-4 text-neutral-600 leading-8">
              Upload your organization's documents, generate an AI assistant,
              and provide instant answers with source citations across websites,
              portals, support centers, and internal knowledge systems.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}