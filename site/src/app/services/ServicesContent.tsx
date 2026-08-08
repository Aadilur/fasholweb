"use client";

import { useLang } from "@/components/site/LanguageProvider";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";


const SPECS: Array<[string, string, string, string]> = [
 ["App", "অ্যাপ", "যোগান · Jogaan · Android", "যোগান · Jogaan · অ্যান্ড্রয়েড"],
 ["Language", "ভাষা", "Bengali (primary) · English", "বাংলা (প্রধান) · ইংরেজি"],
 ["Users", "ব্যবহারকারী", "60,000+ farmers · 7,000+ buyers · 140 field agents", "60,000+ কৃষক · 7,000+ বায়ার · 140 ফিল্ড এজেন্ট"],
 ["Modules", "মডিউল", "06", "06"],
 ["Settlement", "সেটেলমেন্ট", "Within 24 h of weigh-in - named bank / bKash", "ওজন শেষে 24 ঘণ্টার মধ্যে - নির্দিষ্ট ব্যাংক / বিকাশ"],
 ["Coverage", "কভারেজ", "9 districts · expanding to 15 in 2026", "9 জেলা · 2026 সালে 15 জেলায় সম্প্রসারণ"],
];

type Service = {
 id: string;
 no: string;
 title: string;
 titleBn: string;
 sub: string;
 subBn: string;
 image: string;
 alt: string;
 body: string[];
 bodyBn: string[];
 specs: Array<[string, string, string, string]>;
};

