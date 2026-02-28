import type { Metadata } from "next";
import Link from "next/link";
import hotlinesData from "@/data/hotlines.json";
import guidesData from "@/data/guides.json";
import expresswaysData from "@/data/expressways.json";
import LocationHelper from "@/components/LocationHelper";
import RevealObserver from "@/components/RevealObserver";

export const metadata: Metadata = {
  title: "Features — What SOSPH Provides",
  description:
    "Emergency hotlines, step-by-step response guides, expressway procedures, and GPS location sharing. All available now, no account required.",
};

export default function FeaturesPage() {
  const nationalHotlines = hotlinesData.categories[0].hotlines;
  const guides = guidesData.guides;
  const expressways = expresswaysData.expressways;

  return (
    <div className="overflow-x-hidden">
      <RevealObserver />

      {/* ── Header ── */}
      <section className="relative bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
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
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative">
          <p className="reveal label-caps text-gray-600 mb-3">Platform</p>
          <h1
            className="reveal text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ transitionDelay: "0.1s" }}
          >
            What SOSPH
            <br />
            provides.
          </h1>
          <p
            className="reveal text-lg text-white/45 max-w-lg leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            Four tools, available now on any device. No account required.
            Designed to be opened and used under stress.
          </p>
        </div>
      </section>

      {/* ── 01 Emergency Hotlines ── */}
      <section className="bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal font-mono text-xs text-gray-300 mb-4 tracking-widest">
              01
            </p>
            <h2
              className="reveal text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Emergency Hotlines
            </h2>
            <p
              className="reveal text-base text-gray-500 leading-relaxed mb-8"
              style={{ transitionDelay: "0.2s" }}
            >
              A complete directory of Philippine emergency numbers — national,
              medical, traffic, expressway, and disaster response. Organized by
              category. Click any number to call on mobile.
            </p>
            <Link
              href="/hotlines"
              className="reveal group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border border-gray-200 hover:border-gray-400 hover:shadow-sm px-5 py-3 rounded-lg transition-all duration-200"
              style={{ transitionDelay: "0.3s" }}
            >
              View full directory
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="space-y-2">
            {nationalHotlines.map((hotline, i) => (
              <a
                key={hotline.id}
                href={`tel:${hotline.number.replace(/[^0-9+]/g, "")}`}
                className="reveal group flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div>
                  <div className="font-mono font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                    {hotline.number}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {hotline.name}
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors duration-200 flex-shrink-0"
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
              </a>
            ))}
            <p className="text-xs text-gray-400 pt-2">
              Showing national emergency numbers.{" "}
              <Link
                href="/hotlines"
                className="text-blue-500 hover:text-blue-600"
              >
                View all categories →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 Response Guides ── */}
      <section className="bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal font-mono text-xs text-gray-600 mb-4 tracking-widest">
              02
            </p>
            <h2
              className="reveal text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Response Guides
            </h2>
            <p
              className="reveal text-base text-white/45 leading-relaxed mb-8"
              style={{ transitionDelay: "0.2s" }}
            >
              Numbered, step-by-step instructions for the most common emergency
              situations. Short steps. Calm language. No paragraphs to read
              while panicking.
            </p>
            <Link
              href="/guides"
              className="reveal group inline-flex items-center gap-2 text-sm font-semibold text-white border border-gray-700 hover:border-gray-500 px-5 py-3 rounded-lg transition-all duration-200"
              style={{ transitionDelay: "0.3s" }}
            >
              View all guides
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="space-y-3">
            {guides.map((guide, i) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="reveal group flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-gray-600 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-white/90">
                      {guide.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {guide.steps.length} steps · Call{" "}
                      <span className="text-red-400 font-medium">
                        {guide.callFirst[0]}
                      </span>
                    </div>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-700 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Expressway Guidance ── */}
      <section className="bg-gray-50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal font-mono text-xs text-gray-300 mb-4 tracking-widest">
              03
            </p>
            <h2
              className="reveal text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Expressway Guidance
            </h2>
            <p
              className="reveal text-base text-gray-500 leading-relaxed mb-6"
              style={{ transitionDelay: "0.2s" }}
            >
              Philippine expressways require specific procedures during
              breakdowns and accidents. Dedicated hotlines, do/don&apos;t
              rules, and kilometer marker guidance for each major expressway.
            </p>
            <div
              className="reveal bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8"
              style={{ transitionDelay: "0.3s" }}
            >
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-semibold">Always note your KM marker.</span>{" "}
                Green posts every 500 m. It is the fastest way to communicate
                your location to patrol.
              </p>
            </div>
            <Link
              href="/expressways"
              className="reveal group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border border-gray-200 hover:border-gray-400 hover:shadow-sm px-5 py-3 rounded-lg transition-all duration-200"
            >
              View expressway guide
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="space-y-3">
            {expressways.map((eway, i) => (
              <div
                key={eway.id}
                className="reveal group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">
                      {eway.name}
                    </span>
                    <span className="text-xs text-gray-400">{eway.fullName}</span>
                  </div>
                  <p className="text-xs text-gray-500">{eway.coverage}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {eway.hotlines.slice(0, 1).map((h) => (
                    <a
                      key={h.number}
                      href={`tel:${h.number.replace(/[^0-9+]/g, "")}`}
                      className="font-mono text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      {h.number}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Location Helper ── */}
      <section
        id="location"
        className="bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal font-mono text-xs text-gray-300 mb-4 tracking-widest">
              04
            </p>
            <h2
              className="reveal text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Location Helper
            </h2>
            <p
              className="reveal text-base text-gray-500 leading-relaxed mb-4"
              style={{ transitionDelay: "0.2s" }}
            >
              Get your GPS coordinates in one tap. Copy them to share via SMS,
              Messenger, or any messaging app with emergency services or family.
            </p>
            <p
              className="reveal text-xs text-gray-400 leading-relaxed"
              style={{ transitionDelay: "0.3s" }}
            >
              Your location is never stored. It stays on your device.
            </p>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <LocationHelper />
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="bg-[#0D1117] py-12 px-6 sm:px-10 lg:px-16 xl:px-24">
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
          All content on this platform is for reference and guidance only.
          SOSPH does not dispatch emergency services. In any life-threatening
          situation, call{" "}
          <a
            href="tel:911"
            className="font-semibold text-gray-400 hover:text-white transition-colors"
          >
            911
          </a>{" "}
          immediately.
        </p>
      </section>
    </div>
  );
}
