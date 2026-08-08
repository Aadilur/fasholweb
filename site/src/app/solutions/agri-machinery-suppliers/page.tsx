import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Agri machinery suppliers - Fashol",
  description:
    "Tractors, tillers, pumps, threshers - sell them or finance them. Fashol puts machinery catalogs in front of 60,000 farmers on Jogaan, and underwrites farmer financing in partnership with banks. The machinery market in Bangladesh is not limited by demand. It is limited by financing.",
};

import { AgriMachineryContent } from "./AgriMachineryContent";
export default function AgriMachineryPage() {
  return <AgriMachineryContent />;
}