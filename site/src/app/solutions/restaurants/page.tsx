import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  Reveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

export const metadata: Metadata = {
  title: "Restaurants - Fashol",
  description:
    "Fresh produce at your kitchen door before morning service. Fashol serves 400-plus restaurants in Dhaka, including Domino's Pizza, with next-day delivery between 5 and 11 AM.",
};

type HeroStat =
  | {
      kind: "number";
      n: number;
      format: "comma" | "plain";
      suffix: string;
      tail: string;
      l: string;
      lBn: string;
    }
  | {
      kind: "text";
      text: string;
      textBn: string;
      l: string;
      lBn: string;
    };

const HERO_STATS: ReadonlyArray<HeroStat> = [
  {
    kind: "number",
    n: 400,
    format: "plain",
    suffix: "+",
    tail: "",
    l: "Restaurants including Domino's",
    lBn: "\u09A1\u09AE\u09BF\u09A8\u09CB\u099C\u09B8\u09B9 \u09B0\u09C7\u09B8\u09CD\u09A4\u09CB\u09B0\u09BE\u0981",
  },
  { kind: "text", text: "5AM", textBn: "5AM", l: "Morning delivery starts", lBn: "\u09B8\u0995\u09BE\u09B2\u09C7\u09B0 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u09B6\u09C1\u09B0\u09C1" },
  { kind: "text", text: "Dhaka", textBn: "\u09A2\u09BE\u0995\u09BE", l: "Every corner, every day", lBn: "\u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u0995\u09CB\u09A3\u09C7, \u09AA\u09CD\u09B0\u09A4\u09BF\u09A6\u09BF\u09A8" },
];

