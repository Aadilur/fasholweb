"use client";

import { useLang } from "@/components/site/LanguageProvider";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";


const SPECS = [
 { k: "Legal entity", kbn: "আইনি সত্তা", v: "Fashol Dotcom Limited (BD) · Fashol Singapore Pte Ltd (SG)", vbn: "ফসল ডটকম লিমিটেড (BD) · ফসল সিঙ্গাপুর প্রাইভেট লিমিটেড (SG)" },
 { k: "Founded", kbn: "প্রতিষ্ঠা", v: "2019", vbn: "2019" },
 { k: "HQ", kbn: "সদর দপ্তর", v: "130 Kabbokash, Kawran Bazar, Dhaka 1215", vbn: "130 কব্বোকাশ, কারওয়ান বাজার, ঢাকা 1215" },
 { k: "Offices", kbn: "কার্যালয়", v: "Bangladesh · Singapore · UAE", vbn: "বাংলাদেশ · সিঙ্গাপুর · সংযুক্ত আরব আমিরাত" },
 { k: "Farmers", kbn: "কৃষক", v: "60,000+ registered", vbn: "60,000+ নিবন্ধিত" },
 { k: "Buyers", kbn: "বায়ার", v: "7,000+ active", vbn: "7,000+ অ্যাক্টিভ" },
 { k: "Stage", kbn: "পর্যায়", v: "Series A in progress", vbn: "সিরিজ A চলমান" },
];

const FOUNDERS = [
 {
 no: "01",
 role: "Co-founder & CEO",
 rolebn: "সহ-প্রতিষ্ঠাতা ও সিইও",
 name: "Sakib Hossain",
 image: "/images/content/sakib-hossain.png",
 quote: "I want to deliver potatoes on Mars.",
 quotebn: "আমি মঙ্গলগ্রহে আলু পৌঁছে দিতে চাই।",
 bio: "Previously @aladinkids, @printvaly @gazzeto. Forbes 30u30",
 biobn: "পূর্বে @aladinkids, @printvaly @gazzeto। ফোর্বস 30u30",
 },
 {
 no: "02",
 role: "Co-Founder & COO",
 rolebn: "সহ-প্রতিষ্ঠাতা ও সিওও",
 name: "Mamunur Rashid",
 image: "/images/content/mamunur-rashid.jpg",
 quote: "We are building the infrastructure that defines how food moves.",
 quotebn: "আমরা এমন অবকাঠামো গড়ছি যা ঠিক করে দেবে খাদ্য কীভাবে চলাচল করবে।",
 bio: "Previously @BAT, @Tap n Pay @Surecash",
 biobn: "পূর্বে @BAT, @Tap n Pay @Surecash",
 },
 {
 no: "03",
 role: "Co-Founder & CFO",
 rolebn: "সহ-প্রতিষ্ঠাতা ও সিএফও",
 name: "Numair Hussain",
 image: "/images/content/numair-hussain.jpg",
 quote: "Let us champion equitable income for farmers.",
 quotebn: "আসুন কৃষকের ন্যায্য আয়ের পক্ষে দাঁড়াই।",
 bio: "Previously @Roche, Experience in working EU, USA & South-Africa markets",
 biobn: "পূর্বে @Roche, ইইউ, যুক্তরাষ্ট্র ও দক্ষিণ আফ্রিকার বাজারে কাজের অভিজ্ঞতা",
 },
];

