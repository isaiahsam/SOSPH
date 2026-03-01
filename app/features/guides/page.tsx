"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import guidesData from "@/data/guides.json";

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
  "CAR ACCIDENT",
  "MEDICAL EMERGENCY",
  "FIRE",
  "CRIME",
  "FLOOD",
  "FIRST RESPONSE",
  "CALL FIRST",
  "STAY CALM",
  "STEP BY STEP",
  "EMERGENCY GUIDE",
];

export default function GuidesPage() {
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
              Guides.
            </h1>
          </div>
          <p
            className="reveal text-lg text-white/45 max-w-lg leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            Clear, step-by-step instructions for the most common emergency
            situations. Designed for calm, fast reading under stress.
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

      {/* ── Guide cards ── */}
      <section className="bg-white py-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {guidesData.guides.map((guide, i) => (
            <Link
              key={guide.id}
              href={`/features/guides/${guide.id}`}
              className="reveal-scale flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:-translate-y-2 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <h2 className="font-semibold text-gray-900 text-lg mb-1">
                {guide.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                {guide.summary}
              </p>

              <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="font-medium">{guide.steps.length} steps</span>
                    <span className="text-gray-300">·</span>
                    <span>
                      Call:{" "}
                      <span className="text-red-600 font-semibold">
                        {guide.callFirst[0]}
                      </span>
                    </span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Offline prep */}
        <div className="reveal bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-1 text-sm">
            Offline Preparation
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            You can print any guide page for offline use. Open the guide, then
            use your browser&apos;s print function (Ctrl+P or ⌘+P). Each guide
            is formatted to print cleanly on a single page.
          </p>
        </div>
      </section>
    </div>
  );
}
