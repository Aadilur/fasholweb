import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Logistics partners - Fashol",
  description:
    "Fashol partners with small fleet owners across Bangladesh to route loads directly, match return trips, and keep trucks earning on both legs. 40+ hubs, 50 districts, 3,500+ MT of produce moving through the network every month.",
};

import { LogisticsContent } from "./LogisticsContent";
export default function LogisticsPage() {
  return <LogisticsContent />;
}