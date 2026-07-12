import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

export const metadata: Metadata = {
 title: "Career",
 description:
 "Engineering, logistics, field operations, data, and capital roles at Fashol - Bangladesh's farm-to-business platform.",
};

const SPECS = [
 { k: "Districts", kbn: "জেলা", v: "09 operating", vbn: "09টি কার্যক্ষম" },
 { k: "HQ", kbn: "সদর দপ্তর", v: "Kawran Bazar, Dhaka", vbn: "কারওয়ান বাজার, ঢাকা" },
 { k: "Working model", kbn: "কর্মপদ্ধতি", v: "Hybrid · on-site for field ops", vbn: "হাইব্রিড · ফিল্ড অপারেশনে সশরীরে" },
 { k: "Languages", kbn: "ভাষা", v: "Bengali · English", vbn: "বাংলা · ইংরেজি" },
 { k: "Benefits", kbn: "সুবিধা", v: "Health · leave · share option (employees)", vbn: "স্বাস্থ্য · ছুটি · শেয়ার অপশন (কর্মীদের জন্য)" },
];

const CATEGORIES = [
 {
 no: "01",
 tag: "Engineering & Data",
 title: "Build the platform.",
 titlebn: "প্ল্যাটফর্ম গড়ুন।",
 roles: [
 { en: "Backend engineer (Node, Go)", bn: "ব্যাকএন্ড ইঞ্জিনিয়ার (Node, Go)" },
 { en: "Android engineer (Jogaan)", bn: "অ্যান্ড্রয়েড ইঞ্জিনিয়ার (যোগান)" },
 { en: "Data platform / ETL", bn: "ডেটা প্ল্যাটফর্ম / ETL" },
 { en: "Pricing & forecasting analyst", bn: "মূল্য নির্ধারণ ও পূর্বাভাস বিশ্লেষক" },
 { en: "Platform SRE", bn: "প্ল্যাটফর্ম SRE" },
 ],
 },
 {
 no: "02",
 tag: "Logistics & Ops",
 title: "Run the chain.",
 titlebn: "সাপ্লাই চেইন চালান।",
 roles: [
 { en: "Hub manager (9 districts)", bn: "হাব ম্যানেজার (9 জেলা)" },
 { en: "Fleet & route planner", bn: "ফ্লিট ও রুট প্ল্যানার" },
 { en: "Cold-chain lead", bn: "কোল্ড চেইন লিড" },
 { en: "QC inspector (Grade tier)", bn: "কিউসি পরিদর্শক (গ্রেড টিয়ার)" },
 { en: "Warehouse supervisor", bn: "গুদাম সুপারভাইজার" },
 ],
 },
 {
 no: "03",
 tag: "Field & Farmer",
 title: "Meet the grower.",
 titlebn: "কৃষকের কাছে যান।",
 roles: [
 { en: "Field agent - Satkhira, Jashore, Rajshahi, Bogura, Sylhet", bn: "মাঠকর্মী - সাতক্ষীরা, যশোর, রাজশাহী, বগুড়া, সিলেট" },
 { en: "Agronomy lead", bn: "কৃষিবিদ্যা লিড" },
 { en: "Farmer relationship officer", bn: "কৃষক সম্পর্ক কর্মকর্তা" },
 { en: "Bengali-first trainer", bn: "বাংলা-প্রধান প্রশিক্ষক" },
 ],
 },
 {
 no: "04",
 tag: "Finance · People · Growth",
 title: "Run the company.",
 titlebn: "কোম্পানি চালান।",
 roles: [
 { en: "Finance controller", bn: "ফিন্যান্স কন্ট্রোলার" },
 { en: "Credit & settlement analyst", bn: "ক্রেডিট ও সেটেলমেন্ট অ্যানালিস্ট" },
 { en: "Partnerships (export, QC)", bn: "পার্টনারশিপ (এক্সপোর্ট, কিউসি)" },
 { en: "People & talent", bn: "পিপল ও ট্যালেন্ট" },
 { en: "Communications", bn: "যোগাযোগ" },
 ],
 },
];

