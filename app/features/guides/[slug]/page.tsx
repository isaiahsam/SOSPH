import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import guidesData from "@/data/guides.json";
import hotlinesData from "@/data/hotlines.json";
import PrintButton from "@/components/PrintButton";
import RevealObserver from "@/components/RevealObserver";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return guidesData.guides.map((guide) => ({ slug: guide.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData.guides.find((g) => g.id === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Emergency Guide`,
    description: `Step-by-step guide for ${guide.title.toLowerCase()} response in the Philippines. ${guide.summary}`,
  };
}

function getHotlineNumber(id: string): string | undefined {
  for (const cat of hotlinesData.categories) {
    const found = cat.hotlines.find((h) => h.id === id || h.number === id);
    if (found) return found.number;
  }
  return id;
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = guidesData.guides.find((g) => g.id === slug);

  if (!guide) notFound();

  const otherGuides = guidesData.guides.filter((g) => g.id !== guide.id);

  return (
    <div className="overflow-x-hidden">
      <RevealObserver />

      {/* ── Dark hero ── */}
      <section className="relative bg-[#0D1117] py-16 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 15% 60%, rgba(220,38,38,0.10) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative">
          {/* Breadcrumb */}
          <nav className="reveal flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/features" className="hover:text-gray-400 transition-colors">
              Features
            </Link>
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link href="/features/guides" className="hover:text-gray-400 transition-colors">
              Guides
            </Link>
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-300 font-medium">{guide.title}</span>
          </nav>

          <h1
            className="reveal text-3xl md:text-5xl font-bold text-white mb-3"
            style={{ transitionDelay: "0.1s" }}
          >
            {guide.title}
          </h1>
          <p
            className="reveal text-lg text-white/45 max-w-2xl leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            {guide.summary}
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 py-16">
        <div className="max-w-3xl">

          {/* Call First */}
          <div className="reveal bg-red-600 text-white rounded-xl p-5 mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-200 mb-2">
              Call First
            </div>
            <div className="flex flex-wrap gap-3">
              {guide.callFirst.map((num) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 bg-white text-red-700 rounded-lg px-4 py-2.5 font-bold hover:bg-red-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-mono text-lg">{getHotlineNumber(num)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-10">
            <h2 className="reveal text-sm font-semibold text-gray-700 uppercase tracking-wider mb-6">
              What to Do — Step by Step
            </h2>
            <ol className="space-y-3">
              {guide.steps.map((step, i) => (
                <li
                  key={step.step}
                  className={`reveal-scale flex items-start gap-4 p-4 rounded-xl border ${
                    step.important
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-200"
                  }`}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.important
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {step.step}
                  </span>
                  <p
                    className={`text-sm leading-relaxed pt-0.5 ${
                      step.important
                        ? "text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {step.instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Do Not */}
          <div className="reveal mb-10">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Do Not
            </h2>
            <ul className="space-y-2">
              {guide.doNot.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <svg
                    className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Print */}
          <div className="reveal border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-gray-800">Save for offline</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Print this guide to keep a physical copy.
              </p>
            </div>
            <PrintButton />
          </div>

          {/* Other guides */}
          <div>
            <h2 className="reveal text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Other Guides
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {otherGuides.map((g, i) => (
                <Link
                  key={g.id}
                  href={`/features/guides/${g.id}`}
                  className="reveal-scale p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {g.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {g.steps.length} steps
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
