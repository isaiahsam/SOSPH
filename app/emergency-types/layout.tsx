import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Types",
  description:
    "Know your emergency. Find the right guide for car accidents, medical emergencies, fire, crime, and more.",
};

export default function EmergencyTypesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
