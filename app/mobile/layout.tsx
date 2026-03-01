import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soon on Mobile",
  description:
    "The SOSPH mobile app is coming. Offline access, one-tap calling, GPS location sharing — built for the moment of an emergency.",
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
