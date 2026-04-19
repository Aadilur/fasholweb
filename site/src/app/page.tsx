import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { PlatformSection } from "@/components/site/PlatformSection";
import { GlobeFigure } from "@/components/figures/Globe";
import { PARTNERS, INVESTORS } from "@/data/site";

export default function HomePage() {
 return (
 <>{/* ───────────── Hero ───────────── */}
 <section className="relative bg-[var(--color-paper)] text-[var(--color-deep-green)]">
 {/* Illustration - natural aspect, width-capped so wider viewports do not push the fold below the stat tiles */}
 <div className="relative w-full max-h-[520px] tablet:max-h-[560px] desktop:max-h-[600px] overflow-hidden">
 <Image
 src="/h10.png"
 alt=""
 width={1920}
 height={815}
 priority
 sizes="100vw"
 className="block w-full h-auto max-h-[520px] tablet:max-h-[560px] desktop:max-h-[600px] object-cover object-center"
 />
 {/* Deep cream fade at the image floor - lets the headline sit over the image's lower portion */}
 <div
 aria-hidden
 className="absolute inset-x-0 bottom-0 h-[150px] tablet:h-[190px] desktop:h-[230px] pointer-events-none"
 style={{
 background: "linear-gradient(to top, var(--color-paper) 0%, var(--color-paper) 75%, rgba(255,251,234,0) 100%)",
 }}
 />
 </div>

 {/* Headline block - pulled up into the image's faded floor so 4 stat cards land at the viewport fold */}
 <div className="container-page text-center relative z-10 pt-0 pb-4 -mt-24 tablet:-mt-32 desktop:-mt-40 tablet:pb-5">
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
 <Section tone="surface" size="sm" className="!py-10 tablet:!py-12 desktop:!py-14">
 <div className="grid desktop:grid-cols-12 gap-8 items-end">
 <Reveal as="h2" className="t-h2 desktop:col-span-5">
 One network behind every farmer.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-7 t-body">
 A farmer on Jogaan does not sell to one buyer. They sell into a network of 40 Fashol hubs, 200+ wholesale markets across 50 Bangladeshi locations, plus cross-border buyers in Singapore, the UAE, and Thailand. Fashol owns the cold chain, the grading, and the route. The farmer gets the reach.
 </Reveal>
 </div>

 {/* Scoreboard + hub table - two-column dense row */}
 <div className="grid desktop:grid-cols-12 gap-8 desktop:gap-10 mt-8 items-start">
 {/* Scoreboard - vertical compact list */}
 <Reveal className="desktop:col-span-5 flex flex-col">
 <p className="text-[10px] text-[var(--color-terracotta)] uppercase mb-2" style={{ fontWeight: 500, letterSpacing: "0.08em" }}>At a glance</p>
 <dl className="flex flex-col gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-xl overflow-hidden">
 {[
 { v: "40+", l: "Hubs" },
 { v: "200+", l: "Markets" },
 { v: "50", l: "Locations" },
 { v: "60K+", l: "Farmers" },
 { v: "3.5K+ MT", l: "Volume / mo" },
 { v: "4", l: "Countries" },
 ].map((s) => (
 <div key={s.l} className="bg-[var(--color-grain)] px-4 py-2.5 flex items-baseline justify-between gap-3">
 <dd className="t-tabular text-[15px] !text-[var(--color-deep-green)]" style={{ fontWeight: 500 }}>{s.v}</dd>
 <dt className="t-caption !text-[var(--color-ink-muted)] text-right">{s.l}</dt>
 </div>
 ))}
 </dl>
 </Reveal>

 {/* Hub footprint - editorial directory list */}
 <Reveal delay={0.08} className="desktop:col-span-7">
 <p className="text-[10px] text-[var(--color-terracotta)] uppercase mb-3" style={{ fontWeight: 500, letterSpacing: "0.08em" }}>Hub footprint</p>
 <ul className="divide-y divide-[var(--color-line)] border-t border-b border-[var(--color-line)]">
 {[
 { hubs: "15", name: "Khulna", crops: "Paddy, Cabbage, Tomato" },
 { hubs: "09", name: "Rajshahi", crops: "Paddy, Mango, Potato" },
 { hubs: "04", name: "Mymensingh", crops: "Tomato, Gourd, Okra" },
 { hubs: "04", name: "Chattogram", crops: "Paddy, Chilli, Bottle Gourd" },
 { hubs: "05", name: "Dhaka", crops: "Leafy greens, Radish" },
 { hubs: "03", name: "Sylhet", crops: "Tea, Lemon, Ginger" },
 { hubs: "-", name: "Barishal", crops: "Onboarding, 2026 Q2" },
 ].map((d) => (
 <li key={d.name} className="grid grid-cols-12 gap-3 items-baseline py-2.5">
 <span className="col-span-2 t-tabular text-[18px] !text-[var(--color-deep-green)]" style={{ fontWeight: 500 }}>
 {d.hubs}
 </span>
 <span className="col-span-4 text-[14px]" style={{ fontWeight: 500 }}>
 {d.name}
 </span>
 <span className="col-span-6 t-caption">
 {d.crops}
 </span>
 </li>
 ))}
 </ul>
 </Reveal>
 </div>
 </Section>

 {/* ───────────── Use cases - Four kinds of buyers ───────────── */}
 <Section tone="surface">
 <div className="grid desktop:grid-cols-12 gap-10">
 <Reveal as="h2" className="t-h2 desktop:col-span-7">
 Four kinds of buyers. One platform, built around each.
 </Reveal>
 <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
 <p>
 Fashol is not a one-size marketplace. What a restaurant needs from us is different from what a wholesaler needs, or an exporter. The platform delivers differently to each, on the same infrastructure.
 </p>
 </Reveal>
 </div>

 <div className="mt-14 grid grid-cols-1 desktop:grid-cols-2 gap-6 desktop:gap-8">
 {[
 {
 num: "01",
 title: "Restaurants",
 img: "/c1.webp",
 body: "Fresh produce at your kitchen door before morning service, ordered the night before through Hyperfarm. No more 4am runs to the wholesale market.",
 standout: "Same-day or next-day delivery, Dhaka",
 },
 {
 num: "02",
 title: "Quick-commerce",
 img: "/c2.webp",
 body: "Real-time stock visibility and daily pricing on Hyperfarm, with cold-chain fulfillment to your distribution centers. Traceability runs from farmer to final order.",
 standout: "The produce layer behind multiple operators in Dhaka",
 },
 {
 num: "03",
 title: "Wholesalers",
 img: "/c3.webp",
 body: "Direct-from-hub bulk pricing with quality grading applied at intake, not at the urban wholesale market. Operations managed through Banijjo.",
 standout: "The volume of aratdar, with transparency aratdar never had",
 },
 {
 num: "04",
 title: "Exporters",
 img: "/c4.webp",
 body: "Grade A selection at hub intake, dedicated cold-chain routing to airports, and export documentation handled end-to-end. Produce in the destination market while it is still in peak freshness.",
 standout: "Farm-to-airport in under 24 hours",
 },
 ].map((c) => (
 <Reveal key={c.num}>
 <article className="flex flex-col h-full p-4 tablet:p-5 bg-[var(--color-paper)] rounded-xl border-b border-[var(--color-line-strong)]">
 <div className="relative aspect-[2/1] w-full rounded-lg overflow-hidden bg-[var(--color-grain)]">
 <Image
 src={c.img}
 alt=""
 fill
 sizes="(min-width: 1200px) 520px, 100vw"
 className="object-cover"
 />
 </div>
 <span className="t-mono text-[10px] text-[var(--color-ink-muted)] mt-4">
 {c.num}
 </span>
 <h3 className="t-h5 mt-1.5" style={{ fontWeight: 500 }}>
 {c.title}
 </h3>
 <p className="t-body-sm mt-2">{c.body}</p>
 <p className="text-[12px] tracking-[-0.005em] text-[var(--color-terracotta)] mt-auto pt-3" style={{ fontWeight: 500 }}>
 {c.standout}
 </p>
 </article>
 </Reveal>
 ))}
 </div>
 </Section>

 {/* ───────────── Global capability ───────────── */}
 <Section tone="paper">
 <Reveal>
 <div className="relative max-w-[1120px] mx-auto">
 {/* Top hero card - vertical padding tightened (~25%); title zone sits above a reserved globe zone so text never collides with the halo */}
 <div className="relative bg-[var(--color-deep-green)] rounded-[32px] px-6 tablet:px-10 desktop:px-14 pt-10 tablet:pt-14 desktop:pt-16 pb-[125px] tablet:pb-[150px] desktop:pb-[175px] text-center overflow-visible">
 <span className="t-mono text-[11px] tracking-[0.14em] !text-[rgba(255,251,234,0.55)] block mb-4 tablet:mb-5 uppercase">
 GLOBAL CAPABILITY
 </span>
 <h2 className="!text-[var(--color-paper)] max-w-[720px] mx-auto text-[28px] tablet:text-[38px] desktop:text-[46px] leading-[1.08] tracking-[-0.015em]" style={{ fontWeight: 500 }}>
 We source in Bangladesh. We deliver across the region.
 </h2>
 <p className="mt-4 tablet:mt-5 text-[14px] tablet:text-[15px] desktop:text-[16px] leading-[1.55] !text-[rgba(255,251,234,0.75)] max-w-[560px] mx-auto">
 Four offices run on a single operating system. Every order moves on the same stock, pricing, and settlement engine.
 </p>

 {/* Cutout halo - paper-colored disk that punches a circle through both the top card and the flanking cards below, so they appear to wrap around the globe */}
 <div
 aria-hidden
 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[60%] w-[280px] h-[280px] tablet:w-[340px] tablet:h-[340px] desktop:w-[400px] desktop:h-[400px] rounded-full bg-[var(--color-paper)] pointer-events-none z-[5]"
 />

 {/* Clean globe - sits on top of the halo, anchored to bottom of the top card */}
 <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[60%] w-[260px] h-[260px] tablet:w-[320px] tablet:h-[320px] desktop:w-[380px] desktop:h-[380px] pointer-events-none z-10">
 <GlobeFigure showOffices={false} />
 </div>
 </div>

 {/* Three flanking tiles - ink tone, 40px internal padding; top padding reserves the globe protrusion zone. Globe sits centered over the middle (EXPORT) tile */}
 <div className="grid grid-cols-1 desktop:grid-cols-3 gap-4 tablet:gap-5 mt-4 tablet:mt-5">
 {/* OFFICES - big 4 paired with a city/role directory */}
 <div className="bg-[var(--color-ink)] rounded-[32px] p-8 tablet:p-10 pt-[190px] tablet:pt-[230px] desktop:pt-[260px] flex flex-col">
 <span className="t-mono text-[11px] tracking-[0.14em] !text-[rgba(255,251,234,0.5)] uppercase">OFFICES</span>
 <div className="mt-6 flex items-start gap-5 tablet:gap-6">
 <div className="t-tabular text-[64px] tablet:text-[72px] desktop:text-[80px] leading-[0.9] !text-[var(--color-paper)] flex-shrink-0" style={{ fontWeight: 500 }}>
 4
 </div>
 <dl className="flex-1 pt-1 grid grid-cols-[auto_1fr] gap-x-3 tablet:gap-x-4 gap-y-2 text-[13px] leading-[1.35]">
 <dt className="tracking-[0.05em] uppercase !text-[var(--color-paper)]" style={{ fontWeight: 500 }}>Dhaka</dt>
 <dd className="!text-[rgba(255,251,234,0.55)]">Headquarters and operations</dd>
 <dt className="tracking-[0.05em] uppercase !text-[var(--color-paper)]" style={{ fontWeight: 500 }}>Singapore</dt>
 <dd className="!text-[rgba(255,251,234,0.55)]">Regional trade desk</dd>
 <dt className="tracking-[0.05em] uppercase !text-[var(--color-paper)]" style={{ fontWeight: 500 }}>Dubai</dt>
 <dd className="!text-[rgba(255,251,234,0.55)]">Middle East gateway</dd>
 <dt className="tracking-[0.05em] uppercase !text-[var(--color-paper)]" style={{ fontWeight: 500 }}>Bangkok</dt>
 <dd className="!text-[rgba(255,251,234,0.55)]">Southeast Asia desk</dd>
 </dl>
 </div>
 </div>

 {/* EXPORT - middle tile, sits directly beneath the globe */}
 <div className="bg-[var(--color-ink)] rounded-[32px] p-8 tablet:p-10 pt-[190px] tablet:pt-[230px] desktop:pt-[260px] flex flex-col">
 <span className="t-mono text-[11px] tracking-[0.14em] !text-[rgba(255,251,234,0.5)] uppercase">EXPORT</span>
 <h3 className="mt-6 text-[24px] tablet:text-[28px] desktop:text-[32px] leading-[1.1] tracking-[-0.015em] !text-[var(--color-paper)]" style={{ fontWeight: 500 }}>
 Four corridors out of Dhaka.
 </h3>
 <p className="mt-5 text-[14px] tablet:text-[15px] leading-[1.55] !text-[rgba(255,251,234,0.72)]">
 Air and sea routes from Bangladesh to buyers in Singapore, the Gulf, and Southeast Asia. Fresh produce, grading-verified and cold-chain handled from the farm gate through customs.
 </p>
 </div>

 {/* TECHNOLOGY - replaces the prior PLATFORM tile */}
 <div className="bg-[var(--color-ink)] rounded-[32px] p-8 tablet:p-10 pt-[190px] tablet:pt-[230px] desktop:pt-[260px] flex flex-col">
 <span className="t-mono text-[11px] tracking-[0.14em] !text-[rgba(255,251,234,0.5)] uppercase">TECHNOLOGY</span>
 <h3 className="mt-6 text-[24px] tablet:text-[28px] desktop:text-[32px] leading-[1.1] tracking-[-0.015em] !text-[var(--color-paper)]" style={{ fontWeight: 500 }}>
 The eagle-eye view of your supply.
 </h3>
 <p className="mt-5 text-[14px] tablet:text-[15px] leading-[1.55] !text-[rgba(255,251,234,0.72)]">
 Every kilogram is traced, graded on a four-tier scale, and QC-checked before it leaves our hub. On the other side, buyers follow the full picture on one live dashboard: order status, grade results, cold-chain readings, and settlement.
 </p>
 </div>
 </div>
 </div>
 </Reveal>
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
