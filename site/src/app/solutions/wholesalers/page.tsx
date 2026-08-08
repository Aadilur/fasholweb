import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wholesalers - Fashol",
  description:
    "A modern supply stack behind your existing wholesale trading business. Consistent volumes, cold-chain fulfillment, transparent pricing, same-day settlement. Fashol serves wholesale traders across 50 districts in Bangladesh.",
};

import { WholesalersContent } from "./WholesalersContent";
export default function WholesalersPage() {
  return <WholesalersContent />;
}