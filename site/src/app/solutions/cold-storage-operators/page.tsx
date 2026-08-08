import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cold storage operators - Fashol",
  description:
    "Fashol partners with cold storage operators across Bangladesh to bring verified inbound bookings from 60,000 farmers and outbound orders from a buyer network of 7,000 mudi shops, 400+ restaurants, and 400+ supershop outlets. The facility stays yours. The traffic is what changes.",
};

import { ColdStorageContent } from "./ColdStorageContent";
export default function ColdStoragePage() {
  return <ColdStorageContent />;
}