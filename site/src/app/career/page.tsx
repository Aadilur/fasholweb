import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
 title: "Career",
 description:
 "Engineering, logistics, field operations, data, and capital roles at Fashol — Bangladesh's farm-to-business platform.",
};

const SPECS = [
 ["Team size", "138 · Q1 2026"],
 ["Districts", "09 operating"],
 ["HQ", "Kawran Bazar, Dhaka"],
 ["Working model", "Hybrid · on-site for field ops"],
 ["Languages", "Bengali · English"],
 ["Benefits", "Health · leave · share option (employees)"],
];

const CATEGORIES = [
 {
 no: "01",
 tag: "Engineering & Data",
 title: "Build the platform.",
 roles: ["Backend engineer (Node, Go)", "Android engineer (Jogaan)", "Data platform / ETL", "Pricing & forecasting analyst", "Platform SRE"],
 },
 {
 no: "02",
 tag: "Logistics & Ops",
 title: "Run the chain.",
 roles: ["Hub manager (9 districts)", "Fleet & route planner", "Cold-chain lead", "QC inspector (Grade tier)", "Warehouse supervisor"],
 },
 {
 no: "03",
 tag: "Field & Farmer",
 title: "Meet the grower.",
 roles: ["Field agent — Satkhira, Jashore, Rajshahi, Bogura, Sylhet", "Agronomy lead", "Farmer relationship officer", "Bengali-first trainer"],
 },
 {
 no: "04",
 tag: "Finance · People · Growth",
 title: "Run the company.",
 roles: ["Finance controller", "Credit & settlement analyst", "Partnerships (export, QC)", "People & talent", "Communications"],
 },
];

const BENEFITS = [
 ["B.01", "Real impact, measured.", "Every role ties to a number on the company scoreboard — farmers onboarded, waste reduced, settlement cycle."],
 ["B.02", "Competitive compensation.", "Benchmarked against tech and logistics sector in Dhaka. Share option for all employees."],
 ["B.03", "Hybrid working.", "Office-flexible in Dhaka. Field ops are on-site by necessity."],
 ["B.04", "Health & leave.", "Full medical, parental, bereavement. 24 days leave + public holidays."],
 ["B.05", "Training & growth.", "Annual learning stipend. Internal transfers between engineering and ops encouraged."],
 ["B.06", "A real mission.", "Bangladesh's agricultural chain, rebuilt by people who were born into it. Work that lasts."],
];

const DAY = [
 { time: "06:12", place: "Satkhira", img: "gallery04", alt: "A Fashol field agent walks between rows of young paddy at first light, holding a tablet.", body: "First registration of the morning. Field agent Rafiqul Mondol walks the farmer through the Jogaan onboarding flow — ID, photo, plot sketch, bank account. Forty minutes per farmer, on average." },
 { time: "07:40", place: "Dumuria collection centre", img: "gallery05", alt: "A collection-point weighing station with cabbage sacks stacked beside a digital scale and clipboard.", body: "Weigh-in station. Every crate is tagged to the farmer's ID before it reaches the grading lane. Grade A cabbage (firm, 800 g minimum) gets the first pallet slot." },
 { time: "09:05", place: "Hub office, Satkhira", img: "gallery03", alt: "A hub team member in a Fashol branded shirt checks a paperback register against a handheld device.", body: "Slips reconcile against the Jogaan log. Every farmer receives an SMS with their weigh-in total and the BDT amount before the dispatch truck leaves the hub." },
 { time: "11:20", place: "Jashore - Dhaka route", img: "gallery06", alt: "Workers load white sacks of fresh vegetables into the back of a refrigerated truck parked at a rural hub gate.", body: "Cold-chain dispatch. Temperature and dwell-time are logged per crate; target cabin temp is 4–6°C; a Grade A cabbage reaches Karwan Bazar with under 2% shrinkage." },
 { time: "14:50", place: "Dumuria village circuit", img: "gallery02", alt: "A group of farmers in the field speak with a Fashol agent beside a cabbage patch.", body: "Walk-around with the next day's growers. Tomorrow's offer price is locked at 19:00 tonight; growers who plan to sell are walked through grading one more time." },
 { time: "18:45", place: "Hub debrief, Satkhira", img: "gallery07", alt: "A Fashol hub team sits around a long table for a debrief at end of day.", body: "End-of-day reconciliation. Total farmers served, total MT dispatched, total BDT settled. The 19:00 price publish goes out to every registered farmer's phone five minutes later." },
];

