import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
 title: "About",
 description:
 "Fashol is a farm-to-business platform founded in Dhaka, 2019. Three founders. Offices in Bangladesh, Singapore, and Dubai.",
};

const SPECS = [
 ["Legal entity", "Fashol Dotcom Limited (BD) · Fashol Singapore Pte Ltd (SG)"],
 ["Founded", "2019"],
 ["HQ", "130 Kabbokash, Kawran Bazar, Dhaka 1215"],
 ["Offices", "Bangladesh · Singapore · UAE"],
 ["Farmers", "60,000+ registered"],
 ["Buyers", "7,000+ active"],
 ["Stage", "Series A in progress"],
];

const FOUNDERS = [
 {
 no: "01",
 role: "Co-founder & CEO",
 name: "Sakib Hossain",
 image: "/images/content/sakib-hossain.png",
 quote: "I want to deliver potatoes on Mars.",
 bio: "Previously @aladinkids, @printvaly @gazzeto. Forbes 30u30",
 },
 {
 no: "02",
 role: "Co-Founder & COO",
 name: "Mamunur Rashid",
 image: "/images/content/mamunur-rashid.jpg",
 quote: "We are building the infrastructure that defines how food moves.",
 bio: "Previously @BAT, @Tap n Pay @Surecash",
 },
 {
 no: "03",
 role: "Co-Founder & CFO",
 name: "Numair Hussain",
 image: "/images/content/numair-hussain.jpg",
 quote: "Let us champion equitable income for farmers.",
 bio: "Previously @Roche, Experience in working EU, USA & South-Africa markets",
 },
];

const TIMELINE = [
 ["2019.06", "Fashol Dotcom Limited incorporated.", "First hub opened in Satkhira. Four farmers, one collection agent, a single pickup van."],
 ["2020.03", "Jashore & Khulna expansion.", "First cold-storage node online. Onboarding crosses 500 farmers."],
 ["2021.11", "Jogaan app released (v1.0).", "Field agents move to digital records. Paper ledgers retired within two months."],
 ["2022.02", "Dekko ISHO Technologies - strategic investment.", "Supply-chain partnership formalized for perishables across Chittagong division."],
 ["2023.04", "$1M pre-seed closed.", "Lead: SOSV. Participation: South Asia Tech Partners, Ambareen Reza & Zubair Siddiky (Foodpanda)."],
 ["2023.11", "e-Commerce Movers Award (eCMA).", "Recognition from the e-Commerce Association of Bangladesh (e-CAB)."],
 ["2024.02", "11,000 new farmers onboarded.", "Covered by Prothom Alo from a field visit in Satkhira."],
 ["2024.07", "AgFunder GROW Impact Accelerator - Cohort 5.", "Selected for the fifth cohort of GROW, focusing on food-price stability and post-harvest loss."],
 ["2025.04", "Forbes founder feature.", "Sakib Hossain profiled on direct market access and the economics of perishables."],
 ["2026.01", "60,000+ farmer threshold crossed.", "Ninth operating district (Sylhet) live. Forty-plus distribution hubs of record."],
];

const PRINCIPLES = [
 ["Farmer first.", "Pricing decisions start from what the grower will take home."],
 ["Accountability.", "Named owners for each commitment - to farmers, buyers, and investors."],
 ["Sustainability.", "Waste reduction is a ledger entry, measured per district, per season."],
 ["Human-centered.", "Jogaan is tested with agents and farmers who have never used a smartphone."],
 ["Optimisation.", "Data first. First principles next. Opinion last."],
 ["Leadership.", "Bangladesh's agricultural infrastructure deserves to be designed, not inherited."],
];

