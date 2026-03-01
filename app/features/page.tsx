"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import hotlinesData from "@/data/hotlines.json";
import guidesData from "@/data/guides.json";
import expresswaysData from "@/data/expressways.json";
import LocationHelper from "@/components/LocationHelper";

function parallaxSection(
  section: HTMLElement | null,
  bgEl: HTMLElement | null,
  speed: number
) {
  if (!section || !bgEl) return;
  const rect = section.getBoundingClientRect();
  const viewMid = window.innerHeight / 2;
  const sectionMid = rect.top + rect.height / 2;
  bgEl.style.transform = `translateY(${(sectionMid - viewMid) * speed}px)`;
}

const MARQUEE_ITEMS = [
  "HOTLINES",
  "GUIDES",
  "EXPRESSWAYS",
  "GPS LOCATION",
  "EMERGENCY RESPONSE",
  "911",
  "CALL FIRST",
  "AFTER THE EMERGENCY",
  "NO ACCOUNT NEEDED",
];

export default function FeaturesPage() {
  const nationalHotlines = hotlinesData.categories[0].hotlines;
  const guides = guidesData.guides;
  const expressways = expresswaysData.expressways;

  /* ── Refs ── */
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const guidesSectionRef = useRef<HTMLElement>(null);
  const guidesGridRef = useRef<HTMLDivElement>(null);
  const guidesGlowRef = useRef<HTMLDivElement>(null);

  const disclaimerSectionRef = useRef<HTMLElement>(null);
  const disclaimerGridRef = useRef<HTMLDivElement>(null);

  const velTextsRef = useRef<Element[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!spotlightRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlightRef.current.style.background = `radial-gradient(ellipse 50% 50% at ${x}% ${y}%, rgba(220,38,38,0.07) 0%, transparent 65%)`;
    },
    []
  );

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => revealObserver.observe(el));

    velTextsRef.current = Array.from(document.querySelectorAll(".vel-text"));

    let rafId: number;
    let smoothY = window.scrollY;
    let rawY = window.scrollY;
    let prevRawY = window.scrollY;
    let velocity = 0;

    const onScroll = () => {
      rawY = window.scrollY;
    };

    const frame = () => {
      smoothY += (rawY - smoothY) * 0.09;
      const rawVel = rawY - prevRawY;
      velocity += (rawVel - velocity) * 0.25;
      prevRawY = rawY;

      if (progressRef.current) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.width =
          max > 0 ? `${(smoothY / max) * 100}%` : "0%";
      }

      /* Hero parallax */
      const heroH = heroRef.current?.offsetHeight ?? 600;
      if (smoothY < heroH * 1.5) {
        if (gridRef.current)
          gridRef.current.style.transform = `translateY(${smoothY * 0.22}px)`;
        if (glowRef.current)
          glowRef.current.style.transform = `translateY(${smoothY * 0.42}px)`;
      }

      /* Guides section parallax */
      parallaxSection(guidesSectionRef.current, guidesGridRef.current, 0.14);
      parallaxSection(guidesSectionRef.current, guidesGlowRef.current, 0.26);

      /* Disclaimer parallax */
      parallaxSection(
        disclaimerSectionRef.current,
        disclaimerGridRef.current,
        0.12
      );

      /* Velocity text skew */
      const skew = velocity * -0.055;
      velTextsRef.current.forEach((el) => {
        (el as HTMLElement).style.transform = `skewX(${skew}deg)`;
      });

      /* Marquee speed */
      const absVel = Math.abs(velocity);
      const dur = Math.max(10, 26 - absVel * 0.6);
      if (marqueeRef.current)
        marqueeRef.current.style.animationDuration = `${dur}s`;

      rafId = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(frame);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      {/* ── Header ── */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
      >
        <div
          ref={gridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 15% 60%, rgba(220,38,38,0.13) 0%, transparent 70%)",
          }}
        />
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none"
        />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative">
          <p className="reveal label-caps text-gray-600 mb-3">Platform</p>
          <h1
            className="reveal vel-text text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
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
              className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
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
              href="/features/hotlines"
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
                href="/features/hotlines"
                className="text-blue-500 hover:text-blue-600"
              >
                View all categories →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 Response Guides ── */}
      <section
        ref={guidesSectionRef}
        className="relative bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
      >
        <div
          ref={guidesGridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          ref={guidesGlowRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 85% 40%, rgba(220,38,38,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal font-mono text-xs text-gray-600 mb-4 tracking-widest">
              02
            </p>
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
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
              href="/features/guides"
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
                href={`/features/guides/${guide.id}`}
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

      {/* ── Marquee ticker (between guides and expressways) ── */}
      <div className="relative overflow-hidden py-4 bg-[#0D1117] border-y border-white/5">
        <div
          ref={marqueeRef}
          className="flex gap-10 whitespace-nowrap text-white/15 text-xs font-medium tracking-widest uppercase"
          style={{ animation: "marquee 26s linear infinite" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── 03 Expressway Guidance ── */}
      <section className="bg-gray-50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal font-mono text-xs text-gray-300 mb-4 tracking-widest">
              03
            </p>
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
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
              href="/features/expressways"
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
              className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
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
      <section
        ref={disclaimerSectionRef}
        className="relative bg-[#0D1117] py-12 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
      >
        <div
          ref={disclaimerGridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <p className="relative text-sm text-gray-600 leading-relaxed max-w-2xl">
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
