import type { Metadata } from "next";
export const metadata: Metadata = {
 title: "Career",
 description:
 "Engineering, logistics, field operations, data, and capital roles at Fashol - Bangladesh's farm-to-business platform.",
};

import { CareerContent } from "./CareerContent";
export default function CareerPage() {
  return <CareerContent />;
}