"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

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

const plannedFeatures = [
  {
    num: "01",
    title: "Offline Access",
    description:
      "All guides and hotlines available without internet. Critical when signal is weak or data is unavailable.",
  },
  {
    num: "02",
    title: "One-Tap Calling",
    description:
      "Call the right hotline for your emergency type in a single tap — no searching, no scrolling.",
  },
  {
    num: "03",
    title: "GPS Location Sharing",
    description:
      "Share your precise location via SMS, Messenger, or Viber in one tap. Sends coordinates and a map link.",
  },
  {
    num: "04",
    title: "Expressway Detection",
    description:
      "Automatically detects if you are on a Philippine expressway and surfaces the relevant patrol number.",
  },
  {
    num: "05",
    title: "Emergency Contacts",
    description:
      "Store personal emergency contacts. Notify them with your location in one step during an emergency.",
  },
  {
    num: "06",
    title: "Local Barangay Info",
    description:
      "Access your local barangay hotline, nearest hospital, and police precinct based on your location.",
  },
];

export default function MobilePage() {
  /* ── Refs ── */
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const featuresSectionRef = useRef<HTMLElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);

  const velTextsRef = useRef<Element[]>([]);

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!spotlightRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlightRef.current.style.background = `radial-gradient(ellipse 50% 50% at ${x}% ${y}%, rgba(37,99,235,0.07) 0%, transparent 65%)`;
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

      /* Planned features section parallax */
      parallaxSection(
        featuresSectionRef.current,
        featuresGridRef.current,
        0.14
      );

      /* Velocity text skew */
      const skew = velocity * -0.055;
      velTextsRef.current.forEach((el) => {
        (el as HTMLElement).style.transform = `skewX(${skew}deg)`;
      });

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
        className="relative min-h-[70vh] bg-[#0D1117] flex items-center py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
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
              "radial-gradient(ellipse 60% 50% at 85% 50%, rgba(37,99,235,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none"
        />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-blue-500 via-blue-700/60 to-transparent" />

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-16 items-center w-full">
          <div>
            <div className="reveal inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full mb-10">
              <span
                className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                aria-hidden="true"
              />
              Soon on Mobile
            </div>

            <h1
              className="reveal vel-text text-[clamp(2.75rem,6vw,5.5rem)] font-bold text-white leading-[0.92] tracking-tight mb-8"
              style={{ transitionDelay: "0.1s" }}
            >
              SOSPH is primarily
              <br />a mobile platform.
            </h1>

            <p
              className="reveal text-lg text-white/45 max-w-lg leading-relaxed mb-10"
              style={{ transitionDelay: "0.2s" }}
            >
              The web version is available and functional today. The mobile app
              will be the version you open in the moment of an emergency —
              built to work without internet, with one-tap access to everything.
            </p>

            <div
              className="reveal flex flex-wrap gap-3"
              style={{ transitionDelay: "0.3s" }}
            >
              <Link
                href="/features"
                className="group inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Use web version
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

          {/* Phone silhouette with float + scanline */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            <div className="relative w-[180px] h-[320px] border-2 border-white/10 rounded-[2.5rem] bg-white/[0.02] flex flex-col items-center justify-center gap-3 p-6 overflow-hidden">
              {/* Scanline */}
              <div
                className="absolute left-0 right-0 h-[2px] bg-white/10 pointer-events-none"
                style={{ animation: "scanline 3s ease-in-out infinite" }}
                aria-hidden="true"
              />
              {/* Top notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/10 rounded-full" />
              {/* Screen content */}
              <div className="w-full space-y-2">
                <div className="h-2 bg-white/10 rounded w-3/4" />
                <div className="h-8 bg-red-600/20 border border-red-600/30 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] font-mono text-red-400">911</span>
                </div>
                <div className="h-2 bg-white/10 rounded w-full" />
                <div className="h-2 bg-white/10 rounded w-2/3" />
                <div className="h-px bg-white/5 my-1" />
                <div className="h-2 bg-white/10 rounded w-full" />
                <div className="h-2 bg-white/10 rounded w-5/6" />
                <div className="h-2 bg-white/10 rounded w-3/4" />
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Mobile ── */}
      <section className="bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          <div>
            <p className="reveal label-caps text-gray-400 mb-4">
              Why mobile matters
            </p>
            <h2
              className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Emergencies don&apos;t
              <br />
              happen at a desk.
            </h2>
          </div>

          <div
            className="reveal space-y-4 text-base text-gray-500 leading-relaxed"
            style={{ transitionDelay: "0.2s" }}
          >
            <p>
              You are in a vehicle, on a highway, at a mall, or at home — and
              your phone is the tool you reach for first. A mobile app can work
              offline, detect your location automatically, and let you call or
              share information in seconds.
            </p>
            <p>Without typing. Without searching. Without navigating three pages.</p>
            <p>
              The web version of SOSPH is useful for preparation, reference,
              and browsing from home. The mobile app is designed for the moment
              itself.
            </p>
          </div>
        </div>
      </section>

      {/* ── Planned Features ── */}
      <section
        ref={featuresSectionRef}
        className="relative bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
      >
        <div
          ref={featuresGridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-blue-500 via-blue-700/60 to-transparent" />

        <div className="relative mb-14">
          <p className="reveal label-caps text-gray-600 mb-3">
            What&apos;s coming
          </p>
          <h2
            className="reveal vel-text text-3xl md:text-4xl font-bold text-white leading-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            Planned features.
          </h2>
          <p
            className="reveal text-base text-white/35 mt-3 max-w-lg"
            style={{ transitionDelay: "0.2s" }}
          >
            No release date is set. These are the capabilities being designed
            for the mobile app.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plannedFeatures.map((feature, i) => (
            <div
              key={feature.num}
              className="reveal group flex flex-col p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className="font-mono text-xs text-gray-600 mb-5 group-hover:text-blue-500 transition-colors duration-300">
                {feature.num}
              </span>
              <h3 className="text-base font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Available Now ── */}
      <section className="bg-gray-50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-14">
          <p className="reveal label-caps text-gray-400 mb-3">
            While you wait
          </p>
          <h2
            className="reveal vel-text text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            Available on web now.
          </h2>
          <p
            className="reveal text-base text-gray-500 mt-3 max-w-lg"
            style={{ transitionDelay: "0.2s" }}
          >
            While the mobile app is in development, the web platform has
            everything you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              href: "/features/hotlines",
              title: "Emergency Hotlines",
              desc: "All Philippine emergency numbers",
              num: "100+",
            },
            {
              href: "/features/guides",
              title: "Response Guides",
              desc: "Step-by-step instructions",
              num: "5",
            },
            {
              href: "/features/expressways",
              title: "Expressway Guide",
              desc: "NLEX, SLEX, Skyway, and more",
              num: "5",
            },
          ].map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className="reveal group flex flex-col p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="text-3xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors mb-4">
                {card.num}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-gray-500 flex-1">{card.desc}</p>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-gray-300 group-hover:text-gray-700 transition-colors duration-300">
                <span>Open</span>
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

      {/* ── Disclaimer strip ── */}
      <section className="bg-[#0D1117] py-10 px-6 sm:px-10 lg:px-16 xl:px-24">
        <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
          No release date is set. SOSPH does not accept app store signups or
          pre-registration at this time. The mobile app is being built by{" "}
          <span className="text-gray-500 font-medium">Looma Labs</span>.
        </p>
      </section>
    </div>
  );
}
