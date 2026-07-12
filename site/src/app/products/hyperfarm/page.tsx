import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { TryHyperfarmButton } from "@/components/site/TryHyperfarmButton";

export const metadata: Metadata = {
  title:
    "Hyperfarm - Procurement for restaurants, supershops, and quick commerce",
  description:
    "Hyperfarm is the procurement app for businesses that buy fresh produce in bulk. Stop running to wholesale markets at 1am. Order tonight, get the supply at your door tomorrow.",
};

const VIOLET = "#7E00FF";
const VIOLET_SOFT = "rgba(126,0,255,0.10)";
const VIOLET_LINE = "rgba(126,0,255,0.18)";
const CREAM = "#F4EFD8";

// Sourced from /site/src/data/site.ts (PARTNERS) - alt copy mapped 1:1 from the
// brief's logo list. Where a brand has no PNG asset in the repo (Shwapno,
// Foodie), the row falls back to a styled wordmark in muted gray so the row
// stays uniform.
type Logo =
  | { kind: "img"; alt: string; src: string }
  | { kind: "word"; alt: string; word: string };

const LOGOS: ReadonlyArray<Logo> = [
  { kind: "img", alt: "Domino's", src: "/images/content/partner10.png" },
  { kind: "word", alt: "Shwapno", word: "Shwapno" },
  { kind: "img", alt: "Meena Bazar", src: "/images/content/partner02.png" },
  { kind: "img", alt: "Agora", src: "/images/content/partner04.png" },
  { kind: "img", alt: "Daily Shopping", src: "/images/content/partner05.png" },
  { kind: "img", alt: "Foodpanda", src: "/images/content/partner01.png" },
  { kind: "img", alt: "Chaldal", src: "/images/content/partner08.png" },
  { kind: "word", alt: "Foodie", word: "Foodie" },
];

// 4 small avatar tints for the trust badge cluster - abstract violet-tinted
// circles, no AI-generated faces.
const AVATAR_TINTS: ReadonlyArray<{ from: string; to: string; initials: string }> = [
  { from: "#7E00FF", to: "#B469FF", initials: "RA" },
  { from: "#5A00B8", to: "#9747D9", initials: "SK" },
  { from: "#9B33FF", to: "#D29BFF", initials: "TM" },
  { from: "#3F0080", to: "#7E00FF", initials: "NS" },
];

// ---------- Inline icons (violet stroke, Lucide-style) ----------

function IconClock() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={28}
      height={28}
      fill="none"
      stroke={VIOLET}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function IconAlertTriangle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={28}
      height={28}
      fill="none"
      stroke={VIOLET}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 3.6 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.6a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconScale() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={28}
      height={28}
      fill="none"
      stroke={VIOLET}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 16.5c0 1.6-1.8 2.5-4 2.5s-4-.9-4-2.5L12 7l4 9.5Z" />
      <path d="M8 16.5c0 1.6-1.8 2.5-4 2.5S0 18.1 0 16.5L4 7l4 9.5Z" transform="translate(2 0)" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={28}
      height={28}
      fill="none"
      stroke={VIOLET}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2-3 2Z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </svg>
  );
}

// Tiny floating-card thumbnail icons for Section 3.
function IconCatalog() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={VIOLET} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconBulk() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={VIOLET} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18" />
      <path d="M6 17V9" />
      <path d="M11 17V6" />
      <path d="M16 17v-7" />
      <path d="M21 17V13" />
    </svg>
  );
}

function IconOutlets() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={VIOLET} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

// ---------- Section primitives ----------

function H2({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(36px, 5vw, 60px)",
        lineHeight: 1.04,
        letterSpacing: "-0.04em",
        fontWeight: 600,
        color: "var(--color-ink)",
        textAlign: align,
      }}
    >
      {children}
    </h2>
  );
}

function Body({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={className}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: 19,
        lineHeight: 1.55,
        color: "var(--color-ink-subtle)",
      }}
    >
      {children}
    </p>
  );
}

