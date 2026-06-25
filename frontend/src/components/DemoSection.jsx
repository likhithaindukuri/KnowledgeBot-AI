import { Link } from "react-router-dom";

export default function DemoSection() {
  return (
    <section id="demo" className="border-t border-neutral-200 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title mb-2">Try the demo</h2>
        <p className="section-subtitle mb-6 max-w-xl">
          Click the chat button in the bottom-right corner. Ask about hostel fees or
          admissions to see how cited answers work. Full demo integration coming soon.
        </p>
        <div className="card p-6 max-w-lg">
          <p className="text-sm font-medium mb-3">Sample questions to try:</p>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li>· What is the hostel fee?</li>
            <li>· How do I apply for admission?</li>
            <li>· Hello, what can you help with?</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-3">Ready to build your chatbot?</h2>
        <p className="text-neutral-600 text-sm mb-6 max-w-md mx-auto">
          Register your organization and go live in minutes.
        </p>
        <Link to="/register" className="btn-primary px-8 py-3 inline-block">
          Get Started — It&apos;s free
        </Link>
      </div>
    </section>
  );
}
