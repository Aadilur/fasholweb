import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Jogaan - The farmer's app for Bangladesh",
  description:
    "Jogaan is the farmer's operating system for Bangladesh. Live prices from 200-plus markets, sell to the highest bidder by tonight, book a truck, buy inputs, and get credit. All from one app, all in Bengali.",
};

import { JogaanContent } from "./JogaanContent";
export default function JogaanPage() {
  return <JogaanContent />;
}