// ---------- Page ----------

export default function HyperfarmPage() {
  return (
    <div style={{ background: CREAM }}>
      {/* SECTION 1 - HERO */}
      <section className="relative overflow-hidden">
        {/* Mobile / tablet stacked image - appears ABOVE the headline on
            mobile so the hand-with-phone leads the page. Owns the nav
            clearance padding on mobile/tablet.
            Mobile (<810px): image bleeds to ~2x viewport width and is shifted
            so the phone-within-canvas lands on the page centerline. The
            section's `overflow-hidden` clips the overflow on both sides.
            Tablet (810-1199px): reverts to the contained, centered max-w-[640px]
            layout (the original size). */}
        <div className="desktop:hidden pt-[120px] tablet:pt-[140px] pb-[24px] tablet:pb-[40px]">
          <Reveal delay={0.1}>
            <div className="relative w-[174vw] left-1/2 -translate-x-[66.5%] tablet:w-auto tablet:max-w-[640px] tablet:left-auto tablet:translate-x-[-12%] tablet:mx-auto">
              <Image
                src="/phhero1.png"
                alt="Hand holding a phone showing the Hyperfarm app home screen with category tiles and a search bar."
                width={1920}
                height={1080}
                priority
                sizes="(min-width: 810px) 80vw, 200vw"
                className="block h-auto w-full"
              />
              {/* Bottom fade - softens the wrist cutoff into the cream surface */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%]"
                style={{
                  background: `linear-gradient(to top, ${CREAM} 0%, ${CREAM} 35%, rgba(244,239,216,0) 100%)`,
                }}
              />
            </div>
          </Reveal>
        </div>

        <div className="container-page pb-[80px] tablet:pb-[100px] desktop:pt-[170px] desktop:pb-[140px] desktop:min-h-[680px] desktop:relative desktop:z-10">
          <div className="desktop:grid desktop:grid-cols-12 desktop:gap-6 desktop:items-center">
            <div className="desktop:col-span-5">
              {/* Trust badge */}
              <Reveal>
                <div className="inline-flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {AVATAR_TINTS.map((a, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[9px]"
                        style={{
                          background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                          color: "#FFFFFF",
                          border: `1.5px solid ${CREAM}`,
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {a.initials}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-[13px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-ink-subtle)",
                      fontWeight: 500,
                    }}
                  >
                    Trusted by 7,000+ businesses
                  </span>
                </div>
              </Reveal>

              {/* H1 - forced to two visual lines via per-line nowrap spans. */}
              <Reveal delay={0.06} className="mt-7">
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(34px, 5vw, 60px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.045em",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Stop running to markets.
                  </span>
                  <span
                    style={{
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Start{" "}
                    <span style={{ color: VIOLET }}>running</span> your
                    business.
                  </span>
                </h1>
              </Reveal>

              {/* CTA */}
              <Reveal delay={0.16} className="mt-9">
                <TryHyperfarmButton tone="violet" />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Desktop hero image - anchored to the right ~65% of the canvas, sized
            to sit close to the headline column on the left. */}
        <div className="hidden desktop:block absolute top-1/2 -translate-y-1/2 right-0 w-[65%] max-w-[1066px] z-0 pointer-events-none">
          <Reveal delay={0.1}>
            <div className="relative">
              <Image
                src="/phhero1.png"
                alt=""
                width={1920}
                height={1080}
                priority
                sizes="1066px"
                className="block w-full h-auto"
                aria-hidden
              />
              {/* Bottom fade - softens the wrist cutoff into the cream surface */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[14%]"
                style={{
                  background: `linear-gradient(to top, ${CREAM} 0%, ${CREAM} 35%, rgba(244,239,216,0) 100%)`,
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 - LOGO STRIP. Pulled up under the hero's bottom padding so
          the logo bar peeks into the initial viewport without touching the
          hero content above. */}
      <section className="relative -mt-[48px] tablet:-mt-[72px] desktop:-mt-[30px] pt-0 pb-[48px] tablet:pb-[60px] desktop:pb-[72px]">
        <div className="container-page">
          <Reveal>
            <p
              className="text-center text-[13px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink-muted)",
                fontWeight: 500,
                letterSpacing: "-0.005em",
              }}
            >
              Powering procurement at
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8 grid grid-cols-4 desktop:grid-cols-8 gap-x-6 gap-y-7 items-center justify-items-center">
              {LOGOS.map((logo) => (
                <li
                  key={logo.alt}
                  className="group flex items-center justify-center h-10 transition-all duration-300"
                  style={{
                    filter: "grayscale(1) opacity(0.55)",
                  }}
                  // hover treatment is applied via inline CSS on the child so the
                  // li can stay a layout slot.
                >
                  {logo.kind === "img" ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={200}
                      height={80}
                      sizes="120px"
                      className="block h-7 tablet:h-8 w-auto object-contain logo-strip-img"
                    />
                  ) : (
                    <span
                      className="logo-strip-word"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "var(--color-ink-subtle)",
                      }}
                    >
                      {logo.word}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
          <style>{`
            .logo-strip-img, .logo-strip-word { transition: filter 250ms ease, opacity 250ms ease; }
            li:hover { filter: grayscale(0) opacity(1) !important; }
          `}</style>
        </div>
      </section>

      {/* SECTION 3 - MARKETPLACE */}
      <section className="py-[100px] tablet:py-[130px] desktop:py-[160px]">
        <div className="container-page">
          <Reveal>
            {/* Inline h2 - uses min()/vw scaling + nowrap so the line fits on
                one line across viewport sizes without forcing a wrap. */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(18px, 4.2vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                fontWeight: 600,
                color: "var(--color-ink)",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Everything your kitchen, store, or hub{" "}
              <span style={{ color: VIOLET }}>buys.</span>
            </h2>
          </Reveal>

          <div className="mt-14 tablet:mt-16 desktop:mt-20 relative max-w-[1320px] mx-auto">
            {/* Centered phone image */}
            <Reveal delay={0.1}>
              <div className="relative max-w-[1080px] mx-auto">
                <Image
                  src="/ph1.png"
                  alt="Phone showing the Hyperfarm marketplace with brand and category tiles."
                  width={1920}
                  height={1080}
                  sizes="(min-width: 1200px) 1080px, (min-width: 810px) 88vw, 100vw"
                  className="block h-auto w-full"
                />
                {/* Bottom fade - softens the wrist cutoff into the cream surface */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%]"
                  style={{
                    background: `linear-gradient(to top, ${CREAM} 0%, ${CREAM} 35%, rgba(244,239,216,0) 100%)`,
                  }}
                />
              </div>
            </Reveal>

            {/* Floating cards - desktop only. Rendered without per-card Reveal
                so they sit visibly in the cluster the moment the section is
                in view, instead of waiting for the cards' own scroll-trigger
                threshold (which fired late since the cards sit deep inside
                the image). */}
            <div className="hidden desktop:block">
              <FloatingCard
                className="absolute left-[2%] top-[14%]"
                rotate={-4}
                icon={<IconCatalog />}
                label="1000+ SKUs"
                body="Every category. Every brand. One catalog."
              />
              <FloatingCard
                className="absolute right-[2%] top-[40%]"
                rotate={3.5}
                icon={<IconBulk />}
                label="Bulk Discount"
                body="Buy more, pay less. Tiered pricing built in."
              />
              <FloatingCard
                className="absolute left-[4%] bottom-[22%]"
                rotate={-2.5}
                icon={<IconOutlets />}
                label="Multi-Outlet"
                body="From 2 outlets to 40. One dashboard."
              />
            </div>

            {/* Stacked cards - mobile / tablet */}
            <div className="desktop:hidden mt-10 grid grid-cols-1 gap-4 max-w-[520px] mx-auto">
              <FloatingCard
                rotate={0}
                icon={<IconCatalog />}
                label="1000+ SKUs"
                body="Every category. Every brand. One catalog."
              />
              <FloatingCard
                rotate={0}
                icon={<IconBulk />}
                label="Bulk Discount"
                body="Buy more, pay less. Tiered pricing built in."
              />
              <FloatingCard
                rotate={0}
                icon={<IconOutlets />}
                label="Multi-Outlet"
                body="From 2 outlets to 40. One dashboard."
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - PROBLEM BLOCK */}
      <section className="py-[100px] tablet:py-[130px] desktop:py-[160px]">
        <div className="container-page">
          <div className="max-w-[820px] mx-auto text-center">
            <Reveal>
              <H2 align="center">
                Procurement, the way it&apos;s been for{" "}
                <span style={{ color: VIOLET }}>decades.</span>
              </H2>
            </Reveal>
          </div>

          <div className="mt-14 tablet:mt-16 desktop:mt-20 grid grid-cols-1 tablet:grid-cols-2 gap-5 tablet:gap-6 max-w-[1080px] mx-auto">
            <ProblemTile
              icon={<IconClock />}
              title="1am to 6am"
              body="Procurement teams lose entire nights at Karwan Bazar and Jatrabari. Every week."
            />
            <ProblemTile
              icon={<IconAlertTriangle />}
              title="Inconsistent supply"
              body="One day rain. Next day a strike. Your supply disappears, your kitchen waits."
            />
            <ProblemTile
              icon={<IconScale />}
              title="Quality you can't control"
              body="Different vendors, different qualities. Different days, different produce."
            />
            <ProblemTile
              icon={<IconReceipt />}
              title="Hidden transport costs"
              body="৳800-1,500 per trip just to get the supply back to your kitchen or shop."
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 - FEATURE 1: ORDER ANY TIME (text left / image right) */}
      <FeatureRow
        imageSide="right"
        image="/ph2.png"
        imageAlt="Tilted phone showing a Hyperfarm category page with bulk pricing for fresh herbs."
        headline={
          <>
            Browse 1,000 SKUs.{" "}
            <span style={{ color: VIOLET }}>Lock in</span>
            {" "}today&apos;s prices.
          </>
        }
        body="Daily prices, refreshed every morning. Browse 1,000+ SKUs by category. Tap to order. Done in under a minute."
      />

      {/* SECTION 6 - FEATURE 2: FROM FARM TO YOU (image left / text right) */}
      <FeatureRow
        imageSide="left"
        image="/ph3.png"
        imageAlt="Tilted phone showing a Hyperfarm order tracking screen with a live route map."
        headline={
          <>
            From farm to You.{" "}
            <span style={{ color: VIOLET }}>Tracked</span>, every step.
          </>
        }
        body="Place the order tonight. Wake up to your supply already at the door. Track the truck on the way."
      />

      {/* SECTION 7 - FEATURE 3: SNAP, ORDER, DONE (text left / image right) */}
      <FeatureRow
        imageSide="right"
        image="/ph4.png"
        imageAlt="Tilted phone showing a Hyperfarm screen reading a handwritten Bengali order list and matching items into the cart."
        headline={
          <>
            <span style={{ color: VIOLET }}>Snap.</span> Order. Done.
          </>
        }
        body="Snap a photo of your order list. Hyperfarm reads the handwriting, finds the right SKUs, and builds the order. You confirm. Done."
      />

      {/* SECTION 8 - STATS BLOCK */}
      <section className="py-[100px] tablet:py-[120px] desktop:py-[140px]">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 max-w-[1080px] mx-auto desktop:flex desktop:flex-row desktop:justify-between desktop:items-start desktop:gap-x-10">
            <Stat number="7,000+" label="mudi shops served" />
            <Stat number="400+" label="supershop outlets supplied" />
            <Stat number="3,500+ MT" label="delivered monthly" />
            <Stat number="Lower than market" label="on every order" />
          </div>
        </div>
      </section>

      {/* SECTION 9 - CLOSING CTA BAND */}
      <section
        style={{ background: VIOLET }}
        className="py-[50px] tablet:py-[65px] desktop:py-[80px]"
      >
        <div className="container-page text-center">
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5.4vw, 64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              Try Hyperfarm. Sleep tonight.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-5 max-w-[640px] mx-auto">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 19,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Order tonight. Track the delivery. Sleep through the rest.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-9 inline-block">
            <TryHyperfarmButton tone="cream" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ---------- Inline section components ----------

function FloatingCard({
  className = "",
  rotate = 0,
  icon,
  label,
  body,
}: {
  className?: string;
  rotate?: number;
  icon: React.ReactNode;
  label: string;
  body: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${VIOLET_LINE}`,
        borderRadius: 18,
        padding: "16px 18px",
        width: 280,
        boxShadow: "0 12px 32px -10px rgba(126,0,255,0.18), 0 1px 2px rgba(0,0,0,0.04)",
        transform: `rotate(${rotate}deg)`,
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          width: 40,
          height: 40,
          borderRadius: 12,
          background: VIOLET_SOFT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: VIOLET,
          }}
        >
          {label}
        </div>
        <div
          className="mt-1.5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            lineHeight: 1.45,
            color: "var(--color-ink)",
            fontWeight: 500,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

function ProblemTile({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Reveal>
      <article
        style={{
          background: "transparent",
          border: `1px solid ${VIOLET_LINE}`,
          borderRadius: 22,
          padding: "28px 28px 30px",
          height: "100%",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: VIOLET_SOFT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <h3
          className="mt-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            color: "var(--color-ink)",
          }}
        >
          {title}
        </h3>
        <p
          className="mt-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--color-ink-subtle)",
          }}
        >
          {body}
        </p>
      </article>
    </Reveal>
  );
}

function FeatureRow({
  imageSide,
  image,
  imageAlt,
  headline,
  body,
}: {
  imageSide: "left" | "right";
  image: string;
  imageAlt: string;
  headline: React.ReactNode;
  body: string;
}) {
  const textFirst = imageSide === "right";
  // Image column is always 5fr (the larger track) so the phone renders at the
  // same size whether it sits on the left or the right. Swap the template
  // based on imageSide rather than relying on `order`, which doesn't move
  // items between tracks of different widths.
  const gridCols = textFirst
    ? "desktop:grid-cols-[3fr_5fr]"
    : "desktop:grid-cols-[5fr_3fr]";
  return (
    <section className="relative py-[100px] tablet:py-[130px] desktop:py-[160px]">
      <div className="container-page">
        <div className={`grid ${gridCols} gap-10 desktop:gap-x-10 items-center`}>
          {/* Image */}
          <Reveal
            className={
              textFirst
                ? "order-1 desktop:order-2"
                : "order-1 desktop:order-1"
            }
            delay={textFirst ? 0.08 : 0}
          >
            <div className="mx-auto max-w-[700px]">
              <Image
                src={image}
                alt={imageAlt}
                width={1920}
                height={1080}
                sizes="(min-width: 1200px) 660px, (min-width: 810px) 80vw, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </Reveal>
          {/* Text */}
          <div
            className={
              textFirst
                ? "order-2 desktop:order-1"
                : "order-2 desktop:order-2"
            }
          >
            <div className="max-w-[520px] mx-auto">
              <Reveal>
                <H2>{headline}</H2>
              </Reveal>
              <Reveal delay={0.08} className="mt-6">
                <Body>{body}</Body>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <Reveal>
      <div className="text-center">
        <div
          className="desktop:whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(23px, 3vw, 36px)",
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            color: VIOLET,
          }}
        >
          {number}
        </div>
        <div
          className="mt-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            lineHeight: 1.4,
            color: "var(--color-ink-subtle)",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      </div>
    </Reveal>
  );
}
