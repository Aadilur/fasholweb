import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Importers - Fashol",
  description:
    "The import side is yours. The distribution side is ours. Once foreign produce lands in Bangladesh, Fashol distributes it across 7,000+ mudi shops, 400+ restaurants, and 400+ supershop outlets with cold-chain fulfillment and same-day settlement.",
};

import { ImportersContent } from "./ImportersContent";
export default function ImportersPage() {
  return <ImportersContent />;
}