const TIMELINE = [
 { date: "2019.06", head: "Fashol Dotcom Limited incorporated.", headbn: "ফসল ডটকম লিমিটেড নিবন্ধিত হয়।", body: "First hub opened in Satkhira. Four farmers, one collection agent, a single pickup van.", bodybn: "সাতক্ষীরায় প্রথম হাব চালু। চারজন কৃষক, একজন কালেকশন এজেন্ট, একটিমাত্র পিকআপ ভ্যান।" },
 { date: "2020.03", head: "Jashore & Khulna expansion.", headbn: "যশোর ও খুলনায় সম্প্রসারণ।", body: "First cold-storage node online. Onboarding crosses 500 farmers.", bodybn: "প্রথম কোল্ড স্টোরেজ নোড চালু। অনবোর্ডিং 500 কৃষক ছাড়াল।" },
 { date: "2021.11", head: "Jogaan app released (v1.0).", headbn: "যোগান অ্যাপ প্রকাশিত (v1.0)।", body: "Field agents move to digital records. Paper ledgers retired within two months.", bodybn: "মাঠকর্মীরা ডিজিটাল রেকর্ডে সরে এলেন। দুই মাসের মধ্যেই কাগজের খাতা বিদায় নিল।" },
 { date: "2022.02", head: "Dekko ISHO Technologies - strategic investment.", headbn: "ডেক্কো ইশো টেকনোলজিস - কৌশলগত বিনিয়োগ।", body: "Supply-chain partnership formalized for perishables across Chittagong division.", bodybn: "চট্টগ্রাম বিভাগজুড়ে পচনশীল পণ্যের জন্য সাপ্লাই চেইন পার্টনারশিপ আনুষ্ঠানিক রূপ পেল।" },
 { date: "2023.04", head: "$1M pre-seed closed.", headbn: "$1M প্রি-সিড সম্পন্ন।", body: "Lead: SOSV. Participation: South Asia Tech Partners, Ambareen Reza & Zubair Siddiky (Foodpanda).", bodybn: "নেতৃত্বে: SOSV। অংশগ্রহণে: South Asia Tech Partners, Ambareen Reza ও Zubair Siddiky (Foodpanda)।" },
 { date: "2023.11", head: "e-Commerce Movers Award (eCMA).", headbn: "e-Commerce Movers Award (eCMA)।", body: "Recognition from the e-Commerce Association of Bangladesh (e-CAB).", bodybn: "e-Commerce Association of Bangladesh (e-CAB) থেকে স্বীকৃতি।" },
 { date: "2024.02", head: "11,000 new farmers onboarded.", headbn: "11,000 নতুন কৃষক অন্তর্ভুক্ত।", body: "Covered by Prothom Alo from a field visit in Satkhira.", bodybn: "সাতক্ষীরায় মাঠ পরিদর্শন থেকে প্রথম আলোর প্রতিবেদন।" },
 { date: "2024.07", head: "AgFunder GROW Impact Accelerator - Cohort 5.", headbn: "AgFunder GROW Impact Accelerator - পঞ্চম কোহর্ট।", body: "Selected for the fifth cohort of GROW, focusing on food-price stability and post-harvest loss.", bodybn: "GROW-এর পঞ্চম কোহর্টে নির্বাচিত, লক্ষ্য খাদ্যমূল্যের স্থিতিশীলতা ও ফসল-পরবর্তী অপচয় হ্রাস।" },
 { date: "2025.04", head: "Forbes founder feature.", headbn: "ফোর্বসে প্রতিষ্ঠাতা প্রতিবেদন।", body: "Sakib Hossain profiled on direct market access and the economics of perishables.", bodybn: "সরাসরি বাজার প্রবেশাধিকার ও পচনশীল পণ্যের অর্থনীতি নিয়ে সাকিব হোসেনকে নিয়ে প্রতিবেদন।" },
 { date: "2026.01", head: "60,000+ farmer threshold crossed.", headbn: "60,000+ কৃষকের মাইলফলক অতিক্রম।", body: "Ninth operating district (Sylhet) live. Forty-plus distribution hubs of record.", bodybn: "নবম কার্যক্ষম জেলা (সিলেট) চালু। রেকর্ডে চল্লিশের বেশি বিতরণ হাব।" },
];

const PRINCIPLES = [
 { title: "Farmer first.", titlebn: "কৃষক সবার আগে।", body: "Pricing decisions start from what the grower will take home.", bodybn: "দামের সিদ্ধান্ত শুরু হয় কৃষক ঘরে কত নিয়ে যাবেন তা দিয়ে।" },
 { title: "Accountability.", titlebn: "জবাবদিহি।", body: "Named owners for each commitment - to farmers, buyers, and investors.", bodybn: "প্রতিটি প্রতিশ্রুতির জন্য নির্দিষ্ট দায়িত্বশীল - কৃষক, বায়ার ও ইনভেস্টরের কাছে।" },
 { title: "Sustainability.", titlebn: "টেকসইতা।", body: "Waste reduction is a ledger entry, measured per district, per season.", bodybn: "অপচয় হ্রাস একটি হিসাবের খাত, পরিমাপ করা হয় প্রতিটি জেলা ও প্রতিটি মৌসুম ধরে।" },
 { title: "Human-centered.", titlebn: "মানুষ-কেন্দ্রিক।", body: "Jogaan is tested with agents and farmers who have never used a smartphone.", bodybn: "যোগান পরীক্ষা করা হয় এমন এজেন্ট ও কৃষকদের নিয়ে যারা কখনো স্মার্টফোন ব্যবহার করেননি।" },
 { title: "Optimisation.", titlebn: "সর্বোত্তমীকরণ।", body: "Data first. First principles next. Opinion last.", bodybn: "আগে ডেটা। এরপর মূল নীতি। মতামত সবার শেষে।" },
 { title: "Leadership.", titlebn: "নেতৃত্ব।", body: "Bangladesh's agricultural infrastructure deserves to be designed, not inherited.", bodybn: "বাংলাদেশের কৃষি অবকাঠামো উত্তরাধিকারসূত্রে পাওয়ার নয়, পরিকল্পিতভাবে গড়ার যোগ্য।" },
];


