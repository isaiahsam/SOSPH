import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Guides",
  description:
    "Step-by-step instructions for car accidents, medical emergencies, fire, crime, and flood response in the Philippines.",
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
