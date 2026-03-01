"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
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
  "BUILT FOR FILIPINOS",
  "AFTER THE EMERGENCY",
  "LOOMA LABS",
  "CALM",
  "DIRECT",
  "NO ACCOUNT NEEDED",
  "CALL 911",
  "RESPONSE GUIDE",
  "FOUR TOOLS",
];

export default function AboutPage() {
  /* ── Refs ── */
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const notSectionRef = useRef<HTMLElement>(null);
  const notGridRef = useRef<HTMLDivElement>(null);

  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaGlowRef = useRef<HTMLDivElement>(null);

  const velTextsRef = useRef<Element[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!spotlightRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlightRef.current.style.background = `radial-gradient(ellipse 50% 50% at ${x}% ${y}%, rgba(37,99,235,0.06) 0%, transparent 65%)`;
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

      /* What SOSPH is NOT section */
      parallaxSection(notSectionRef.current, notGridRef.current, 0.14);

      /* Mobile CTA */
      parallaxSection(ctaSectionRef.current, ctaGlowRef.current, 0.24);

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
              "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(37,99,235,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none"
        />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="reveal label-caps text-gray-600 mb-3">About Us</p>
            <h1
              className="reveal vel-text text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
              style={{ transitionDelay: "0.1s" }}
            >
              Built for Filipinos.
              <br />
              <span className="text-white/40">For after the emergency.</span>
            </h1>
            <p
              className="reveal text-lg text-white/45 max-w-lg leading-relaxed"
              style={{ transitionDelay: "0.2s" }}
            >
              SOSPH is an after-emergency response platform that helps Filipinos
              call the right hotlines, share their location, and know what to do
              while help is on the way.
            </p>
          </div>

          <div
            className="reveal hidden lg:flex flex-col gap-3 items-end"
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full">
              <span
                className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                aria-hidden="true"
              />
              An initiative by Looma Labs
            </div>
            {[
              { label: "Not affiliated with any government agency" },
              { label: "Not a prevention or alert system" },
              { label: "For use after an emergency has happened" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-xs text-gray-500"
              >
                <svg
                  className="w-3.5 h-3.5 text-gray-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SOSPH Exists ── */}
      <section className="bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal label-caps text-gray-400 mb-4">
              Why it exists
            </p>
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              The first few minutes
              <br />
              are critical.
            </h2>
          </div>

          <div
            className="reveal space-y-4 text-base text-gray-500 leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            <p>
              In an emergency, most people freeze — not because they
              don&apos;t care, but because they don&apos;t know the right
              number to call or the right steps to take.
            </p>
            <p>
              Searching Google while panicked returns too much noise. 911
              operators are for dispatching responders, not guiding bystanders.
              Expressway-specific guidance is almost impossible to find quickly.
            </p>
            <p>
              SOSPH fills that gap. Calm, direct, and built specifically for
              the Philippine context — the right hotlines, the right steps, and
              the right local information for Filipinos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Marquee (between Why it exists and What it provides) ── */}
      <div className="relative overflow-hidden py-4 bg-gray-50 border-y border-gray-100">
        <div
          ref={marqueeRef}
          className="flex gap-10 whitespace-nowrap text-gray-300 text-xs font-medium tracking-widest uppercase"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── What SOSPH Provides ── */}
      <section className="bg-gray-50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-14">
          <p className="reveal label-caps text-gray-400 mb-3">
            What it provides
          </p>
          <div className="flex items-end justify-between gap-4">
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Four tools. All free.
              <br />
              No account needed.
            </h2>
            <Link
              href="/features"
              className="reveal hidden sm:flex group items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-lg transition-all duration-200 flex-shrink-0"
            >
              See all features
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: "01",
              title: "Emergency Hotlines",
              desc: "A complete directory of Philippine emergency numbers — national, medical, traffic, expressway, and disaster response.",
              href: "/features/hotlines",
            },
            {
              num: "02",
              title: "Response Guides",
              desc: "Numbered steps for car accidents, medical emergencies, fire, crime, and flood aftermath.",
              href: "/features/guides",
            },
            {
              num: "03",
              title: "Expressway Guidance",
              desc: "Dedicated procedures and direct hotlines for NLEX, SLEX, Skyway, SCTEX, and TPLEX.",
              href: "/features/expressways",
            },
            {
              num: "04",
              title: "Location Helper",
              desc: "Get your GPS coordinates in one tap. Copy and share instantly with emergency contacts.",
              href: "/features#location",
            },
          ].map((item, i) => (
            <Link
              key={item.num}
              href={item.href}
              className="reveal group flex flex-col p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="font-mono text-xs text-gray-300 mb-6 group-hover:text-red-500 transition-colors duration-300">
                {item.num}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">
                {item.desc}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-gray-300 group-hover:text-gray-700 transition-colors duration-300">
                <span>Explore</span>
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── What SOSPH is NOT ── */}
      <section
        ref={notSectionRef}
        className="relative bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
      >
        <div
          ref={notGridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal label-caps text-gray-600 mb-4">Clarity</p>
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              What SOSPH
              <br />
              is not.
            </h2>
          </div>

          <div className="space-y-3">
            {[
              "SOSPH does not replace 911 or any official emergency service.",
              "SOSPH is not a government platform and is not affiliated with any government agency.",
              "SOSPH does not dispatch emergency responders.",
              "SOSPH is not a prevention or warning system — it is for after an emergency has already happened.",
            ].map((item, i) => (
              <div
                key={i}
                className="reveal flex items-start gap-4 p-5 bg-white/[0.03] border border-white/10 rounded-xl"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <svg
                  className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-gray-400 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location Helper ── */}
      <section className="bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal label-caps text-gray-400 mb-4">Try it now</p>
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4"
              style={{ transitionDelay: "0.1s" }}
            >
              Location Helper
            </h2>
            <p
              className="reveal text-base text-gray-500 leading-relaxed"
              style={{ transitionDelay: "0.2s" }}
            >
              Share your exact GPS coordinates with emergency services or family
              contacts. Your location is never stored — it stays on your device.
            </p>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <LocationHelper />
          </div>
        </div>
      </section>

      {/* ── Mobile CTA ── */}
      <section
        ref={ctaSectionRef}
        className="relative bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
      >
        <div
          ref={ctaGlowRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <div className="reveal inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <span
                className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                aria-hidden="true"
              />
              Coming soon on Mobile
            </div>
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
              style={{ transitionDelay: "0.1s" }}
            >
              SOSPH Mobile App
            </h2>
            <p
              className="reveal text-base text-gray-400 max-w-md leading-relaxed"
              style={{ transitionDelay: "0.2s" }}
            >
              Offline access, one-tap emergency calling, GPS location sharing,
              and local context — designed to work even without a strong
              connection.
            </p>
          </div>
          <Link
            href="/mobile"
            className="reveal group flex-shrink-0 inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
            style={{ transitionDelay: "0.3s" }}
          >
            Learn about the app
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
      </section>
    </div>
  );
}
