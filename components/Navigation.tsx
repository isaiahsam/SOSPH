"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

type DropdownKey = "home" | "features" | "about";

const dropdowns: Record<
  DropdownKey,
  {
    title: string;
    description: string;
    link: string;
    linkLabel: string;
    cards: { title: string; desc: string; href: string }[];
  }
> = {
  home: {
    title: "SOSPH",
    description:
      "After-emergency response for Filipinos. Hotlines, guides, and your location — instantly available.",
    link: "/",
    linkLabel: "Go to homepage",
    cards: [
      { title: "Emergency Hotlines", desc: "100+ Philippine emergency numbers, organized by category.", href: "/features/hotlines" },
      { title: "Response Guides", desc: "Step-by-step instructions for 5 emergency types.", href: "/features/guides" },
      { title: "Expressway Help", desc: "NLEX, SLEX, Skyway, SCTEX, and TPLEX contacts.", href: "/features/expressways" },
      { title: "Location Helper", desc: "Get and share your GPS coordinates in one tap.", href: "/about" },
    ],
  },
  features: {
    title: "Features",
    description:
      "Four tools built for the worst moments. No login, no loading screens, no barriers.",
    link: "/features",
    linkLabel: "View all features",
    cards: [
      { title: "Hotline Directory", desc: "National, medical, traffic, and expressway numbers.", href: "/features/hotlines" },
      { title: "Step-by-Step Guides", desc: "Clear instructions for accidents, fires, floods, and more.", href: "/features/guides" },
      { title: "Expressway Networks", desc: "Dedicated contacts for each expressway in the Philippines.", href: "/features/expressways" },
      { title: "GPS Location Share", desc: "Copy your exact coordinates for first responders.", href: "/about" },
    ],
  },
  about: {
    title: "About SOSPH",
    description:
      "Built by Looma Labs. Free, open, and always available. No account required to use.",
    link: "/about",
    linkLabel: "Learn about us",
    cards: [
      { title: "Our Mission", desc: "Why SOSPH exists and who it is built for.", href: "/about" },
      { title: "Features Overview", desc: "A complete look at what SOSPH provides.", href: "/features" },
      { title: "Mobile App", desc: "Coming soon — offline access and one-tap calling.", href: "/mobile" },
      { title: "Hotline Directory", desc: "Browse all 100+ emergency numbers.", href: "/features/hotlines" },
    ],
  },
};

function DropdownPanel({ data }: { data: (typeof dropdowns)[DropdownKey] }) {
  return (
    <div
      className="flex rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl"
      style={{ width: "488px" }}
    >
      {/* Left dark panel */}
      <div className="bg-gray-900 p-6 w-44 flex-shrink-0 flex flex-col">
        <p className="text-white text-sm font-semibold mb-2">{data.title}</p>
        <p className="text-gray-400 text-xs leading-relaxed flex-1">{data.description}</p>
        <Link
          href={data.link}
          className="mt-5 inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors duration-150"
        >
          {data.linkLabel}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Right card grid */}
      <div className="flex-1 p-3 grid grid-cols-2 gap-2 content-start">
        {data.cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group/card p-3 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-150"
          >
            <p className="text-xs font-semibold text-gray-800 group-hover/card:text-red-600 mb-1 transition-colors duration-150">
              {card.title}
            </p>
            <p className="text-[11px] text-gray-400 leading-snug">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

type NavItem =
  | { href: string; label: string; exact?: boolean; dropdown: DropdownKey; dropdownAlign: "left" | "right"; isMobile?: never }
  | { href: string; label: string; isMobile: true; dropdown?: never; dropdownAlign?: never; exact?: never };

const navItems: NavItem[] = [
  { href: "/", label: "Home", exact: true, dropdown: "home", dropdownAlign: "left" },
  { href: "/features", label: "Features", dropdown: "features", dropdownAlign: "right" },
  { href: "/about", label: "About Us", dropdown: "about", dropdownAlign: "right" },
  { href: "/mobile", label: "Soon on Mobile", isMobile: true },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-14">

          {/* Wordmark */}
          <Link href="/" className="flex items-center flex-shrink-0 gap-2" aria-label="SOSPH — Home">
            {/* Shield icon */}
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-gray-900">
              SOS<span className="text-red-600">PH</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);

              if (item.isMobile) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-150"
                  >
                    {item.label}
                    <span
                      className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"
                      aria-hidden="true"
                    />
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative h-14 flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.dropdown)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      active
                        ? "text-gray-900 font-medium bg-gray-100"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.dropdown ? "rotate-180 text-gray-700" : "text-gray-400"
                      }`}
                    />
                  </Link>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full z-50 pt-1.5 transition-all duration-150 ${
                      item.dropdownAlign === "left" ? "left-0" : "right-0"
                    } ${
                      activeDropdown === item.dropdown
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <DropdownPanel data={dropdowns[item.dropdown]} />
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 mx-1" aria-hidden="true" />

            {/* Emergency CTA */}
            <Link
              href="/features/hotlines"
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Hotlines
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3.5 text-sm border-b border-gray-100 last:border-0 ${
                isActive(item.href, item.exact)
                  ? "text-gray-900 font-medium bg-gray-50"
                  : item.isMobile
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              {item.isMobile && (
                <span
                  className="ml-2 inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
          <Link
            href="/features/hotlines"
            className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-red-600 border-t border-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Emergency Hotlines
          </Link>
        </div>
      )}
    </nav>
  );
}
