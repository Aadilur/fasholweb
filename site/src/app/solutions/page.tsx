import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "One supply chain, every role on it. Fashol's platform serves farmers, buyers, partners, and financiers across the food supply chain in Bangladesh and the region.",
};

type Card = {
  name: string;
  description: string;
  href: string;
};

type Group = {
  eyebrow: string;
  intro: string;
  cards: Card[];
  cols: 1 | 2 | 3 | 4;
};

const GROUPS: Group[] = [
  {
    eyebrow: "Urban buyers",
    intro:
      "The everyday demand layer. Restaurants, neighborhood shops, quick-commerce platforms, and supershops all serve urban consumers who expect fresh produce on a clock.",
    cols: 4,
    cards: [
      {
        name: "Restaurants",
        description: "Fresh produce at your kitchen door before morning service.",
        href: "/solutions/restaurants",
      },
      {
        name: "Retailers",
        description: "Neighborhood shops and kirana stores supplied on a predictable schedule.",
        href: "/solutions/retailers",
      },
      {
        name: "Quick commerce",
        description: "Daily pricing and cold-chain fulfillment to distribution centers.",
        href: "/solutions/quick-commerce",
      },
      {
        name: "Supershops",
        description: "Supply partnerships for retail chains with consistent grading and volume.",
        href: "/solutions/supershops",
      },
    ],
  },
  {
    eyebrow: "Trade buyers",
    intro:
      "The commercial and cross-border layer. Wholesalers, commission agents, exporters, and importers work in volume, on tight margins, and need grading, settlement, and documentation that hold up under scrutiny.",
    cols: 4,
    cards: [
      {
        name: "Importers",
        description: "Bangladesh-origin sourcing for regional markets, customs-ready.",
        href: "/solutions/importers",
      },
      {
        name: "Exporters",
        description: "Farm-to-airport in 24 hours, with grade verification and documentation.",
        href: "/solutions/exporters",
      },
      {
        name: "Commission agents",
        description: "Traditional arotdars on a modern stack, with transparent settlement.",
        href: "/solutions/commission-agents",
      },
      {
        name: "Wholesalers",
        description: "Direct-from-hub bulk pricing with quality grading applied at intake.",
        href: "/solutions/wholesalers",
      },
    ],
  },
  {
    eyebrow: "Suppliers",
    intro:
      "The production and input side of the chain. Farmers growing the crops, and the companies that sell them seed, feed, and machinery.",
    cols: 3,
    cards: [
      {
        name: "Farmers",
        description: "Fair pricing, 24-hour settlement, and a marketplace for inputs and machinery.",
        href: "/solutions/farmers",
      },
      {
        name: "Agri input suppliers",
        description: "Distribution into 60,000-plus registered farmers with demand data.",
        href: "/solutions/agri-input-suppliers",
      },
      {
        name: "Agri machinery suppliers",
        description: "Marketplace access to farmer demand with CropCash financing.",
        href: "/solutions/agri-machinery-suppliers",
      },
    ],
  },
  {
    eyebrow: "Partners",
    intro:
      "The infrastructure that makes the chain physical. Cold storage operators and logistics partners integrate their capacity into Fashol's routing and settlement systems.",
    cols: 2,
    cards: [
      {
        name: "Cold storage operators",
        description: "Capacity integration into Fashol's routing layer, with automated utilization.",
        href: "/solutions/cold-storage-operators",
      },
      {
        name: "Logistics partners",
        description: "Fleet and last-mile work across 40-plus hubs and 200-plus wholesale markets.",
        href: "/solutions/logistics-partners",
      },
    ],
  },
  {
    eyebrow: "Financial",
    intro:
      "Working capital is the quiet constraint in every supply chain. We finance the farmer, the buyer, and the exporter, in partnership with banks and development finance institutions.",
    cols: 1,
    cards: [
      {
        name: "Supply chain financing",
        description:
          "Input credit, working capital, and export receivables, underwritten by transaction history.",
        href: "/solutions/supply-chain-financing",
      },
    ],
  },
];

const COLS_CLASS: Record<Group["cols"], string> = {
  1: "desktop:grid-cols-1",
  2: "tablet:grid-cols-2 desktop:grid-cols-2",
  3: "tablet:grid-cols-2 desktop:grid-cols-3",
  4: "tablet:grid-cols-2 desktop:grid-cols-4",
};

