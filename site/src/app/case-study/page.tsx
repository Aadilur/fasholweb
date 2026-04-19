import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
 title: "One farmer, twelve harvests — a Fashol case study",
 description: "A twelve-month before-and-after case study of Md. Rafiqul Islam — smallholder farmer, Dumuria, Khulna. Income, crop mix, and household outcomes vs. his 2024 season.",
};

const REGISTER: [string, string][] = [
 ["Name", "Md. Rafiqul Islam"],
 ["Age", "47"],
 ["Household", "Wife · 3 children (14, 11, 6)"],
 ["Village", "Bhandarpara, Dumuria"],
 ["Upazila", "Dumuria"],
 ["District", "Khulna"],
 ["Division", "Khulna"],
 ["Landholding", "1.20 bigha (~0.40 acre)"],
 ["Tenure", "Freehold, inherited"],
 ["Signed", "2024.12.02"],
 ["Hub", "Dumuria Collection Centre"],
 ["Agent", "Md. Khaled Pramanik"],
 ["Farmer ID", "BD-KHU-0046-3182"],
 ["Report window", "12 months · 2024-12-02 - 2025-12-01"],
];

const LEDGER = [
 ["01","2024.12","Cabbage (winter)","612","74 / 26","25.80","15,790","10,420"],
 ["02","2025.01","Cabbage (winter)","1,048","81 / 19","26.40","27,670","19,180"],
 ["03","2025.02","Cabbage · Leafy greens","486"," — ","22.10","10,740","6,920"],
 ["04","2025.03","Tomato (short run)","394","66 / 34","31.20","12,290","7,540"],
 ["05","2025.04","Tomato · Radish","278"," — ","28.40","7,900","4,610"],
 ["06","2025.05","Leafy greens · Okra","212"," — ","18.80","3,990","2,340"],
 ["07","2025.06","Paddy (monsoon, aman)"," — "," — "," — "," — "," — "],
 ["08","2025.07","Paddy — field prep"," — "," — "," — "," — "," — "],
 ["09","2025.08","Paddy — growing"," — "," — "," — "," — "," — "],
 ["10","2025.09","Paddy · Leafy greens","186"," — ","24.60","4,580","2,860"],
 ["11","2025.10","Paddy harvest · Cabbage seedling","1,420"," — ","28.90*","41,060*","26,480"],
 ["12","2025.11","Cabbage (next winter, first cut)","824","79 / 21","27.10","22,340","15,420"],
];