const BENEFITS = [
 { title: "Real impact, measured.", titlebn: "প্রকৃত প্রভাব, পরিমাপযোগ্য।", body: "Every role ties to a number on the company scoreboard - farmers onboarded, waste reduced, settlement cycle.", bodybn: "প্রতিটি পদ কোম্পানির স্কোরবোর্ডের একটি সংখ্যার সঙ্গে যুক্ত - অনবোর্ড করা কৃষক, হ্রাসকৃত অপচয়, সেটেলমেন্ট চক্র।" },
 { title: "Competitive compensation.", titlebn: "প্রতিযোগিতামূলক বেতন।", body: "Benchmarked against tech and logistics sector in Dhaka. Share option for all employees.", bodybn: "ঢাকার প্রযুক্তি ও লজিস্টিকস খাতের সঙ্গে তুলনীয়। সব কর্মীর জন্য শেয়ার অপশন।" },
 { title: "Hybrid working.", titlebn: "হাইব্রিড কর্মপদ্ধতি।", body: "Office-flexible in Dhaka. Field ops are on-site by necessity.", bodybn: "ঢাকায় অফিসের ক্ষেত্রে নমনীয়। ফিল্ড অপারেশন প্রয়োজনেই সশরীরে।" },
 { title: "Health & leave.", titlebn: "স্বাস্থ্য ও ছুটি।", body: "Full medical, parental, bereavement. 24 days leave + public holidays.", bodybn: "পূর্ণ চিকিৎসা, অভিভাবকত্ব ও শোক-ছুটি। 24 দিন ছুটি + সরকারি ছুটি।" },
 { title: "Training & growth.", titlebn: "প্রশিক্ষণ ও উন্নতি।", body: "Annual learning stipend. Internal transfers between engineering and ops encouraged.", bodybn: "বার্ষিক শিক্ষা ভাতা। ইঞ্জিনিয়ারিং ও অপারেশনসের মধ্যে অভ্যন্তরীণ বদলিতে উৎসাহ।" },
 { title: "A real mission.", titlebn: "একটি সত্যিকারের লক্ষ্য।", body: "Bangladesh's agricultural chain, rebuilt by people who were born into it. Work that lasts.", bodybn: "বাংলাদেশের কৃষি সাপ্লাই চেইন, নতুন করে গড়ছেন সেই মানুষেরাই যারা এর মধ্যেই জন্মেছেন। এমন কাজ যা টিকে থাকে।" },
];

const GALLERY = [
 { img: "gallery04", alt: "A Fashol field agent walks between rows of young paddy at first light, holding a tablet." },
 { img: "gallery05", alt: "A collection-point weighing station with cabbage sacks stacked beside a digital scale and clipboard." },
 { img: "gallery03", alt: "A hub team member in a Fashol branded shirt checks a paperback register against a handheld device." },
 { img: "gallery06", alt: "Workers load white sacks of fresh vegetables into the back of a refrigerated truck parked at a rural hub gate." },
 { img: "gallery02", alt: "A group of farmers in the field speak with a Fashol agent beside a cabbage patch." },
 { img: "gallery07", alt: "A Fashol hub team sits around a long table for a debrief at end of day." },
];

