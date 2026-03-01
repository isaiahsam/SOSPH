"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import hotlinesData from "@/data/hotlines.json";
import guidesData from "@/data/guides.json";

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const STATS = [
  { target: 100, suffix: "+", label: "Emergency hotlines" },
  { target: 5,   suffix: "",  label: "Response guides" },
  { target: 5,   suffix: "",  label: "Expressway networks" },
  { target: 0,   suffix: "s", label: "Wait time to use" },
];

/* ── Helper: apply viewport-relative parallax to a background layer ──
   section:  the section element (not transformed — provides stable rect)
   bgEl:     the background layer inside the section (gets the transform)
   speed:    fraction — 0.1 = subtle, 0.3 = dramatic
   offset:   horizontal translate offset (px) for variety
*/
function parallaxSection(
  section: HTMLElement | null,
  bgEl: HTMLElement | null,
  speed: number,
  offsetX = 0
) {
  if (!section || !bgEl) return;
  const rect = section.getBoundingClientRect();
  const viewMid = window.innerHeight / 2;
  const sectionMid = rect.top + rect.height / 2;
  const shift = (sectionMid - viewMid) * speed;
  bgEl.style.transform = `translate(${offsetX}px, ${shift}px)`;
}

export default function HomePage() {
  const nationalHotlines = hotlinesData.categories[0].hotlines;
  const guides = guidesData.guides;

  /* ── Refs ── */
  // Hero
  const heroRef          = useRef<HTMLElement>(null);
  const gridRef          = useRef<HTMLDivElement>(null);
  const glowRef          = useRef<HTMLDivElement>(null);
  const spotlightRef     = useRef<HTMLDivElement>(null);
  const progressRef      = useRef<HTMLDivElement>(null);
  const phone1Ref        = useRef<HTMLDivElement>(null);
  const phone2Ref        = useRef<HTMLDivElement>(null);

  // Stats
  const statsRef         = useRef<HTMLElement>(null);

  // Features section
  const featuresSectionRef  = useRef<HTMLElement>(null);
  const featuresGridRef     = useRef<HTMLDivElement>(null);
  const featuresAccentRef   = useRef<HTMLDivElement>(null);

  // Hotlines section
  const hotlinesSectionRef  = useRef<HTMLElement>(null);
  const hotlinesGridRef     = useRef<HTMLDivElement>(null);
  const hotlinesGlowRef     = useRef<HTMLDivElement>(null);

  // Guides section
  const guidesSectionRef    = useRef<HTMLElement>(null);
  const guidesAccentRef     = useRef<HTMLDivElement>(null);

  // Why SOSPH section
  const whySectionRef       = useRef<HTMLElement>(null);
  const whyAccentRef        = useRef<HTMLDivElement>(null);

  // Mobile CTA section
  const ctaSectionRef       = useRef<HTMLElement>(null);
  const ctaGridRef          = useRef<HTMLDivElement>(null);
  const ctaGlowRef          = useRef<HTMLDivElement>(null);

  // Velocity text — all major headings queried once
  const velTextsRef         = useRef<Element[]>([]);

  // Marquee rows — animation-duration updated by scroll velocity
  const marquee1Ref         = useRef<HTMLDivElement>(null);
  const marquee2Ref         = useRef<HTMLDivElement>(null);

  /* ── Animated counters ── */
  const [counters, setCounters] = useState(STATS.map(() => 0));

  useEffect(() => {
    /* ── Scroll reveal observer ── */
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

    /* ── Word reveal — can't use IntersectionObserver because overflow-hidden
       clips the translateY'd child to 0px, so isIntersecting never fires.
       Instead: trigger any element already in the viewport after first paint,
       and observe the stable parent container for below-fold uses.           ── */
    const wordEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal-word"));
    const wordTimer = setTimeout(() => {
      wordEls.forEach((el) => {
        const parent = el.closest<HTMLElement>(".overflow-hidden");
        const rect   = (parent ?? el).getBoundingClientRect();
        if (rect.top < window.innerHeight + 80) {
          el.classList.add("visible");
        }
      });
    }, 60);

    /* For word reveals that are below the fold, observe their visible parent */
    const wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const wordEl = (e.target as HTMLElement).querySelector<HTMLElement>(".reveal-word");
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

    /* Cache all vel-text elements once */
    velTextsRef.current = Array.from(document.querySelectorAll(".vel-text"));

    /* ── Stats counter ── */
    let statsTriggered = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsTriggered) {
          statsTriggered = true;
          const duration = 1500;
          const start = performance.now();
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
          const tick = () => {
            const p = Math.min((performance.now() - start) / duration, 1);
            setCounters(STATS.map((s) => Math.round(s.target * easeOut(p))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    /* ── Parallax + progress bar ──
       smoothY (lerped) drives hero parallax — creates inertia / velocity feel.
       Viewport-relative parallax runs every frame for all other sections.
    */
    let rafId: number;
    let smoothY   = window.scrollY;
    let rawY      = window.scrollY;
    let prevRawY  = window.scrollY;
    let velocity  = 0; // px/frame — used for text skew + marquee speed

    const onScroll = () => { rawY = window.scrollY; };

    const frame = () => {
      smoothY += (rawY - smoothY) * 0.09;

      /* ── Velocity ── lerp toward instantaneous delta for smooth skew ── */
      const rawVel = rawY - prevRawY;
      velocity    += (rawVel - velocity) * 0.25;
      prevRawY     = rawY;

      /* ── Scroll progress bar ── */
      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.width = max > 0 ? `${(smoothY / max) * 100}%` : "0%";
      }

      /* ── Hero: lerp-based absolute parallax (most dramatic effect) ── */
      const heroH = heroRef.current?.offsetHeight ?? 900;
      if (smoothY < heroH * 1.5) {
        if (gridRef.current)
          gridRef.current.style.transform  = `translateY(${smoothY * 0.22}px)`;
        if (glowRef.current)
          glowRef.current.style.transform  = `translateY(${smoothY * 0.42}px)`;
        if (phone1Ref.current)
          phone1Ref.current.style.transform = `translateY(${-smoothY * 0.07}px)`;
        if (phone2Ref.current)
          phone2Ref.current.style.transform = `translateY(${-smoothY * 0.13}px)`;
      }

      /* ── Features: subtle grid drifts down as section enters ── */
      parallaxSection(featuresSectionRef.current, featuresGridRef.current,  0.12);
      parallaxSection(featuresSectionRef.current, featuresAccentRef.current, 0.22, 0);

      /* ── Hotlines: grid + glow parallax on dark section ── */
      parallaxSection(hotlinesSectionRef.current, hotlinesGridRef.current, 0.15);
      parallaxSection(hotlinesSectionRef.current, hotlinesGlowRef.current, 0.28);

      /* ── Guides: decorative accent drifts ── */
      parallaxSection(guidesSectionRef.current, guidesAccentRef.current, 0.2);

      /* ── Why SOSPH: large watermark drifts up ── */
      parallaxSection(whySectionRef.current, whyAccentRef.current, 0.18);

      /* ── Mobile CTA: grid + glow ── */
      parallaxSection(ctaSectionRef.current, ctaGridRef.current,  0.14);
      parallaxSection(ctaSectionRef.current, ctaGlowRef.current,  0.3);

      /* ── Velocity text skew — headings lean while scrolling ── */
      const skew = velocity * -0.055; // negative = leans forward when scrolling down
      velTextsRef.current.forEach((el) => {
        (el as HTMLElement).style.transform = `skewX(${skew}deg)`;
      });

      /* ── Marquee speed — accelerates with scroll velocity ── */
      const absVel   = Math.abs(velocity);
      const duration1 = Math.max(10, 26 - absVel * 0.6);
      const duration2 = Math.max(12, 32 - absVel * 0.5);
      if (marquee1Ref.current)
        marquee1Ref.current.style.animationDuration = `${duration1}s`;
      if (marquee2Ref.current)
        marquee2Ref.current.style.animationDuration = `${duration2}s`;

      rafId = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(frame);

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
      wordObserver.disconnect();
      clearTimeout(wordTimer);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Mouse spotlight in hero ── */
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

  return (
    <div className="overflow-x-hidden">
      {/* Scroll progress bar */}
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen bg-[#0D1117] flex items-center overflow-hidden"
      >
        {/* Grid pattern — parallax bg layer */}
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
        {/* Red glow — parallax mid-layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 15% 60%, rgba(220,38,38,0.13) 0%, transparent 70%)",
          }}
        />
        {/* Mouse spotlight */}
        <div ref={spotlightRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
        {/* Left accent bar */}
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600 via-red-700/60 to-transparent" />

        <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-32 md:py-40">
          <div className="grid lg:grid-cols-[1fr_560px] gap-8 xl:gap-12 items-center">
            {/* Text column */}
            <div>
              <div className="reveal inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full mb-10">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" aria-hidden="true" />
                Mobile app coming soon · Web available now
              </div>
              {/* h1 — word reveal (each line clips upward) + velocity skew */}
              <h1 className="vel-text text-[clamp(2.75rem,7vw,6.5rem)] font-bold text-white leading-[0.92] tracking-tight mb-8">
                <span className="block overflow-hidden">
                  <span className="reveal-word" style={{ transitionDelay: "0.05s" }}>
                    After-Emergency
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="reveal-word" style={{ transitionDelay: "0.15s" }}>
                    Response for
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="reveal-word text-red-500" style={{ transitionDelay: "0.25s" }}>
                    Filipinos.
                  </span>
                </span>
              </h1>
              <p
                className="reveal text-lg text-white/45 max-w-lg mb-12 leading-relaxed"
                style={{ transitionDelay: "0.2s" }}
              >
                The right hotlines. Step-by-step guides. Your exact location —
                ready to share. Open and use, no login required.
              </p>
              <div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "0.3s" }}>
                <Link
                  href="/features/hotlines"
                  className="btn-shimmer group inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 hover:scale-[1.03] transition-all duration-200"
                >
                  Emergency Hotlines
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:scale-[1.03] text-sm font-semibold px-6 py-3.5 rounded-lg transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Phone mockups */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <div className="relative" style={{ width: "540px", height: "620px" }}>

                {/* Screen 1: Splash — parallax wrapper */}
                <div ref={phone1Ref} className="absolute inset-0 will-change-transform" style={{ zIndex: 1 }}>
                  <div className="reveal h-full flex items-center justify-center" style={{ transitionDelay: "0.4s" }}>
                    <div style={{ animation: "float 6s ease-in-out infinite" }}>
                      <div style={{ transform: "rotate(-10deg) translate(-108px, -24px)" }}>
                        <div
                          className="rounded-[30px] overflow-hidden flex flex-col relative"
                          style={{
                            width: "248px", height: "480px",
                            background: "#0D1117",
                            backgroundImage: `
                              radial-gradient(ellipse 90% 70% at 50% 42%, rgba(220,38,38,0.16) 0%, transparent 65%),
                              repeating-radial-gradient(ellipse at 50% 42%, transparent 0%, transparent 12%, rgba(255,255,255,0.03) 12.5%, transparent 13%),
                              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                            `,
                            backgroundSize: "auto, auto, 50px 50px, 50px 50px",
                            boxShadow: "0 40px 80px -12px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
                            <div className="absolute left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)", animation: "scanline 7s linear 1s infinite" }} />
                          </div>
                          <div className="flex flex-col items-center pt-8">
                            <div className="text-[9px] font-bold text-white tracking-[0.22em]">SOSPH</div>
                            <div className="text-[6.5px] text-white/20 tracking-[0.12em] uppercase mt-0.5">Critical Response System</div>
                          </div>
                          <div className="flex-1 flex flex-col items-center justify-center gap-5">
                            <div className="relative flex items-center justify-center">
                              <div className="absolute rounded-full border border-red-600/12" style={{ width: "136px", height: "136px", animation: "glow-ring 3s ease-in-out infinite" }} />
                              <div className="absolute rounded-full border border-red-600/20" style={{ width: "104px", height: "104px", animation: "glow-ring 3s ease-in-out 0.6s infinite" }} />
                              <div className="absolute rounded-full border border-red-600/30" style={{ width: "76px", height: "76px" }} />
                              <div className="relative rounded-full bg-red-600 flex items-center justify-center" style={{ width: "54px", height: "54px", boxShadow: "0 0 32px rgba(220,38,38,0.6), 0 0 64px rgba(220,38,38,0.25)" }}>
                                <span className="text-[11px] font-bold text-white tracking-[0.15em]">SOS</span>
                              </div>
                            </div>
                            <div className="text-center px-6">
                              <div className="text-[15px] font-bold text-white tracking-tight leading-tight">After-Emergency</div>
                              <div className="text-[9px] text-white/30 mt-1">Response for Filipinos</div>
                            </div>
                          </div>
                          <div className="px-6 pb-7 flex flex-col items-center gap-3">
                            <div className="w-full bg-red-600 rounded-2xl py-3 flex items-center justify-center" style={{ boxShadow: "0 4px 16px rgba(220,38,38,0.38)" }}>
                              <span className="text-[11px] font-bold text-white tracking-wide">Get Started</span>
                            </div>
                            <span className="text-[6.5px] text-white/15 tracking-[0.18em] uppercase">by Looma Labs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screen 2: Main app — parallax wrapper */}
                <div ref={phone2Ref} className="absolute inset-0 will-change-transform" style={{ zIndex: 2 }}>
                  <div className="reveal h-full flex items-center justify-center" style={{ transitionDelay: "0.52s" }}>
                    <div style={{ animation: "float-b 5s ease-in-out 1s infinite" }}>
                      <div style={{ transform: "rotate(6deg) translate(96px, 38px)" }}>
                        <div
                          className="rounded-[30px] overflow-hidden flex flex-col relative"
                          style={{ width: "248px", height: "480px", background: "#0A0E1A", boxShadow: "0 40px 80px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.07)" }}
                        >
                          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
                            <div className="absolute left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)", animation: "scanline 9s linear 3s infinite" }} />
                          </div>
                          <div className="relative flex items-center justify-between px-4 pt-3 pb-0 flex-shrink-0">
                            <span className="text-[7.5px] font-medium text-white/35">9:41</span>
                            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 bg-black rounded-full" style={{ width: "62px", height: "17px" }} />
                            <div className="flex items-center gap-1">
                              <div className="flex items-end gap-[1.5px]" style={{ height: "9px" }}>
                                {[3, 5, 7, 9].map((h) => (
                                  <div key={h} className="w-[2px] bg-white/35 rounded-[1px]" style={{ height: `${h}px` }} />
                                ))}
                              </div>
                              <div className="relative ml-1" style={{ width: "13px", height: "7px" }}>
                                <div className="absolute inset-0 border border-white/35 rounded-[2px]" />
                                <div className="absolute top-[1px] left-[1px] bottom-[1px] bg-white/35 rounded-[1px]" style={{ width: "65%" }} />
                                <div className="absolute bg-white/35 rounded-r-[1px]" style={{ right: "-2.5px", top: "2px", width: "2px", height: "3px" }} />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col px-4 pt-3.5 pb-5 gap-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-[6.5px] text-white/20 tracking-[0.1em] uppercase mb-0.5">After-Emergency</div>
                                <div className="text-[14px] font-bold leading-none">
                                  <span className="text-white">SOS</span>
                                  <span className="text-red-500">PH</span>
                                </div>
                              </div>
                              <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center" style={{ width: "26px", height: "26px" }}>
                                <svg className="text-white/25" style={{ width: "12px", height: "12px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                              </div>
                            </div>
                            <div className="bg-blue-950/50 border border-blue-500/20 rounded-2xl p-3">
                              <div className="flex items-center gap-1.5 mb-1">
                                <div className="bg-blue-400 rounded-full animate-pulse flex-shrink-0" style={{ width: "6px", height: "6px" }} aria-hidden="true" />
                                <span className="text-[6.5px] text-blue-400 font-medium tracking-[0.08em] uppercase">Location Detected</span>
                              </div>
                              <div className="text-white/75 text-[9px] font-mono">14.5995° N, 120.9842° E</div>
                              <div className="text-white/20 text-[7px] mt-0.5">Tap to copy and share</div>
                            </div>
                            <div>
                              <div className="text-[6.5px] text-white/20 uppercase tracking-[0.1em] mb-2">Quick Dial</div>
                              {[
                                { num: "911", label: "Emergency Hotline" },
                                { num: "143", label: "Philippine Red Cross" },
                                { num: "117", label: "PNP Police" },
                              ].map(({ num, label }) => (
                                <div key={num} className="flex items-center justify-between bg-white/[0.035] border border-white/[0.07] rounded-xl px-3 py-2 mb-1.5">
                                  <div>
                                    <div className="text-[11px] font-bold font-mono text-white leading-none">{num}</div>
                                    <div className="text-[6.5px] text-white/25 mt-0.5">{label}</div>
                                  </div>
                                  <div className="bg-red-600 rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "21px", height: "21px" }}>
                                    <svg className="text-white" style={{ width: "10px", height: "10px" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex-1 flex items-end justify-center">
                              <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-red-600/20 scale-[1.35] animate-pulse" aria-hidden="true" />
                                <div className="relative bg-red-600 rounded-full flex items-center justify-center" style={{ width: "52px", height: "52px", boxShadow: "0 0 24px rgba(220,38,38,0.5)" }}>
                                  <span className="text-[10px] font-bold text-white tracking-[0.15em]">SOS</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full" style={{ transitionDelay: "0.65s" }}>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" aria-hidden="true" />
                Mobile app — coming soon
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════
          STATS STRIP
      ══════════════════════════════ */}
      <section ref={statsRef} className="bg-red-600 py-8">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-red-500">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="reveal text-center md:px-8" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="text-3xl xl:text-4xl font-bold text-white tabular-nums">
                  {counters[i]}{stat.suffix}
                </div>
                <div className="text-xs text-red-200 mt-1 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURES
      ══════════════════════════════ */}
      <section ref={featuresSectionRef} className="relative bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        {/* Parallax grid — very faint, shifts as section scrolls through viewport */}
        <div
          ref={featuresGridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.018) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.018) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Parallax accent blob — top-right glow */}
        <div
          ref={featuresAccentRef}
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative">
          <div className="mb-16">
            <p className="reveal label-caps text-gray-400 mb-3">What SOSPH gives you</p>
            <h2 className="vel-text reveal text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight" style={{ transitionDelay: "0.1s" }}>
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Emergency Hotlines", desc: "National, medical, traffic, expressway, and disaster response numbers — organized and click-to-call.", detail: "Never search for a number in a crisis again.", href: "/hotlines" },
              { num: "02", title: "Response Guides", desc: "Numbered steps for car accidents, medical emergencies, fire, crime, and flood aftermath.", detail: "What to do, in the exact order to do it.", href: "/guides" },
              { num: "03", title: "Expressway Guidance", desc: "Procedures and direct hotlines for NLEX, SLEX, Skyway, SCTEX, and TPLEX.", detail: "Expressway-specific numbers when you need them most.", href: "/expressways" },
              { num: "04", title: "Location Helper", desc: "Get your GPS coordinates in one tap. Copy and share via SMS or messaging apps.", detail: "Tell responders exactly where you are.", href: "/about" },
            ].map((feature, i) => (
              <div key={feature.num} className="reveal-scale" style={{ transitionDelay: `${i * 0.09}s` }}>
                <Link href={feature.href} className="group flex flex-col h-full p-7 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <span className="font-mono text-xs text-gray-300 mb-8 group-hover:text-red-500 transition-colors duration-300">{feature.num}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-300 mt-0 group-hover:mt-4">
                    <p className="text-xs text-red-600 font-medium">{feature.detail}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-gray-300 group-hover:text-gray-900 transition-colors duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HOTLINES — dark section with full parallax bg
      ══════════════════════════════ */}
      <section ref={hotlinesSectionRef} className="relative bg-[#0D1117] py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        {/* Grid — parallax */}
        <div
          ref={hotlinesGridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Red glow — parallax, positioned opposite to hero */}
        <div
          ref={hotlinesGlowRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            background: "radial-gradient(ellipse 55% 60% at 85% 40%, rgba(220,38,38,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Left accent bar */}
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-600/60 via-red-700/30 to-transparent" />

        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="reveal label-caps text-gray-600 mb-3">Critical numbers</p>
              <h2 className="vel-text reveal text-4xl md:text-5xl font-bold text-white leading-tight" style={{ transitionDelay: "0.1s" }}>
                Key emergency hotlines.
              </h2>
            </div>
            <Link href="/features/hotlines" className="reveal group self-start sm:self-end flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2.5 rounded-lg transition-all duration-200">
              All hotlines
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {nationalHotlines.map((hotline, i) => (
              <div key={hotline.id} className="reveal-scale" style={{ transitionDelay: `${i * 0.07}s` }}>
                <a
                  href={`tel:${hotline.number.replace(/[^0-9+]/g, "")}`}
                  className="hotline-card-glow group relative flex flex-col p-5 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.07] hover:border-red-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                >
                  <div className="font-mono font-bold text-xl text-white mb-2 group-hover:text-red-400 transition-colors duration-300">{hotline.number}</div>
                  <div className="text-xs text-gray-500 leading-snug group-hover:text-gray-400 transition-colors duration-300">{hotline.name}</div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <PhoneIcon className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-red-500 font-medium">Tap to call</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          GUIDES
      ══════════════════════════════ */}
      <section ref={guidesSectionRef} className="relative bg-gray-50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        {/* Parallax accent — large faint circle bottom-left */}
        <div
          ref={guidesAccentRef}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="reveal label-caps text-gray-400 mb-3">Step-by-step</p>
              <h2 className="vel-text reveal text-4xl md:text-5xl font-bold text-gray-900 leading-tight" style={{ transitionDelay: "0.1s" }}>
                Response guides.
              </h2>
            </div>
            <Link href="/features/guides" className="reveal group self-start sm:self-end flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-lg transition-all duration-200">
              All guides
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide, i) => (
              <div key={guide.id} className="reveal-scale" style={{ transitionDelay: `${i * 0.09}s` }}>
                <Link href={`/features/guides/${guide.id}`} className="group flex flex-col h-full p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-mono text-xs text-gray-300 group-hover:text-gray-400 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-xs text-gray-300 group-hover:text-gray-400 transition-colors">{guide.steps.length} steps</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-xs text-gray-400">
                    Call <span className="text-red-600 font-semibold">{guide.callFirst[0]}</span> first
                  </p>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-300">
                    <div className="mt-4 border-l-2 border-red-200 pl-3">
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">Step 1: {guide.steps[0]?.instruction}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-5 flex items-center gap-1.5 text-xs font-semibold text-gray-300 group-hover:text-gray-700 transition-colors duration-300">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          VELOCITY TICKER — separator between Guides and Why SOSPH
      ══════════════════════════════ */}
      <div
        className="bg-[#080C12] border-y border-white/[0.04] py-3.5 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Row 1 — scrolls left */}
        <div
          ref={marquee1Ref}
          className="flex whitespace-nowrap mb-2.5"
          style={{ animation: "marquee 26s linear infinite" }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center flex-shrink-0">
              {[
                "AFTER-EMERGENCY RESPONSE",
                "911",
                "RED CROSS 143",
                "PNP 117",
                "NDRRMC",
                "STEP-BY-STEP GUIDES",
                "EXPRESSWAY HOTLINES",
                "LOCATION HELPER",
                "NO LOGIN REQUIRED",
                "FILIPINOS FIRST",
              ].map((word) => (
                <span key={word} className="inline-flex items-center gap-5 px-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                    {word}
                  </span>
                  <span className="text-red-500 text-xs">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div
          ref={marquee2Ref}
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-reverse 32s linear infinite" }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center flex-shrink-0">
              {[
                "LOOMA LABS",
                "CALM BY DESIGN",
                "VERIFIED HOTLINES",
                "PHILIPPINES",
                "MOBILE COMING SOON",
                "COPY YOUR COORDINATES",
                "CALL FIRST",
                "THEN FOLLOW STEPS",
                "OPEN AND FREE",
              ].map((word) => (
                <span key={word} className="inline-flex items-center gap-5 px-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                    {word}
                  </span>
                  <span className="text-white/30 text-xs">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          WHY SOSPH
      ══════════════════════════════ */}
      <section ref={whySectionRef} className="relative bg-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        {/* Large watermark number — parallaxes upward as you scroll through */}
        <div
          ref={whyAccentRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] font-bold text-gray-900/[0.025] leading-none select-none pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          PH
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div>
            <p className="reveal-left label-caps text-gray-400 mb-4">Why this exists</p>
            <h2 className="vel-text reveal-left text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6" style={{ transitionDelay: "0.1s" }}>
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
            <p className="reveal-left text-base text-gray-500 leading-relaxed max-w-md" style={{ transitionDelay: "0.2s" }}>
              SOSPH fills the gap — verified Philippine hotlines, clear
              step-by-step instructions, and local context — for the minutes
              after an emergency has happened and before help arrives.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { badge: "PH", title: "Philippines-specific", desc: "Hotlines, expressway numbers, and guidance built for the Philippine context. Not generic." },
              { badge: "0s", title: "No login. No barriers.", desc: "Open the site. Use it. No account, no setup, no wasted time in a crisis." },
              { badge: "A+", title: "Calm by design.", desc: "Clear hierarchy, readable type, no visual noise. Built for high-stress moments." },
            ].map((item, i) => (
              <div key={item.title} className="reveal-right group flex gap-5 p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 group-hover:bg-red-600 group-hover:scale-110 rounded-xl transition-all duration-300">
                  <span className="text-xs font-bold text-white font-mono">{item.badge}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          MOBILE CTA — full parallax like hero
      ══════════════════════════════ */}
      <section ref={ctaSectionRef} className="relative bg-[#0D1117] py-28 sm:py-36 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        {/* Grid — parallax */}
        <div
          ref={ctaGridRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Blue glow — parallax */}
        <div
          ref={ctaGlowRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(37,99,235,0.09) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl">
          <div className="reveal inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/50 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" aria-hidden="true" />
            Coming soon on Mobile
          </div>

          <h2 className="vel-text reveal text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6" style={{ transitionDelay: "0.1s" }}>
            Built for mobile.
            <br />
            <span className="text-gray-600">Available on web now.</span>
          </h2>

          <p className="reveal text-base text-gray-400 max-w-lg mb-10 leading-relaxed" style={{ transitionDelay: "0.2s" }}>
            The mobile app adds offline access, one-tap calling, and automatic
            GPS sharing — designed for the moment of an emergency.
          </p>

          <div className="reveal" style={{ transitionDelay: "0.3s" }}>
            <Link href="/mobile" className="btn-shimmer group inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 hover:scale-[1.03] transition-all duration-200">
              Learn about the app
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