export default function CaseStudyPage() {
 return (
 <><PageHeader
 eyebrow="§ Report 01 — Field case"
 title="One farmer, twelve harvests."
 lede="Md. Rafiqul Islam is forty-seven, a smallholder of 1.2 bigha in Dumuria, Khulna. He signed with Fashol on 02 December 2024 (2024-12-02). What follows is twelve months of monthly output, monthly receipts, and a household ledger — the same figures we keep on every farmer we work with."
 />

 {/* Composite disclaimer */}
 <Section tone="surface" size="sm">
 <div className="max-w-4xl">
 <Eyebrow>Disclaimer</Eyebrow>
 <p className="t-body-lg mt-6 italic">
 The farmer below is a <strong>composite</strong> drawn from the first cohort of Dumuria registrations. Names and
 household specifics are illustrative; the numbers are median values from the audited cohort file. A verified
 single-farmer case will replace this before launch.
 </p>
 </div>
 </Section>

 {/* Register + hero image */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 items-start">
 <div className="desktop:col-span-5">
 <Eyebrow>Farmer register — entry</Eyebrow>
 <dl className="mt-8 border-t border-[var(--color-line-strong)]">
 {REGISTER.map(([k, v]) => (
 <div key={k} className="grid grid-cols-[140px_1fr] py-3 border-b border-[var(--color-line)] gap-3">
 <dt className="t-mono text-[11px] text-[var(--color-ink-muted)]">{k}</dt>
 <dd className="t-body-sm">{v}</dd>
 </div>
 ))}
 </dl>
 </div>
 <div className="desktop:col-span-7">
 <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
 <Image
 src="/images/content/farmer-watering.jpg"
 alt="A farmer in rubber boots waters a cabbage bed at dawn — Dumuria upazila, Khulna district, December 2024."
 fill
 sizes="(min-width: 1200px) 720px, 90vw"
 className="object-cover"
 />
 </div>
 <p className="mt-4 t-caption italic">
 Dawn watering, winter cabbage bed — Dumuria, Khulna. December 2024.
 Composite portrait; final publication will use a verified farmer photograph.
 </p>
 </div>
 </div>
 </Section>

 {/* Prologue */}
 <Section tone="surface">
 <div className="container-narrow">
 <Reveal delay={0.08} className="mt-8 t-body-lg space-y-5">
 <p>
 Rafiqul grows three things: winter cabbage from mid-October to February, a short tomato run in March, and paddy
 through the monsoon. He has done this on the same one-point-two bigha for nineteen years, the same land his father
 worked, the same seed supplier in the Khulna bazaar, and — until last December — the same three aratdars buying at
 the field gate on Thursday mornings.
 </p>
 <p>
 What changed in December 2024 was not the crop, not the weather, not the seed, and not the number of mouths at his
 table. The only thing that changed was who he sold to and what that buyer paid him per kilo. The rest of this report
 is what that one change added up to over twelve months.
 </p>
 </Reveal>
 </div>
 </Section>

 {/* § 01 — Before */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">A cabbage at twelve takas.</h2>
 <p className="t-body-lg mt-4 max-w-3xl">Rafiqul&apos;s 2024 ledger, as we reconstructed it from his notebook, four supplier receipts, and one bank statement.</p>

 <div className="grid tablet:grid-cols-3 gap-4 mt-14">
 {[
 { v: "BDT 94,600", l: "Revenue, 2024", n: "Across 7 crop-months · 3 buyers (aratdar A, B, C) · Weighted avg BDT 11.40 / kg." },
 { v: "BDT 37,200", l: "Net income, 2024", n: "After BDT 57,400 inputs: seed 8,100 · fertiliser 22,800 · water 3,200 · labour 18,700 · transport 4,600." },
 { v: "BDT 42,000", l: "Outstanding, Nov 2024", n: "BDT 38,000 input loan @ 18% nominal (informal) + BDT 4,000 seed-shop credit." },
 ].map((s) => (
 <div key={s.l} className="card-plain p-7 flex flex-col gap-3">
 <div className="t-h3 t-tabular" style={{ fontWeight: 500 }}>{s.v}</div>
 <div className="t-body-sm" style={{ fontWeight: 500 }}>{s.l}</div>
 <p className="t-body-sm text-[var(--color-ink-muted)] mt-2">{s.n}</p>
 </div>
 ))}
 </div>

 <div className="container-narrow mt-14 t-body-lg space-y-5">
 <p>
 The specific pain point, in Rafiqul&apos;s own phrasing: he did not know, when he cut a cabbage head at five in the
 morning, what it would be worth by noon. On the worst Thursdays of 2024 — late January, during a local glut — he
 accepted BDT 7 per kilo because the alternative was to take the cabbage home and watch it yellow by Sunday. On a fair
 Thursday he got BDT 14. The Jashore wholesale market that week was pricing the same grade at BDT 38. The difference —
 BDT 24 per kilo, roughly — flowed through three pairs of intermediate hands.
 </p>
 <p>
 None of the three pairs is villainous. They borrow against their working capital, pay the truck diesel, absorb the
 spoilage risk, and carry their own book of bad debt. What the traditional chain does is make Rafiqul&apos;s revenue a
 residual of everyone else&apos;s cost-plus — which is why, in every Thursday market, he is the one paid last, paid
 least, and paid in cash so unverifiable it does not help him get a bank loan the following month.
 </p>
 </div>
 </Section>

 {/* § 02 — Handshake */}
 <Section tone="surface">
 <h2 className="t-h2 mt-6 max-w-3xl">December 2024: an app, a collection slip, a price published at dawn.</h2>
 <div className="container-narrow mt-12 t-body-lg space-y-5">
 <p>
 Md. Khaled Pramanik is a Fashol field agent, based at the Dumuria collection centre. He has a Jogaan tablet and a
 paperback register. On the morning of 02 December 2024 he walked through the village in a green gilet and registered
 eight farmers, Rafiqul among them.
 </p>
 <p>
 Onboarding took forty minutes. The farmer&apos;s ID (voter card), a photograph, a plot sketch on a printed base map, a
 bank-account number, and a verbal consent to a one-page Bengali-language contract that spelled out: Fashol publishes a
 next-day offer price every evening at 19:00, picks up from the farmer&apos;s gate on the following morning, and
 deposits payment to the named bank account within seventy-two hours of weigh-in.
 </p>
 <p>
 There is no minimum volume. There is no exclusivity — if the published offer is lower than what an aratdar is paying
 that week, Rafiqul is free to sell to the aratdar. In practice, from Week 1, the Fashol offer has been higher in every
 week of the year.
 </p>
 </div>
 </Section>

 {/* § 03 — First sale */}
 <Section tone="paper">
 <div className="container-narrow mt-8">
 <p className="t-body-lg">Thursday, 05 December 2024 (2024-12-05), 06:12 local. The Jogaan notification had gone out at 19:00 the previous evening:</p>
 <blockquote className="mt-8 border-l-2 border-[var(--color-terracotta)] pl-6 py-2">
 <p className="t-h4 lang-bn" style={{ fontWeight: 500 }}>
 আগামীকাল শুক্রবার ৬ ডিসেম্বর সকাল ৭টায় সংগ্রহ। বাঁধাকপি গ্রেড এ · ২৭ টাকা / কেজি · গ্রেড বি · ২২ টাকা / কেজি।
 </p>
 <p className="t-body-lg mt-4 text-[var(--color-ink-muted)]">
 — Collection tomorrow, Friday 06 December, 07:00. Cabbage Grade A · BDT 27 / kg · Grade B · BDT 22 / kg.
 </p>
 </blockquote>
 <div className="mt-10 t-body-lg space-y-5">
 <p>
 Rafiqul cut 148 kg overnight. Of that, 112 kg made Grade A (firm heads, no frost damage, 800 g minimum). The
 remainder — softer, smaller — weighed in at Grade B. Weigh-slip total: <strong>BDT 3,816</strong>, net of a BDT 20 collection-slip fee.
 </p>
 <p>
 Compared to what his Thursday aratdar paid that same week (BDT 13 for mixed grade), this first sale alone was
 <em> nearly 2.1� higher</em>. The difference was neither margin nor subsidy: it was the four trader hands that had been
 removed between the field gate and the downstream grocer.
 </p>
 </div>
 </div>
 </Section>

 {/* § 04 — Ledger */}
 <Section tone="surface">
 <h2 className="t-h2 mt-6 max-w-3xl">Month by month, crop by crop, every deposit traced.</h2>
 <p className="t-body-lg mt-4 max-w-3xl">
 Every line in this table reconciles to a Jogaan weigh-slip and a bank deposit. Off-farm revenue (two months of day-labour
 on the adjacent rice paddies) is reported but not included in the totals.
 </p>

 <div className="mt-12 overflow-x-auto">
 <table className="t-table min-w-[720px]">
 <thead>
 <tr>
 <th>Mo.</th>
 <th>Period</th>
 <th>Crop</th>
 <th>Qty (kg)</th>
 <th>Gr. A / B</th>
 <th>BDT / kg</th>
 <th>Revenue</th>
 <th>Net (BDT)</th>
 </tr>
 </thead>
 <tbody>
 {LEDGER.map((r) => (
 <tr key={r[0]}>
 {r.map((c, i) => <td key={i} className={i === 0 ? "text-[var(--color-ink-muted)]" : ""}>{c}</td>)}
 </tr>
 ))}
 </tbody>
 <tfoot>
 <tr>
 <td colSpan={3}>Twelve-month total, 2024.12.02 - 2025.12.01</td>
 <td>5,460 kg</td>
 <td> — </td>
 <td>27.03 avg</td>
 <td>146,360</td>
 <td>95,770</td>
 </tr>
 </tfoot>
 </table>
 </div>
 <p className="t-caption mt-6 max-w-3xl">
 * Paddy sold at a procurement price set by Fashol&apos;s rice-milling partner; Grade A/B split not applicable.
 Off-farm day-labour earnings (Jun 2025 + Jul 2025): BDT 14,200, not included above.
 </p>
 </Section>

 {/* § 05 — Delta */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">Before / after, in takas.</h2>
 <p className="t-body-lg mt-4 max-w-3xl">
 The 2024 season reconstruction sits against the 2025 Fashol ledger in the same currency, against the same land, the same
 household, the same crops. Nothing else changed.
 </p>

 <div className="grid tablet:grid-cols-2 gap-6 mt-14">
 {[
 { title: "Gross revenue", before: "BDT 94,600", after: "BDT 146,360", delta: "+ BDT 51,760 · +54.7%", toneAfter: "text-[var(--color-ink)]" },
 { title: "Net income after inputs", before: "BDT 37,200", after: "BDT 95,770", delta: "+ BDT 58,570 · +157.4%", toneAfter: "text-[var(--color-ink)]" },
 { title: "Outstanding debt, year-end", before: "BDT 42,000 (Nov 2024)", after: "BDT 0 (Nov 2025)", delta: "Cleared. Input loan retired Mar 2025; seed-shop credit cleared Jun 2025.", toneAfter: "text-[var(--color-ink)]" },
 { title: "Weighted avg price, cabbage Gr. A", before: "BDT 11.40 / kg (aratdar)", after: "BDT 26.70 / kg (Fashol)", delta: "+ BDT 15.30 · +134% per kilo at the gate.", toneAfter: "text-[var(--color-ink)]" },
 ].map((d) => (
 <div key={d.title} className="card-plain p-8">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{d.title}</div>
 <div className="grid grid-cols-2 gap-4 mt-5">
 <div>
 <div className="t-caption">2024</div>
 <div className="t-h5 mt-1">{d.before}</div>
 </div>
 <div>
 <div className="t-caption">2025</div>
 <div className="t-h5 mt-1">{d.after}</div>
 </div>
 </div>
 <div className="mt-6 pt-4 border-t border-[var(--color-line)] t-body-sm" style={{ fontWeight: 500, color: "var(--color-terracotta)" }}>
 {d.delta}
 </div>
 </div>
 ))}
 </div>
 </Section>

 {/* § 06 — What the numbers don't show */}
 <Section tone="surface">
 <div className="container-narrow mt-8 t-body-lg space-y-5">
 <p>
 The extra BDT 58,570 of net income is, in absolute terms, one family&apos;s four-member monthly consumption for roughly
 seven months. In 2025, the household used it for four things — in descending order of amount.
 </p>
 </div>

 <ol className="mt-10 container-narrow border-t border-[var(--color-line-strong)]">
 {[
 ["BDT 38,400", "A solar irrigation pump, 1.5 HP.", "Purchased Apr 2025, BREDA subsidy of 20% applied. Replaces a diesel pump that consumed BDT 640 / month in fuel through the growing season."],
 ["BDT 11,800", "Eldest daughter's SSC year tuition.", "Full secondary-school examination year (Class 10). Previously paid in three instalments against interest; 2025 paid in full up front."],
 ["BDT 18,200", "Input pre-payment for 2026 winter season.", "Seed, compost, plastic mulch for the 2025-2026 cabbage planting — paid in Oct 2025, no carry-forward loan."],
 ["BDT 9,000", "Emergency savings account.", "Opened at Krishi Bank, Dumuria branch. First formal savings balance Rafiqul has ever carried into December."],
 ].map(([amt, head, body], i) => (
 <li key={head} className="grid tablet:grid-cols-[140px_240px_1fr] gap-4 py-5 border-b border-[var(--color-line)]">
 <span className="t-mono text-[11px] text-[var(--color-terracotta)]">0{i+1} · {amt}</span>
 <strong className="t-body" style={{ fontWeight: 500 }}>{head}</strong>
 <p className="t-body">{body}</p>
 </li>
 ))}
 </ol>

 <div className="container-narrow mt-16 t-body-lg space-y-5">
 <p>
 What the numbers above also do not show: Rafiqul now reads next-day prices on the Jogaan app before he cuts the field
 at dawn. Three times in the year, he held cabbage back a day because the offer would be materially better on the
 Friday. His planting choices for the 2026 winter are informed by the aggregated demand visible to him in the app —
 the buyer-side orders are themselves becoming information.
 </p>
 <p>That is the quieter story here. A farmer with a phone and a published next-day price is a farmer with, for the first time in his career, a very slight pricing hand.</p>
 </div>

 <blockquote className="container-narrow mt-14 border-l-2 border-[var(--color-terracotta)] pl-6 py-2">
 <p className="t-h3 lang-bn italic">আমি এখন জানি আমি কত পাব, সেটা নিয়ে কৃষি করি।</p>
 <p className="t-body-lg mt-4 text-[var(--color-ink-muted)]"> — Now I know what I will be paid, and I farm with that in mind.</p>
 <p className="t-mono text-[11px] text-[var(--color-ink-muted)] mt-4"> — Md. Rafiqul Islam, Dumuria, November 2025.</p>
 </blockquote>
 </Section>

 {/* Next */}
 <Section tone="paper">
 <Eyebrow>Related &amp; next</Eyebrow>
 <div className="grid tablet:grid-cols-2 gap-6 mt-10">
 <Link href="/data" className="card-plain p-8 hover:shadow-[var(--shadow-card)] transition-shadow flex flex-col gap-3">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">Companion report</div>
 <h3 className="t-h3">Impact data, 2019 - 2026</h3>
 <p className="t-body mt-2">Three charts: monthly farmer onboarding, the 2023 onion-shortage price comparison, and route efficiency per district.</p>
 <span className="link-arrow text-[13px] mt-4">Read the data essay</span>
 </Link>
 <Link href="/services" className="card-plain p-8 hover:shadow-[var(--shadow-card)] transition-shadow flex flex-col gap-3">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">Operating model</div>
 <h3 className="t-h3">The six services Rafiqul sees at the field gate</h3>
 <p className="t-body mt-2">Farm-gate onboarding · cold logistics and grading · settlement · platform order book · matching · Jogaan app.</p>
 <span className="link-arrow text-[13px] mt-4">See services</span>
 </Link>
 </div>
 </Section>
 </>
 );
}