const BENEFITS: ReadonlyArray<{
  n: string;
  headline: string;
  headlineBn: string;
  body: string;
  bodyBn: string;
}> = [
  {
    n: "01",
    headline: "Fixed prices, no haggling.",
    headlineBn: "\u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09BF\u09A4 \u09A6\u09BE\u09AE, \u09A6\u09B0\u09A6\u09BE\u09AE \u09A8\u09AF\u09BC\u0964",
    body: "Every SKU on Hyperfarm has a published daily price. No negotiation, no kickback, no \u201Cspecial rate\u201D by who is asking. Owner and procurement manager see the same price, and both pay it.",
    bodyBn: "\u09B9\u09BE\u0987\u09AA\u09BE\u09B0\u09AB\u09BE\u09B0\u09CD\u09AE\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u098F\u09B8\u0995\u09C7\u0987\u0989-\u098F\u09B0 \u098F\u0995\u099F\u09BF \u09AA\u09CD\u09B0\u0995\u09BE\u09B6\u09BF\u09A4 \u09A6\u09C8\u09A8\u09BF\u0995 \u09A6\u09BE\u09AE \u0986\u099B\u09C7\u0964 \u0995\u09CB\u09A8\u09CB \u09A6\u09B0\u0995\u09B7\u09BE\u0995\u09B7\u09BF \u09A8\u09C7\u0987, \u0995\u09AE\u09BF\u09B6\u09A8 \u09A8\u09C7\u0987, \u0995\u09C7 \u099C\u09BF\u099C\u09CD\u099E\u09C7\u09B8 \u0995\u09B0\u099B\u09C7 \u09A4\u09BE\u09B0 \u0989\u09AA\u09B0 \u09A8\u09BF\u09B0\u09CD\u09AD\u09B0 \u0995\u09B0\u09C7 \u0995\u09CB\u09A8\u09CB \u201C\u09AC\u09BF\u09B6\u09C7\u09B7 \u09A6\u09BE\u09AE\u201D \u09A8\u09C7\u0987\u0964 \u09AE\u09BE\u09B2\u09BF\u0995 \u0986\u09B0 \u09B8\u0982\u0997\u09CD\u09B0\u09B9 \u09AE\u09CD\u09AF\u09BE\u09A8\u09C7\u099C\u09BE\u09B0 \u098F\u0995\u0987 \u09A6\u09BE\u09AE \u09A6\u09C7\u0996\u09C7\u09A8, \u09A6\u09C1\u099C\u09A8\u09C7\u0987 \u09A4\u09BE \u09A6\u09C7\u09A8\u0964",
  },
  {
    n: "02",
    headline: "Grading applied at the hub, not at the kitchen.",
    headlineBn: "\u0997\u09CD\u09B0\u09C7\u09A1\u09BF\u0982 \u09B9\u09AF\u09BC \u09B9\u09BE\u09AC\u09C7, \u0995\u09BF\u099A\u09C7\u09A8\u09C7 \u09A8\u09AF\u09BC\u0964",
    body: "Produce is graded into four tiers at Fashol's hub before delivery. Order Grade A cauliflower, get Grade A cauliflower. No sorting, no rejection, no 6 AM disputes at the back door.",
    bodyBn: "\u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF\u09B0 \u0986\u0997\u09C7\u0987 \u09AB\u09B8\u09B2\u09C7\u09B0 \u09B9\u09BE\u09AC\u09C7 \u09B8\u09AC\u099C\u09BF \u099A\u09BE\u09B0 \u09B8\u09CD\u09A4\u09B0\u09C7 \u0997\u09CD\u09B0\u09C7\u09A1 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u0964 \u0997\u09CD\u09B0\u09C7\u09A1 \u098F \u09AB\u09C1\u09B2\u0995\u09AA\u09BF\u09B0 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BF\u09B2\u09C7 \u0997\u09CD\u09B0\u09C7\u09A1 \u098F \u09AB\u09C1\u09B2\u0995\u09AA\u09BF\u0987 \u09AA\u09BE\u09AC\u09C7\u09A8\u0964 \u09AC\u09BE\u099B\u09BE\u0987 \u09A8\u09C7\u0987, \u09AB\u09C7\u09B0\u09A4 \u09A8\u09C7\u0987, \u09AA\u09C7\u099B\u09A8\u09C7\u09B0 \u09A6\u09B0\u099C\u09BE\u09AF\u09BC \u09AD\u09CB\u09B0 6\u099F\u09BE\u09B0 \u099D\u0997\u09A1\u09BC\u09BE\u0993 \u09A8\u09C7\u0987\u0964",
  },
  {
    n: "03",
    headline: "One supplier instead of ten.",
    headlineBn: "\u09A6\u09B6\u099C\u09A8\u09C7\u09B0 \u09AC\u09A6\u09B2\u09C7 \u098F\u0995\u099C\u09A8 \u09B8\u09BE\u09AA\u09CD\u09B2\u09BE\u09AF\u09BC\u09BE\u09B0\u0964",
    body: "A restaurant running on Fashol replaces the usual roster of ten-plus vegetable, fish, meat, dairy, and spice suppliers with one invoice, one delivery window, one point of contact. Chains consolidate across branches.",
    bodyBn: "\u09AB\u09B8\u09B2\u09C7 \u099A\u09B2\u09BE \u09B0\u09C7\u09B8\u09CD\u09A4\u09CB\u09B0\u09BE\u0981 \u09B8\u09AC\u099C\u09BF, \u09AE\u09BE\u099B, \u09AE\u09BE\u0982\u09B8, \u09A6\u09C1\u0997\u09CD\u09A7 \u0986\u09B0 \u09AE\u09B8\u09B2\u09BE\u09B0 \u09A6\u09B6-\u09AC\u09BE\u09B0\u09CB\u099C\u09A8 \u09B8\u09BE\u09AA\u09CD\u09B2\u09BE\u09AF\u09BC\u09BE\u09B0\u09C7\u09B0 \u099A\u09C7\u09A8\u09BE \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09B0 \u09AC\u09A6\u09B2\u09C7 \u09AA\u09BE\u09AF\u09BC \u098F\u0995\u099F\u09BF \u099A\u09BE\u09B2\u09BE\u09A8, \u098F\u0995\u099F\u09BF \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u09B8\u09AE\u09AF\u09BC, \u098F\u0995\u099F\u09BF \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997\u09C7\u09B0 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE\u0964 \u099A\u09C7\u0987\u09A8\u0997\u09C1\u09B2\u09CB \u09B8\u09AC \u09B6\u09BE\u0996\u09BE\u09B0 \u09B9\u09BF\u09B8\u09BE\u09AC \u098F\u0995\u09A4\u09CD\u09B0 \u0995\u09B0\u09C7 \u09AB\u09C7\u09B2\u09C7\u0964",
  },
  {
    n: "04",
    headline: "The owner sees everything.",
    headlineBn: "\u09AE\u09BE\u09B2\u09BF\u0995 \u09B8\u09AC\u0995\u09BF\u099B\u09C1 \u09A6\u09C7\u0996\u09C7\u09A8\u0964",
    body: "Every order, every price, every grade, every delivery, logged and visible on the Hyperfarm dashboard. The owner plans the next day's procurement from a phone, not from a back-office receipt pile.",
    bodyBn: "\u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u0985\u09B0\u09CD\u09A1\u09BE\u09B0, \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09A6\u09BE\u09AE, \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u0997\u09CD\u09B0\u09C7\u09A1, \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF - \u09B8\u09AC \u09B9\u09BE\u0987\u09AA\u09BE\u09B0\u09AB\u09BE\u09B0\u09CD\u09AE \u09A1\u09CD\u09AF\u09BE\u09B6\u09AC\u09CB\u09B0\u09CD\u09A1\u09C7 \u09B2\u09BF\u09AA\u09BF\u09AC\u09A6\u09CD\u09A7 \u0993 \u09A6\u09C3\u09B6\u09CD\u09AF\u09AE\u09BE\u09A8\u0964 \u09AE\u09BE\u09B2\u09BF\u0995 \u09AA\u09B0\u09C7\u09B0 \u09A6\u09BF\u09A8\u09C7\u09B0 \u09B8\u0982\u0997\u09CD\u09B0\u09B9\u09C7\u09B0 \u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09A8\u09BE \u0995\u09B0\u09C7\u09A8 \u09AB\u09CB\u09A8 \u09A5\u09C7\u0995\u09C7\u0987, \u09AA\u09C7\u099B\u09A8\u09C7\u09B0 \u0985\u09AB\u09BF\u09B8\u09C7 \u099C\u09AE\u09C7 \u09A5\u09BE\u0995\u09BE \u09B0\u09B8\u09BF\u09A6\u09C7\u09B0 \u09B8\u09CD\u09A4\u09C2\u09AA \u09A5\u09C7\u0995\u09C7 \u09A8\u09AF\u09BC\u0964",
  },
];

