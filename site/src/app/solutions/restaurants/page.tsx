import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Restaurants - Fashol",
  description:
    "Fresh produce at your kitchen door before morning service. Fashol serves 400-plus restaurants in Dhaka, including Domino's Pizza, with next-day delivery between 5 and 11 AM.",
};

import { RestaurantsContent } from "./RestaurantsContent";
export default function RestaurantsPage() {
  return <RestaurantsContent />;
}