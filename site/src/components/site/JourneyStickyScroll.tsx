"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TalkToSalesButton } from "@/components/site/TalkToSalesButton";

type Stop = {
  n: string;
  title: string;
  body: string;
};

type Phase = {
  label: string;
  title: string;
  subtitle: string;
  stops: Stop[];
};

const PHASES: ReadonlyArray<Phase> = [
  {
    label: "PHASE 01",
    title: "Inquiry",
    subtitle: "The first 24 hours.",
    stops: [
      {
        n: "1",
        title: "RFQ received.",
        body: "A buyer submits a request for quote through Hyperfarm or directly to the export desk. Volume, product spec, destination, target delivery window.",
      },
      {
        n: "2",
        title: "CNF priced in 24 hours.",
        body: "Fashol returns a full CNF quote within a business day. Pricing is live, benchmarked against 200-plus wholesale markets on the platform.",
      },
      {
        n: "3",
        title: "Order placed.",
        body: "The buyer confirms. A dedicated Fashol export manager is assigned to the order from this point onward.",
      },
    ],
  },
  {
    label: "PHASE 02",
    title: "Sourcing",
    subtitle: "Choosing the right farmer, the right crop, the right price.",
    stops: [
      {
        n: "4",
        title: "Farmer matching.",
        body: "The order is matched against Fashol's network of 60,000 farmers across nine districts. GAP-certified products source from pre-certified farmers.",
      },
      {
        n: "5",
        title: "Packaging engineered.",
        body: "Packaging is designed and tested for the specific product, destination climate, volume, and transit mode. It is the single biggest lever on post-harvest loss.",
      },
      {
        n: "6",
        title: "Sourcing begins.",
        body: "Farmers are notified, harvest windows are coordinated, and produce is collected at the nearest Fashol hub.",
      },
    ],
  },
  {
    label: "PHASE 03",
    title: "Processing",
    subtitle: "Export-grade handling inside the Fashol hub.",
    stops: [
      {
        n: "7",
        title: "Grading and sorting.",
        body: "Four-tier grading at intake. Only Grade A moves to export. Grade B and below route to domestic channels, so nothing is wasted.",
      },
      {
        n: "8",
        title: "EPZ-approved.",
        body: "The graded shipment is moved through Fashol's EPZ-approved facility for final inspection, phytosanitary review, and pack-out.",
      },
      {
        n: "9",
        title: "Destination docs filed.",
        body: "Export permits, phytosanitary certificates, certificates of origin, and destination import paperwork handled in-house. HACCP, BRC, and GlobalGAP sourced when required.",
      },
    ],
  },
  {
    label: "PHASE 04",
    title: "Delivery",
    subtitle: "Air and sea to the destination, with accountability after landing.",
    stops: [
      {
        n: "10",
        title: "Logistics locked.",
        body: "Fashol selects air or sea based on product perishability, volume, destination, and buyer's commercial window. Booking is done on pre-negotiated rates with freight partners.",
      },
      {
        n: "11",
        title: "Booked and cleared.",
        body: "The shipment is booked and cleared at origin. Buyer receives live tracking and customs documentation in the Hyperfarm dashboard.",
      },
      {
        n: "12",
        title: "Arrived, supported.",
        body: "The buyer receives the shipment. Fashol's 24/7 desk handles any post-delivery issue - quality, documentation, reorder. The relationship continues past the port.",
      },
    ],
  },
];

const FOREST_85 = "rgba(6, 94, 58, 0.85)";
const CREAM_75 = "rgba(255, 251, 234, 0.75)";
const CREAM_25 = "rgba(255, 251, 234, 0.25)";
const BLACK_25 = "rgba(0, 0, 0, 0.25)";

function PhaseHeader({ phase, reduce }: { phase: Phase; reduce: boolean }) {
  const initial = reduce ? false : { opacity: 0, y: 20 };
  const whileInView = reduce ? undefined : { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 4vw, 40px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          fontWeight: 500,
          color: "var(--color-deep-green)",
        }}
      >
        {phase.title}
      </h3>
    </motion.div>
  );
}

