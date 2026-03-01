"use client";

import { useEffect, useRef, useCallback } from "react";
import expresswaysData from "@/data/expressways.json";


const MARQUEE_ITEMS = [
  "NLEX",
  "SLEX",
  "SKYWAY",
  "SCTEX",
  "TPLEX",
  "KM MARKER",
  "PATROL",
  "BREAKDOWN",
  "EXPRESSWAY",
  "EMERGENCY LANE",
  "TOWING",
  "HAZARD LIGHTS",
];

export default function ExpresswaysPage() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
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

    const wordEls = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-word")
    );
    const wordTimer = setTimeout(() => {
      wordEls.forEach((el) => {
        const parent = el.closest<HTMLElement>(".overflow-hidden");
        const rect = (parent ?? el).getBoundingClientRect();
        if (rect.top < window.innerHeight + 80) el.classList.add("visible");
      });
    }, 60);

    const wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const wordEl = (
              e.target as HTMLElement
            ).querySelector<HTMLElement>(".reveal-word");
            if (wordEl) wordEl.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    wordEls.forEach((el) => {
      const parent = el.closest<HTMLElement>(".overflow-hidden");
      if (parent) wordObserver.observe(parent);
    });

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

      const heroH = heroRef.current?.offsetHeight ?? 600;
      if (smoothY < heroH * 1.5) {
        if (gridRef.current)
          gridRef.current.style.transform = `translateY(${smoothY * 0.22}px)`;
        if (glowRef.current)
          glowRef.current.style.transform = `translateY(${smoothY * 0.42}px)`;
      }

      const skew = velocity * -0.055;
      velTextsRef.current.forEach((el) => {
        (el as HTMLElement).style.transform = `skewX(${skew}deg)`;
      });

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
      wordObserver.disconnect();
      clearTimeout(wordTimer);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      {/* ── Hero ── */}
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
              "radial-gradient(ellipse 85% 40% at 15% 60%, rgba(220,38,38,0.13) 0%, transparent 70%)",
          }}
        />
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none"
        />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative">
          <p className="reveal label-caps text-gray-600 mb-3">Features</p>
          <div className="overflow-hidden mb-1">
            <h1 className="vel-text reveal-word text-4xl md:text-6xl font-bold text-white leading-tight">
              Expressway
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1
              className="vel-text reveal-word text-4xl md:text-6xl font-bold text-white leading-tight"
              style={{ transitionDelay: "0.08s" }}
            >
              Emergency Guide.
            </h1>
          </div>
          <p
            className="reveal text-lg text-white/45 max-w-lg leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            Philippine expressways require specific procedures during
            emergencies. Find the right hotline and know exactly what to do.
          </p>
        </div>
      </section>

      {/* ── Marquee ticker ── */}
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

      {/* ── KM Marker tip ── */}
      <section className="bg-white py-10 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="reveal bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm text-amber-800 leading-relaxed">
              <span className="font-semibold">
                Always note your kilometer marker
              </span>{" "}
              before calling for help. Green KM posts are placed every 500
              meters along all expressways. This is the fastest way to
              communicate your exact location.
            </p>
          </div>
        </div>
      </section>

      {/* ── Expressway sections ── */}
      <section className="bg-white pb-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="space-y-8">
          {expresswaysData.expressways.map((expressway, i) => (
            <div
              key={expressway.id}
              id={expressway.id}
              className="reveal-scale bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${Math.min(i * 0.1, 0.4)}s` }}
            >
              <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
                <div>
                  <h2 className="vel-text text-xl font-bold text-gray-900">
                    {expressway.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {expressway.fullName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {expressway.coverage}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {expressway.hotlines.map((h) => (
                    <a
                      key={h.number}
                      href={`tel:${h.number.replace(/[^0-9+]/g, "")}`}
                      className="flex flex-col items-center bg-red-50 border border-red-200 hover:bg-red-100 transition-colors rounded-lg px-4 py-2.5 text-center"
                    >
                      <span className="text-xs text-red-600 font-medium mb-0.5">
                        {h.label}
                      </span>
                      <span className="font-mono font-bold text-red-700 text-sm">
                        {h.number}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                    What to Do
                  </h3>
                  <ol className="space-y-2">
                    {expressway.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed">
                          {instruction}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                      Do Not
                    </h3>
                    <ul className="space-y-2">
                      {expressway.doNot.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-gray-700"
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

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                        Patrol Service
                      </p>
                      <p className="text-xs text-blue-800 leading-relaxed">
                        {expressway.patrolNote}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                        KM Markers
                      </p>
                      <p className="text-xs text-blue-800 leading-relaxed">
                        {expressway.kmMarkerNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Jump links ── */}
      <section className="bg-[#0D1117] py-12 px-6 sm:px-10 lg:px-16 xl:px-24">
        <p className="reveal text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Jump to Expressway
        </p>
        <div className="reveal flex flex-wrap gap-2" style={{ transitionDelay: "0.1s" }}>
          {expresswaysData.expressways.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="text-sm bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 text-gray-400 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              {e.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
