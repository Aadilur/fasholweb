import type { Metadata } from "next";
export const metadata: Metadata = {
 title: "About",
 description:
 "Fashol is a farm-to-business platform founded in Dhaka, 2019. Three founders. Offices in Bangladesh, Singapore, and Dubai.",
};

import { AboutContent } from "./AboutContent";
export default function AboutPage() {
  return <AboutContent />;
}