export function AboutContent() {
  const lang = useLang();
 return (
 <><PageHeader
 eyebrow={t(lang, "§ About", "§ পরিচিতি")}
 title={t(lang, "Three founders, one chain, built in Bangladesh.", "তিন প্রতিষ্ঠাতা, একটি শৃঙ্খল, গড়া বাংলাদেশে।")}
 lede={
 <>
 {t(lang, "Fashol is a farm-to-business platform in Dhaka, Singapore, and Dubai. Founded in", "ফসল ঢাকা, সিঙ্গাপুর ও দুবাইভিত্তিক একটি ফার্ম-টু-বিজনেস প্ল্যাটফর্ম। প্রতিষ্ঠিত")}
 <strong className="text-[var(--color-ink)]"> 2019</strong>{t(lang, " by Sakib Hossain, Mamunur Rashid, and Numair Hussain. We move perishable produce from more than ", " সালে, সাকিব হোসেন, মামুনুর রশিদ ও নুমাইর হুসেনের হাতে। আমরা ")}<strong className="text-[var(--color-ink)]">60,000</strong>{t(lang, " registered smallholder farmers to buyers across three jurisdictions. This is the company dossier.", "-এর বেশি নিবন্ধিত ক্ষুদ্র কৃষকের পচনশীল ফসল তিনটি এখতিয়ারজুড়ে বায়ারদের কাছে পৌঁছে দিই। এটিই কোম্পানির দলিল।")}
 </>
 }
 />

 {/* Specs */}
 <Section tone="surface" size="sm">
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-x-10 gap-y-6">
 {SPECS.map((s) => (
 <div key={s.k} className="border-t border-[var(--color-line)] pt-4">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{t(lang, s.k, s.kbn)}</div>
 <div className="t-body mt-1 text-[var(--color-ink)]">{t(lang, s.v, s.vbn)}</div>
 </div>
 ))}
 </div>
 </Section>

 {/* Founder's note */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 items-start">
 <Reveal className="desktop:col-span-5">
 <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
 <Image
 src="/images/content/sakib-hossain.png"
 alt="Sakib Hossain, founder and CEO of Fashol, photographed in the field."
 fill
 sizes="(min-width: 1200px) 500px, 90vw"
 className="object-cover"
 />
 </div>
 <p className="mt-4 t-caption">
 {t(lang, "Sakib Hossain, founder & CEO.", "সাকিব হোসেন, প্রতিষ্ঠাতা ও সিইও।")}
 </p>
 </Reveal>
 <div className="desktop:col-span-7">
 <Reveal as="h2" className="t-h3 italic">
 &ldquo;{t(lang, "We started Fashol because the farmer at the end of the chain was paid last, paid least, and paid in a way that kept them outside every other system. Pricing was opaque, settlement was late, and a whole season of work was routinely reduced to a single weak number on a Thursday morning. That is the one problem we work on.", "আমরা ফসল শুরু করেছিলাম কারণ শৃঙ্খলের একেবারে শেষ প্রান্তের কৃষককেই সবার শেষে, সবচেয়ে কম, আর এমনভাবে দাম দেওয়া হতো যা তাকে বাকি প্রতিটি ব্যবস্থার বাইরে রেখে দিত। দাম ছিল অস্বচ্ছ, সেটেলমেন্ট আসত দেরিতে, আর গোটা একটি মৌসুমের পরিশ্রম নিয়ম করে বৃহস্পতিবার সকালের একটিমাত্র দুর্বল সংখ্যায় নেমে আসত। এই একটি সমস্যা নিয়েই আমরা কাজ করি।")}&rdquo;
 </Reveal>
 </div>
 </div>
 </Section>

 {/* Founders grid */}
 <Section tone="surface">
 <div className="grid desktop:grid-cols-12 gap-10 mt-8">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 {t(lang, "Three founders, distinct disciplines.", "তিন প্রতিষ্ঠাতা, ভিন্ন ভিন্ন দক্ষতা।")}
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 {t(lang, "Built by three people trained in engineering, operations, and finance - all convinced Bangladesh's agricultural chain deserved to be designed, not inherited.", "ইঞ্জিনিয়ারিং, অপারেশনস ও ফাইন্যান্সে প্রশিক্ষিত তিন মানুষের গড়া - প্রত্যেকেই বিশ্বাস করতেন বাংলাদেশের কৃষি সাপ্লাই চেইন উত্তরাধিকারসূত্রে পাওয়ার নয়, পরিকল্পিতভাবে গড়ার যোগ্য।")}
 </Reveal>
 </div>

 <StaggerChildren className="grid tablet:grid-cols-3 gap-6 mt-14" stagger={0.1}>
 {FOUNDERS.map((f) => (
 <StaggerItem key={f.no} className="card-plain overflow-hidden flex flex-col">
 <div className="relative aspect-[4/5] bg-[var(--color-surface)]">
 <Image src={f.image} alt={`${f.name}, ${f.role} of Fashol.`} fill sizes="(min-width: 1200px) 400px, 90vw" className="object-cover" />
 </div>
 <div className="p-7 flex flex-col gap-3 flex-1">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{t(lang, f.role, f.rolebn)}</div>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{f.name}</h3>
 <blockquote className="t-body italic text-[var(--color-ink-subtle)]">&ldquo;{t(lang, f.quote, f.quotebn)}&rdquo;</blockquote>
 <p className="t-body-sm text-[var(--color-ink-muted)] mt-auto pt-2">{t(lang, f.bio, f.biobn)}</p>
 </div>
 </StaggerItem>
 ))}
 </StaggerChildren>
 </Section>

 {/* Timeline */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 mt-8">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 {t(lang, "Seven years, nine districts, forty-plus hubs.", "সাত বছর, নয় জেলা, চল্লিশের বেশি হাব।")}
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 {t(lang, "Select operating and capital milestones. Internal records.", "নির্বাচিত পরিচালন ও মূলধন মাইলফলক। অভ্যন্তরীণ নথি।")}
 </Reveal>
 </div>

 <ol className="mt-14 border-t border-[var(--color-line-strong)]">
 {TIMELINE.map((item) => (
 <li key={item.date} className="grid tablet:grid-cols-[140px_220px_1fr] py-7 border-b border-[var(--color-line)] gap-4">
 <span className="t-mono text-[12px] text-[var(--color-terracotta)]">{item.date}</span>
 <h3 className="t-h5" style={{ fontWeight: 500 }}>{t(lang, item.head, item.headbn)}</h3>
 <p className="t-body">{t(lang, item.body, item.bodybn)}</p>
 </li>
 ))}
 </ol>
 </Section>

 {/* Principles */}
 <Section tone="surface">
 <Reveal as="h2" className="t-h2 mt-8 max-w-3xl">{t(lang, "Six principles. Operational, not aspirational.", "ছয়টি নীতি। বাস্তবিক, নিছক আকাঙ্ক্ষা নয়।")}</Reveal>
 <p className="t-body-lg mt-4 max-w-2xl">{t(lang, "Written into how we decide, hire, and settle with farmers.", "আমরা কীভাবে সিদ্ধান্ত নিই, নিয়োগ দিই ও কৃষকের সঙ্গে হিসাব চুকাই তার মধ্যেই লেখা।")}</p>

 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-x-10 gap-y-12 mt-14 border-t border-[var(--color-line-strong)] pt-12">
 {PRINCIPLES.map((p) => (
 <div key={p.title}>
 <h3 className="t-h5" style={{ fontWeight: 500 }}>{t(lang, p.title, p.titlebn)}</h3>
 <p className="t-body mt-3">{t(lang, p.body, p.bodybn)}</p>
 </div>
 ))}
 </div>
 </Section>

 {/* Join */}
 <Section tone="ink">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">{t(lang, "Build this chain with us.", "আমাদের সঙ্গে এই শৃঙ্খল গড়ুন।")}</Reveal>

 <div className="grid tablet:grid-cols-2 gap-6 mt-14">
 {[
 { n: "01", title: t(lang, "Work with us", "আমাদের সঙ্গে কাজ করুন"), b: t(lang, "Open roles: engineering, logistics, data, field operations.", "খোলা পদ: ইঞ্জিনিয়ারিং, লজিস্টিকস, ডেটা, ফিল্ড অপারেশনস।"), href: "/career" },
 { n: "02", title: t(lang, "Partner with Fashol", "ফসলের সঙ্গে পার্টনার হোন"), b: t(lang, "MSMEs, exporters, cold-chain operators, NGOs.", "ক্ষুদ্র ও মাঝারি উদ্যোগ, এক্সপোর্টার, কোল্ড চেইন অপারেটর, এনজিও।"), href: "/contact" },
 ].map((c) => (
 <div key={c.n} className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4">
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{c.title}</h3>
 <p className="t-body !text-[rgba(255,255,255,0.7)]">{c.b}</p>
 <div className="mt-auto pt-4">
 <Button variant="on-dark" href={c.href}>{t(lang, "Continue", "এগিয়ে যান")}</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>
 </>
 );
}
