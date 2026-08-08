import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Exporters - Fashol",
  description:
    "Source fresh produce from Bangladesh with 24-hour CNF pricing, packaging engineered for every destination, and compliance handled end to end. Fashol exports to the UK, Europe, the Middle East, and Southeast Asia.",
};

import { ExportersContent } from "./ExportersContent";
export default function ExportersPage() {
  return <ExportersContent />;
}