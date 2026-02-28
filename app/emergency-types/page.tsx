import type { Metadata } from "next";
import Link from "next/link";
import guidesData from "@/data/guides.json";

export const metadata: Metadata = {
  title: "Emergency Types",
  description:
    "Know your emergency. Find the right guide for car accidents, medical emergencies, fire, crime, and more.",
};

const emergencyIcons: Record<string, React.ReactNode> = {
  car: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 0M13 16H9m4 0h5l1-5H6l2-5h9l1 5"
      />
    </svg>
  ),
  heart: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  flame: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
      />
    </svg>
  ),
  shield: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  water: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
};

const iconColors: Record<string, string> = {
  car: "bg-orange-50 text-orange-600",
  heart: "bg-red-50 text-red-600",
  flame: "bg-red-50 text-red-700",
  shield: "bg-blue-50 text-blue-600",
  water: "bg-blue-50 text-blue-700",
};

export default function EmergencyTypesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Emergency Types
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Select the type of emergency you are dealing with to get step-by-step
          response guidance.
        </p>
      </div>

      {/* Emergency type grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {guidesData.guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guides/${guide.id}`}
            className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                iconColors[guide.icon] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              {emergencyIcons[guide.icon]}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 mb-1">
                {guide.title}
              </h2>
              <p className="text-sm text-gray-500 leading-snug mb-3">
                {guide.summary}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-600 font-medium">
                  {guide.steps.length} steps
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">
                  Call: {guide.callFirst.join(", ")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* General advice */}
      <div className="bg-gray-900 text-white rounded-xl p-6">
        <h2 className="font-semibold text-white mb-3">
          Applies to Every Emergency
        </h2>
        <ul className="space-y-2">
          {[
            "Stay calm. Your judgment is your most valuable asset.",
            "Ensure your own safety before helping others.",
            "Call 911 first if there is any risk to life.",
            "Share your location clearly — include landmarks or kilometer markers.",
            "Follow instructions from emergency responders exactly.",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-gray-500 font-mono text-xs mt-0.5 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
