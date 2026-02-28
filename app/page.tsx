"use client";

import Link from "next/link";
import { useEffect } from "react";
import hotlinesData from "@/data/hotlines.json";
import guidesData from "@/data/guides.json";

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
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
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
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
);

export default function HomePage() {
  const nationalHotlines = hotlinesData.categories[0].hotlines;
  const guides = guidesData.guides;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-[#0D1117] flex items-center overflow-hidden">
        {/* Grid pattern */}
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
        {/* Red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 15% 60%, rgba(220,38,38,0.13) 0%, transparent 70%)",
          }}
        />
        {/* Left accent bar */}
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-32 md:py-40">
          <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-center">
            {/* Text */}
            <div>
              <div className="reveal inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full mb-10">
                <span
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                  aria-hidden="true"
                />
                Mobile app coming soon · Web available now
              </div>

              <h1
                className="reveal text-[clamp(2.75rem,7vw,6.5rem)] font-bold text-white leading-[0.92] tracking-tight mb-8"
                style={{ transitionDelay: "0.1s" }}
              >
                After-Emergency
                <br />
                Response for
                <br />
                <span className="text-red-500">Filipinos.</span>
              </h1>

              <p
                className="reveal text-lg text-white/45 max-w-lg mb-12 leading-relaxed"
                style={{ transitionDelay: "0.2s" }}
              >
                The right hotlines. Step-by-step guides. Your exact location —
                ready to share. Open and use, no login required.
              </p>

              <div
                className="reveal flex flex-wrap gap-4"
                style={{ transitionDelay: "0.3s" }}
              >
                <Link
                  href="/hotlines"
                  className="group inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Emergency Hotlines
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Floating number cards */}
            <div className="hidden lg:flex flex-col gap-4">
              {[
                { number: "911", label: "Emergency Hotline", offset: "0px" },
                {
                  number: "143",
                  label: "Philippine Red Cross",
                  offset: "32px",
                },
                { number: "117", label: "PNP / Police", offset: "12px" },
              ].map((card, i) => (
                <div
                  key={card.number}
                  className="reveal bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-5 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
                  style={{
                    marginLeft: card.offset,
                    transitionDelay: `${0.4 + i * 0.1}s`,
                  }}
                >
                  <div className="font-mono font-bold text-2xl text-white mb-0.5">
                    {card.number}
                  </div>
                  <div className="text-xs text-gray-500">{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-red-600 py-8">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-red-500">
            {[
              { value: "100+", label: "Emergency hotlines" },
              { value: "5", label: "Response guides" },
              { value: "5", label: "Expressway networks" },
              { value: "0s", label: "Wait time to use" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="reveal text-center md:px-8"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="text-3xl xl:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-red-200 mt-1 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-16">
          <p className="reveal label-caps text-gray-400 mb-3">
            What SOSPH gives you
          </p>
          <h2
            className="reveal text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: "01",
              title: "Emergency Hotlines",
              desc: "National, medical, traffic, expressway, and disaster response numbers — organized and click-to-call.",
              detail: "Never search for a number in a crisis again.",
              href: "/hotlines",
            },
            {
              num: "02",
              title: "Response Guides",
              desc: "Numbered steps for car accidents, medical emergencies, fire, crime, and flood aftermath.",
              detail: "What to do, in the exact order to do it.",
              href: "/guides",
            },
            {
              num: "03",
              title: "Expressway Guidance",
              desc: "Procedures and direct hotlines for NLEX, SLEX, Skyway, SCTEX, and TPLEX.",
              detail: "Expressway-specific numbers when you need them most.",
              href: "/expressways",
            },
            {
              num: "04",
              title: "Location Helper",
              desc: "Get your GPS coordinates in one tap. Copy and share via SMS or messaging apps.",
              detail: "Tell responders exactly where you are.",
              href: "/about",
            },
          ].map((feature, i) => (
            <Link
              key={feature.num}
              href={feature.href}
              className="reveal group flex flex-col p-7 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="font-mono text-xs text-gray-300 mb-8 group-hover:text-red-500 transition-colors duration-300">
                {feature.num}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
              {/* Hover reveal detail */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-300 mt-0 group-hover:mt-4">
                <p className="text-xs text-red-600 font-medium">
                  {feature.detail}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-gray-300 group-hover:text-gray-900 transition-colors duration-300">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOTLINES ── */}
      <section className="bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="reveal label-caps text-gray-600 mb-3">
              Critical numbers
            </p>
            <h2
              className="reveal text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Key emergency hotlines.
            </h2>
          </div>
          <Link
            href="/hotlines"
            className="reveal group self-start sm:self-end flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2.5 rounded-lg transition-all duration-200"
          >
            All hotlines
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {nationalHotlines.map((hotline, i) => (
            <a
              key={hotline.id}
              href={`tel:${hotline.number.replace(/[^0-9+]/g, "")}`}
              className="reveal group relative flex flex-col p-5 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.08] hover:border-red-500/40 transition-all duration-300 overflow-hidden"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="font-mono font-bold text-xl text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                {hotline.number}
              </div>
              <div className="text-xs text-gray-500 leading-snug group-hover:text-gray-400 transition-colors duration-300">
                {hotline.name}
              </div>
              {/* Hover reveal call prompt */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <PhoneIcon className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs text-red-500 font-medium">
                  Tap to call
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section className="bg-gray-50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="reveal label-caps text-gray-400 mb-3">
              Step-by-step
            </p>
            <h2
              className="reveal text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Response guides.
            </h2>
          </div>
          <Link
            href="/guides"
            className="reveal group self-start sm:self-end flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-lg transition-all duration-200"
          >
            All guides
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((guide, i) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="reveal group flex flex-col p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs text-gray-300 group-hover:text-gray-400 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-gray-300 group-hover:text-gray-400 transition-colors">
                  {guide.steps.length} steps
                </span>
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {guide.title}
              </h3>
              <p className="text-xs text-gray-400">
                Call{" "}
                <span className="text-red-600 font-semibold">
                  {guide.callFirst[0]}
                </span>{" "}
                first
              </p>

              {/* Hover reveal: first step */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-300">
                <div className="mt-4 border-l-2 border-red-200 pl-3">
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    Step 1: {guide.steps[0]?.instruction}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-5 flex items-center gap-1.5 text-xs font-semibold text-gray-300 group-hover:text-gray-700 transition-colors duration-300">
                <span>Read guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY SOSPH ── */}
      <section className="bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div>
            <p className="reveal label-caps text-gray-400 mb-4">
              Why this exists
            </p>
            <h2
              className="reveal text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6"
              style={{ transitionDelay: "0.1s" }}
            >
              Google shows
              <br />
              too much.
              <br />
              <span className="text-gray-300">
                911 lines are
                <br />
                for dispatching.
              </span>
            </h2>
            <p
              className="reveal text-base text-gray-500 leading-relaxed max-w-md"
              style={{ transitionDelay: "0.2s" }}
            >
              SOSPH fills the gap — verified Philippine hotlines, clear
              step-by-step instructions, and local context — for the minutes
              after an emergency has happened and before help arrives.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                badge: "PH",
                title: "Philippines-specific",
                desc: "Hotlines, expressway numbers, and guidance built for the Philippine context. Not generic.",
              },
              {
                badge: "0s",
                title: "No login. No barriers.",
                desc: "Open the site. Use it. No account, no setup, no wasted time in a crisis.",
              },
              {
                badge: "A+",
                title: "Calm by design.",
                desc: "Clear hierarchy, readable type, no visual noise. Built for high-stress moments.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal group flex gap-5 p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 group-hover:bg-red-600 rounded-xl transition-colors duration-300">
                  <span className="text-xs font-bold text-white font-mono">
                    {item.badge}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOBILE CTA ── */}
      <section className="relative bg-[#0D1117] py-28 sm:py-36 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl">
          <div className="reveal inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span
              className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
              aria-hidden="true"
            />
            Coming soon on Mobile
          </div>

          <h2
            className="reveal text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
            style={{ transitionDelay: "0.1s" }}
          >
            Built for mobile.
            <br />
            <span className="text-gray-600">Available on web now.</span>
          </h2>

          <p
            className="reveal text-base text-gray-400 max-w-lg mb-10 leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            The mobile app adds offline access, one-tap calling, and automatic
            GPS sharing — designed for the moment of an emergency.
          </p>

          <Link
            href="/mobile"
            className="reveal group inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
            style={{ transitionDelay: "0.3s" }}
          >
            Learn about the app
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
}