const SERVICES: Service[] = [
 {
 id: "farm-to-market",
 no: "01",
 title: "Farm-to-market platform",
 titleBn: "খামার-থেকে-বাজার প্ল্যাটফর্ম",
 sub: "Direct matching, farmer to buyer.",
 subBn: "কৃষক থেকে বায়ার, সরাসরি ম্যাচিং।",
 image: "/images/content/farmer-cabbage.jpg",
 alt: "A registered farmer holding a cabbage in a Fashol.com branded shirt at harvest in the field.",
 body: [
 "The base layer. Farmers list crop, quantity, harvest window, and price on Jogaan; buyers post demand. The platform matches them directly - no aratdars, no price opacity, no delayed settlement.",
 "Pricing is visible to both sides from the point of agreement. Every transaction logs against a farmer ID they own and can show to banks, extension officers, or offtakers.",
 ],
 bodyBn: [
 "মূল ভিত্তি। কৃষকরা যোগান-এ ফসল, পরিমাণ, ফসল তোলার সময় ও দাম লিস্ট করেন; বায়াররা চাহিদা জানান। প্ল্যাটফর্ম তাদের সরাসরি ম্যাচ করে দেয় - কোনো আড়তদার নেই, দামে কোনো ধোঁয়াশা নেই, সেটেলমেন্টে কোনো দেরি নেই।",
 "চুক্তির মুহূর্ত থেকেই দাম দুই পক্ষের কাছেই দেখা যায়। প্রতিটি ট্রানজেকশন কৃষকের নিজস্ব একটি আইডিতে রেকর্ড হয়, যা তিনি ব্যাংক, কৃষি সম্প্রসারণ কর্মকর্তা বা বায়ারদের দেখাতে পারেন।",
 ],
 specs: [
 ["Tag", "ট্যাগ", "Fashol · B2B", "ফসল · B2B"],
 ["Users", "ব্যবহারকারী", "60,000+ farmers · 7,000+ buyers", "60,000+ কৃষক · 7,000+ বায়ার"],
 ["Coverage", "কভারেজ", "09 districts, BD", "09 জেলা, বাংলাদেশ"],
 ["Settlement", "সেটেলমেন্ট", "Within 24 hours of weighing", "ওজন শেষে 24 ঘণ্টার মধ্যে"],
 ],
 },
 {
 id: "logistics",
 no: "02",
 title: "Smart logistics network",
 titleBn: "স্মার্ট লজিস্টিকস নেটওয়ার্ক",
 sub: "Cold chain where it was never built.",
 subBn: "যেখানে কখনও গড়ে ওঠেনি, সেখানে কোল্ড চেইন।",
 image: "/images/content/warehouse.jpg",
 alt: "A cold-storage warehouse interior with orange racking and goods stacked in aisles.",
 body: [
 "Last-mile pickup and cold-chain dispatch reach forty-plus district hubs, many in climate-vulnerable coastal and riverine belts with no prior cold chain.",
 "The platform plans routes; company fleet and partner operators run them. Temperature and dwell-time are logged per crate, so a buyer knows how long a kilo of tomato sat out of cold.",
 ],
 bodyBn: [
 "লাস্ট-মাইল পিকআপ ও কোল্ড-চেইন ডেলিভারি চল্লিশের বেশি জেলা হাবে পৌঁছায়, যার অনেকগুলো জলবায়ু-ঝুঁকিপূর্ণ উপকূলীয় ও নদীবেষ্টিত অঞ্চলে, যেখানে আগে কখনও কোল্ড চেইন ছিল না।",
 "প্ল্যাটফর্ম রুট প্ল্যান করে; কোম্পানির নিজস্ব ফ্লিট ও পার্টনার অপারেটররা তা চালায়। প্রতিটি ক্রেটের তাপমাত্রা ও অপেক্ষার সময় লগ হয়, ফলে একজন বায়ার জানতে পারেন এক কেজি টমেটো কতক্ষণ ঠান্ডার বাইরে ছিল।",
 ],
 specs: [
 ["Tag", "ট্যাগ", "Fleet · Route", "ফ্লিট · রুট"],
 ["Hubs", "হাব", "40+ distribution hubs", "40+ ডিস্ট্রিবিউশন হাব"],
 ["Waste", "অপচয়", "−26% vs. traditional route", "−26% (প্রচলিত রুটের তুলনায়)"],
 ["Partners", "পার্টনার", "DITECH (perishables)", "DITECH (পচনশীল পণ্য)"],
 ],
 },
 {
 id: "buyer-solutions",
 no: "03",
 title: "Buyer solutions",
 titleBn: "বায়ার সলিউশন",
 sub: "Ordering, inventory, and fulfilment for four buyer classes.",
 subBn: "চার ধরনের বায়ারের জন্য অর্ডার, ইনভেন্টরি ও ডেলিভারি।",
 image: "/images/content/market-women.jpg",
 alt: "Women selling fresh vegetables at a subcontinental market.",
 body: [
 "Buyers - MSMEs, quick-commerce operators, exporters, wholesalers - use a tailored ordering interface with live inventory, tier-graded produce, and delivery-window visibility.",
 "Bulk and recurring orders are supported. Foodpanda, Chaldal, Daraz, and Domino's are among the 7,000+ buyer accounts currently on the platform.",
 ],
 bodyBn: [
 "বায়াররা - এমএসএমই, কুইক-কমার্স অপারেটর, এক্সপোর্টার, পাইকার - একটি কাস্টম অর্ডার ইন্টারফেস ব্যবহার করেন, যেখানে থাকে লাইভ ইনভেন্টরি, গ্রেড করা প্রোডাক্ট এবং ডেলিভারি উইন্ডোর স্পষ্ট তথ্য।",
 "বাল্ক ও রেগুলার অর্ডার সাপোর্টেড। এখন প্ল্যাটফর্মে থাকা 7,000+ বায়ার অ্যাকাউন্টের মধ্যে রয়েছে ফুডপান্ডা, চালডাল, দারাজ এবং ডোমিনো'স।",
 ],
 specs: [
 ["Tag", "ট্যাগ", "SaaS · Retail", "SaaS · রিটেইল"],
 ["Classes", "শ্রেণি", "MSME / Quick commerce / Export / Wholesale", "এমএসএমই / কুইক কমার্স / এক্সপোর্ট / পাইকারি"],
 ["Known buyers", "পরিচিত বায়ার", "Foodpanda, Chaldal, Daraz, Domino's, US-Bangla", "ফুডপান্ডা, চালডাল, দারাজ, ডোমিনো'স, ইউএস-বাংলা"],
 ["SLA", "এসএলএ", "Same-day & next-day windows", "একই দিন ও পরদিন ডেলিভারি"],
 ],
 },
 {
 id: "market-intelligence",
 no: "04",
 title: "Market intelligence",
 titleBn: "বাজার তথ্য বিশ্লেষণ",
 sub: "Real-time pricing, made available to the grower.",
 subBn: "রিয়েল-টাইম দাম, কৃষকের হাতের নাগালে।",
 image: "/images/content/market-aerial-bd.jpg",
 alt: "Aerial view of a bustling outdoor vegetable market in rural Bangladesh.",
 body: [
 "The same price signals commodity desks and urban wholesalers rely on - published daily to Jogaan in Bengali, with a seven-day trailing chart and twelve-month seasonal comparison.",
 "The audience is smallholder growers in climate-vulnerable districts for whom a day-late price signal is a week-late planting decision.",
 ],
 bodyBn: [
 "যে দামের সিগন্যালের ওপর কমোডিটি ডেস্ক ও শহরের পাইকাররা ভরসা করেন - সেটাই প্রতিদিন বাংলায় যোগান-এ পাবলিশ হয়, সঙ্গে থাকে সাত দিনের ট্রেইলিং চার্ট ও বারো মাসের সিজনাল তুলনা।",
 "এর টার্গেট জলবায়ু-ঝুঁকিপূর্ণ জেলার প্রান্তিক কৃষক, যাদের জন্য এক দিন দেরিতে পাওয়া দামের সিগন্যাল মানে এক সপ্তাহ দেরিতে নেওয়া চাষের সিদ্ধান্ত।",
 ],
 specs: [
 ["Tag", "ট্যাগ", "Data · Pricing", "ডেটা · দাম"],
 ["Update", "আপডেট", "Daily, every mandi", "প্রতিদিন, প্রতিটি মান্ডিতে"],
 ["Languages", "ভাষা", "Bengali (primary), English", "বাংলা (প্রধান), ইংরেজি"],
 ["Published", "পাবলিশড", "Jogaan app · SMS alerts", "যোগান অ্যাপ · এসএমএস অ্যালার্ট"],
 ],
 },
 {
 id: "quality-assurance",
 no: "05",
 title: "Quality assurance",
 titleBn: "কোয়ালিটি অ্যাসুরেন্স",
 sub: "A four-tier grade applied at hub intake.",
 subBn: "হাবে প্রোডাক্ট নেওয়ার সময়েই চার স্তরের গ্রেডিং।",
 image: "/images/content/farmer-watering.jpg",
 alt: "A farmer waters eggplant crops in a field at daylight.",
 body: [
 "Produce is graded on weight, visual defect, storage-life, and provenance before it leaves the district. Grading happens at the hub, not the urban wholesale market as elsewhere - the origin of most adulteration.",
 "Grade A goes to exporters and quick commerce; Grade B to MSMEs; Grade C to wholesale; Grade D is rejected and routed to animal feed or compost contractors.",
 ],
 bodyBn: [
 "জেলা ছাড়ার আগেই প্রোডাক্টকে ওজন, দৃশ্যমান ত্রুটি, সংরক্ষণক্ষমতা ও উৎস অনুযায়ী গ্রেড করা হয়। গ্রেডিং হয় হাবেই, অন্যত্র যেমন শহরের পাইকারি বাজারে হয় তেমন নয় - যেখানেই বেশিরভাগ ভেজালের শুরু।",
 "গ্রেড A যায় এক্সপোর্টার ও কুইক কমার্সে; গ্রেড B যায় এমএসএমই-তে; গ্রেড C যায় পাইকারিতে; গ্রেড D বাতিল হয়ে পশুখাদ্য বা কম্পোস্ট ঠিকাদারের কাছে যায়।",
 ],
 specs: [
 ["Tag", "ট্যাগ", "Grade · QC", "গ্রেড · QC"],
 ["Tiers", "স্তর", "A / B / C / D", "A / B / C / D"],
 ["Applied", "প্রয়োগ", "At hub intake, before dispatch", "হাবে গ্রহণের সময়, পাঠানোর আগে"],
 ["Audit", "অডিট", "Quarterly, third-party", "ত্রৈমাসিক, তৃতীয় পক্ষ"],
 ],
 },
 {
 id: "financial-solvency",
 no: "06",
 title: "Financial solvency",
 titleBn: "আর্থিক সচ্ছলতা",
 sub: "Twenty-four-hour settlement. Credit against a registered track record.",
 subBn: "চব্বিশ ঘণ্টায় সেটেলমেন্ট। রেজিস্টার্ড ট্র্যাক রেকর্ডের বিপরীতে ঋণ।",
 image: "/images/content/farmer-sowing.jpg",
 alt: "A farmer in an orange shirt sowing seed in a paddy field.",
 body: [
 "Farmers are paid through mobile financial services (upay, bKash, Nagad) within 24 hours of weighing - against a traditional 2-to-6-week cycle.",
 "Farmers with a twelve-month track record qualify for seasonal credit from banking partners, underwritten against their registered volumes rather than their land.",
 ],
 bodyBn: [
 "কৃষকরা মোবাইল মানি সার্ভিসের (উপায়, বিকাশ, নগদ) মাধ্যমে ওজন শেষে 24 ঘণ্টার মধ্যে টাকা পান - প্রচলিত 2 থেকে 6 সপ্তাহের সাইকেলের বিপরীতে।",
 "বারো মাসের ট্র্যাক রেকর্ড থাকা কৃষকরা ব্যাংকিং পার্টনারদের কাছ থেকে সিজনাল ঋণের যোগ্য হন, যা তাদের জমির নয় বরং রেজিস্টার্ড পরিমাণের বিপরীতে দেওয়া হয়।",
 ],
 specs: [
 ["Tag", "ট্যাগ", "Payments · Credit", "পেমেন্ট · ঋণ"],
 ["Rails", "মাধ্যম", "upay · bKash · Nagad", "উপায় · বিকাশ · নগদ"],
 ["Banking", "ব্যাংকিং", "Dutch-Bangla Bank (settlement)", "ডাচ্-বাংলা ব্যাংক (সেটেলমেন্ট)"],
 ["Cycle", "সাইকেল", "≤24 hours from weighing", "ওজন থেকে ≤24 ঘণ্টা"],
 ],
 },
];


