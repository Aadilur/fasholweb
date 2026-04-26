import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Jogaan - The farmer's app for Bangladesh",
  description:
    "Jogaan is the farmer's operating system for Bangladesh. Live prices from 200-plus markets, sell to the highest bidder by tonight, book a truck, buy inputs, and get credit. All from one app, all in Bengali.",
};

// Each section's background matches the dominant cream of its scene image so the
// PNG ground reads as transparent and the floating cluster sits on the page.
// Values sampled from each PNG's edges (RGB averaged across corners + mid-edges).
const HERO_IMAGE = "/pjhero1.png";
const HERO_BG = "#FAE3C9";
const CTA_IMAGE = "/pjcta.png";
const CTA_BG = "#CC3E67";

const SECTIONS: ReadonlyArray<{
  id: string;
  headline: string;
  body: string;
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
  bg: string;
}> = [
  {
    id: "prices",
    headline: "see the whole country.",
    body: "Live prices from 200+ markets across Bangladesh, refreshed every hour. Tomato selling for more in Sylhet than Dhaka? You'll know before the trader does.",
    image: "/pj1.png",
    imageAlt:
      "Farmer sitting on a mat with a phone in hand and floating price bubbles around him",
    imageSide: "left",
    bg: "#FAE3CA",
  },
  {
    id: "sell",
    headline: "sell tonight. paid tomorrow.",
    body: "Pick the market that pays best. Confirm the sale on Jogaan. The buyer takes delivery overnight. Your payment lands in your account by morning. No waiting at the arot. No commission agent in the middle.",
    image: "/pj2.png",
    imageAlt:
      "Farmer with a phone showing a confirmation, a truck departing, and a sun-and-moon notification",
    imageSide: "right",
    bg: "#F9E1C6",
  },
  {
    id: "truck",
    headline: "the truck comes to you.",
    body: "Sold to a market 200 kilometers away? Tap once for a truck. Fashol's logistics network picks up at your door and delivers to the buyer. You stay home. The harvest moves.",
    image: "/pj3.png",
    imageAlt:
      "Younger farmer holding a phone with a truck booking, older farmer approving in the background",
    imageSide: "left",
    bg: "#F9E2C6",
  },
  {
    id: "inputs",
    headline: "everything the farm needs.",
    body: "Seeds, fertilizer, pesticide, machinery, spare parts. Jogaan's catalog is the whole supply side, in your hand. Order today, delivered to your nearest Fashol hub.",
    image: "/pj4.png",
    imageAlt:
      "Woman farmer holding a phone with a catalog of inputs floating around her",
    imageSide: "right",
    bg: "#FDE5C7",
  },
  {
    id: "credit",
    headline: "credit when you need it.",
    body: "Six years of harvest records turn into a credit decision. Apply through Jogaan, get working capital before the planting season, repay after harvest. No middleman lender. No 10% monthly interest.",
    image: "/pj5.png",
    imageAlt:
      "Farmer with a teaching gesture, ledger and credit approval graphics floating beside him",
    imageSide: "left",
    bg: "#FBE4CA",
  },
];

function InstallJogaanButton({ inverse = false }: { inverse?: boolean }) {
  const baseStyle: React.CSSProperties = inverse
    ? {
        background: "var(--color-paper)",
        color: "var(--color-jogaan)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
      }
    : {
        background: "var(--color-jogaan)",
        color: "var(--color-paper)",
        boxShadow: "0 1px 2px rgba(193,60,115,0.18)",
      };

  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.fashol.agent"
      target="_blank"
      rel="noopener noreferrer"
      className="btn"
      style={{
        ...baseStyle,
        border: "none",
        height: 50,
        paddingInline: 28,
      }}
    >
      Install Jogaan
    </a>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClosingCtaContent() {
  return (
    <>
      <Reveal>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            fontWeight: 600,
            color: "var(--color-paper)",
          }}
        >
          Your harvest. Our network.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p
          className="mt-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            lineHeight: 1.5,
            color: "rgba(255,251,234,0.85)",
          }}
        >
          Built with farmers. For farmers.
        </p>
      </Reveal>
      <Reveal delay={0.16} className="mt-7">
        <InstallJogaanButton inverse />
      </Reveal>
    </>
  );
}

function SectionHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(36px, 5vw, 56px)",
        lineHeight: 1.05,
        letterSpacing: "-0.04em",
        fontWeight: 600,
        color: "var(--color-ink)",
      }}
    >
      {children}
    </h2>
  );
}

