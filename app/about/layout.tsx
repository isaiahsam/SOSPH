import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SOSPH is an after-emergency response platform built for Filipinos. Learn what it does, why it exists, and how it helps.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
