import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-10 pb-8">
        {/* Disclaimer */}
        <div className="border border-gray-800 rounded-xl p-4 mb-10">
          <p className="text-sm text-gray-500 leading-relaxed">
            <span className="font-medium text-gray-400">Disclaimer — </span>
            SOSPH does not replace emergency services. Always contact official
            emergency hotlines when possible. In any life-threatening situation,
            call{" "}
            <a
              href="tel:911"
              className="font-semibold text-white hover:text-gray-200"
            >
              911
            </a>{" "}
            immediately.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <span className="text-base font-semibold text-white">SOS</span>
              <span className="text-base font-semibold text-red-500">PH</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              After-emergency response for Filipinos.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-widest mb-3">
              Navigate
            </p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/features", label: "Features" },
                { href: "/about", label: "About Us" },
                { href: "/mobile", label: "Soon on Mobile" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-widest mb-3">
              Tools
            </p>
            <ul className="space-y-2">
              {[
                { href: "/hotlines", label: "Emergency Hotlines" },
                { href: "/guides", label: "Response Guides" },
                { href: "/expressways", label: "Expressway Guide" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key numbers */}
          <div>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-widest mb-3">
              Key Numbers
            </p>
            <ul className="space-y-2">
              {[
                { label: "National Emergency", num: "911" },
                { label: "Police (PNP)", num: "117" },
                { label: "Fire (BFP)", num: "160" },
                { label: "Red Cross", num: "143" },
                { label: "MMDA", num: "136" },
              ].map((h) => (
                <li key={h.num}>
                  <a
                    href={`tel:${h.num}`}
                    className="flex items-baseline gap-2 group"
                  >
                    <span className="font-mono text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">
                      {h.num}
                    </span>
                    <span className="text-xs text-gray-700 group-hover:text-gray-400 transition-colors">
                      {h.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © 2026 SOSPH. All rights reserved by{" "}
            <span className="text-gray-500 font-medium">Looma Labs</span>.
          </p>
          <p className="text-xs text-gray-700">
            Not affiliated with any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
