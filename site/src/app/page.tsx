import Image from "next/image";
import dynamic from "next/dynamic";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { GlobeFigure } from "@/components/site/GlobeLazy";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n.server";

// Code-split heavy below-fold sections — ssr:false keeps them out of the server render
// path, reducing per-request memory on the constrained 500MB instance.
const PlatformSection = dynamic(
  () =>
    import("@/components/site/PlatformSection").then((m) => m.PlatformSection),
  { ssr: false },
);

const VoicesMarquee = dynamic(
  () => import("@/components/site/VoicesMarquee").then((m) => m.VoicesMarquee),
  { ssr: false },
);

const TrustGrids = dynamic(
  () => import("@/components/site/TrustGrids").then((m) => m.TrustGrids),
  { ssr: false },
);

export default async function HomePage() {
  const lang = await getLang();
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative bg-[var(--color-paper)] text-[var(--color-deep-green)]">
        {/* Illustration - natural aspect, width-capped so wider viewports do not push the fold below the stat tiles */}
        <div className="relative w-full h-[240px] tablet:h-auto max-h-[520px] tablet:max-h-[560px] desktop:max-h-[600px] overflow-hidden">
          <Image
            src="/h10.png"
            alt=""
            width={1920}
            height={815}
            priority
            sizes="100vw"
            className="block w-full h-full tablet:h-auto max-h-[520px] tablet:max-h-[560px] desktop:max-h-[600px] object-cover object-center"
          />
          {/* Deep cream fade at the image floor - lets the headline sit over the image's lower portion */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[104px] tablet:h-[190px] desktop:h-[230px] pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, var(--color-paper) 0%, var(--color-paper) 75%, rgba(255,251,234,0) 100%)",
            }}
          />
        </div>

        {/* Headline block - pulled up into the image's faded floor so 4 stat cards land at the viewport fold */}
        <div className="container-page text-center relative z-10 pt-0 pb-4 -mt-14 tablet:-mt-32 desktop:-mt-40 tablet:pb-5">
          <Reveal
            as="h1"
            className="t-hero !text-[30px] tablet:!text-[44px] desktop:!text-[56px] !text-[var(--color-deep-green)] max-w-[900px] mx-auto"
          >
            {t(
              lang,
              "Building a safe, sustainable food supply chain",
              "নিরাপদ, টেকসই সাপ্লাই চেইন গড়ে তুলছি",
            )}
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="t-body-lg !text-[var(--color-ink-subtle)] mt-4 max-w-2xl mx-auto"
          >
            {t(
              lang,
              "Better pay for the farmers who grow it, and ",
              "যারা ফলান সেই কৃষকদের জন্য ন্যায্য দাম, আর ",
            )}
            <span className="text-[var(--color-deep-green)] font-medium">
              {t(
                lang,
                "safe, traceable produce",
                "নিরাপদ, সম্পূর্ণ ট্রেসেবল পণ্য",
              )}
            </span>{" "}
            {t(lang, "for every buyer.", "প্রতিটি বায়ারের জন্য।")}
          </Reveal>
          <Reveal
            delay={0.24}
            className="mt-4 tablet:mt-5 flex flex-col tablet:flex-row gap-3 justify-center items-center"
          >
            <Button
              variant="primary"
              href="/contact"
              className="!h-10 !px-5 !text-[13px]"
            >
              {t(lang, "Partner with Fashol", "ফসলের সঙ্গে যুক্ত হন")}
            </Button>
          </Reveal>
        </div>

        {/* At-a-glance stats - compact */}
        <div className="container-page pb-5 tablet:pb-6">
          <div className="grid grid-cols-2 desktop:grid-cols-4 gap-2 tablet:gap-3">
            {[
              {
                v: "60,000+",
                vBn: "60,000+",
                l: "Registered farmers",
                lBn: "নিবন্ধিত কৃষক",
              },
              { v: "7,000+", vBn: "7,000+", l: "Buyers", lBn: "বায়ার" },
              {
                v: "15,000+ MT",
                vBn: "15,000+ মেট্রিক টন",
                l: "Food loss prevented",
                lBn: "রোধ করা খাদ্য অপচয়",
              },
              {
                v: "4+ Countries",
                vBn: "4+ দেশ",
                l: "cross-border supply chain solution",
                lBn: "আন্তঃসীমান্ত সাপ্লাই চেইন সলিউশন",
              },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-[rgba(6,94,58,0.2)] bg-[rgba(255,251,234,0.92)] backdrop-blur-sm px-3 py-2 tablet:px-4 tablet:py-2.5"
              >
                <div
                  className="text-[17px] tablet:text-[22px] leading-none t-tabular !text-[var(--color-deep-green)]"
                  style={{ fontWeight: 500 }}
                >
                  {t(lang, s.v, s.vBn)}
                </div>
                <div className="t-caption !text-[var(--color-ink-subtle)] mt-1 tablet:mt-1.5">
                  {t(lang, s.l, s.lBn)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Featured in ───────────── */}
      <Section
        tone="paper"
        className="!py-[10px] tablet:!py-[16px] desktop:!py-[20px]"
      >
        <div className="flex flex-col gap-2">
          <p className="t-body" style={{ fontWeight: 500 }}>
            {t(lang, "As featured in", "যাদের প্রতিবেদনে")}
          </p>
          <LogoMarquee
            colored
            height={44}
            centerAlt="Forbes"
            logos={[
              {
                src: "/images/content/forbes.png",
                alt: "Forbes",
                ratio: 3.2,
                scale: 1.2,
                href: "https://www.forbes.com/profile/sakib-hossain/",
              },
              {
                src: "/images/content/prothom-alo.png",
                alt: "Prothom Alo",
                ratio: 3.4,
                href: "https://www.prothomalo.com/technology/87em2f464t",
              },
              {
                src: "/images/content/daily-star.png",
                alt: "The Daily Star",
                ratio: 3.6,
                href: "https://www.thedailystar.net/tech-startup/news/agri-tech-startup-fashol-secures-tk-10-crore-pre-seed-investment-3296201",
              },
              {
                src: "/images/content/tech-in-asia.png",
                alt: "Tech in Asia",
                ratio: 3.4,
                href: "https://www.techinasia.com/bangladeshbased-startup-bags-1m-solve-agrisupply-problems",
              },
              {
                src: "/images/content/business-standard.png",
                alt: "The Business Standard",
                ratio: 2.6,
                href: "https://www.tbsnews.net/economy/corporates/ditech-signs-capital-investment-agreement-fasholcom-limited-317146",
              },
              {
                src: "/images/content/agfunder-transparent.png",
                alt: "AgFunder",
                ratio: 2.6,
                scale: 1.8,
                href: "https://agfundernews.com/bangladeshs-fashol-tackles-the-agrifood-supply-chain-to-stabilize-food-prices-for-farmers-and-reduce-food-waste",
              },
              {
                src: "/images/content/orbit-startups-transparent.png",
                alt: "Orbit Startups",
                ratio: 2.5,
                scale: 1.2,
                href: "https://orbitstartups.com/cutting-out-the-middleman-how-fashol-is-changing-the-game-for-farmers-and-retailers-in-bangladesh/",
              },
              {
                src: "/images/content/dhaka-tribune.png",
                alt: "Dhaka Tribune",
                ratio: 9.4,
                scale: 0.55,
                href: "https://www.dhakatribune.com/business/283477/agritech-startup-fashol-gets-1m-pre-seed",
              },
              {
                src: "/images/content/financial-express.png",
                alt: "The Financial Express",
                ratio: 17.8,
                scale: 0.4,
                href: "https://thefinancialexpress.com.bd/home/ditech-fasholcom-join-hands-to-ensure-better-supply-chain-of-perishables-1634385038",
              },
              {
                src: "/images/content/unb.png",
                alt: "UNB",
                ratio: 2.0,
                scale: 1.15,
                href: "https://unb.com.bd/category/Bangladesh/agri-tech-startup-fashol-secures-1-million-pre-seed-investment/113685",
              },
              {
                src: "/images/content/daily-observer.png",
                alt: "The Daily Observer",
                ratio: 4.5,
                scale: 0.85,
                href: "https://www.observerbd.com/news/415572",
              },
              {
                src: "/images/content/future-startup.png",
                alt: "Future Startup",
                ratio: 2.3,
                scale: 1.15,
                href: "https://futurestartup.com/2023/04/23/fashol-cholpori-jatri-turtle-venture-raise-investments/",
              },
            ]}
          />
        </div>
      </Section>

      <PlatformSection />

      {/* ───────────── Chapter I - The argument ───────────── */}
      <Section tone="paper">
        <Reveal as="h2" className="t-h2 max-w-3xl">
          {t(
            lang,
            "Safe food, direct from the farmer's field to the buyer's door.",
            "নিরাপদ খাদ্য, সরাসরি কৃষকের মাঠ থেকে বায়ারের দরজায়।",
          )}
        </Reveal>

        {/* Unified figure + five-node key */}
        <Reveal className="mt-10 tablet:mt-14">
          <div className="card-plain p-6 tablet:p-8">
            <h3 className="t-h5 max-w-2xl" style={{ fontWeight: 500 }}>
              {t(
                lang,
                "Five nodes, 18 to 24 hours from the farmer to the buyer's door.",
                "পাঁচটি ধাপ, কৃষক থেকে বায়ারের দরজা পর্যন্ত মাত্র 18 থেকে 24 ঘণ্টা।",
              )}
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
                {
                  n: "01",
                  t: "FARMER",
                  tBn: "কৃষক",
                  s: "Direct procurement",
                  sBn: "সরাসরি প্রোকিউরমেন্ট",
                  stat: "60,000+ growers",
                  statBn: "60,000+ চাষি",
                  d: "Field agents register the farmer on the Jogaan app and lock the price at weighing.",
                  dBn: "ফিল্ড এজেন্ট যোগান অ্যাপে কৃষককে নিবন্ধন করেন এবং ওজনের সময়েই দাম নিশ্চিত করেন।",
                },
                {
                  n: "02",
                  t: "DISTRICT HUB",
                  tBn: "জেলা হাব",
                  s: "Grade and cold-store",
                  sBn: "গ্রেডিং ও কোল্ড-স্টোরেজ",
                  stat: "40+ hubs",
                  statBn: "40+ হাব",
                  d: "Four-tier quality grading, applied at hub intake.",
                  dBn: "হাবে পণ্য গ্রহণের সময়েই চার স্তরের কোয়ালিটি গ্রেডিং।",
                },
                {
                  n: "03",
                  t: "PLATFORM",
                  tBn: "প্ল্যাটফর্ম",
                  s: "Match and settle",
                  sBn: "মিলিয়ে দেওয়া ও সেটেলমেন্ট",
                  stat: "24h payout",
                  statBn: "24 ঘণ্টায় পরিশোধ",
                  d: "Mobile money settlement to the farmer.",
                  dBn: "কৃষকের কাছে মোবাইল মানিতে সেটেলমেন্ট।",
                },
                {
                  n: "04",
                  t: "LAST MILE",
                  tBn: "লাস্ট মাইল",
                  s: "Refrigerated dispatch",
                  sBn: "রেফ্রিজারেটেড ডিসপ্যাচ",
                  stat: "1,050+ MT/month",
                  statBn: "মাসে 1,050+ মেট্রিক টন",
                  d: "Refrigerated trucks on Fashol's own delivery routes.",
                  dBn: "ফসলের নিজস্ব ডেলিভারি রুটে রেফ্রিজারেটেড ট্রাক।",
                },
                {
                  n: "05",
                  t: "BUYER'S DOOR",
                  tBn: "বায়ারের দরজা",
                  s: "Order to delivery",
                  sBn: "অর্ডার থেকে ডেলিভারি",
                  stat: "7,000+ buyers",
                  statBn: "7,000+ বায়ার",
                  d: "From a Dhaka MSME to an exporter shipping into Singapore, Dubai, or Bangkok.",
                  dBn: "ঢাকার একটি ছোট ব্যবসা থেকে শুরু করে সিঙ্গাপুর, দুবাই বা ব্যাংককে পাঠানো এক্সপোর্টার পর্যন্ত।",
                },
              ].map((c) => (
                <div
                  key={c.n}
                  className="p-5 tablet:p-6 bg-[var(--color-paper)] flex flex-col gap-2.5"
                >
                  <h4
                    className="t-h5 tracking-[-0.02em]"
                    style={{ fontWeight: 500 }}
                  >
                    {t(lang, c.t, c.tBn)}
                  </h4>
                  <p className="t-caption">{t(lang, c.s, c.sBn)}</p>
                  <p className="t-body-sm text-[var(--color-ink-subtle)] mt-1">
                    {t(lang, c.stat, c.statBn)}
                  </p>
                  <p className="t-caption">{t(lang, c.d, c.dBn)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ───────────── Wash, grading & processing centres ───────────── */}
      <Section tone="ink">
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
          <Reveal
            as="h2"
            className="t-h2 !text-[var(--color-paper)] desktop:col-span-6"
          >
            {t(
              lang,
              "Wash, grading & processing centres - coming to every region.",
              "ওয়াশ, গ্রেডিং ও প্রসেসিং সেন্টার - আসছে প্রতিটি অঞ্চলে।",
            )}
          </Reveal>
          <Reveal
            delay={0.08}
            className="desktop:col-span-6 t-body-lg !text-[rgba(255,251,234,0.75)]"
          >
            <p>
              {t(
                lang,
                "Fashol is building agri-product wash, grading, and processing centres across Bangladesh - one safety standard, close to where food grows. Better returns, less waste, safer food.",
                "ফসল সারা বাংলাদেশজুড়ে কৃষিপণ্যের ওয়াশ, গ্রেডিং ও প্রসেসিং সেন্টার গড়ে তুলছে - একটাই নিরাপত্তা মান, যেখানে খাদ্য ফলে তার কাছেই। বেশি লাভ, কম অপচয়, আরও নিরাপদ খাদ্য।",
              )}
            </p>
            <p
              className="mt-5 !text-[var(--color-lime)]"
              style={{ fontWeight: 500 }}
            >
              {t(
                lang,
                "Rolling out district by district.",
                "জেলায় জেলায় ছড়িয়ে পড়ছে।",
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────── Farmer Value ───────────── */}
      <Section tone="surface" className="!py-6 tablet:!py-8 desktop:!py-10">
        <Reveal>
          <h2 className="t-h2 max-w-3xl">
            {t(
              lang,
              "Four things a farmer on Fashol has, that a farmer off it usually does not.",
              "ফসলে থাকা একজন কৃষক যে চারটি সুবিধা পান, বাইরে থাকা কৃষক সাধারণত যা পান না।",
            )}
          </h2>
        </Reveal>

        <div className="mt-6 tablet:mt-8 grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {[
            {
              img: "/images/farmer-value/value-01.png",
              alt: "A fair price, benchmarked against the live market",
              product: "JOGAAN",
              headline: "A fair price, benchmarked against the live market.",
              headlineBn: "ন্যায্য দাম, বাজারের সরাসরি দরের সঙ্গে মিলিয়ে।",
              body: "Crops are priced against live data from 200-plus markets, so the farmer sees the price before leaving home.",
              bodyBn:
                "200-এর বেশি বাজারের সরাসরি তথ্যের ভিত্তিতে ফসলের দাম নির্ধারিত হয়, তাই কৃষক ঘর থেকে বেরোনোর আগেই দাম জেনে নেন।",
            },
            {
              img: "/images/farmer-value/value-02.png",
              alt: "Payment in hours, not weeks",
              product: "JOGAAN",
              headline: "Payment in hours, not weeks.",
              headlineBn: "টাকা মেলে ঘণ্টায়, সপ্তাহে নয়।",
              body: "Payment reaches the farmer's mobile wallet within 24 hours of weighing - no invoices, no middleman cuts.",
              bodyBn:
                "ওজনের 24 ঘণ্টার মধ্যেই টাকা পৌঁছে যায় কৃষকের মোবাইল ওয়ালেটে - কোনো ইনভয়েস নেই, মধ্যস্বত্বভোগীর কাটাকাটি নেই।",
            },
            {
              img: "/images/farmer-value/value-03.png",
              alt: "Seed, feed, and machinery on the same app",
              product: "JOGAAN",
              headline: "Seed, feed, and machinery on the same app.",
              headlineBn: "বীজ, খাবার আর যন্ত্রপাতি - সবই একই অ্যাপে।",
              body: "Jogaan's marketplace carries quality-verified seed, pesticide, feed, and machinery, at prices Fashol negotiates for the network.",
              bodyBn:
                "যোগানের মার্কেটপ্লেসে মেলে কোয়ালিটি-যাচাই করা বীজ, কীটনাশক, খাবার আর যন্ত্রপাতি - ফসল নেটওয়ার্কের জন্য দর কষে যে দাম ঠিক করে সেই দামে।",
            },
            {
              img: "/images/farmer-value/value-04.png",
              alt: "Working capital, underwritten by transaction history",
              product: "FINANCING · LAUNCHING 2026",
              headline: "Working capital, underwritten by transaction history.",
              headlineBn: "চলতি মূলধন, লেনদেনের ইতিহাসের ভিত্তিতে।",
              body: "From 2026, Fashol will offer financing and working capital with partner banks, underwritten by Jogaan sales history.",
              bodyBn:
                "2026 সাল থেকে ফসল পার্টনার ব্যাংকের সঙ্গে ফাইন্যান্সিং ও চলতি মূলধন দেবে, যার ভিত্তি হবে যোগানে জমা হওয়া বিক্রির ইতিহাস।",
            },
          ].map((c) => (
            <Reveal key={c.img} className="h-full">
              <article className="h-full flex flex-col tablet:flex-row bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[4px] overflow-hidden">
                <div className="relative w-full aspect-square tablet:aspect-auto tablet:w-[42%] desktop:w-[40%] tablet:shrink-0 bg-[var(--color-grain)]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 810px) 25vw, 100vw"
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-6 desktop:p-7 flex flex-col gap-3 flex-1 min-w-0">
                  <h3 className="t-h5" style={{ fontWeight: 500 }}>
                    {t(lang, c.headline, c.headlineBn)}
                  </h3>
                  <p className="t-body-sm">{t(lang, c.body, c.bodyBn)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────── Use cases - Four kinds of buyers ───────────── */}
      <Section tone="surface">
        <Reveal as="h2" className="t-h2 max-w-3xl">
          {t(
            lang,
            "Four kinds of buyers. One platform, built around each.",
            "চার ধরনের বায়ার। একটাই প্ল্যাটফর্ম, প্রত্যেকের কথা ভেবে গড়া।",
          )}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 desktop:grid-cols-2 gap-6 desktop:gap-8">
          {[
            {
              num: "01",
              title: "Restaurants",
              titleBn: "রেস্তোরাঁ",
              img: "/c1.webp",
              body: "Fresh produce at your kitchen door before morning service, ordered the night before through Hyperfarm. No more 4am runs to the wholesale market.",
              bodyBn:
                "হাইপারফার্মে আগের রাতে অর্ডার করুন, সকালের সার্ভিসের আগেই তাজা পণ্য পৌঁছে যাবে আপনার রান্নাঘরের দরজায়। ভোর 4টায় আর পাইকারি বাজারে ছোটা লাগবে না।",
              standout: "Same-day or next-day delivery, Dhaka",
              standoutBn: "একই দিনে বা পরদিন ডেলিভারি, ঢাকা",
            },
            {
              num: "02",
              title: "Quick-commerce",
              titleBn: "কুইক-কমার্স",
              img: "/c2.webp",
              body: "Real-time stock visibility and daily pricing on Hyperfarm, with cold-chain fulfillment to your distribution centers. Traceability runs from farmer to final order.",
              bodyBn:
                "হাইপারফার্মে রিয়েল-টাইম স্টক আর প্রতিদিনের দাম, সঙ্গে আপনার ডিস্ট্রিবিউশন সেন্টারে কোল্ড-চেইন সরবরাহ। কৃষক থেকে চূড়ান্ত অর্ডার পর্যন্ত পুরো পথ ট্রেসেবল।",
              standout: "The produce layer behind multiple operators in Dhaka",
              standoutBn: "ঢাকার একাধিক অপারেটরের পেছনের পণ্য সরবরাহের স্তর",
            },
            {
              num: "03",
              title: "Wholesalers",
              titleBn: "পাইকার",
              img: "/c3.webp",
              body: "Direct-from-hub bulk pricing with quality grading applied at intake, not at the urban wholesale market. Operations managed on the Fashol platform.",
              bodyBn:
                "হাব থেকে সরাসরি পাইকারি দাম, কোয়ালিটি গ্রেডিং হয় পণ্য গ্রহণের সময়েই - শহরের পাইকারি বাজারে নয়। সব কার্যক্রম চলে ফসল প্ল্যাটফর্মে।",
              standout:
                "The volume of aratdar, with transparency aratdar never had",
              standoutBn:
                "আড়তদারের মতো পরিমাণ, তবে আড়তদার যে ট্রান্সপারেন্সি কখনও দিতে পারেনি তা নিয়ে",
            },
            {
              num: "04",
              title: "Exporters",
              titleBn: "এক্সপোর্টার",
              img: "/c4.webp",
              body: "Grade A selection at hub intake, dedicated cold-chain routing to airports, and export documentation handled end-to-end. Produce in the destination market while it is still in peak freshness.",
              bodyBn:
                "হাবে গ্রহণের সময়েই গ্রেড এ বাছাই, বিমানবন্দর পর্যন্ত নিবেদিত কোল্ড-চেইন রুট, আর এক্সপোর্টের কাগজপত্র শুরু থেকে শেষ পর্যন্ত আমরাই সামলাই। পণ্য সবচেয়ে টাটকা অবস্থাতেই পৌঁছে যায় গন্তব্যের বাজারে।",
              standout: "Farm-to-airport in under 24 hours",
              standoutBn: "খামার থেকে বিমানবন্দর, 24 ঘণ্টার কম সময়ে",
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
                <h3 className="t-h5 mt-4" style={{ fontWeight: 500 }}>
                  {t(lang, c.title, c.titleBn)}
                </h3>
                <p className="t-body-sm mt-2">{t(lang, c.body, c.bodyBn)}</p>
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
              <h2
                className="!text-[var(--color-paper)] max-w-[720px] mx-auto text-[28px] tablet:text-[38px] desktop:text-[46px] leading-[1.08] tracking-[-0.015em]"
                style={{ fontWeight: 500 }}
              >
                {t(
                  lang,
                  "We source in Bangladesh. We deliver across the region.",
                  "সংগ্রহ করি বাংলাদেশে। পৌঁছে দিই গোটা অঞ্চলজুড়ে।",
                )}
              </h2>
              <p className="mt-4 tablet:mt-5 text-[14px] tablet:text-[15px] desktop:text-[16px] leading-[1.55] !text-[rgba(255,251,234,0.75)] max-w-[560px] mx-auto">
                {t(
                  lang,
                  "Four offices run on a single operating system. Every order moves on the same stock, pricing, and settlement engine.",
                  "চারটি অফিস চলে একটাই অপারেটিং সিস্টেমে। প্রতিটি অর্ডার এক অভিন্ন স্টক, প্রাইসিং আর সেটেলমেন্ট ইঞ্জিনে পরিচালিত হয়।",
                )}
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
                <div className="flex items-start gap-5 tablet:gap-6">
                  <div
                    className="t-tabular text-[64px] tablet:text-[72px] desktop:text-[80px] leading-[0.9] !text-[var(--color-paper)] flex-shrink-0"
                    style={{ fontWeight: 500 }}
                  >
                    4
                  </div>
                  <dl className="flex-1 pt-1 grid grid-cols-[auto_1fr] gap-x-3 tablet:gap-x-4 gap-y-2 text-[13px] leading-[1.35]">
                    <dt
                      className="tracking-[0.05em] uppercase !text-[var(--color-paper)]"
                      style={{ fontWeight: 500 }}
                    >
                      {t(lang, "Dhaka", "ঢাকা")}
                    </dt>
                    <dd className="!text-[rgba(255,251,234,0.55)]">
                      {t(
                        lang,
                        "Headquarters and operations",
                        "সদর দপ্তর ও পরিচালন",
                      )}
                    </dd>
                    <dt
                      className="tracking-[0.05em] uppercase !text-[var(--color-paper)]"
                      style={{ fontWeight: 500 }}
                    >
                      {t(lang, "Singapore", "সিঙ্গাপুর")}
                    </dt>
                    <dd className="!text-[rgba(255,251,234,0.55)]">
                      {t(lang, "Regional trade desk", "আঞ্চলিক বাণিজ্য ডেস্ক")}
                    </dd>
                    <dt
                      className="tracking-[0.05em] uppercase !text-[var(--color-paper)]"
                      style={{ fontWeight: 500 }}
                    >
                      {t(lang, "Dubai", "দুবাই")}
                    </dt>
                    <dd className="!text-[rgba(255,251,234,0.55)]">
                      {t(
                        lang,
                        "Middle East gateway",
                        "মধ্যপ্রাচ্যের প্রবেশদ্বার",
                      )}
                    </dd>
                    <dt
                      className="tracking-[0.05em] uppercase !text-[var(--color-paper)]"
                      style={{ fontWeight: 500 }}
                    >
                      {t(lang, "Bangkok", "ব্যাংকক")}
                    </dt>
                    <dd className="!text-[rgba(255,251,234,0.55)]">
                      {t(
                        lang,
                        "Southeast Asia desk",
                        "দক্ষিণ-পূর্ব এশিয়া ডেস্ক",
                      )}
                    </dd>
                  </dl>
                </div>
              </div>

              {/* EXPORT - middle tile, sits directly beneath the globe */}
              <div className="bg-[var(--color-ink)] rounded-[32px] p-8 tablet:p-10 pt-[190px] tablet:pt-[230px] desktop:pt-[260px] flex flex-col">
                <h3
                  className="text-[24px] tablet:text-[28px] desktop:text-[32px] leading-[1.1] tracking-[-0.015em] !text-[var(--color-paper)]"
                  style={{ fontWeight: 500 }}
                >
                  {t(
                    lang,
                    "Four corridors out of Dhaka.",
                    "ঢাকা থেকে চারটি করিডোর।",
                  )}
                </h3>
                <p className="mt-5 text-[14px] tablet:text-[15px] leading-[1.55] !text-[rgba(255,251,234,0.72)]">
                  {t(
                    lang,
                    "Air and sea routes to Singapore, the Gulf, and Southeast Asia - grading-verified and cold-chain handled from farm gate through customs.",
                    "সিঙ্গাপুর, উপসাগরীয় অঞ্চল আর দক্ষিণ-পূর্ব এশিয়ায় আকাশ ও সমুদ্রপথ - খামারের গেট থেকে কাস্টমস পর্যন্ত গ্রেডিং-যাচাই আর কোল্ড-চেইন সামলানো।",
                  )}
                </p>
              </div>

              {/* TECHNOLOGY - replaces the prior PLATFORM tile */}
              <div className="bg-[var(--color-ink)] rounded-[32px] p-8 tablet:p-10 pt-[190px] tablet:pt-[230px] desktop:pt-[260px] flex flex-col">
                <h3
                  className="text-[24px] tablet:text-[28px] desktop:text-[32px] leading-[1.1] tracking-[-0.015em] !text-[var(--color-paper)]"
                  style={{ fontWeight: 500 }}
                >
                  {t(
                    lang,
                    "The eagle-eye view of your supply.",
                    "আপনার সাপ্লাই চেইনের ঈগল-চোখের দৃশ্য।",
                  )}
                </h3>
                <p className="mt-5 text-[14px] tablet:text-[15px] leading-[1.55] !text-[rgba(255,251,234,0.72)]">
                  {t(
                    lang,
                    "Every kilogram is traced, graded, and QC-checked before it leaves our hub. Buyers follow it live on one dashboard - status, grades, cold-chain, settlement.",
                    "প্রতিটি কেজি হাব ছাড়ার আগেই ট্রেস করা হয়, গ্রেড করা হয় আর কিউসি-যাচাই হয়। বায়াররা একটাই ড্যাশবোর্ডে সরাসরি সব দেখেন - স্ট্যাটাস, গ্রেড, কোল্ড-চেইন, সেটেলমেন্ট।",
                  )}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ───────────── Customer voices (marquee) ───────────── */}
      <Section tone="ink">
        <VoicesMarquee />
      </Section>

      {/* ───────────── Trust register grids ───────────── */}
      <Section tone="paper">
        <TrustGrids />
      </Section>

      {/* ───────────── Join - CTA triad ───────────── */}
      <Section tone="ink">
        <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">
          {t(
            lang,
            "The chain is still being built. Join as a farmer, a buyer, or a colleague.",
            "চেইন এখনও গড়ে উঠছে। যুক্ত হন কৃষক, বায়ার কিংবা সহকর্মী হিসেবে।",
          )}
        </Reveal>

        <StaggerChildren
          className="grid tablet:grid-cols-3 gap-6 mt-14"
          stagger={0.1}
        >
          {[
            {
              n: "01",
              t: "Farmer onboarding",
              tBn: "কৃষক নিবন্ধন",
              b: "WhatsApp a field agent. Bring your last season's records, if available.",
              bBn: "হোয়াটসঅ্যাপে একজন ফিল্ড এজেন্টকে বার্তা দিন। থাকলে গত মৌসুমের হিসাব সঙ্গে আনুন।",
              cta: "Farmer onboarding",
              ctaBn: "কৃষক নিবন্ধন",
              href: "https://wa.me/+8801810187230?text=Hello%21%20I%E2%80%99d%20like%20to%20register%20as%20a%20farmer%20with%20Fashol.",
            },
            {
              n: "02",
              t: "Buyer account",
              tBn: "বায়ার অ্যাকাউন্ট",
              b: "MSMEs, quick-commerce, exporters, wholesalers. Ten-minute setup.",
              bBn: "ছোট-মাঝারি ব্যবসা, কুইক-কমার্স, এক্সপোর্টার, পাইকার। দশ মিনিটে সেটআপ।",
              cta: "Buyer account",
              ctaBn: "বায়ার অ্যাকাউন্ট",
              href: "https://wa.me/+8801810187230?text=Hello%21%20I%E2%80%99d%20like%20to%20buy%20produce%20through%20Fashol.",
            },
            {
              n: "03",
              t: "Work with us",
              tBn: "আমাদের সঙ্গে কাজ করুন",
              b: "Open roles in engineering, logistics, field operations, and data.",
              bBn: "ইঞ্জিনিয়ারিং, লজিস্টিকস, ফিল্ড অপারেশন আর ডেটায় খোলা পদ।",
              cta: "Work with us",
              ctaBn: "আমাদের সঙ্গে কাজ করুন",
              href: "/career",
            },
          ].map((c) => (
            <StaggerItem
              key={c.n}
              className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4"
            >
              <h3 className="t-h4" style={{ fontWeight: 500 }}>
                {t(lang, c.t, c.tBn)}
              </h3>
              <p className="t-body !text-[rgba(255,255,255,0.7)]">
                {t(lang, c.b, c.bBn)}
              </p>
              <div className="mt-auto pt-4">
                <Button
                  variant="on-dark"
                  href={c.href}
                  external={c.href.startsWith("http")}
                >
                  {t(lang, c.cta, c.ctaBn)}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>
    </>
  );
}