export function ServicesContent() {
  const lang = useLang();
 return (
 <><PageHeader
 eyebrow="যোগান Jogaan"
 title={lang === "bn"
 ? <>প্ল্যাটফর্মটি <em>আসলে</em> কৃষকের হাতের একটি অ্যাপ।</>
 : <>The platform <em>is</em> an app in the farmer&apos;s hand.</>}
 lede={lang === "bn"
 ? (
 <>
 ফসলের প্রতিটি সার্ভিস - অনবোর্ডিং, দাম নির্ধারণ, সংগ্রহ, গ্রেডিং, সেটেলমেন্ট এবং অর্ডার বুক - পরিচালিত হয়
 <em> যোগান</em>-এর মাধ্যমে, যা বাংলা-প্রথম একটি অ্যান্ড্রয়েড অ্যাপ; আমাদের ফিল্ড এজেন্টরা এটি সঙ্গে রাখেন আর প্রতিদিন
 সন্ধ্যা 19:00-এ আমাদের কৃষকরা এতে একটি নোটিফিকেশন পান। নিচের ছয়টি মডিউল হলো সেই কাজ যা এই অ্যাপের পেছনে রয়েছে।
 </>
 )
 : (
 <>
 Every Fashol service - onboarding, pricing, collection, grading, settlement, and order book - runs through
 <em> Jogaan</em>, the Bengali-first Android app our field agents carry and our farmers receive a notification
 from at 19:00 each evening. The six modules below are the work that sits behind the app.
 </>
 )}
 />

 {/* Specs + Jogaan screens */}
 <Section tone="surface" size="sm">
 <div className="grid desktop:grid-cols-12 gap-10 items-start">
 <div className="desktop:col-span-5">
 <div className="grid grid-cols-1 gap-y-5">
 {SPECS.map(([kEn, kBn, vEn, vBn]) => (
 <div key={kEn} className="border-t border-[var(--color-line)] pt-3 flex justify-between gap-4">
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)] shrink-0">{t(lang, kEn, kBn)}</span>
 <span className="t-body-sm text-right">{t(lang, vEn, vBn)}</span>
 </div>
 ))}
 </div>
 </div>

 <div className="desktop:col-span-7 grid grid-cols-3 gap-4">
 {["jogaan-1", "jogaan-2", "jogaan-3"].map((s, i) => (
 <div key={s} className="relative aspect-[9/16] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-layered)]">
 <Image
 src={`/images/content/${s}.png`}
 alt={["Jogaan app - farmer registration screen, Bengali-first.", "Jogaan app - next-day offer price and collection slot.", "Jogaan app - settlement confirmation and payout."][i]}
 fill
 sizes="(min-width: 1200px) 240px, 30vw"
 className="object-cover"
 />
 </div>
 ))}
 </div>
 </div>
 <p className="mt-8 t-caption">
 {t(lang, "Three Jogaan screens, left to right: onboarding, next-day offer, settlement.", "যোগান-এর তিনটি স্ক্রিন, বাঁ থেকে ডানে: অনবোর্ডিং, পরদিনের অফার, সেটেলমেন্ট।")}
 </p>
 </Section>

 {/* Services */}
 <Section tone="paper">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">{t(lang, "Each module below runs in production today.", "নিচের প্রতিটি মডিউল আজ প্রোডাকশনে চালু রয়েছে।")}</Reveal>

 <div className="mt-20 space-y-20 desktop:space-y-28">
 {SERVICES.map((s, i) => {
 const flip = i % 2 === 1;
 return (
 <div key={s.id} id={s.id} className="grid desktop:grid-cols-12 gap-10 items-start scroll-mt-28">
 <Reveal className={`desktop:col-span-6 ${flip ? "desktop:order-2" : ""}`}>
 <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
 <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1200px) 560px, 90vw" className="object-cover" />
 </div>
 </Reveal>
 <div className="desktop:col-span-6">
 <Reveal>
 <div className="flex items-baseline gap-4">
 <span className="t-mono text-[11px] text-[var(--color-terracotta)]">{s.no}</span>
 <Eyebrow>{t(lang, `Service ${s.no}`, `সার্ভিস ${s.no}`)}</Eyebrow>
 </div>
 <h3 className="t-h3 mt-4">{t(lang, s.title, s.titleBn)}</h3>
 <p className="t-h5 mt-4 !text-[var(--color-ink-subtle)]" style={{ fontWeight: 400 }}>{t(lang, s.sub, s.subBn)}</p>
 </Reveal>
 <Reveal delay={0.08} className="mt-8 space-y-4 t-body">
 {s.body.map((p, j) => <p key={j}>{t(lang, p, s.bodyBn[j])}</p>)}
 </Reveal>
 <Reveal delay={0.16} className="mt-8 grid grid-cols-2 gap-y-4">
 {s.specs.map(([kEn, kBn, vEn, vBn]) => (
 <div key={kEn} className="border-t border-[var(--color-line)] pt-3">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{t(lang, kEn, kBn)}</div>
 <div className="t-body-sm mt-1">{t(lang, vEn, vBn)}</div>
 </div>
 ))}
 </Reveal>
 </div>
 </div>
 );
 })}
 </div>
 </Section>

 {/* Jogaan panel */}
 <Section tone="ink">
 <div className="grid desktop:grid-cols-12 gap-10 items-center">
 <div className="desktop:col-span-7">
 <h2 className="t-h2 mt-6 max-w-2xl">
 <span className="lang-bn">যোগান</span>{t(lang, " - Jogaan. The app the field runs on.", " - Jogaan. মাঠ যে অ্যাপে চলে।")}
 </h2>
 <p className="t-body-lg !text-[rgba(255,255,255,0.75)] mt-6 max-w-2xl">
 {t(lang, 'Bengali verb meaning "to supply." Built for field agents and farmers who handle registration, price lock, collection, and payment on one device.', 'বাংলা ক্রিয়া, যার অর্থ "সরবরাহ করা।" রেজিস্ট্রেশন, দাম নির্ধারণ, সংগ্রহ ও পেমেন্ট এক ডিভাইসেই সামলান এমন ফিল্ড এজেন্ট ও কৃষকদের জন্য তৈরি।')}
 </p>
 <p className="t-body-lg !text-[rgba(255,255,255,0.75)] mt-4">
 {t(lang, "On Google Play for Android 7.0+. Full Bengali localisation; English optional. Field-tested with agents and farmers who had never used a smartphone before.", "অ্যান্ড্রয়েড 7.0+ এর জন্য Google Play-তে উপলব্ধ। ফুল বাংলা লোকালাইজেশন; ইংরেজি অপশনাল। যারা আগে কখনও স্মার্টফোন ব্যবহার করেননি এমন ফিল্ড এজেন্ট ও কৃষকদের সঙ্গে মাঠপর্যায়ে টেস্ট করা।")}
 </p>
 <div className="mt-8 grid grid-cols-2 tablet:grid-cols-4 gap-6 t-mono text-[11px] !text-[rgba(255,255,255,0.7)]">
 <div><div>{t(lang, "Platform", "প্ল্যাটফর্ম")}</div><div className="text-white mt-1">{t(lang, "Android 7.0+", "অ্যান্ড্রয়েড 7.0+")}</div></div>
 <div><div>{t(lang, "Audience", "অডিয়েন্স")}</div><div className="text-white mt-1">{t(lang, "Agents · farmers", "এজেন্ট · কৃষক")}</div></div>
 <div><div>{t(lang, "Languages", "ভাষা")}</div><div className="text-white mt-1">{t(lang, "Bengali · English", "বাংলা · ইংরেজি")}</div></div>
 <div><div>{t(lang, "Version", "ভার্সন")}</div><div className="text-white mt-1">v 3.2 · 2026.02</div></div>
 </div>
 <div className="mt-10">
 <Button variant="primary" href="https://play.google.com/store/apps/details?id=com.fashol.agent" external>
 {t(lang, "Install on Google Play", "Google Play-তে ইনস্টল করুন")}
 </Button>
 </div>
 </div>
 <div className="desktop:col-span-5 relative aspect-[9/16] max-w-sm mx-auto w-full">
 <Image
 src="/images/content/jogaan-2.png"
 alt="Jogaan app - pricing and collection screen."
 fill
 sizes="(min-width: 1200px) 380px, 80vw"
 className="object-cover rounded-3xl border border-[rgba(255,255,255,0.15)]"
 />
 </div>
 </div>
 </Section>

 {/* Onboard CTA triad */}
 <Section tone="surface">
 <Reveal as="h2" className="t-h2 mt-6 max-w-3xl">{t(lang, "Start with one service. Or all six.", "একটি সার্ভিস দিয়ে শুরু করুন। কিংবা ছয়টিই।")}</Reveal>
 <div className="grid tablet:grid-cols-3 gap-6 mt-14">
 {[
 { n: "01", t: "Register as farmer", tBn: "কৃষক হিসেবে রেজিস্টার করুন", b: "Bring your last season's records. WhatsApp a field agent.", bBn: "গত মৌসুমের রেকর্ড সঙ্গে আনুন। একজন ফিল্ড এজেন্টকে হোয়াটসঅ্যাপ করুন।", href: "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20register%20as%20a%20farmer%20with%20Fashol." },
 { n: "02", t: "Open a buyer account", tBn: "বায়ার অ্যাকাউন্ট খুলুন", b: "MSME, QC, exporter, wholesale - 10-minute set-up.", bBn: "এমএসএমই, কিউসি, এক্সপোর্টার, পাইকার - 10 মিনিটে সেটআপ।", href: "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20open%20a%20buyer%20account%20with%20Fashol." },
 { n: "03", t: "Integration & partnerships", tBn: "ইন্টিগ্রেশন ও পার্টনারশিপ", b: "Logistics, cold chain, financial rails, NGO partners.", bBn: "লজিস্টিকস, কোল্ড চেইন, ফাইন্যান্সিয়াল রেল, এনজিও পার্টনার।", href: "/contact" },
 ].map((c) => (
 <div key={c.n} className="card-plain p-8 flex flex-col gap-4">
 <span className="t-mono text-[11px] text-[var(--color-terracotta)]">{c.n}</span>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{t(lang, c.t, c.tBn)}</h3>
 <p className="t-body">{t(lang, c.b, c.bBn)}</p>
 <div className="mt-auto pt-4">
 <Button variant="primary" href={c.href} external={c.href.startsWith("http")}>{t(lang, "Continue", "এগিয়ে যান")}</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>
 </>
 );
}
