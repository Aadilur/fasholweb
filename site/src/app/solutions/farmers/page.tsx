import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Farmers - Fashol",
  description:
    "A fair price for every crop, 24-hour mobile money settlement, and a marketplace for inputs and machinery. Fashol serves 60,000-plus farmers across Bangladesh through the Jogaan platform.",
};

import { FarmersContent } from "./FarmersContent";
export default function FarmersPage() {
  return <FarmersContent />;
}