function StopCard({ stop, reduce }: { stop: Stop; reduce: boolean }) {
  const initial = reduce ? false : { opacity: 0, y: 20 };
  const whileInView = reduce ? undefined : { opacity: 1, y: 0 };
  return (
    <motion.article
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative overflow-hidden rounded-[12px] grid grid-cols-[110px_1fr] desktop:grid-cols-[220px_1fr] gap-6 desktop:gap-10 px-6 py-5 desktop:px-10 desktop:py-6 h-[200px] desktop:h-[220px]"
      style={{
        background: "var(--color-surface)",
      }}
    >
      <div
        className="self-center text-[120px] desktop:text-[180px]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          color: "var(--color-deep-green)",
          letterSpacing: "-0.05em",
          lineHeight: 0.82,
          fontFeatureSettings: '"lnum"',
          whiteSpace: "nowrap",
          clipPath: "inset(0 0 24% 0)",
        }}
      >
        {stop.n}
      </div>
      <div className="flex flex-col justify-center">
        <h4
          className="text-[22px] desktop:text-[26px]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-deep-green)",
          }}
        >
          {stop.title}
        </h4>
        <p
          className="mt-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            lineHeight: 1.6,
            color: FOREST_85,
          }}
        >
          {stop.body}
        </p>
      </div>
    </motion.article>
  );
}

function ProgressBar({
  currentPhase,
  tone = "light",
}: {
  currentPhase: number;
  tone?: "light" | "dark";
}) {
  const filledColor = tone === "dark" ? "#000" : "var(--color-paper)";
  const emptyColor = tone === "dark" ? BLACK_25 : CREAM_25;
  return (
    <div className="flex gap-2">
      {PHASES.map((p, i) => {
        const filled = i <= currentPhase;
        return (
          <div
            key={p.label}
            className="h-[2px] flex-1"
            style={{
              background: filled ? filledColor : emptyColor,
              transition: "background 200ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

function LeftPanel({ currentPhase }: { currentPhase: number }) {
  return (
    <>
      <Image
        src="/images/solutions/exporters/journey3.jpg"
        alt="A Bangladeshi farmer at harvest in the golden morning light"
        fill
        sizes="(min-width: 1200px) 45vw, 100vw"
        className="object-cover"
        style={{ objectPosition: "center" }}
      />
      <div className="relative h-full w-full flex flex-col items-center justify-between gap-0 p-8 tablet:p-12 desktop:p-16">
        <div className="flex flex-col">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(72px, 10vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 500,
            color: "var(--color-paper)",
          }}
        >
          Journey.
        </h2>

        <div
          style={{
            paddingLeft: "clamp(28px, 4.2vw, 52px)",
            marginTop: "7px",
          }}
        >
          <div className="w-[74%]">
            <ProgressBar currentPhase={currentPhase} />
          </div>
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 15,
              lineHeight: 1,
              color: CREAM_75,
            }}
          >
            RFQ to retail shelf in twelve precise stops.
          </p>
        </div>
        </div>

        <TalkToSalesButton />
      </div>
    </>
  );
}

export function JourneyStickyScroll() {
  const reduce = useReducedMotion() ?? false;
  const [currentPhase, setCurrentPhase] = useState(0);
  const phaseRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx: number | null = null;
        let bestDist = Infinity;
        const mid = window.innerHeight / 2;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = phaseRefs.current.indexOf(e.target as HTMLDivElement);
          if (i < 0) return;
          const rect = e.boundingClientRect;
          const entryMid = rect.top + rect.height / 2;
          const dist = Math.abs(entryMid - mid);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        });
        if (bestIdx !== null) setCurrentPhase(bestIdx);
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    phaseRefs.current.forEach((el) => {
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-label="Export journey stops"
      className="relative bg-[var(--color-paper)]"
    >
      <div className="flex flex-col desktop:flex-row desktop:gap-4 desktop:px-8 desktop:py-8">
        {/* Left: sticky photo panel on desktop, static image block on mobile */}
        <div className="w-full desktop:w-[45%] relative">
          <div
            className="relative w-full overflow-hidden h-[70vh] min-h-[480px] desktop:h-[calc(100vh-64px)] desktop:sticky desktop:top-8 desktop:rounded-[16px]"
            style={{ background: "var(--color-deep-green)" }}
          >
            <LeftPanel currentPhase={currentPhase} />
          </div>
        </div>

        {/* Right: scrolling bento panel. Page bg; only cards carry color. */}
        <div className="w-full desktop:w-[55%] px-6 tablet:px-10 desktop:px-16 py-16 desktop:py-20">
          {PHASES.map((phase, pi) => (
            <div
              key={phase.label}
              ref={(el) => {
                phaseRefs.current[pi] = el;
              }}
              className={pi > 0 ? "mt-16" : ""}
            >
              <div className="mb-12">
                <PhaseHeader phase={phase} reduce={reduce} />
              </div>
              <div className="flex flex-col gap-5">
                {phase.stops.map((stop) => (
                  <StopCard key={stop.n} stop={stop} reduce={reduce} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
