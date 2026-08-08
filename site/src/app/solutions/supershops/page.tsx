import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Supershops - Fashol",
  description:
    "Wholesale pricing locked for the week, daily replenishment to every outlet, and cold-chain fulfillment that protects fresh produce margin. Fashol supplies Shwapno, Meena Bazar, Agora, and Daily Shopping across hundreds of outlets in Bangladesh.",
};

import { SupershopsContent } from "./SupershopsContent";
export default function SupershopsPage() {
  return <SupershopsContent />;
}