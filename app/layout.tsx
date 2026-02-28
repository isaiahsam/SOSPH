import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SOSPH — After-Emergency Response for Filipinos",
    template: "%s — SOSPH",
  },
  description:
    "SOSPH helps Filipinos know what to do after an emergency. The right hotlines, step-by-step guides, and location tools — available now, no login required.",
  keywords: [
    "emergency Philippines",
    "Philippine hotlines",
    "911 Philippines",
    "emergency response",
    "after emergency",
    "SOSPH",
    "NLEX emergency",
    "expressway accident",
  ],
  openGraph: {
    title: "SOSPH — After-Emergency Response for Filipinos",
    description:
      "The right hotlines, step-by-step guidance, and location tools — for after an emergency happens.",
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PH">
      <body suppressHydrationWarning>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
