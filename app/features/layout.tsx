import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — What SOSPH Provides",
  description:
    "Emergency hotlines, step-by-step response guides, expressway procedures, and GPS location sharing. All available now, no account required.",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