const STEPS: ReadonlyArray<{
  n: string;
  headline: string;
  headlineBn: string;
  body: string;
  bodyBn: string;
}> = [
  {
    n: "01",
    headline: "Sign up on Hyperfarm.",
    headlineBn: "\u09B9\u09BE\u0987\u09AA\u09BE\u09B0\u09AB\u09BE\u09B0\u09CD\u09AE\u09C7 \u09B8\u09BE\u0987\u09A8 \u0986\u09AA \u0995\u09B0\u09C1\u09A8\u0964",
    body: "Create a Hyperfarm account from the app or web. Fashol's restaurant team reaches out within the hour to confirm your location and volume.",
    bodyBn: "\u0985\u09CD\u09AF\u09BE\u09AA \u09AC\u09BE \u0993\u09AF\u09BC\u09C7\u09AC \u09A5\u09C7\u0995\u09C7 \u098F\u0995\u099F\u09BF \u09B9\u09BE\u0987\u09AA\u09BE\u09B0\u09AB\u09BE\u09B0\u09CD\u09AE \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u0996\u09C1\u09B2\u09C1\u09A8\u0964 \u09AB\u09B8\u09B2\u09C7\u09B0 \u09B0\u09C7\u09B8\u09CD\u09A4\u09CB\u09B0\u09BE\u0981 \u099F\u09BF\u09AE \u098F\u0995 \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7\u0987 \u0986\u09AA\u09A8\u09BE\u09B0 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE \u0986\u09B0 \u09AA\u09B0\u09BF\u09AE\u09BE\u09A3 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09A4\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09AC\u09C7\u0964",
  },
  {
    n: "02",
    headline: "Map your produce list.",
    headlineBn: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u09AC\u099C\u09BF\u09B0 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09AE\u09BF\u09B2\u09BF\u09AF\u09BC\u09C7 \u09A8\u09BF\u09A8\u0964",
    body: "A quick call with the restaurant team to match your regular produce list to Hyperfarm SKUs. Pricing is live and transparent. You approve the list before it goes active.",
    bodyBn: "\u09B0\u09C7\u09B8\u09CD\u09A4\u09CB\u09B0\u09BE\u0981 \u099F\u09BF\u09AE\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u098F\u0995\u099F\u09BF \u099B\u09CB\u099F \u0995\u09B2, \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09BF\u09AF\u09BC\u09AE\u09BF\u09A4 \u09B8\u09AC\u099C\u09BF\u09B0 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09B9\u09BE\u0987\u09AA\u09BE\u09B0\u09AB\u09BE\u09B0\u09CD\u09AE\u09C7\u09B0 \u098F\u09B8\u0995\u09C7\u0987\u0989-\u098F\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AE\u09BF\u09B2\u09BF\u09AF\u09BC\u09C7 \u09A8\u09C7\u0993\u09AF\u09BC\u09BE \u09B9\u09AF\u09BC\u0964 \u09A6\u09BE\u09AE \u09A4\u09BE\u09CE\u0995\u09CD\u09B7\u09A3\u09BF\u0995 \u0986\u09B0 \u09B8\u09CD\u09AC\u099A\u09CD\u099B\u0964 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u099A\u09BE\u09B2\u09C1 \u09B9\u0993\u09AF\u09BC\u09BE\u09B0 \u0986\u0997\u09C7 \u0986\u09AA\u09A8\u09BF \u09A4\u09BE \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u0995\u09B0\u09C7\u09A8\u0964",
  },
  {
    n: "03",
    headline: "Place your first order.",
    headlineBn: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BF\u09A8\u0964",
    body: "Order from the app anytime before 10 PM. Choose your preferred delivery window between 5 and 11 AM.",
    bodyBn: "\u09B0\u09BE\u09A4 10\u099F\u09BE\u09B0 \u0986\u0997\u09C7 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u09B8\u09AE\u09AF\u09BC \u0985\u09CD\u09AF\u09BE\u09AA \u09A5\u09C7\u0995\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BF\u09A8\u0964 \u09B8\u0995\u09BE\u09B2 5\u099F\u09BE \u09A5\u09C7\u0995\u09C7 11\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u099B\u09A8\u09CD\u09A6\u09C7\u09B0 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u09B8\u09AE\u09AF\u09BC \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u09A8\u0964",
  },
  {
    n: "04",
    headline: "Receive by morning.",
    headlineBn: "\u09B8\u0995\u09BE\u09B2\u09C7\u0987 \u09AC\u09C1\u099D\u09C7 \u09A8\u09BF\u09A8\u0964",
    body: "Fashol's cold-chain fleet delivers to your kitchen the next morning. Graded, priced as quoted, invoiced in-app.",
    bodyBn: "\u09AB\u09B8\u09B2\u09C7\u09B0 \u0995\u09CB\u09B2\u09CD\u09A1-\u099A\u09C7\u0987\u09A8 \u09AC\u09B9\u09B0 \u09AA\u09B0\u09A6\u09BF\u09A8 \u09B8\u0995\u09BE\u09B2\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u0995\u09BF\u099A\u09C7\u09A8\u09C7 \u09AA\u09CC\u0981\u099B\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964 \u0997\u09CD\u09B0\u09C7\u09A1 \u0995\u09B0\u09BE, \u09AC\u09B2\u09BE \u09A6\u09BE\u09AE\u09C7\u0987, \u099A\u09BE\u09B2\u09BE\u09A8 \u0985\u09CD\u09AF\u09BE\u09AA\u09C7\u0987\u0964",
  },
];

