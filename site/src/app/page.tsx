import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { PlatformSection } from "@/components/site/PlatformSection";
import { PriceBarsFigure } from "@/components/figures/PriceBars";
import { BangladeshMapFigure } from "@/components/figures/BangladeshMap";
import { PARTNERS, INVESTORS } from "@/data/site";

export default function HomePage() {
 return (
 <>{/* ───────────── Hero ───────────── */}
 <section className="relative bg-[var(--color-paper)] text-[var(--color-deep-green)]">
 {/* Illustration - natural aspect, full width */}
 <div className="relative w-full">
 <Image
 src="/h7-hero.webp"
 alt=""
 width={1920}
 height={780}
 priority
 sizes="100vw"
 className="block w-full h-auto"
 />
 {/* Soft cream fade at the image floor - separates illustration from headline without visible gap */}
 <div
 aria-hidden
 className="absolute inset-x-0 bottom-0 h-10 tablet:h-14 pointer-events-none"
 style={{
 background: "linear-gradient(to top, var(--color-paper) 0%, rgba(255,251,234,0) 100%)",
 }}
 />
 </div>

 {/* Headline block - compact, centered */}
 <div className="container-page text-center pt-0 pb-4 tablet:pt-0 tablet:pb-5">
 <Reveal as="h1" className="t-hero !text-[30px] tablet:!text-[44px] desktop:!text-[56px] !text-[var(--color-deep-green)] max-w-[900px] mx-auto">
 Building a better food supply chain
 </Reveal>
 {/* <Reveal
 as="p"
 delay={0.16}
 className="t-body-lg !text-[var(--color-ink-subtle)] mt-4 max-w-2xl mx-auto"
 >
 Fashol moves perishable produce from farms across Bangladesh to buyers in Dhaka,
 Singapore, and Dubai. Direct pricing. Real-time logistics.{" "}
 <span className="text-[var(--color-deep-green)] font-medium">26 percent less waste.</span>
 </Reveal> */}
 <Reveal delay={0.24} className="mt-4 tablet:mt-5 flex flex-col tablet:flex-row gap-3 justify-center items-center">
 <Button variant="primary" href="/contact" className="!h-10 !px-5 !text-[13px]">
 Partner with Fashol
 </Button>
 <Button
 variant="secondary"
 href="/data"
 className="!h-10 !px-5 !text-[13px] !text-[var(--color-deep-green)] !border-[var(--color-deep-green)] hover:!bg-[rgba(6,94,58,0.06)]"
 >
 Read the data →
 </Button>
 </Reveal>
 </div>

 {/* At-a-glance stats - compact */}
 <div className="container-page pb-5 tablet:pb-6">
 <div className="grid grid-cols-2 desktop:grid-cols-4 gap-2 tablet:gap-3">
 {[
 { v: "60,000+", l: "Registered farmers" },
 { v: "7,000+", l: "Buyers" },
 { v: "15,000+ MT", l: "Food loss prevented" },
 { v: "4+ Countries", l: "cross-border supply chain solution" },
 ].map((s) => (
 <div key={s.l} className="rounded-xl border border-[rgba(6,94,58,0.2)] bg-[rgba(255,251,234,0.92)] backdrop-blur-sm px-3 py-2 tablet:px-4 tablet:py-2.5">
 <div className="text-[17px] tablet:text-[22px] leading-none t-tabular !text-[var(--color-deep-green)]" style={{ fontWeight: 500 }}>{s.v}</div>
 <div className="t-caption !text-[var(--color-ink-subtle)] mt-1 tablet:mt-1.5">{s.l}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ───────────── Featured in ───────────── */}
 <Section tone="paper" className="!py-[10px] tablet:!py-[16px] desktop:!py-[20px]">
 <div className="flex flex-col gap-2">
 <p className="t-body" style={{ fontWeight: 500 }}>As featured in</p>
 <LogoMarquee
 colored
 height={44}
 centerAlt="Forbes"
 logos={[
 { src: "/images/content/forbes.png", alt: "Forbes", ratio: 3.2, scale: 1.2, href: "https://www.forbes.com/profile/sakib-hossain/" },
 { src: "/images/content/prothom-alo.png", alt: "Prothom Alo", ratio: 3.4, href: "https://www.prothomalo.com/technology/87em2f464t" },
 { src: "/images/content/daily-star.png", alt: "The Daily Star", ratio: 3.6, href: "https://www.thedailystar.net/tech-startup/news/agri-tech-startup-fashol-secures-tk-10-crore-pre-seed-investment-3296201" },
 { src: "/images/content/tech-in-asia.png", alt: "Tech in Asia", ratio: 3.4, href: "https://www.techinasia.com/bangladeshbased-startup-bags-1m-solve-agrisupply-problems" },
 { src: "/images/content/business-standard.png", alt: "The Business Standard", ratio: 2.6, href: "https://www.tbsnews.net/economy/corporates/ditech-signs-capital-investment-agreement-fasholcom-limited-317146" },
 { src: "/images/content/agfunder-transparent.png", alt: "AgFunder", ratio: 2.6, scale: 1.8, href: "https://agfundernews.com/bangladeshs-fashol-tackles-the-agrifood-supply-chain-to-stabilize-food-prices-for-farmers-and-reduce-food-waste" },
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

 <PlatformSection />

 {/* ───────────── Chapter I - The argument ───────────── */}
 <Section tone="paper">
 <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
 <Reveal as="h2" className="t-h2 desktop:col-span-6">
 We buy direct from farmers and deliver to the buyer&apos;s door.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-6 t-body-lg">
 <p>
 Fashol moves fresh produce from farms in nine Bangladeshi districts to buyers in Dhaka, Singapore, Dubai, and Bangkok. Our field agents buy direct from the farmer. Our hubs grade and cold-store the produce. Our trucks run on Fashol&apos;s own delivery routes. Farmers are paid by mobile money within 24 hours of weighing.
 </p>
 <p className="mt-5">
 Owning every step of that route is the point. It keeps the price fair for the farmer, the quality consistent for the buyer, and the journey short enough to move fresh food across borders. The same platform that runs nine districts in Bangladesh today is what we are taking into the rest of South Asia next.
 </p>
 </Reveal>
 </div>

 {/* Unified figure + five-node key */}
 <Reveal className="mt-10 tablet:mt-14">
 <div className="card-plain p-6 tablet:p-8">
 <h3 className="t-h5 max-w-2xl" style={{ fontWeight: 500 }}>
 Five nodes, 18 to 24 hours from the farmer to the buyer&apos;s door.
 </h3>
 <div className="mt-6">
 <Image
 src="/images/content/card-image-10.png"
 alt="Fashol's five-node supply chain, from rural farm to urban buyer and export markets."
 width={1920}
 height={1072}
 loading="lazy"
 sizes="(min-width: 1200px) 1100px, 100vw"
 className="w-full h-auto"
 />
 </div>
 <div className="mt-8 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-5 gap-px bg-[var(--color-line)] border-t border-[var(--color-line)] -mx-6 tablet:-mx-8 -mb-6 tablet:-mb-8 overflow-hidden rounded-b-[23px]">
 {[
 { n: "01", t: "FARMER", s: "Direct procurement", stat: "60,000+ growers", d: "Field agents register the farmer on the Jogaan app and lock the price at weighing." },
 { n: "02", t: "DISTRICT HUB", s: "Grade and cold-store", stat: "40+ hubs", d: "Four-tier quality grading, applied at hub intake." },
 { n: "03", t: "PLATFORM", s: "Match and settle", stat: "24h payout", d: "Mobile money settlement to the farmer." },
 { n: "04", t: "LAST MILE", s: "Refrigerated dispatch", stat: "1,050+ MT/month", d: "Refrigerated trucks on Fashol's own delivery routes." },
 { n: "05", t: "BUYER'S DOOR", s: "Order to delivery", stat: "7,000+ buyers", d: "From a Dhaka MSME to an exporter shipping into Singapore, Dubai, or Bangkok." },
 ].map((c) => (
 <div key={c.n} className="p-5 tablet:p-6 bg-[var(--color-paper)] flex flex-col gap-2.5">
 <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] text-[10px] t-mono">
 {c.n}
 </span>
 <h4 className="t-h5 tracking-[-0.02em] mt-2" style={{ fontWeight: 500 }}>{c.t}</h4>
 <p className="t-caption">{c.s}</p>
 <p className="t-body-sm text-[var(--color-ink-subtle)] mt-1">{c.stat}</p>
 <p className="t-caption">{c.d}</p>
 </div>
 ))}
 </div>
 </div>
 </Reveal>

 </Section>

 {/* ───────────── Operations register ───────────── */}
 <Section tone="surface">
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
 Fashol operating districts, Bangladesh - 2026 Q1.
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

 {/* ───────────── Chapter II - The evidence ───────────── */}
 <Section tone="paper">
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
 <li>3. Averages for Grade A cabbage, Jashore &amp; Satkhira, Nov 2024 - Feb 2025. Internal reporting; figures rounded to the nearest BDT.</li>
 </ol>
 </div>

 <div className="mt-14 flex flex-col tablet:flex-row gap-3">
 <Button variant="primary" href="/case-study">One farmer, twelve harvests →</Button>
 <Button variant="secondary" href="/data">Full impact data, 2019 → 2026</Button>
 </div>
 </Section>

 {/* ───────────── Editorial - From the founder ───────────── */}
 <Section tone="surface">
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
 add nothing - not cold-chain, not grading, not a trade service, not even a receipt.
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
 - Sakib Hossain - Founder &amp; CEO - Kawran Bazar, Dhaka
 </Reveal>
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
 { p: "P.02", t: "Accountability", b: "Named owners for each commitment - to farmers, to buyers, to investors. Escalation paths are visible." },
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
 - and the money is in my mobile wallet within a day, not a month.&rdquo;
 </blockquote>
 <p className="t-mono text-[11px] !text-[rgba(255,255,255,0.65)] mt-10">
 - Mohammad Rahim Uddin - Vegetable farmer, Satkhira - Onboarded 2023
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

 {/* ───────────── Join - CTA triad ───────────── */}
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