export default function CareerPage() {
 return (
 <><PageHeader
 eyebrow="§ Career"
 title="Work on the supply chain that feeds Bangladesh."
 lede="We are 138 people — engineers, field agents, drivers, warehouse leads, data analysts, and finance partners — working out of nine districts and three countries. Roles below are active this quarter. Complete listings are on our hiring portal."
 />

 {/* Specs + team photo */}
 <Section tone="surface" size="sm">
 <div className="grid desktop:grid-cols-12 gap-10 items-start">
 <div className="desktop:col-span-5">
 <Eyebrow>Employment specifications</Eyebrow>
 <div className="mt-8 grid grid-cols-1 gap-y-4">
 {SPECS.map(([k, v]) => (
 <div key={k} className="border-t border-[var(--color-line)] pt-3 flex justify-between gap-4">
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)] shrink-0">{k}</span>
 <span className="t-body-sm text-right">{v}</span>
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
 Company offsite, agricultural awareness day. Bangladesh, 2024.
 </p>
 </div>
 </div>
 </Section>

 {/* Role categories */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 mt-8">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 Four disciplines. A platform and a fleet, not a software company.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 Half of our team runs in the field. The other half builds the software that the field runs on. We hire for both with the same care.
 </Reveal>
 </div>

 <div className="grid tablet:grid-cols-2 gap-6 mt-14">
 {CATEGORIES.map((c) => (
 <div key={c.no} className="card-plain p-8 flex flex-col gap-5">
 <div className="flex items-center justify-between">
 <Eyebrow>{c.tag}</Eyebrow>
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)]">{c.no}</span>
 </div>
 <h3 className="t-h3">{c.title}</h3>
 <ul className="mt-2 space-y-2">
 {c.roles.map((r) => (
 <li key={r} className="flex items-baseline gap-3 t-body">
 <span className="w-1 h-1 rounded-full bg-[var(--color-ink)] mt-2 shrink-0" />
 {r}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 <div className="mt-10">
 <Button variant="primary" href="https://hr.fashol.com/jobs" external>
 Browse open positions on hr.fashol.com
 </Button>
 </div>
 </Section>

 {/* Benefits */}
 <Section tone="surface">
 <Reveal as="h2" className="t-h2 mt-6 max-w-3xl">Clear work, specific impact, a team that ships.</Reveal>
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-x-10 gap-y-12 mt-14 border-t border-[var(--color-line-strong)] pt-12">
 {BENEFITS.map(([b, t, body]) => (
 <div key={b}>
 <div className="t-mono text-[11px] text-[var(--color-terracotta)]">{b}</div>
 <h3 className="t-h5 mt-2" style={{ fontWeight: 500 }}>{t}</h3>
 <p className="t-body mt-3">{body}</p>
 </div>
 ))}
 </div>
 </Section>

 {/* A day in the field */}
 <Section tone="paper">
 <Reveal as="h2" className="t-h2 mt-6 max-w-3xl">Six moments, 06:00 - 19:00.</Reveal>
 <p className="t-body-lg mt-4 max-w-2xl">
 What the work looks like between field gate and dispatch dock. Satkhira collection centre and the Jashore route, one Thursday in October 2025.
 </p>

 <div className="mt-14 space-y-14">
 {DAY.map((d, i) => {
 const flip = i % 2 === 1;
 return (
 <div key={d.time} className="grid desktop:grid-cols-12 gap-10 items-center">
 <Reveal className={`desktop:col-span-7 ${flip ? "desktop:order-2" : ""}`}>
 <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
 <Image src={`/images/content/${d.img}.jpeg`} alt={d.alt} fill sizes="(min-width: 1200px) 680px, 90vw" className="object-cover" />
 </div>
 </Reveal>
 <div className="desktop:col-span-5">
 <div className="flex items-baseline gap-3">
 <span className="t-h3 t-tabular" style={{ fontWeight: 500 }}>{d.time}</span>
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)]">· {d.place}</span>
 </div>
 <p className="t-body mt-4">{d.body}</p>
 </div>
 </div>
 );
 })}
 </div>

 <p className="t-caption mt-16">
 All photographs: Fashol operations archive, 2024 – 2025. · Compare to the{" "}
 <a href="/case-study" className="link">12-month case study</a> that describes this same workflow from the farmer&apos;s side.
 </p>
 </Section>

 {/* Apply CTA */}
 <Section tone="ink">
 <Reveal as="h2" className="t-h2 mt-6 max-w-3xl">Ready to join the team?</Reveal>

 <div className="grid tablet:grid-cols-3 gap-6 mt-14">
 {[
 { n: "01", t: "See open roles", b: "Live listings on hr.fashol.com. Updated weekly.", href: "https://hr.fashol.com/jobs", external: true },
 { n: "02", t: "Speculative application", b: "Role unlisted? Email us with a clear note of what you'd do.", href: "mailto:careers@fashol.com" },
 { n: "03", t: "Learn more first", b: "Founders, timeline, and operating principles on the About page.", href: "/about" },
 ].map((c) => (
 <div key={c.n} className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4">
 <span className="t-mono text-[11px] !text-[rgba(255,255,255,0.55)]">{c.n}</span>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{c.t}</h3>
 <p className="t-body !text-[rgba(255,255,255,0.7)]">{c.b}</p>
 <div className="mt-auto pt-4">
 <Button variant="on-dark" href={c.href} external={c.external}>Open</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>
 </>
 );
}
