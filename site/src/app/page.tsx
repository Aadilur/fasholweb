import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { StatCard } from "@/components/site/StatCard";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { Figure } from "@/components/site/Figure";
import { SupplyChainFigure } from "@/components/figures/SupplyChain";
import { PriceBarsFigure } from "@/components/figures/PriceBars";
import { CropCalendarFigure } from "@/components/figures/CropCalendar";
import { BangladeshMapFigure } from "@/components/figures/BangladeshMap";
import { PARTNERS, INVESTORS } from "@/data/site";

export default function HomePage() {
 return (
 <>{/* ───────────── Hero ───────────── */}
 <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden h-svh flex flex-col justify-between pt-[72px] tablet:pt-[96px]">
 <div className="absolute inset-0">
 {/* Static poster for instant paint + video fallback */}
 <Image
 src="/images/content/hero-paddy-aerial.jpg"
 alt=""
 fill
 priority
 className="object-cover"
 sizes="100vw"
 />
 <video
 src="/herovideo10.mp4"
 autoPlay
 loop
 muted
 playsInline
 preload="auto"
 poster="/images/content/hero-paddy-aerial.jpg"
 className="absolute inset-0 w-full h-full object-cover"
 aria-hidden
 />
 </div>

 {/* Glossy brand scrim — bottom-anchored deep-green wash with sheen.
 Sits above the video, beneath the text. Carries readability without text-shadow. */}
 <div
 aria-hidden
 className="absolute inset-0 pointer-events-none"
 style={{
 background: [
 // 1) Top sheen — thin emerald highlight where the scrim "lifts" off the image
 "linear-gradient(to top, transparent 50%, rgba(19,193,113,0.09) 56%, transparent 62%)",
 // 2) Inner gloss — soft creamy bloom in the lower-mid band, the "wet glass" highlight
 "linear-gradient(to top, transparent 0%, rgba(255,251,234,0.07) 18%, transparent 40%)",
 // 3) Main brand scrim — heavier deep-green from bottom, capped below the sun (~62%)
 "linear-gradient(to top, rgba(6,94,58,1) 0%, rgba(6,94,58,0.94) 16%, rgba(6,94,58,0.78) 32%, rgba(6,94,58,0.46) 48%, transparent 62%)",
 ].join(", "),
 }}
 />

 {/* Hero copy */}
 <div className="container-page relative w-full flex-1 flex flex-col justify-end pt-8 tablet:pt-12 pb-4 tablet:pb-6">
 <Reveal as="h1" className="t-hero whitespace-nowrap">
 Building a better food supply chain
 </Reveal>
 {/* <Reveal
 as="p"
 delay={0.16}
 className="t-body-lg !text-[rgba(255,251,234,0.94)] mt-6 tablet:mt-8 max-w-2xl"
 >
 Fashol moves perishable produce from farms across Bangladesh to buyers in Dhaka,
 Singapore, and Dubai. Direct pricing. Real-time logistics.{" "}
 <span className="text-[var(--color-lime)] font-medium">26 percent less waste.</span>
 </Reveal> */}
 <Reveal delay={0.24} className="mt-8 tablet:mt-10 flex flex-col tablet:flex-row gap-3">
 <Button variant="primary" href="/contact">
 Partner with Fashol
 </Button>
 <Button variant="on-dark" href="/data">
 Read the data →
 </Button>
 </Reveal>
 </div>

 {/* At-a-glance stats — anchored to hero floor */}
 <div className="container-page relative w-full pb-6 tablet:pb-10">
 <div className="grid grid-cols-2 desktop:grid-cols-4 gap-3 tablet:gap-4">
 {[
 { v: "40,000+", l: "Farmers" },
 { v: "40+", l: "Hubs" },
 { v: "26%", l: "Waste cut" },
 { v: "10,000 MT", l: "Food loss prevented" },
 ].map((s) => (
 <div key={s.l} className="rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[rgba(19,19,19,0.28)] backdrop-blur-md backdrop-saturate-150 px-4 py-3 tablet:p-5">
 <div className="text-[22px] tablet:text-[30px] leading-none t-tabular" style={{ fontWeight: 500 }}>{s.v}</div>
 <div className="t-caption !text-[rgba(255,255,255,0.65)] mt-2 tablet:mt-3">{s.l}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ───────────── Featured in ───────────── */}
 <Section tone="paper" className="!py-[14px] tablet:!py-[21px] desktop:!py-7">
 <div className="flex flex-col gap-2">
 <p className="t-body" style={{ fontWeight: 500 }}>As featured in</p>
 <LogoMarquee
 colored
 height={44}
 logos={[
 { src: "/images/content/forbes.png", alt: "Forbes", ratio: 3.2, scale: 1.2, href: "https://www.forbes.com/profile/sakib-hossain/" },
 { src: "/images/content/prothom-alo.png", alt: "Prothom Alo", ratio: 3.4, href: "https://www.prothomalo.com/technology/87em2f464t" },
 { src: "/images/content/daily-star.png", alt: "The Daily Star", ratio: 3.6, href: "https://www.thedailystar.net/tech-startup/news/agri-tech-startup-fashol-secures-tk-10-crore-pre-seed-investment-3296201" },
 { src: "/images/content/tech-in-asia.png", alt: "Tech in Asia", ratio: 3.4, href: "https://www.techinasia.com/bangladeshbased-startup-bags-1m-solve-agrisupply-problems" },
 { src: "/images/content/business-standard.png", alt: "The Business Standard", ratio: 2.6, href: "https://www.tbsnews.net/economy/corporates/ditech-signs-capital-investment-agreement-fasholcom-limited-317146" },
 { src: "/images/content/agfunder-transparent.png", alt: "AgFunder", ratio: 2.6, scale: 1.45, href: "https://agfundernews.com/bangladeshs-fashol-tackles-the-agrifood-supply-chain-to-stabilize-food-prices-for-farmers-and-reduce-food-waste" },
 { src: "/images/content/orbit-startups-transparent.png", alt: "Orbit Startups", ratio: 2.5, scale: 1.2, href: "https://orbitstartups.com/cutting-out-the-middleman-how-fashol-is-changing-the-game-for-farmers-and-retailers-in-bangladesh/" },
 { src: "/images/content/dhaka-tribune.png", alt: "Dhaka Tribune", ratio: 9.4, scale: 0.55, href: "https://www.dhakatribune.com/business/283477/agritech-startup-fashol-gets-1m-pre-seed" },
 { src: "/images/content/financial-express.png", alt: "The Financial Express", ratio: 17.8, scale: 0.4, href: "https://thefinancialexpress.com.bd/home/ditech-fasholcom-join-hands-to-ensure-better-supply-chain-of-perishables-1634385038" },
 { src: "/images/content/unb.png", alt: "UNB", ratio: 2.0, scale: 1.15, href: "https://unb.com.bd/category/Bangladesh/agri-tech-startup-fashol-secures-1-million-pre-seed-investment/113685" },
 { src: "/images/content/daily-observer.png", alt: "The Daily Observer", ratio: 4.5, scale: 0.85, href: "https://www.observerbd.com/news/415572" },
 { src: "/images/content/future-startup.png", alt: "Future Startup", ratio: 2.3, scale: 1.15, href: "https://futurestartup.com/2023/04/23/fashol-cholpori-jatri-turtle-venture-raise-investments/" },
 ]}
 />
 </div>
 </Section>

 {/* ───────────── Chapter I — The argument ───────────── */}
 <Section tone="surface">
 <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
 <Reveal as="h2" className="t-h2 desktop:col-span-6">
 Direct procurement from the farm gate; disciplined delivery to the buyer.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-6 t-body-lg">
 <p>
 Bangladesh&apos;s agricultural supply chain passes produce through five to seven intermediaries
 before it reaches a retailer. Pricing is opaque. Payment is late. Roughly a third of what is
 grown spoils before it is sold.
 </p>
 <p className="mt-5">
 Fashol removes the middle layers and replaces them with a platform — agent network,
 cold logistics, quality grading, settlement.
 </p>
 </Reveal>
 </div>

 {/* Fig 02 */}
 <div className="mt-16 tablet:mt-20">
 <div className="flex items-baseline justify-between gap-4 mb-6">
 <h3 className="t-h5 max-w-2xl" style={{ fontWeight: 500 }}>
 The Fashol chain, five nodes. Cycle time: 18–24 hours, farm gate → buyer door.
 </h3>
 </div>
 <Reveal>
 <SupplyChainFigure />
 </Reveal>
 </div>

 {/* Three stages */}
 <StaggerChildren className="grid tablet:grid-cols-3 gap-6 mt-14" stagger={0.1}>
 {[
 { s: "Stage 01", t: "Farm-gate onboarding", b: "Field agents register smallholders via the Jogaan app. Each farmer holds a record of what they grow, when, in what quantity, and at what price. No paper ledger. No verbal agreement. Transparent from day one." },
 { s: "Stage 02", t: "Cold logistics & grading", b: "Pickup, cold storage, and a four-tier quality grade applied at hub intake. Produce is catalogued before it leaves the district — not relabeled at the urban wholesale market, as is the common practice." },
 { s: "Stage 03", t: "Settlement & dispatch", b: "Buyers — MSMEs, quick-commerce operators, exporters, wholesalers — order through the platform. Farmers are paid via mobile financial services within 24 hours of weighing. Delivery runs on company route plans, not on aratdar convenience." },
 ].map((c) => (
 <StaggerItem key={c.s} className="card-plain p-8 flex flex-col gap-4">
 <Eyebrow>{c.s}</Eyebrow>
 <h4 className="t-h5" style={{ fontWeight: 500 }}>{c.t}</h4>
 <p className="t-body">{c.b}</p>
 </StaggerItem>
 ))}
 </StaggerChildren>

 {/* Field photo */}
 <div className="mt-16">
 <Figure
 src="/images/content/cabbage-field-bd.jpg"
 alt="A field agent walks through rows of cabbage at sunrise while inspecting produce in a company-registered Bangladeshi field."
 caption="Cabbage collection, company-registered farmer. Jashore district, 2024."
 credit="Photograph by Adil Ahnaf"
 />
 </div>
 </Section>

 {/* ───────────── Operations register ───────────── */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 mt-10">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 Forty-plus hubs. Nine districts. One platform behind every farmer.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body">
 A partial index of current operating districts. Numbers are reported internally and audited quarterly.
 </Reveal>
 </div>

 <div className="grid desktop:grid-cols-12 gap-10 mt-14 items-start">
 {/* Map */}
 <div className="desktop:col-span-5">
 <Reveal>
 <BangladeshMapFigure />
 </Reveal>
 <p className="t-caption mt-4">
 Fashol operating districts, Bangladesh — 2026 Q1.
 </p>
 </div>

 {/* Table */}
 <div className="desktop:col-span-7 overflow-x-auto">
 <Reveal>
 <table className="t-table min-w-[720px]">
 <thead>
 <tr>
 <th>№</th>
 <th>District</th>
 <th>Division</th>
 <th>Hubs</th>
 <th>Farmers</th>
 <th>Vol / mo</th>
 <th>Since</th>
 <th>Leading crops</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["01","Satkhira","Khulna","06","4,820","180 MT","2019","Paddy, Cabbage, Potato"],
 ["02","Jashore","Khulna","05","3,610","142 MT","2020","Cabbage, Tomato, Chilli"],
 ["03","Rajshahi","Rajshahi","05","3,210","128 MT","2021","Paddy, Mango, Onion"],
 ["04","Bogura","Rajshahi","04","2,940","110 MT","2021","Potato, Cauliflower"],
 ["05","Khulna","Khulna","04","2,180","96 MT","2022","Paddy, Aubergine"],
 ["06","Mymensingh","Mymensingh","04","2,060","84 MT","2022","Tomato, Gourd, Okra"],
 ["07","Comilla","Chattogram","04","1,980","78 MT","2023","Paddy, Chilli, Bottle Gourd"],
 ["08","Dhaka (Savar)","Dhaka","05","1,540","74 MT","2019","Leafy greens, Radish"],
 ["09","Sylhet","Sylhet","03","1,280","62 MT","2024","Tea, Lemon, Ginger"],
 ].map((r) => (
 <tr key={r[0]}>
 {r.map((c, i) => <td key={i}>{c}</td>)}
 </tr>
 ))}
 </tbody>
 <tfoot>
 <tr>
 <td colSpan={3}>Total, reported 2026 Q1</td>
 <td>40+</td>
 <td>40,000+</td>
 <td>~1,050 MT</td>
 <td colSpan={2} />
 </tr>
 </tfoot>
 </table>
 </Reveal>
 </div>
 </div>
 </Section>

 {/* ───────────── Chapter II — The evidence ───────────── */}
 <Section tone="surface">
 <div className="grid desktop:grid-cols-12 gap-10">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 What a farmer actually earns for one kilo of cabbage.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body">
 Comparison between the traditional aratdar chain and Fashol direct procurement.
 Figures are averages across Jashore and Satkhira, 2024 harvest season.
 </Reveal>
 </div>

 <div className="mt-14">
 <Reveal>
 <h3 className="t-h5 max-w-2xl mb-6" style={{ fontWeight: 500 }}>
 Farmer share of end-consumer price, BDT per kg. Lower bars = less to the grower.
 </h3>
 <PriceBarsFigure />
 </Reveal>
 <ol className="mt-6 t-caption space-y-1 max-w-3xl">
 <li>1. Traditional chain assumes five intermediaries: farmer → local trader → aratdar → urban wholesaler → retailer → consumer.</li>
 <li>2. Fashol chain: farmer → field agent → hub → buyer → consumer. Cold-chain loss and quality grading applied at intake.</li>
 <li>3. Averages for Grade A cabbage, Jashore &amp; Satkhira, Nov 2024 – Feb 2025. Internal reporting; figures rounded to the nearest BDT.</li>
 </ol>
 </div>

 <div className="mt-14 flex flex-col tablet:flex-row gap-3">
 <Button variant="primary" href="/case-study">One farmer, twelve harvests →</Button>
 <Button variant="secondary" href="/data">Full impact data, 2019 → 2026</Button>
 </div>

 {/* Crop calendar */}
 <div className="mt-24">
 <Reveal>
 <h2 className="t-h2 mt-6 max-w-3xl">Seven crops. Twelve months. Peak windows, mapped.</h2>
 <p className="t-body-lg mt-5 max-w-3xl">
 The Fashol network&apos;s leading seven crop lines, indexed against the months they peak across
 our operating districts. Grey = off-season. Terracotta = peak harvest. Use this to plan
 procurement or farmer onboarding.
 </p>
 </Reveal>
 <div className="mt-10">
 <Reveal>
 <h3 className="t-h5 max-w-2xl mb-4" style={{ fontWeight: 500 }}>
 Crop peak calendar, 2026 — Jashore · Satkhira · Rajshahi · Bogura · Comilla composite.
 </h3>
 <CropCalendarFigure />
 </Reveal>
 </div>
 </div>
 </Section>

 {/* ───────────── Editorial — From the founder ───────────── */}
 <Section tone="paper">
 <div className="container-narrow">
 <Reveal>
 <p className="t-mono text-[11px] text-[var(--color-ink-muted)] mt-3">
 From the founder · Sakib Hossain · Dhaka, April 2026
 </p>
 </Reveal>
 <Reveal as="h2" delay={0.08} className="t-h2 italic mt-8">
 What we talk about when we talk about a supply chain.
 </Reveal>
 <Reveal delay={0.16} className="mt-10 t-body-lg space-y-6 !text-[var(--color-ink-subtle)]">
 <p>
 I grew up in a country where the farmer who fed half the city couldn&apos;t feed his own children
 through a bad season. That isn&apos;t an essay, it is a balance sheet. The price a grower of tomatoes
 in Jashore receives is roughly one-fifth of what a customer pays at a Dhaka supermarket. The other
 four-fifths lives in the five to seven people who sit between the field and the shelf. Most of them
 add nothing — not cold-chain, not grading, not a trade service, not even a receipt.
 </p>
 <p>
 We built Fashol to remove as many of those layers as we could, and to replace them with a platform
 that earns its place. Software where the farmer owns the record. Cold-chain in districts that had
 none. A four-tier grade applied at hub intake. Settlement in twenty-four hours. None of these ideas
 are clever. The work is doing them, every day, in nine districts, across a seasonal economy that
 doesn&apos;t wait.
 </p>
 <p>
 We are <strong className="text-[var(--color-ink)]">40,000 farmers, 40-plus hubs, 26 percent less waste</strong>,
 and a few early numbers that say the model holds. We are also a long way from done. If you are a farmer,
 a buyer, an engineer, or a policy person who thinks Bangladesh deserves a properly-designed agricultural
 chain, you should be working on this with us.
 </p>
 </Reveal>
 <Reveal delay={0.24} className="mt-10 t-mono text-[11px] text-[var(--color-ink-muted)]">
 — Sakib Hossain — Founder &amp; CEO — Kawran Bazar, Dhaka
 </Reveal>
 </div>
 </Section>

 {/* ───────────── Services summary ───────────── */}
 <Section tone="surface">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">
 Six services. One platform. Every stage of the chain.
 </Reveal>

 <StaggerChildren className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-4 mt-14" stagger={0.08}>
 {[
 { n: "01", t: "Farm-to-market platform", b: "Direct farmer-to-buyer matching. No aratdars. Pricing visible to both sides.", tag: "Fashol · B2B" },
 { n: "02", t: "Smart logistics network", b: "Cold chain and last-mile pickup for rural, climate-vulnerable districts.", tag: "Fleet · Route" },
 { n: "03", t: "Buyer solutions", b: "Ordering, inventory, fulfilment for MSMEs, quick-commerce, exporters, wholesalers.", tag: "SaaS · Retail" },
 { n: "04", t: "Market intelligence", b: "Real-time price data and seasonal analytics for smallholder decision-making.", tag: "Data · Pricing" },
 { n: "05", t: "Quality assurance", b: "Four-tier grading applied at hub intake — before stock reaches the buyer.", tag: "Grade · QC" },
 { n: "06", t: "Financial solvency", b: "24-hour settlement via mobile money. Agricultural credit for established growers.", tag: "Payments · Credit" },
 ].map((s) => (
 <StaggerItem key={s.n} className="card-plain p-7 flex flex-col gap-4">
 <div className="flex items-center justify-between">
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)]">{s.n}</span>
 <span className="t-mono text-[10px] text-[var(--color-ink-muted)]">{s.tag}</span>
 </div>
 <h3 className="t-h5" style={{ fontWeight: 500 }}>{s.t}</h3>
 <p className="t-body mt-auto">{s.b}</p>
 </StaggerItem>
 ))}
 </StaggerChildren>
 <div className="mt-10">
 <Button variant="primary" href="/services">See the full services index →</Button>
 </div>
 </Section>

 {/* ───────────── Principles ───────────── */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 mt-10">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 Six principles. Operational, not aspirational.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 Written into how we decide, hire, and settle with farmers.
 </Reveal>
 </div>
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-x-10 gap-y-12 mt-14 border-t border-[var(--color-line-strong)] pt-12">
 {[
 { p: "P.01", t: "Farmer first", b: "Every pricing decision starts from what the grower will take home. Not from the margin the platform can hold." },
 { p: "P.02", t: "Accountability", b: "Named owners for each commitment — to farmers, to buyers, to investors. Escalation paths are visible." },
 { p: "P.03", t: "Sustainability", b: "Waste reduction is measured per district, per season, per crop. It is a ledger entry, not a talking point." },
 { p: "P.04", t: "Human-centered", b: "Jogaan is tested with agents and farmers who have never used a smartphone. If they cannot use it, it ships again." },
 { p: "P.05", t: "Optimisation", b: "Data first. First principles next. Opinion last. Decisions are traceable to numbers we can show." },
 { p: "P.06", t: "Leadership", b: "Bangladesh's agricultural infrastructure deserves to be designed, not inherited. We carry that responsibility." },
 ].map((p) => (
 <div key={p.p}>
 <div className="t-mono text-[11px] text-[var(--color-terracotta)]">{p.p}</div>
 <h3 className="t-h5 mt-2" style={{ fontWeight: 500 }}>{p.t}</h3>
 <p className="t-body mt-3">{p.b}</p>
 </div>
 ))}
 </div>
 </Section>

 {/* ───────────── Voice from the field ───────────── */}
 <Section tone="ink" size="sm">
 <div className="grid desktop:grid-cols-12 gap-10 items-center">
 <div className="desktop:col-span-7">
 <blockquote className="t-h3 mt-8 max-w-3xl" style={{ fontWeight: 500 }}>
 &ldquo;Fashol has changed the shape of my farming. Prices are{" "}
 <span className="text-[var(--color-lime)]">25 percent higher</span> than what the aratdar paid me
 — and the money is in my mobile wallet within a day, not a month.&rdquo;
 </blockquote>
 <p className="t-mono text-[11px] !text-[rgba(255,255,255,0.65)] mt-10">
 — Mohammad Rahim Uddin — Vegetable farmer, Satkhira — Onboarded 2023
 </p>
 </div>
 <div className="desktop:col-span-5">
 <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
 <Image
 src="/images/content/farmer-sowing.jpg"
 alt="A farmer in an orange shirt with a checked headscarf sows rice seed from a metal bowl while standing in a young paddy at mid-morning."
 fill
 sizes="(min-width: 1200px) 440px, 90vw"
 className="object-cover"
 />
 <div className="absolute inset-x-0 bottom-0 p-5 text-white/80 text-[11px] font-mono bg-gradient-to-t from-black/60 to-transparent">
 A registered farmer sowing. Rice paddy, South Asia, 2024.
 </div>
 </div>
 </div>
 </div>
 </Section>

 {/* ───────────── Trust register grids ───────────── */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-8 desktop:gap-10 items-start mt-10">
 <Reveal className="desktop:col-span-3">
 <span className="text-[16px] font-medium tracking-[-0.005em] text-[var(--color-terracotta)]">
 Our Network
 </span>
 </Reveal>
 <div className="desktop:col-span-9">
 <Reveal as="h2" className="t-h2">
 Trusted by 7,000+ customers: Market leaders, Global organizations, and The best in the business.
 </Reveal>
 </div>
 </div>

 <div className="mt-16">
 <div className="grid grid-cols-3 tablet:grid-cols-4 desktop:grid-cols-6 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-2xl overflow-hidden">
 {PARTNERS.map((p) => (
 <div key={p.alt} className="bg-white aspect-[4/3] flex items-center justify-center p-4 tablet:p-5">
 <Image src={p.src} alt={p.alt} width={240} height={120} className="max-h-[64px] w-auto max-w-[82%] object-contain" />
 </div>
 ))}
 </div>
 </div>

 <div className="mt-10">
 <div className="grid grid-cols-2 tablet:grid-cols-5 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-2xl overflow-hidden">
 {INVESTORS.map((p) => (
 <div key={p.alt} className="bg-white aspect-[4/3] flex items-center justify-center p-6">
 <Image src={p.src} alt={p.alt} width={160} height={60} className="max-h-[52px] w-auto object-contain" />
 </div>
 ))}
 </div>
 </div>

 </Section>

 {/* ───────────── SDG alignment ───────────── */}
 <Section tone="surface">
 <div className="grid desktop:grid-cols-12 gap-10 mt-10">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 Six of seventeen UN Sustainable Development Goals, mapped to operations.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 We audit against these each quarter. The icon is the UN&apos;s; the measurement is ours.
 </Reveal>
 </div>

 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-4 mt-14">
 {[
 { n: "SDG 01", t: "No poverty", img: "sdg-01", b: "Farmer income lift, measured at onboarding vs. 12-month benchmark." },
 { n: "SDG 02", t: "Zero hunger", img: "sdg-02", b: "Food loss prevented in metric tons, per district, per season." },
 { n: "SDG 08", t: "Decent work", img: "sdg-08", b: "Full-time hub roles created in rural districts with historically thin employment." },
 { n: "SDG 09", t: "Industry & infrastructure",img: "sdg-09", b: "Cold storage and route-planning built in districts previously served by none." },
 { n: "SDG 12", t: "Responsible consumption", img: "sdg-12", b: "Quality grading reduces returns; traceability reduces over-ordering." },
 { n: "SDG 13", t: "Climate action", img: "sdg-13", b: "Climate-vulnerable farmers prioritised for onboarding in flood-prone coastal belts." },
 ].map((s) => (
 <div key={s.n} className="card-plain p-6 flex gap-5 items-start">
 <div className="relative w-14 h-14 shrink-0">
 <Image src={`/images/content/${s.img}.jpg`} alt={`UN ${s.n}: ${s.t}`} fill sizes="56px" className="object-contain rounded-md" />
 </div>
 <div>
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)]">{s.n}</span>
 <h3 className="t-h5 mt-1" style={{ fontWeight: 500 }}>{s.t}</h3>
 <p className="t-body-sm mt-2 text-[var(--color-ink-subtle)]">{s.b}</p>
 </div>
 </div>
 ))}
 </div>
 </Section>

 {/* ───────────── Join — CTA triad ───────────── */}
 <Section tone="ink">
 <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">
 The chain is still being built. Join as a farmer, a buyer, or a colleague.
 </Reveal>

 <StaggerChildren className="grid tablet:grid-cols-3 gap-6 mt-14" stagger={0.1}>
 {[
 { n: "01", t: "Farmer onboarding", b: "WhatsApp a field agent. Bring your last season's records, if available.", cta: "Farmer onboarding →", href: "https://wa.me/+8801810187230?text=Hello%21%20I%E2%80%99d%20like%20to%20register%20as%20a%20farmer%20with%20Fashol." },
 { n: "02", t: "Buyer account", b: "MSMEs, quick-commerce, exporters, wholesalers. Ten-minute setup.", cta: "Buyer account →", href: "https://wa.me/+8801810187230?text=Hello%21%20I%E2%80%99d%20like%20to%20buy%20produce%20through%20Fashol." },
 { n: "03", t: "Work with us", b: "Open roles in engineering, logistics, field operations, and data.", cta: "Work with us →", href: "/career" },
 ].map((c) => (
 <StaggerItem key={c.n} className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4">
 <span className="t-mono text-[11px] !text-[rgba(255,255,255,0.55)]">{c.n}</span>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{c.t}</h3>
 <p className="t-body !text-[rgba(255,255,255,0.7)]">{c.b}</p>
 <div className="mt-auto pt-4">
 <Button variant="on-dark" href={c.href} external={c.href.startsWith("http")}>{c.cta}</Button>
 </div>
 </StaggerItem>
 ))}
 </StaggerChildren>
 </Section>
 </>
 );
}
