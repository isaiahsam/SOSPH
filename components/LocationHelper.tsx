"use client";

import { useState } from "react";

type LocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; lat: number; lng: number; accuracy: number }
  | { status: "error"; message: string };

export default function LocationHelper() {
  const [location, setLocation] = useState<LocationState>({ status: "idle" });
  const [copied, setCopied] = useState(false);

  function getLocation() {
    if (!navigator.geolocation) {
      setLocation({
        status: "error",
        message: "Your browser does not support location access.",
      });
      return;
    }

    setLocation({ status: "loading" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          status: "success",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
        });
      },
      (error) => {
        let message = "Unable to get your location.";
        if (error.code === error.PERMISSION_DENIED) {
          message =
            "Location access was denied. Please allow location in your browser settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Location information is unavailable. Try again.";
        } else if (error.code === error.TIMEOUT) {
          message = "Location request timed out. Try again.";
        }
        setLocation({ status: "error", message });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function copyLocation() {
    if (location.status !== "success") return;
    const text = `My location: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\nMap: https://maps.google.com/?q=${location.lat},${location.lng}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function getMapsUrl(lat: number, lng: number) {
    return `https://maps.google.com/?q=${lat},${lng}`;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Share My Location</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Get your coordinates to share with emergency services or contacts.
          </p>
        </div>
      </div>

      {location.status === "idle" && (
        <button
          onClick={getLocation}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
        >
          Get My Location
        </button>
      )}

      {location.status === "loading" && (
        <div className="flex items-center justify-center gap-2 py-3 text-sm text-gray-500">
          <svg
            className="animate-spin w-4 h-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Getting your location...
        </div>
      )}

      {location.status === "error" && (
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{location.message}</p>
          </div>
          <button
            onClick={getLocation}
            className="w-full border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {location.status === "success" && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
              Your Coordinates
            </p>
            <p className="text-lg font-mono font-bold text-gray-900">
              {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Accuracy: ±{location.accuracy} meters
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={copyLocation}
              className="flex-1 bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied
                </>
              ) : (
                <>
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <a
              href={getMapsUrl(location.lat, location.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-blue-300 text-blue-600 py-2.5 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm flex items-center justify-center gap-1.5"
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Maps
            </a>
          </div>

          <button
            onClick={getLocation}
            className="w-full text-sm text-gray-500 hover:text-gray-700 py-1 transition-colors"
          >
            Refresh location
          </button>
        </div>
      )}
    </div>
  );
}