export default function JogaanPage() {
  return (
    <>
      {/* Section 1 - Hero. On desktop the image lifts out of the column flow
          and anchors to the viewport's right edge at a fixed 950px width so
          it's roughly 50% larger than the column-bound layout. Mobile keeps
          the stacked layout: image on top, text below. */}
      <section className="relative" style={{ background: HERO_BG }}>
        {/* Mobile-only image (stacks above text). */}
        <div className="desktop:hidden pt-[100px] tablet:pt-[120px]">
          <div className="container-page">
            <Reveal delay={0.1}>
              <Image
                src={HERO_IMAGE}
                alt="A patriarch farmer with a floating cluster of phone, truck, seed sack, taka coin, and vegetables"
                width={1691}
                height={930}
                priority
                sizes="(min-width: 810px) 460px, 100vw"
                className="block h-auto w-full max-w-[460px] mx-auto"
              />
            </Reveal>
          </div>
        </div>

        {/* Text column. Mobile: under the image. Desktop: own column on the
            left with the image absolutely positioned to the right. */}
        <div className="container-page mt-10 pb-[80px] tablet:pb-[100px] desktop:mt-0 desktop:pt-[170px] desktop:pb-[140px] desktop:flex desktop:items-center desktop:min-h-[760px] desktop:relative desktop:z-10">
          <div className="desktop:max-w-[760px]">
            <Reveal>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.045em",
                  fontWeight: 600,
                  color: "var(--color-ink)",
                }}
              >
                The farmer&apos;s app
                <br />
                for Bangladesh
              </h1>
            </Reveal>
            <Reveal delay={0.16} className="mt-9">
              <InstallJogaanButton />
            </Reveal>
            <Reveal delay={0.22}>
              <p
                className="mt-5 inline-flex items-center gap-2 text-[13px]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                <ShieldIcon />
                <span>Trusted by 60,000+ farmers across 50 districts</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Desktop-only image (absolute, viewport-right anchored, ~50% bigger). */}
        <div className="hidden desktop:block absolute top-1/2 -translate-y-1/2 right-0 w-[950px] z-0 pointer-events-none">
          <Reveal delay={0.1}>
            <Image
              src={HERO_IMAGE}
              alt=""
              width={1691}
              height={930}
              priority
              sizes="950px"
              className="block w-full h-auto"
              aria-hidden
            />
          </Reveal>
        </div>
      </section>

      {/* Sections 2-6 - Alternating Duolingo rhythm */}
      {SECTIONS.map((s) => {
        const textFirst = s.imageSide === "right";
        return (
          <section
            key={s.id}
            className="py-[80px] tablet:py-[110px] desktop:py-[140px]"
            style={{ background: s.bg }}
          >
            <div className="container-page">
              <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-12 items-center">
                <Reveal
                  className={
                    textFirst
                      ? "order-1 desktop:order-2 desktop:col-span-7"
                      : "order-1 desktop:order-1 desktop:col-span-7"
                  }
                  delay={textFirst ? 0.08 : 0}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    width={1691}
                    height={930}
                    sizes="(min-width: 1200px) 760px, (min-width: 810px) 92vw, 100vw"
                    className="block h-auto w-full max-w-[460px] mx-auto desktop:max-w-none"
                  />
                </Reveal>
                <div
                  className={
                    textFirst
                      ? "order-2 desktop:order-1 desktop:col-span-5"
                      : "order-2 desktop:order-2 desktop:col-span-5"
                  }
                >
                  <Reveal>
                    <SectionHeadline>{s.headline}</SectionHeadline>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <p className="t-body-lg mt-6 max-w-[500px]">{s.body}</p>
                  </Reveal>
                  <Reveal delay={0.16} className="mt-9">
                    <InstallJogaanButton />
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Section 7 - Closing CTA. Desktop crops the image to 70% of its
          natural 21:9 height so the band is shorter; object-position centers
          the crop so characters and floating cluster stay framed. Below
          desktop, the image stacks at natural ratio above a pink text band. */}
      <section style={{ background: CTA_BG }}>
        <div
          className="relative w-full hidden desktop:block"
          style={{ aspectRatio: "1915 / 575" }}
        >
          <Image
            src={CTA_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container-page w-full">
              <div className="max-w-[42%]">
                <ClosingCtaContent />
              </div>
            </div>
          </div>
        </div>
        <div className="desktop:hidden">
          {/* Mobile: text first at the top centered, image flush against the
              section's bottom edge. Image crop anchors at 60% so the
              characters land closer to the frame's horizontal center. */}
          <div className="container-page pt-12 tablet:pt-16 pb-10 tablet:pb-12 text-center">
            <div className="max-w-[560px] mx-auto">
              <ClosingCtaContent />
            </div>
          </div>
          <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
            <Image
              src={CTA_IMAGE}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "100% center" }}
              aria-hidden
            />
          </div>
        </div>
      </section>
    </>
  );
}
