import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

const siteLinks = [
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
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="container-page pt-20 pb-10 desktop:pt-24">
        <div className="grid grid-cols-1 tablet:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="tablet:col-span-5">
            <Link href="/" aria-label="Fashol home" className="inline-flex items-center">
              <Image src="/fashol-logo-full.png" alt="Fashol" width={560} height={168} className="h-10 w-auto object-contain" />
            </Link>
            <p className="mt-6 t-body-lg max-w-sm text-[rgba(255,255,255,0.75)]">
              ফসল <span className="text-[rgba(255,255,255,0.55)]">— Bengali noun. A harvest.</span>
            </p>
            <p className="mt-4 t-body max-w-md text-[rgba(255,255,255,0.65)]">
              A farm-to-business platform operating out of Dhaka, Singapore, and Dubai. Founded 2019.
              Registered as Fashol Dotcom Limited (BD), Fashol Singapore Pte Ltd (SG).
            </p>

            <div className="mt-10">
              <Eyebrow className="!text-[rgba(255,255,255,0.55)] [&::before]:!bg-[rgba(255,255,255,0.4)]">Newsletter</Eyebrow>
              <form className="mt-4 flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 h-11 rounded-full px-4 bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.18)] text-white placeholder:text-[rgba(255,255,255,0.45)] text-[14px] focus:outline-none focus:border-[var(--color-lime)]"
                />
                <button
                  type="submit"
                  className="btn btn-primary !h-11 !px-5 !text-[13px]"
                >
                  Subscribe →
                </button>
              </form>
            </div>
          </div>

          {/* Site column */}
          <div className="tablet:col-span-3">
            <Eyebrow className="!text-[rgba(255,255,255,0.55)] [&::before]:!bg-[rgba(255,255,255,0.4)]">Site</Eyebrow>
            <ul className="mt-5 space-y-3 t-body-sm">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[rgba(255,255,255,0.75)] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices + direct */}
          <div className="tablet:col-span-4 flex flex-col gap-10">
            <div>
              <Eyebrow className="!text-[rgba(255,255,255,0.55)] [&::before]:!bg-[rgba(255,255,255,0.4)]">Offices</Eyebrow>
              <ul className="mt-5 space-y-4 t-body-sm">
                {offices.map((o) => (
                  <li key={o.tag} className="flex gap-3 text-[rgba(255,255,255,0.75)]">
                    <span className="t-mono text-white w-5">{o.tag}</span>
                    <span>{o.line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow className="!text-[rgba(255,255,255,0.55)] [&::before]:!bg-[rgba(255,255,255,0.4)]">Direct</Eyebrow>
              <ul className="mt-5 space-y-2 t-body-sm">
                <li><a href="tel:+8809613105505" className="text-[rgba(255,255,255,0.75)] hover:text-white">+880 9613 105 505</a></li>
                <li><a href="mailto:info@fashol.com" className="text-[rgba(255,255,255,0.75)] hover:text-white">info@fashol.com</a></li>
              </ul>
              <div className="mt-5 flex gap-3 t-mono text-[12px]">
                <a href="https://www.facebook.com/fasholcom/" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.65)] hover:text-white">Facebook</a>
                <a href="https://www.linkedin.com/company/fashol" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.65)] hover:text-white">LinkedIn</a>
                <a href="https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.65)] hover:text-white">YouTube</a>
              </div>
            </div>
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
