import type { Metadata } from "next";
export const metadata: Metadata = {
 title: "Contact",
 description: "Contact Fashol by email or phone. Offices in Dhaka, Singapore, and Dubai. We reply within one business day.",
};

import { ContactContent } from "./ContactContent";
export default function ContactPage() {
  return <ContactContent />;
}