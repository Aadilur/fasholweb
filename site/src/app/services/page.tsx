import type { Metadata } from "next";
export const metadata: Metadata = {
 title: "Services",
 description:
 "Six services across Fashol's agricultural supply chain platform: farm-to-market, logistics, buyer tools, market intelligence, quality grading, and financial settlement.",
};

import { ServicesContent } from "./ServicesContent";
export default function ServicesPage() {
  return <ServicesContent />;
}