export default function SolutionsHubPage() {
  return (
    <>
      {/* Section 1 - Hero */}
      <Section tone="ink">
        <div className="pt-[64px] tablet:pt-[88px] pb-4 tablet:pb-8">
          <Reveal>
            <span className="t-mono text-[11px] tracking-[0.14em] uppercase !text-[rgba(255,251,234,0.55)] block">
              SOLUTIONS
            </span>
          </Reveal>
          <Reveal
            delay={0.08}
            as="h1"
            className="t-hero mt-6 !text-[var(--color-paper)] max-w-[900px]"
          >
            One supply chain. Every role on it.
          </Reveal>
          <Reveal
            delay={0.16}
            as="p"
            className="t-body-lg mt-6 max-w-2xl !text-[rgba(255,251,234,0.75)]"
          >
            Fashol is not a single-product company. We built a platform that serves everyone the
            supply chain touches, from the farmer in Rangpur to the restaurant in Dhaka to the
            importer in Singapore. Pick your role below. We are already working with people like
            you.
          </Reveal>
          <Reveal delay={0.24} className="mt-8">
            <Link
              href="#work-with-fashol"
              className="inline-flex items-center text-[14px] font-medium !text-[var(--color-lime)] hover:!text-[var(--color-emerald)] transition-colors"
            >
              Work with Fashol
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Section 2 - Stakeholder directory */}
      <Section tone="paper">
        <div className="flex flex-col gap-20 tablet:gap-24">
          {GROUPS.map((group) => (
            <div key={group.eyebrow}>
              <Reveal>
                <span className="t-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-ink-muted)] block">
                  {group.eyebrow.toUpperCase()}
                </span>
              </Reveal>
              <Reveal
                delay={0.06}
                as="p"
                className="t-body-lg mt-5 max-w-full tablet:max-w-[60%]"
              >
                {group.intro}
              </Reveal>
              <StaggerChildren
                className={`mt-10 grid grid-cols-1 ${COLS_CLASS[group.cols]} gap-6`}
                stagger={0.06}
              >
                {group.cards.map((card) => (
                  <StaggerItem key={card.href}>
                    <StakeholderCard card={card} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 3 - The common stack */}
      <Section tone="surface">
        <Reveal>
          <span className="t-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-ink-muted)] block">
            THE COMMON STACK
          </span>
        </Reveal>
        <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 mt-6">
          <Reveal as="h2" className="t-h2 desktop:col-span-7">
            Every role. Same grading, same cold chain, same settlement engine.
          </Reveal>
          <Reveal delay={0.08} className="desktop:col-span-5 t-body-lg">
            <p>
              Whatever role you play in the chain, you are working on the same infrastructure.
              Four-tier grading applied at intake. Cold-chain handled from farm gate to final
              delivery. Mobile money settlement within 24 hours. Full traceability from grower to
              buyer. This is what makes Fashol a platform and not a middleman.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 4 - CTA band (anchor target for hero link) */}
      <Section tone="ink" id="work-with-fashol">
        <Reveal as="h2" delay={0.08} className="t-h2 mt-6 max-w-3xl">
          Three ways in.
        </Reveal>
        <StaggerChildren className="grid tablet:grid-cols-3 gap-6 mt-14" stagger={0.1}>
          {[
            {
              n: "01",
              t: "Partner with Fashol",
              b: "Open an account as a buyer, supplier, or partner. We onboard in under two weeks.",
              cta: "Partner with Fashol",
              href: "/contact",
            },
            {
              n: "02",
              t: "Work with us",
              b: "Open roles in engineering, logistics, trade operations, and data.",
              cta: "Work with us",
              href: "/career",
            },
            {
              n: "03",
              t: "Read the data",
              b: "Full operational register, published and maintained. Numbers, hubs, districts, and volumes.",
              cta: "Read the data",
              href: "/data",
            },
          ].map((c) => (
            <StaggerItem
              key={c.n}
              className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] p-8 flex flex-col gap-4"
            >
              <span className="t-mono text-[11px] !text-[rgba(255,255,255,0.55)]">{c.n}</span>
              <h3 className="t-h4" style={{ fontWeight: 500 }}>
                {c.t}
              </h3>
              <p className="t-body !text-[rgba(255,255,255,0.7)]">{c.b}</p>
              <div className="mt-auto pt-4">
                <Button variant="on-dark" href={c.href}>
                  {c.cta}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>
    </>
  );
}

function StakeholderCard({ card }: { card: Card }) {
  return (
    <Link
      href={card.href}
      className="group flex flex-col h-full bg-[var(--color-paper)] rounded-[4px] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square bg-[var(--color-grain)]">
        <Image
          src="/images/nav/placeholder.png"
          alt=""
          fill
          sizes="(min-width: 1200px) 280px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col gap-2 flex-1">
        <h3
          className="font-[var(--font-display)] text-[18px] tracking-[-0.015em] text-[var(--color-ink)]"
          style={{ fontWeight: 500 }}
        >
          {card.name}
        </h3>
        <p className="t-body-sm text-[var(--color-ink-muted)]">{card.description}</p>
        <span className="mt-auto pt-4 inline-flex items-center text-[14px] font-medium text-[var(--color-deep-green)] group-hover:text-[var(--color-deep-green-pressed)] transition-colors">
          Learn more
        </span>
      </div>
    </Link>
  );
}