export default async function CareerPage() {
 const lang = await getLang();
 return (
 <><PageHeader
 eyebrow={t(lang, "§ Career", "§ ক্যারিয়ার")}
 title={t(lang, "Work on the supply chain that feeds Bangladesh.", "বাংলাদেশকে খাওয়ায় যে সাপ্লাই চেইন, তাতে কাজ করুন।")}
 lede={t(lang, "Engineers, field agents, drivers, warehouse leads, data analysts, and finance partners across nine districts and three countries. Roles below are active this quarter; full listings on our hiring portal.", "নয় জেলা ও তিন দেশজুড়ে ইঞ্জিনিয়ার, ফিল্ড এজেন্ট, ড্রাইভার, ওয়্যারহাউস লিড, ডেটা অ্যানালিস্ট ও ফিন্যান্স পার্টনার। নিচের পদগুলো এই কোয়ার্টারে অ্যাক্টিভ; পূর্ণ তালিকা আমাদের হায়ারিং পোর্টালে।")}
 />

 {/* Specs + team photo */}
 <Section tone="surface" size="sm">
 <div className="grid desktop:grid-cols-12 gap-10 items-start">
 <div className="desktop:col-span-5">
 <div className="grid grid-cols-1 gap-y-4">
 {SPECS.map((s) => (
 <div key={s.k} className="border-t border-[var(--color-line)] pt-3 flex justify-between gap-4">
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)] shrink-0">{t(lang, s.k, s.kbn)}</span>
 <span className="t-body-sm text-right">{t(lang, s.v, s.vbn)}</span>
 </div>
 ))}
 </div>
 </div>
 <div className="desktop:col-span-7">
 <div className="relative aspect-[3/2] rounded-3xl overflow-hidden">
 <Image
 src="/images/content/gallery01.jpg"
 alt="The Fashol company team at an agricultural event, standing and kneeling in Fashol.com green shirts with a vegetable arrangement at their feet."
 fill
 sizes="(min-width: 1200px) 720px, 90vw"
 className="object-cover"
 />
 </div>
 <p className="mt-4 t-caption">
 {t(lang, "Company offsite, agricultural awareness day. Bangladesh, 2024.", "কোম্পানি অফসাইট, কৃষি সচেতনতা দিবস। বাংলাদেশ, 2024।")}
 </p>
 </div>
 </div>
 </Section>

 {/* Role categories */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 mt-8">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 {t(lang, "Four disciplines. A platform and a fleet, not a software company.", "চারটি দক্ষতা। একটি প্ল্যাটফর্ম ও একটি বহর, নিছক সফটওয়্যার কোম্পানি নয়।")}
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 {t(lang, "Half our team runs in the field. The other half builds the software it runs on. We hire both with equal care.", "আমাদের দলের অর্ধেক কাজ করে মাঠে। বাকি অর্ধেক গড়ে সেই সফটওয়্যার যার ওপর ভর করে তা চলে। দুই দলকেই আমরা সমান যত্নে নিয়োগ দিই।")}
 </Reveal>
 </div>

 <div className="grid tablet:grid-cols-2 gap-6 mt-14">
 {CATEGORIES.map((c) => (
 <div key={c.no} className="card-plain p-8 flex flex-col gap-5">
 <h3 className="t-h3">{t(lang, c.title, c.titlebn)}</h3>
 <ul className="mt-2 space-y-2">
 {c.roles.map((r) => (
 <li key={r.en} className="flex items-baseline gap-3 t-body">
 <span className="w-1 h-1 rounded-full bg-[var(--color-ink)] mt-2 shrink-0" />
 {t(lang, r.en, r.bn)}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 <div className="mt-10">
 <Button variant="primary" href="https://hr.fashol.com/jobs" external>
 {t(lang, "Browse open positions on hr.fashol.com", "hr.fashol.com-এ খোলা পদ দেখুন")}
 </Button>
 </div>
 </Section>

 {/* Benefits */}
 <Section tone="surface">
 <Reveal as="h2" className="t-h2 mt-6 max-w-3xl">{t(lang, "Clear work, specific impact, a team that ships.", "স্পষ্ট কাজ, নির্দিষ্ট প্রভাব, এমন একটি দল যারা কাজ শেষ করে ছাড়ে।")}</Reveal>
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-x-10 gap-y-12 mt-14 border-t border-[var(--color-line-strong)] pt-12">
 {BENEFITS.map((b) => (
 <div key={b.title}>
 <h3 className="t-h5" style={{ fontWeight: 500 }}>{t(lang, b.title, b.titlebn)}</h3>
 <p className="t-body mt-3">{t(lang, b.body, b.bodybn)}</p>
 </div>
 ))}
 </div>
 </Section>

 {/* In the field - image grid */}
 <Section tone="paper">
 <Reveal as="h2" className="t-h2 mt-6 max-w-3xl">{t(lang, "Life across the Fashol network.", "ফসল নেটওয়ার্কজুড়ে জীবন।")}</Reveal>

 <div className="mt-14 grid grid-cols-2 tablet:grid-cols-3 gap-4 tablet:gap-5">
 {GALLERY.map((g, i) => (
 <Reveal key={g.img} delay={i * 0.08}>
 <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-surface)]">
 <Image
 src={`/images/content/${g.img}.jpeg`}
 alt={g.alt}
 fill
 sizes="(min-width: 810px) 33vw, 50vw"
 className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
 />
 </div>
 </Reveal>
 ))}
 </div>
 </Section>

 {/* Apply CTA */}
 <Section tone="ink">
 <Reveal as="h2" className="t-h2 mt-6 max-w-3xl">{t(lang, "Ready to join the team?", "দলে যোগ দিতে প্রস্তুত?")}</Reveal>

 <div className="grid tablet:grid-cols-3 gap-6 mt-14">
 {[
 { n: "01", title: t(lang, "See open roles", "খোলা পদ দেখুন"), b: t(lang, "Live listings on hr.fashol.com. Updated weekly.", "hr.fashol.com-এ সরাসরি তালিকা। সাপ্তাহিক হালনাগাদ।"), href: "https://hr.fashol.com/jobs", external: true },
 { n: "02", title: t(lang, "Speculative application", "স্বপ্রণোদিত আবেদন"), b: t(lang, "Role unlisted? Email us with a clear note of what you'd do.", "পদ তালিকায় নেই? আপনি কী করবেন তার স্পষ্ট বিবরণসহ আমাদের ইমেইল করুন।"), href: "mailto:careers@fashol.com" },
 { n: "03", title: t(lang, "Learn more first", "আগে আরও জানুন"), b: t(lang, "Founders, timeline, and operating principles on the About page.", "প্রতিষ্ঠাতা, সময়রেখা ও পরিচালন নীতি রয়েছে পরিচিতি পৃষ্ঠায়।"), href: "/about" },
 ].map((c) => (
 <div key={c.n} className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4">
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{c.title}</h3>
 <p className="t-body !text-[rgba(255,255,255,0.7)]">{c.b}</p>
 <div className="mt-auto pt-4">
 <Button variant="on-dark" href={c.href} external={c.external}>{t(lang, "Open", "খুলুন")}</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>
 </>
 );
}