const RELATED: ReadonlyArray<{
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  href: string;
}> = [
  {
    name: "Supershops",
    nameBn: "\u09B8\u09C1\u09AA\u09BE\u09B0\u09B6\u09AA",
    description:
      "Supply partnerships for retail chains, with consistent grading and dependable volumes.",
    descriptionBn:
      "\u09B0\u09BF\u099F\u09C7\u0987\u09B2 \u099A\u09C7\u0987\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09B8\u09BE\u09AA\u09CD\u09B2\u09BE\u0987 \u09AA\u09BE\u09B0\u09CD\u099F\u09A8\u09BE\u09B0\u09B6\u09BF\u09AA, \u09B8\u0999\u09CD\u0997\u09C7 \u09A7\u09BE\u09B0\u09BE\u09AC\u09BE\u09B9\u09BF\u0995 \u0997\u09CD\u09B0\u09C7\u09A1\u09BF\u0982 \u0986\u09B0 \u09A8\u09BF\u09B0\u09CD\u09AD\u09B0\u09AF\u09CB\u0997\u09CD\u09AF \u09AA\u09B0\u09BF\u09AE\u09BE\u09A3\u0964",
    href: "/solutions/supershops",
  },
  {
    name: "Quick commerce",
    nameBn: "\u0995\u09C1\u0987\u0995 \u0995\u09AE\u09BE\u09B0\u09CD\u09B8",
    description:
      "Real-time stock visibility and daily pricing with cold-chain fulfillment to distribution centers.",
    descriptionBn:
      "\u09A4\u09BE\u09CE\u0995\u09CD\u09B7\u09A3\u09BF\u0995 \u09B8\u09CD\u099F\u0995 \u09A6\u09C3\u09B6\u09CD\u09AF\u09AE\u09BE\u09A8\u09A4\u09BE \u0986\u09B0 \u09A6\u09C8\u09A8\u09BF\u0995 \u09A6\u09BE\u09AE, \u09B8\u0999\u09CD\u0997\u09C7 \u09A1\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u09AC\u09BF\u0989\u09B6\u09A8 \u09B8\u09C7\u09A8\u09CD\u099F\u09BE\u09B0\u09C7 \u0995\u09CB\u09B2\u09CD\u09A1-\u099A\u09C7\u0987\u09A8 \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9\u0964",
    href: "/solutions/quick-commerce",
  },
  {
    name: "Commission agents",
    nameBn: "\u0995\u09AE\u09BF\u09B6\u09A8 \u098F\u099C\u09C7\u09A8\u09CD\u099F",
    description:
      "Traditional arotdars on a modern stack, with transparent pricing and settlement.",
    descriptionBn:
      "\u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09AA\u09CD\u09B0\u09AF\u09C1\u0995\u09CD\u09A4\u09BF\u09A4\u09C7 \u099A\u09B2\u09BE \u09AA\u09CD\u09B0\u09A5\u09BE\u0997\u09A4 \u0986\u09A1\u09BC\u09A4\u09A6\u09BE\u09B0, \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u09CD\u09AC\u099A\u09CD\u099B \u09A6\u09BE\u09AE \u0986\u09B0 \u09B8\u09C7\u099F\u09C7\u09B2\u09AE\u09C7\u09A8\u09CD\u099F\u0964",
    href: "/solutions/commission-agents",
  },
];

