"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", exact: true },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About Us" },
  { href: "/mobile", label: "Soon on Mobile", isMobile: true },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-14">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-0 flex-shrink-0"
            aria-label="SOSPH — Home"
          >
            <span className="text-[17px] font-semibold tracking-tight text-gray-900">
              SOS
            </span>
            <span className="text-[17px] font-semibold tracking-tight text-red-600">
              PH
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-4 text-sm transition-colors ${
                  isActive(link.href, link.exact)
                    ? "text-gray-900 font-medium"
                    : link.isMobile
                    ? "text-blue-600 hover:text-blue-700"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {isActive(link.href, link.exact) && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-gray-900 rounded-full"
                    aria-hidden="true"
                  />
                )}
                {link.label}
                {link.isMobile && (
                  <span
                    className="ml-1.5 inline-block w-1.5 h-1.5 bg-blue-500 rounded-full align-middle mb-px"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-6 py-3.5 text-sm border-b border-gray-100 last:border-0 ${
                isActive(link.href, link.exact)
                  ? "text-gray-900 font-medium bg-gray-50"
                  : link.isMobile
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {link.isMobile && (
                <span
                  className="ml-2 inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