export default function AboutPage() {
 return (
 <><PageHeader
 eyebrow="§ About"
 title="Three founders, one chain, built in Bangladesh."
 lede={
 <>
 Fashol is a farm-to-business platform operating out of Dhaka, Singapore, and Dubai. We were founded in
 <strong className="text-[var(--color-ink)]"> 2019</strong> by Sakib Hossain, Mamunur Rashid, and Numair Hussain. Today we move perishable produce
 from more than <strong className="text-[var(--color-ink)]">60,000</strong> registered smallholder farmers to buyers across three jurisdictions. This page is the company dossier.
 </>
 }
 />

 {/* Specs */}
 <Section tone="surface" size="sm">
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-x-10 gap-y-6">
 {SPECS.map(([k, v]) => (
 <div key={k} className="border-t border-[var(--color-line)] pt-4">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{k}</div>
 <div className="t-body mt-1 text-[var(--color-ink)]">{v}</div>
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
 Sakib Hossain, founder &amp; CEO.
 </p>
 </Reveal>
 <div className="desktop:col-span-7">
 <Reveal as="h2" className="t-h3 italic">
 &ldquo;We started Fashol because the farmer at the end of the chain was paid last, paid least, and paid
 in a way that kept them outside every other system. Pricing was opaque, settlement was late, and a whole
 season of work was routinely reduced to a single weak number on a Thursday morning. That is the one
 problem we work on.&rdquo;
 </Reveal>
 </div>
 </div>
 </Section>

 {/* Founders grid */}
 <Section tone="surface">
 <div className="grid desktop:grid-cols-12 gap-10 mt-8">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 Three founders, distinct disciplines.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 Fashol was built by three people with different training - engineering, operations, and finance - who agreed
 that Bangladesh&apos;s agricultural chain deserved to be designed, not inherited.
 </Reveal>
 </div>

 <StaggerChildren className="grid tablet:grid-cols-3 gap-6 mt-14" stagger={0.1}>
 {FOUNDERS.map((f) => (
 <StaggerItem key={f.no} className="card-plain overflow-hidden flex flex-col">
 <div className="relative aspect-[4/5] bg-[var(--color-surface)]">
 <Image src={f.image} alt={`${f.name}, ${f.role} of Fashol.`} fill sizes="(min-width: 1200px) 400px, 90vw" className="object-cover" />
 </div>
 <div className="p-7 flex flex-col gap-3 flex-1">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{f.role}</div>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{f.name}</h3>
 <blockquote className="t-body italic text-[var(--color-ink-subtle)]">&ldquo;{f.quote}&rdquo;</blockquote>
 <p className="t-body-sm text-[var(--color-ink-muted)] mt-auto pt-2">{f.bio}</p>
 </div>
 </StaggerItem>
 ))}
 </StaggerChildren>
 </Section>

 {/* Timeline */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 mt-8">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 Seven years, nine districts, forty-plus hubs.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 Select operating and capital milestones. Internal records.
 </Reveal>
 </div>

 <ol className="mt-14 border-t border-[var(--color-line-strong)]">
 {TIMELINE.map(([date, head, body]) => (
 <li key={date} className="grid tablet:grid-cols-[140px_220px_1fr] py-7 border-b border-[var(--color-line)] gap-4">
 <span className="t-mono text-[12px] text-[var(--color-terracotta)]">{date}</span>
 <h3 className="t-h5" style={{ fontWeight: 500 }}>{head}</h3>
 <p className="t-body">{body}</p>
 </li>
 ))}
 </ol>
 </Section>

 {/* Principles */}
 <Section tone="surface">
 <Reveal as="h2" className="t-h2 mt-8 max-w-3xl">Six principles. Operational, not aspirational.</Reveal>
 <p className="t-body-lg mt-4 max-w-2xl">Written into how we decide, hire, and settle with farmers.</p>

 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-x-10 gap-y-12 mt-14 border-t border-[var(--color-line-strong)] pt-12">
 {PRINCIPLES.map(([t, b]) => (
 <div key={t}>
 <h3 className="t-h5" style={{ fontWeight: 500 }}>{t}</h3>
 <p className="t-body mt-3">{b}</p>
 </div>
 ))}
 </div>
 </Section>

 {/* Join */}
 <Section tone="ink">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">Build this chain with us.</Reveal>

 <div className="grid tablet:grid-cols-2 gap-6 mt-14">
 {[
 { n: "01", t: "Work with us", b: "Open roles: engineering, logistics, data, field operations.", href: "/career" },
 { n: "02", t: "Partner with Fashol", b: "MSMEs, exporters, cold-chain operators, NGOs.", href: "/contact" },
 ].map((c) => (
 <div key={c.n} className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4">
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{c.t}</h3>
 <p className="t-body !text-[rgba(255,255,255,0.7)]">{c.b}</p>
 <div className="mt-auto pt-4">
 <Button variant="on-dark" href={c.href}>Continue</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>
 </>
 );
}
