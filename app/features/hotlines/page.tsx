"use client";

import { useEffect, useRef, useCallback } from "react";
import hotlinesData from "@/data/hotlines.json";

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
  "911",
  "POLICE",
  "FIRE",
  "RESCUE",
  "MEDICAL",
  "DISASTER",
  "TRAFFIC",
  "AMBULANCE",
  "EMERGENCY",
  "FIRST AID",
  "HOTLINES",
  "ALERT",
];

export default function HotlinesPage() {
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
              Emergency
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1
              className="vel-text reveal-word text-4xl md:text-6xl font-bold text-white leading-tight"
              style={{ transitionDelay: "0.08s" }}
            >
              Hotlines.
            </h1>
          </div>
          <p
            className="reveal text-lg text-white/45 max-w-lg leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            Philippine emergency contacts, organized by category. Tap any
            number to call on mobile.
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

      {/* ── 911 Banner ── */}
      <section className="bg-red-600 py-12 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-200 mb-1">
              National Emergency
            </div>
            <div className="vel-text text-6xl font-bold font-mono text-white">
              911
            </div>
            <div className="text-sm text-red-100 mt-1">
              Fire · Medical · Police · Any life-threatening emergency
            </div>
          </div>
          <a
            href="tel:911"
            className="btn-shimmer inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3.5 rounded-lg font-bold hover:bg-red-50 transition-colors text-sm whitespace-nowrap"
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
            Call 911
          </a>
        </div>
      </section>

      {/* ── Hotline Categories ── */}
      <section className="bg-white py-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="space-y-16">
          {hotlinesData.categories.map((category) => (
            <div key={category.id}>
              <div className="mb-6">
                <h2 className="vel-text text-2xl font-bold text-gray-900">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {category.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.hotlines.map((hotline, hi) => (
                  <div
                    key={hotline.id}
                    className="reveal-scale relative hotline-card-glow bg-white border border-gray-200 rounded-xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    style={{
                      transitionDelay: `${Math.min(hi * 0.06, 0.35)}s`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-500 mb-0.5 truncate">
                          {hotline.agency}
                        </div>
                        <div className="font-semibold text-gray-900 text-sm leading-snug">
                          {hotline.name}
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium whitespace-nowrap flex-shrink-0">
                        {hotline.available}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                      {hotline.description}
                    </p>
                    <div className="space-y-1.5">
                      <a
                        href={`tel:${hotline.number.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center justify-between w-full bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg px-3 py-2.5 transition-colors group"
                      >
                        <span className="font-mono font-bold text-gray-900 group-hover:text-red-700 text-sm">
                          {hotline.number}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500"
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
                      {hotline.altNumbers?.map((alt) => (
                        <a
                          key={alt}
                          href={`tel:${alt.replace(/[^0-9+]/g, "")}`}
                          className="flex items-center justify-between w-full bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg px-3 py-2 transition-colors group"
                        >
                          <span className="font-mono text-gray-600 group-hover:text-red-700 text-sm">
                            {alt}
                          </span>
                          <svg
                            className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="bg-[#0D1117] py-12 px-6 sm:px-10 lg:px-16 xl:px-24">
        <p className="reveal text-sm text-gray-600 leading-relaxed max-w-2xl">
          Hotline numbers are verified to the best of our ability. Some numbers
          may vary by region. When in doubt, call{" "}
          <a
            href="tel:911"
            className="font-bold text-gray-400 hover:text-white transition-colors"
          >
            911
          </a>{" "}
          — operators will direct you to the appropriate service. SOSPH does not
          replace emergency services. Always contact official emergency hotlines
          when possible.
        </p>
      </section>
    </div>
  );
}
