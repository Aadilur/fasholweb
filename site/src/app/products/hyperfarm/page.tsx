import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Hyperfarm - Procurement for restaurants, supershops, and quick commerce",
  description:
    "Hyperfarm is the procurement app for businesses that buy fresh produce in bulk. Stop running to wholesale markets at 1am. Order tonight, get the supply at your door tomorrow.",
};

import { HyperfarmContent } from "./HyperfarmContent";
export default function HyperfarmPage() {
  return <HyperfarmContent />;
}