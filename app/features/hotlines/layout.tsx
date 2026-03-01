import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Hotlines",
  description:
    "All Philippine emergency hotlines — national, police, fire, medical, expressway, and disaster response numbers.",
};

export default function HotlinesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
