import type { Metadata } from "next";
import Link from "next/link";
import guidesData from "@/data/guides.json";

export const metadata: Metadata = {
  title: "Emergency Guides",
  description:
    "Step-by-step instructions for car accidents, medical emergencies, fire, crime, and flood response in the Philippines.",
};

export default function GuidesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Emergency Guides
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Clear, step-by-step instructions for the most common emergency
          situations. Designed for calm, fast reading under stress.
        </p>
      </div>

      {/* Guide list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {guidesData.guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guides/${guide.id}`}
            className="flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all"
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
                  <span className="font-medium">
                    {guide.steps.length} steps
                  </span>
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

      {/* Print tip */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-1 text-sm">
          Offline Preparation
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          You can print any guide page for offline use. Open the guide, then use
          your browser&apos;s print function (Ctrl+P or ⌘+P). Each guide is
          formatted to print cleanly on a single page.
        </p>
      </div>
    </div>
  );
}
