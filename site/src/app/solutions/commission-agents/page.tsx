import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Commission agents - Fashol",
  description:
    "The arot your father built, the tools your generation needs to extend it. Fashol gives second-generation arotdars live pricing, same-day settlement, digital ledgers, and access to modern downstream buyers across Bangladesh.",
};

import { CommissionAgentsContent } from "./CommissionAgentsContent";
export default function CommissionAgentsPage() {
  return <CommissionAgentsContent />;
}