import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

const platformLinks = [
  { href: "/#platform-jogaan", label: "Jogaan" },
  { href: "/#platform-hyperfarm", label: "Hyperfarm" },
  { href: "/#platform-banijjo", label: "Banijjo" },
  { href: "/#platform-cropcash", label: "CropCash" },
];

type SolutionsGroup = {
  eyebrow: string;
  links: { href: string; label: string }[];
};

const solutionsGroups: SolutionsGroup[] = [
  {
    eyebrow: "Urban buyers",
    links: [
      { href: "/solutions/restaurants", label: "Restaurants" },
      { href: "/solutions/retailers", label: "Retailers" },
      { href: "/solutions/quick-commerce", label: "Quick commerce" },
      { href: "/solutions/supershops", label: "Supershops" },
    ],
  },
  {
    eyebrow: "Trade buyers",
    links: [
      { href: "/solutions/importers", label: "Importers" },
      { href: "/solutions/exporters", label: "Exporters" },
      { href: "/solutions/commission-agents", label: "Commission agents" },
      { href: "/solutions/wholesalers", label: "Wholesalers" },
    ],
  },
  {
    eyebrow: "Suppliers",
    links: [
      { href: "/solutions/farmers", label: "Farmers" },
      { href: "/solutions/agri-input-suppliers", label: "Agri input suppliers" },
      { href: "/solutions/agri-machinery-suppliers", label: "Agri machinery suppliers" },
    ],
  },
  {
    eyebrow: "Partners & financial",
    links: [
      { href: "/solutions/cold-storage-operators", label: "Cold storage operators" },
      { href: "/solutions/logistics-partners", label: "Logistics partners" },
      { href: "/solutions/supply-chain-financing", label: "Supply chain financing" },
    ],
  },
];

const companyLinks = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-study", label: "Case study" },
  { href: "/data", label: "Data" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

const offices = [
  { tag: "BD", line: "130 Kabbokash, Kawran Bazar, Dhaka 1215" },
  { tag: "SG", line: "33A Pagoda Street, Singapore 059192" },
  { tag: "AE", line: "Office 406, Abdullah Fahed Bldg 2, Al Qussais 2, Dubai" },
  { tag: "TH", line: "ITF Tower, Silom, Bangkok" },
];

const connectLinks: Array<{ href: string; label: string; external?: boolean }> = [
  { href: "tel:+8809613105505", label: "+880 9613 105 505" },
  { href: "mailto:info@fashol.com", label: "info@fashol.com" },
  { href: "https://www.facebook.com/fasholcom/", label: "Facebook", external: true },
  { href: "https://www.linkedin.com/company/fashol", label: "LinkedIn", external: true },
  { href: "https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ", label: "YouTube", external: true },
];

const eyebrowOnDark =
  "!text-[rgba(255,255,255,0.55)] [&::before]:!bg-[rgba(255,255,255,0.4)]";
const linkOnDark =
  "text-[rgba(255,255,255,0.75)] hover:text-white transition-colors";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="container-page pt-20 pb-10 desktop:pt-24">
        <div className="grid grid-cols-1 tablet:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="tablet:col-span-4">
            <Link href="/" aria-label="Fashol home" className="inline-flex items-center">
              <Image
                src="/fashol-logo-full.png"
                alt="Fashol"
                width={560}
                height={168}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-6 t-body-lg max-w-sm text-[rgba(255,255,255,0.75)]">
              <span className="lang-bn">ফসল</span>{" "}
              <span className="text-[rgba(255,255,255,0.55)]">
                - Bengali noun. A harvest.
              </span>
            </p>
            <p className="mt-4 t-body max-w-md text-[rgba(255,255,255,0.65)]">
              A farm-to-business platform operating out of Dhaka, Singapore, and Dubai. Founded 2019.
              Registered as Fashol Dotcom Limited (BD), Fashol Singapore Pte Ltd (SG).
            </p>

            <div className="mt-10">
              <Eyebrow className={eyebrowOnDark}>Newsletter</Eyebrow>
              <form className="mt-4 flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 h-11 rounded-full px-4 bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.18)] text-white placeholder:text-[rgba(255,255,255,0.45)] text-[14px] focus:outline-none focus:border-[var(--color-lime)]"
                />
                <button type="submit" className="btn btn-primary !h-11 !px-5 !text-[13px]">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Four link columns */}
          <div className="tablet:col-span-8 grid grid-cols-1 tablet:grid-cols-4 gap-12">
            <div>
              <Eyebrow className={eyebrowOnDark}>Platform</Eyebrow>
              <ul className="mt-5 space-y-3 t-body-sm">
                {platformLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkOnDark}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow className={eyebrowOnDark}>Company</Eyebrow>
              <ul className="mt-5 space-y-3 t-body-sm">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkOnDark}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow className={eyebrowOnDark}>Offices</Eyebrow>
              <ul className="mt-5 space-y-4 t-body-sm">
                {offices.map((o) => (
                  <li key={o.tag} className="flex gap-3 text-[rgba(255,255,255,0.75)]">
                    <span className="t-mono text-white w-5 shrink-0">{o.tag}</span>
                    <span>{o.line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow className={eyebrowOnDark}>Connect</Eyebrow>
              <ul className="mt-5 space-y-3 t-body-sm">
                {connectLinks.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkOnDark}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <a href={l.href} className={linkOnDark}>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Solutions - full-width band below the main link grid */}
        <div className="mt-16">
          <Link
            href="/solutions"
            className={`inline-flex items-center gap-2 ${eyebrowOnDark} t-eyebrow eyebrow-bar hover:!text-white transition-colors`}
          >
            Solutions
          </Link>
          <div className="mt-6 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-10">
            {solutionsGroups.map((group) => (
              <div key={group.eyebrow}>
                <p className="t-mono text-[11px] tracking-[0.12em] uppercase !text-[rgba(255,255,255,0.45)]">
                  {group.eyebrow}
                </p>
                <ul className="mt-4 space-y-3 t-body-sm">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkOnDark}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="rule-dark mt-16" />

        <div className="mt-6 flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-4 t-caption text-[rgba(255,255,255,0.55)]">
          <p>© 2019–2026 Fashol Dotcom Limited · Dhaka, Bangladesh</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>v 2026.04</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
