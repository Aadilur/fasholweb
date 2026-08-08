import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Retailers - Fashol",
  description:
    "Fresh produce delivered to your mudi shop before 6 AM, without the 4 AM trip to Karwan Bazar. Wholesale prices, quality dialed to your shop, no minimum order. Fashol has served 7,000+ mudi shops across Bangladesh for six years.",
};

import { RetailersContent } from "./RetailersContent";
export default function RetailersPage() {
  return <RetailersContent />;
}