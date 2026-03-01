import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expressway Emergency Guide",
  description:
    "Emergency procedures and hotlines for NLEX, SLEX, Skyway, SCTEX, and TPLEX. Know what to do when your vehicle breaks down or an accident happens on a Philippine expressway.",
};

export default function ExpresswaysLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
