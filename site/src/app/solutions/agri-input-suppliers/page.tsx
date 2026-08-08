import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Agri input suppliers - Fashol",
  description:
    "Seeds, pesticides, fertilizers, livestock feed - straight to the farmer. Fashol puts input supplier catalogs on Jogaan and reaches 60,000 registered farmers across 50 districts with last-mile delivery through 40+ hubs.",
};

import { AgriInputContent } from "./AgriInputContent";
export default function AgriInputSuppliersPage() {
  return <AgriInputContent />;
}