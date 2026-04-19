import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { OnboardingCurve } from "@/components/figures/OnboardingCurve";
import { OnionPriceFigure } from "@/components/figures/OnionPrice";
import { RouteEfficiencyFigure } from "@/components/figures/RouteEfficiency";

export const metadata: Metadata = {
 title: "Impact data, 2019 - 2026",
 description:
 "Three charts describing six-and-a-half years of Fashol's operation: the monthly farmer onboarding curve, the 2023 onion-shortage price comparison, and route efficiency by district.",
};

export default function DataPage() {
 return (
 <><PageHeader
 eyebrow="§ Report 02 — Impact"
 title="Impact data, 2019 - 2026."
 lede="Three charts that describe what six and a half years of platform work has added up to. The growth curve, the price test, and the logistics map. No rounding of inconvenient numbers; no claim without the method below it."
 />

 {/* § 01 Onboarding */}
 <Section tone="paper">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">From 300 farmers to 40,000+ in eighty-two months.</Reveal>
 <p className="t-body-lg mt-4 max-w-3xl">
 Every line is a named, ID-verified, bank-linked registration. Peaks mark seasonal hiring pushes; the two dips are
 Covid-19 lockdowns (April 2020, August 2021) and the 2022 fuel crisis. Nothing has been smoothed.
 </p>

 <div className="mt-10">
 <h3 className="t-h5 mb-6" style={{ fontWeight: 500 }}>
 Cumulative registered farmers, Jan 2019 - Mar 2026. Monthly granularity.
 </h3>
 <Reveal><OnboardingCurve /></Reveal>
 </div>

 <div className="container-narrow mt-14 t-body-lg space-y-5">
 <p>
 <strong className="text-[var(--color-ink)]">Method.</strong> Monthly cumulative registration count, pulled from the Jogaan master farmer table. De-duplicated on
 national ID. Dormant farmers (no transaction in 365 days) are excluded retroactively from the running total, which is
 why the curve is monotonic only in aggregate: nine individual months show micro-declines of under 40 farmers.
 </p>
 <p>
 The curve is not smooth. Two visible plateaus mark real operational pain: seven weeks in April–May 2020 when field
 agents could not travel, and the fuel-rationing months of August to October 2022 when the collection-truck fleet
 halved. Both plateaus closed within the same quarter; neither produced a net farmer-count decline.
 </p>
 <p>
 What the curve understates is the churn behind it. Roughly 7.2% of onboarded farmers in any given twelve-month window
 transact fewer than three times and are logged as dormant. A further 1.8% formally deregister. The 40,120 figure above
 is the net — registered, not-dormant, within the last 365 days.
 </p>
 </div>
 </Section>

 {/* § 02 Onion */}
 <Section tone="surface">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">
 When retail onion prices tripled, Fashol farmers held a price floor.
 </Reveal>
 <p className="t-body-lg mt-4 max-w-3xl">
 Between September and December 2023, Bangladesh&apos;s onion price more than tripled after India imposed an export ban.
 Retail prices peaked at BDT 220 / kg. What did Fashol farmers receive through the same window?
 </p>

 <div className="mt-10">
 <h3 className="t-h5 mb-6" style={{ fontWeight: 500 }}>
 Weekly onion farm-gate price, Sep–Dec 2023. Three channels compared.
 </h3>
 <Reveal><OnionPriceFigure /></Reveal>
 </div>

 <div className="container-narrow mt-14 t-body-lg space-y-5">
 <p>
 <strong className="text-[var(--color-ink)]">Method.</strong> Retail series is the Karwan Bazar weekly quoted price,
 published by TCB. Aratdar farm-gate is an internal survey of eight named traders across Natore, Pabna, and Faridpur,
 weekly. Fashol farm-gate is the Jogaan-published offer price at the start of each week, averaged across Grade A / B
 onions.
 </p>
 <p>
 What the chart shows: when wholesale retail prices spiked from BDT 60 to BDT 220 per kilo in three months, traditional
 farm-gate prices barely moved — aratdars keep a wide, stable margin and pass almost all upside to the downstream. Over
 the same window, Fashol&apos;s contract price rose from BDT 48 to BDT 85. The delta between &ldquo;Fashol&rdquo; and
 &ldquo;aratdar&rdquo; at the peak (Dec W1) was <em>BDT 53 per kilo</em>, an income uplift of roughly <em>+140%</em>
 against the same week&apos;s traditional-chain farmer.
 </p>
 <p>
 What the chart does <em>not</em> show: Fashol did not capture the full spike either. Downstream buyer contracts had
 fixed ceilings, and the operational reality of the Dumuria–Natore onion belt is that quality varies week to week.
 What the platform did was move the farmer-side price floor up by the full available margin, week after week, without
 passing the downstream volatility back to the farmer.
 </p>
 </div>
 </Section>

 {/* § 03 Routes */}
 <Section tone="paper">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">Some districts cost eighty kilometres per tonne. Some cost five.</Reveal>
 <p className="t-body-lg mt-4 max-w-3xl">
 Route cost is the single largest variable in the fresh-produce economics. This chart is the one we watch every Monday morning.
 </p>

 <div className="mt-10">
 <h3 className="t-h5 mb-6" style={{ fontWeight: 500 }}>
 Kilometres driven per metric tonne delivered, by district. 2025 Q4 mean.
 </h3>
 <Reveal><RouteEfficiencyFigure /></Reveal>
 </div>

 <div className="container-narrow mt-14 t-body-lg space-y-5">
 <p>
 <strong className="text-[var(--color-ink)]">Method.</strong> Truck telematics distance (origin to primary dispatch dock),
 divided by metric tonnes billed. Median of Oct, Nov, Dec 2025 weekly readings. Does not include buyer-side last-mile
 kilometres.
 </p>
 <p>
 The shape of this chart — asymmetric, heavy in the top three, cliff-edge above 40 km/MT — is the argument for why
 Fashol&apos;s geographic expansion is slow. The easy wins have all landed. The remaining districts are harder, further
 from arterial roads, and frequently require batch-consolidation across a second village before the route crosses the
 threshold.
 </p>
 <p>
 Sylhet, the worst line, is not in dispute. The district is valuable (tea, lemon, ginger — high-ticket produce) but
 geographically scattered and road-constrained. The programme there is to operate at volume loss through 2026 while the
 collection-hub mesh densifies; the 2027 target is 42 km/MT or retreat.
 </p>
 </div>
 </Section>

 {/* § 04 What this adds up to */}
 <Section tone="surface">
 <div className="container-narrow mt-8 t-body-lg space-y-5">
 <p>
 The three charts disagree with each other in useful ways. The first says we have a seven-year curve that has survived
 two shocks without a net decline. The second says that when the market does what markets do, the platform mechanically
 moves the farmer&apos;s price floor up rather than absorbing the volatility on their side. The third says the easy
 geography is saturated and the next hundred thousand farmers will be expensive per kilogram — the cost of continuing
 to be useful outside the easy districts.
 </p>
 <p>
 No individual chart on its own is a thesis. Together they describe what the platform does when it is operating: it
 compounds slowly, it holds the floor under volatility, and it tells you, in kilometres per tonne, exactly where it is
 working and where it is not.
 </p>
 </div>

 <div className="mt-14 overflow-x-auto">
 <Eyebrow>Data provenance</Eyebrow>
 <table className="t-table mt-6">
 <thead>
 <tr><th>Source</th><th>Detail</th></tr>
 </thead>
 <tbody>
 {[
 ["source", "Jogaan farmer master, deduplicated on NID"],
 ["cut", "Dormant-adjusted, 365-day activity window"],
 ["retail", "TCB weekly Karwan Bazar quote"],
 ["aratdar", "Internal survey · 8 traders · weekly"],
 ["Fashol", "Jogaan Monday offer price, Grade A/B mean"],
 ["source", "Truck telematics + SAP billing"],
 ["cut", "Median Oct–Dec 2025 weekly"],
 ["Audit", "Internal, quarterly. Next external review Q3 2026."],
 ].map(([k, v]) => (
 <tr key={k}><td>{k}</td><td>{v}</td></tr>
 ))}
 </tbody>
 </table>
 </div>

 <div className="mt-10 t-body-sm">
 <Link href="/case-study" className="link-arrow">Companion: one farmer&apos;s year case study</Link>
 </div>
 </Section>
 </>
 );
}
