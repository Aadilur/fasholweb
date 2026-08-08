import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quick commerce - Fashol",
  description:
    "Fill rate above 95%, on-demand scale for surges, and wholesale pricing that holds. Fashol powers fresh produce supply for Foodpanda, Chaldal, and Foodie across Dhaka.",
};

import { QuickCommerceContent } from "./QuickCommerceContent";
export default function QuickCommercePage() {
  return <QuickCommerceContent />;
}