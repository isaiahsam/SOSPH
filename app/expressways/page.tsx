import type { Metadata } from "next";
import expresswaysData from "@/data/expressways.json";

export const metadata: Metadata = {
  title: "Expressway Emergency Guide",
  description:
    "Emergency procedures and hotlines for NLEX, SLEX, Skyway, SCTEX, and TPLEX. Know what to do when your vehicle breaks down or an accident happens on a Philippine expressway.",
};

export default function ExpresswaysPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Expressway Emergency Guide
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Philippine expressways require specific procedures during emergencies.
          Find the right hotline and know exactly what to do.
        </p>
      </div>

      {/* Key reminder */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10">
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
            <span className="font-semibold">Always note your kilometer marker</span>{" "}
            before calling for help. Green KM posts are placed every 500 meters
            along all expressways. This is the fastest way to communicate your
            exact location.
          </p>
        </div>
      </div>

      {/* Expressway sections */}
      <div className="space-y-10">
        {expresswaysData.expressways.map((expressway) => (
          <section
            key={expressway.id}
            id={expressway.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
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
              {/* What to do */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  What to Do
                </h3>
                <ol className="space-y-2">
                  {expressway.instructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Do Not + Notes */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                    Do Not
                  </h3>
                  <ul className="space-y-2">
                    {expressway.doNot.map((item, i) => (
                      <li
                        key={i}
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
          </section>
        ))}
      </div>

      {/* Jump links */}
      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Jump to Expressway
        </p>
        <div className="flex flex-wrap gap-2">
          {expresswaysData.expressways.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="text-sm bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              {e.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
