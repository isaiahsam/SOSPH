import type { Metadata } from "next";
import hotlinesData from "@/data/hotlines.json";

export const metadata: Metadata = {
  title: "Emergency Hotlines",
  description:
    "All Philippine emergency hotlines — national, police, fire, medical, expressway, and disaster response numbers.",
};

export default function HotlinesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
          Features
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Emergency Hotlines
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Philippine emergency contacts, organized by category. Tap any number
          to call on mobile.
        </p>
      </div>

      {/* 911 Banner */}
      <div className="bg-red-600 text-white rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-red-200 mb-1">
            National Emergency
          </div>
          <div className="text-4xl font-bold font-mono">911</div>
          <div className="text-sm text-red-100 mt-1">
            Fire · Medical · Police · Any life-threatening emergency
          </div>
        </div>
        <a
          href="tel:911"
          className="inline-flex items-center gap-2 bg-white text-red-600 px-5 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors text-sm whitespace-nowrap"
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

      {/* Hotline Categories */}
      <div className="space-y-10">
        {hotlinesData.categories.map((category) => (
          <section key={category.id}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {category.name}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.hotlines.map((hotline) => (
                <div
                  key={hotline.id}
                  className="bg-white border border-gray-200 rounded-xl p-4"
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
          </section>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-5">
        <p className="text-sm text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">Note: </span>
          Hotline numbers are verified to the best of our ability. Some numbers
          may vary by region. When in doubt, call{" "}
          <a
            href="tel:911"
            className="font-bold text-red-600 hover:text-red-700"
          >
            911
          </a>{" "}
          — operators will direct you to the appropriate service.
        </p>
      </div>
    </div>
  );
}