export default async function RestaurantsPage() {
  const lang = await getLang();
  return (
    <>
      {/* Section 1 - Hero - full-bleed photo with ink gradient + left-aligned overlay */}
      <section className="relative min-h-[600px] h-[90vh] overflow-hidden">
        {/* Layer 1 - Photo background */}
        <Reveal
          delay={0}
          duration={0.8}
          y={0}
          amount={0}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/solutions/restaurants/shero2.jpg"
            alt="A restaurant kitchen in Dhaka preparing fresh produce for morning service"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Reveal>

        {/* Layer 2a - Dark ink wash underneath pink, lifts text contrast
            on the left without muddying the pink color itself. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[5] tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(19,19,19,0) 0%, rgba(19,19,19,0.45) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[5] hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(19,19,19,0.5) 0%, rgba(19,19,19,0.35) 30%, rgba(19,19,19,0) 60%)",
          }}
        />

        {/* Layer 2b - Pink overlay (responsive direction). rgba = #fe0186. */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 tablet:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(254,1,134,0.2), rgba(254,1,134,0.8))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 hidden tablet:block"
          style={{
            background:
              "linear-gradient(to right, rgba(254,1,134,0.9) 0%, rgba(254,1,134,0.7) 45%, rgba(254,1,134,0.2) 70%, rgba(254,1,134,0) 100%)",
          }}
        />

        {/* Layer 3 - Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end tablet:justify-center px-6 tablet:pl-[8vw] tablet:pr-8 pb-12 tablet:pb-0 pt-24 tablet:pt-0">
          <div className="max-w-[600px]">
            <Reveal
              as="h1"
              className="t-hero !text-[var(--color-paper)] !text-[56px] tablet:!text-[72px] desktop:!text-[88px]"
            >
              {t(lang, "Restaurants.", "রেস্তোরাঁ।")}
            </Reveal>
            <Reveal
              delay={0.2}
              as="p"
              className="t-body-lg mt-6 max-w-[520px] !text-[rgba(255,251,234,0.75)]"
            >
              {t(
                lang,
                "Fresh produce at your kitchen door before morning service, ordered the night before. No more 4 AM runs to Karwan Bazar, no more haggling.",
                "সকালের রান্না শুরুর আগেই আপনার কিচেনের দরজায় টাটকা সবজি, অর্ডার দিন আগের রাতেই। কারওয়ান বাজারে ভোর 4টার ছোটাছুটি আর নয়, দরদামও আর নয়।",
              )}
            </Reveal>
            <dl className="mt-12 flex flex-col tablet:flex-row items-start gap-6 tablet:gap-12">
              {HERO_STATS.map((s, i) => (
                <div key={s.l} className="flex flex-col items-start">
                  <dd
                    className="t-tabular text-[28px] tablet:text-[32px] desktop:text-[36px] leading-none !text-[var(--color-paper)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.kind === "number" ? (
                      <>
                        <CountUp
                          to={s.n}
                          format={s.format}
                          suffix={s.suffix}
                          duration={1200}
                          delay={i * 150}
                          sessionKey={`restaurants-hero-stat-${i}`}
                        />
                        {s.tail}
                      </>
                    ) : (
                      <Reveal
                        as="span"
                        delay={0.24 + i * 0.12}
                        duration={0.6}
                        y={0}
                      >
                        {t(lang, s.text, s.textBn)}
                      </Reveal>
                    )}
                  </dd>
                  <dt className="t-caption mt-2 !text-[rgba(255,251,234,0.65)]">{t(lang, s.l, s.lBn)}</dt>
                </div>
              ))}
            </dl>
            <Reveal delay={0.36} className="mt-8 tablet:mt-10">
              <Button variant="on-dark" href="/contact">
                {t(lang, "Talk to the restaurant team", "রেস্তোরাঁ টিমের সাথে কথা বলুন")}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2 - The problem */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "You run the kitchen. We run procurement.", "কিচেন আপনি চালান। সংগ্রহের কাজ আমরা চালাই।")}
            </Reveal>
            <Reveal delay={0.2} duration={0.6} y={0} className="mt-12">
              <Image
                src="/i2.webp"
                alt="A Dhaka restaurant kitchen team during morning service"
                width={1600}
                height={1627}
                sizes="(min-width: 1200px) 520px, 100vw"
                className="w-full h-auto block"
              />
              <p className="mt-2 text-[10px] tracking-[0.02em] !text-[var(--color-ink-muted)]">
                {t(lang, "Photo:", "ছবি:")}{" "}
                <a
                  href="https://www.tbsnews.net/features/pursuit/cook-your-career-perfection-chef-788626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:!text-[var(--color-ink)]"
                >
                  The Business Standard
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "Running a restaurant in Dhaka has meant running procurement on the side. A manager hires runners who drive to Karwan Bazar at 4 AM to haggle with aratdars who post no rates. By the time produce reaches the kitchen, no one can say what it cost or why prices keep shifting.",
                "ঢাকায় রেস্তোরাঁ চালানো মানে পাশাপাশি সংগ্রহের কাজটাও সামলানো। ম্যানেজার লোক ঠিক করেন, যারা ভোর 4টায় কারওয়ান বাজারে গিয়ে আড়তদারদের সাথে দরদাম করে - যাদের কোনো নির্ধারিত দাম নেই। সবজি কিচেনে পৌঁছানোর পর কেউ বলতে পারে না তার দাম কত পড়ল, কিংবা দাম কেন বারবার বদলায়।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Quality is the other half. Walk-in vendors send what they have, not what you ordered, with Grade A and Grade B in the same crate. And the owner juggles ten or more suppliers per restaurant, each with its own invoicing, credit terms, and excuses when deliveries slip.",
                "কোয়ালিটির প্রশ্নটা তো আরেক অর্ধেক। বিক্রেতারা আপনি যা অর্ডার দিয়েছেন তা নয়, বরং তাদের হাতে যা আছে তাই পাঠায় - এক ঝুড়িতেই গ্রেড এ আর গ্রেড বি মিশিয়ে। আর মালিককে প্রতিটি রেস্তোরাঁর জন্য সামলাতে হয় দশ বা তারও বেশি সাপ্লায়ার, প্রত্যেকের আলাদা চালান, আলাদা বাকির শর্ত, আর ডেলিভারি দেরি হলে আলাদা অজুহাত।",
              )}
            </p>
            <p className="mt-5">
              {t(
                lang,
                "Multiply that by a chain, and the problem scales past what any manager can see.",
                "একটা চেইনে এটাকে বহুগুণ করে দিন, তখন সমস্যা এমন জায়গায় পৌঁছায় যা কোনো ম্যানেজারের চোখেই ধরা পড়ে না।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 - Hinge (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center">
          <Reveal>
            <div
              className="whitespace-nowrap leading-[0.95] !text-[var(--color-paper)] text-[56px] tablet:text-[88px] desktop:text-[120px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              <CountUp
                to={8}
                duration={1500}
                trigger="inview"
                inviewMargin="0px 0px -30% 0px"
                sessionKey="restaurants-hinge-8"
              />{" "}
              {t(lang, "days a week", "দিন, সপ্তাহে")}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="t-body-lg mt-6 tablet:mt-8 max-w-[600px] mx-auto"
              style={{ color: "rgba(255, 251, 234, 0.75)" }}
            >
              {t(
                lang,
                "A procurement team spends roughly one full workday per week on the wholesale market run. Fashol gives that day back.",
                "একটি সংগ্রহ টিম প্রতি সপ্তাহে প্রায় একটি পুরো কর্মদিবস কাটিয়ে দেয় পাইকারি বাজারে ছোটাছুটিতে। ফসল সেই দিনটা ফিরিয়ে দেয়।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 4 - What Fashol does for restaurants (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "Hyperfarm replaces the procurement desk.", "হাইপারফার্ম সংগ্রহ ডেস্কের জায়গা নেয়।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "A restaurant on Hyperfarm orders the night before and receives cold-chain fresh produce between 5 AM and 11 AM, graded, priced transparently, delivered to every corner of Dhaka. Thousands of SKUs from a single platform. Same pricing for everyone.",
                "হাইপারফার্মে যুক্ত রেস্তোরাঁ আগের রাতে অর্ডার দেয় আর সকাল 5টা থেকে 11টার মধ্যে কোল্ড-চেইনে টাটকা সবজি পায় - গ্রেড করা, স্বচ্ছ দামে, ঢাকার প্রতিটি কোণে পৌঁছে দেওয়া। একটিমাত্র প্ল্যাটফর্মে হাজার হাজার এসকেইউ। সবার জন্য একই দাম।",
              )}
            </p>
          </Reveal>
        </div>

        <StaggerChildren
          className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-6"
          stagger={0.12}
        >
          {BENEFITS.map((b) => (
            <StaggerItem key={b.n} className="h-full" y={16}>
              <article className="h-full flex flex-col bg-[var(--card-bg)] text-[var(--color-ink)] rounded-[4px] p-8">
                <div
                  aria-hidden
                  className="w-[120px] h-[120px] bg-[var(--color-grain)]"
                />
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)] mt-6">
                  {b.n}
                </span>
                <h3 className="t-h5 mt-3" style={{ fontWeight: 500 }}>
                  {t(lang, b.headline, b.headlineBn)}
                </h3>
                <p className="t-body-sm mt-3">{t(lang, b.body, b.bodyBn)}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Section 5 - Powered by (single card, centered) */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "The product behind this work.", "এই কাজের পেছনের প্রোডাক্ট।")}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
          <Reveal className="h-full">
            <article className="h-full flex flex-col">
              <Image
                src="/hyperfarm%20logo.png"
                alt="Hyperfarm"
                width={1024}
                height={1024}
                sizes="120px"
                className="h-20 tablet:h-24 w-auto object-contain self-start mix-blend-multiply"
              />
              <p className="t-body mt-6">
                {t(
                  lang,
                  "The buyer's procurement desk. Order, grade, cold-chain fulfillment, and settlement on one platform.",
                  "বায়ারের সংগ্রহ ডেস্ক। অর্ডার, গ্রেডিং, কোল্ড-চেইন সরবরাহ আর সেটেলমেন্ট - সব এক প্ল্যাটফর্মে।",
                )}
              </p>
              <div className="mt-auto pt-8">
                <Link href="/products/hyperfarm" className="link-arrow">
                  {t(lang, "Open product page", "প্রোডাক্ট পৃষ্ঠা দেখুন")}
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Section 6 - In their words (ink tone per rotation). */}
      <Section tone="ink">
        <div className="mx-auto text-center max-w-[640px]">
          <Reveal>
            <blockquote
              className="!text-[var(--color-paper)] text-[20px] tablet:text-[24px] desktop:text-[28px] leading-[1.45]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              &ldquo;{t(
                lang,
                "We used to send two runners to Karwan Bazar every morning at 4 AM. We stopped the morning run six months ago. Now I check one dashboard before bed and the produce is at the kitchen by 7 AM. My head chef does not even come in for receiving anymore.",
                "আমরা প্রতিদিন ভোর 4টায় কারওয়ান বাজারে দুজন লোক পাঠাতাম। ছয় মাস আগে সকালের সেই ছোটাছুটি বন্ধ করে দিয়েছি। এখন ঘুমানোর আগে একটা ড্যাশবোর্ড দেখে নিই, আর সকাল 7টার মধ্যেই সবজি কিচেনে চলে আসে। আমার হেড শেফকে এখন আর মাল বুঝে নিতেও আসতে হয় না।",
              )}&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <figcaption className="mt-6 flex flex-col items-center">
              <span
                className="text-[14px] !text-[var(--color-paper)]"
                style={{ fontWeight: 500 }}
              >
                {t(lang, "Tanvir Ahmed", "তানভীর আহমেদ")}
              </span>
              <span className="text-[12px] !text-[rgba(255,251,234,0.6)] mt-1">
                {t(lang, "Chef-Owner, six-branch restaurant group, Dhaka", "শেফ-মালিক, ছয় শাখার রেস্তোরাঁ গ্রুপ, ঢাকা")}
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Section>

      {/* Section 7 - How it starts (surface tone per rotation). */}
      <Section tone="surface-deep">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "24 Hours from sign up to the first kitchen delivery.", "সাইন আপ থেকে প্রথম কিচেন ডেলিভারি, 24 ঘণ্টায়।")}
            </Reveal>
          </div>
          <Reveal delay={0.12} className="desktop:col-span-6 t-body-lg">
            <p>
              {t(
                lang,
                "No rollout, no pilot. Sign up on Hyperfarm, map your produce list with Fashol's restaurant team, order by 10 PM, and receive it the next morning - first conversation to first delivery in one day.",
                "কোনো ধাপে ধাপে চালু নয়, কোনো পাইলট নয়। হাইপারফার্মে সাইন আপ করুন, ফসলের রেস্তোরাঁ টিমের সাথে আপনার সবজির তালিকা মিলিয়ে নিন, রাত 10টার মধ্যে অর্ডার দিন, আর পরদিন সকালেই তা বুঝে নিন - প্রথম কথা থেকে প্রথম ডেলিভারি এক দিনেই।",
              )}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <Reveal key={s.n} className="h-full">
              <article className="h-full flex flex-col bg-[var(--card-bg)] rounded-[4px] p-6 tablet:p-8">
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[var(--color-ink-muted)]">
                  {s.n}
                </span>
                <h3 className="t-h5 mt-4" style={{ fontWeight: 500 }}>
                  {t(lang, s.headline, s.headlineBn)}
                </h3>
                <p className="t-body-sm mt-3">{t(lang, s.body, s.bodyBn)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="mt-10 tablet:mt-12">
          <Link href="/contact" className="link-arrow">
            {t(lang, "Talk to Fashol's restaurant team", "ফসলের রেস্তোরাঁ টিমের সাথে কথা বলুন")}
          </Link>
        </Reveal>
      </Section>

      {/* Section 8 - Other roles on the chain */}
      <Section tone="paper">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <div className="desktop:col-span-6">
            <Reveal as="h2" className="t-h2">
              {t(lang, "The rest of the demand side runs on Fashol too.", "চাহিদার দিকের বাকি অংশও ফসলে চলে।")}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 tablet:mt-12 grid grid-cols-1 desktop:grid-cols-3 gap-6">
          {RELATED.map((r) => (
            <Reveal key={r.name} className="h-full">
              <article className="h-full flex flex-col bg-[var(--color-grain)] rounded-[4px] p-8">
                <h3 className="t-h5" style={{ fontWeight: 500 }}>
                  {t(lang, r.name, r.nameBn)}
                </h3>
                <p className="t-body-sm mt-3">{t(lang, r.description, r.descriptionBn)}</p>
                <div className="mt-auto pt-6">
                  <Link href={r.href} className="link-arrow">
                    {t(lang, "Learn more", "আরও জানুন")}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
