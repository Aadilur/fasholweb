import Link from "next/link";
import Image from "next/image";

const companyLinks = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

const platformLinks = [
  { href: "/#platform-jogaan", label: "Jogaan" },
  { href: "/#platform-hyperfarm", label: "Hyperfarm" },
  { href: "/solutions/restaurants", label: "Solutions" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

const connectLinks: Array<{ href: string; label: string; external?: boolean }> = [
  { href: "tel:+8809613105505", label: "+880 9613 105 505" },
  { href: "mailto:info@fashol.com", label: "info@fashol.com" },
  { href: "https://www.facebook.com/fasholcom/", label: "Facebook", external: true },
  { href: "https://www.linkedin.com/company/fashol", label: "LinkedIn", external: true },
  { href: "https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ", label: "YouTube", external: true },
];

const linkOnDark =
  "text-[rgba(0,0,0,0.72)] hover:text-black transition-colors";
const headingOnDark = "text-[var(--color-ink)] text-[15px] tracking-[-0.01em]";

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: Array<{ href: string; label: string; external?: boolean }>;
}) {
  return (
    <div>
      <p className={headingOnDark} style={{ fontWeight: 600 }}>
        {heading}
      </p>
      <ul className="mt-5 space-y-3.5 t-body-sm">
        {links.map((l) => (
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
              <Link href={l.href} className={linkOnDark}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-ink)]">
      {/* Background photograph */}
      <Image
        src="/footer-hero.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-[center_32%] -z-10 select-none pointer-events-none"
      />
      {/* Whisper of a warm veil - lifts the palest sky just enough to seat dark text, keeps the photo fully visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,240,214,0.28) 0%, rgba(255,232,190,0.10) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      <div className="relative container-page pt-20 desktop:pt-24">
        <div className="grid grid-cols-1 tablet:grid-cols-12 gap-12 desktop:gap-8">
          {/* Brand column */}
          <div className="tablet:col-span-5">
            <Link href="/" aria-label="Fashol home" className="inline-flex items-center">
              <Image
                src="/fashol-logo-full.png"
                alt="Fashol"
                width={560}
                height={168}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <h2
              className="mt-7 text-[24px] tablet:text-[28px] leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)] max-w-sm"
              style={{ fontWeight: 600 }}
            >
              A safe, sustainable food supply chain.
            </h2>
          </div>

          {/* Link columns */}
          <div className="tablet:col-span-7 grid grid-cols-2 tablet:grid-cols-3 gap-10">
            <LinkColumn heading="Company" links={companyLinks} />
            <LinkColumn heading="Navigation" links={platformLinks} />
            <LinkColumn heading="Connect" links={connectLinks} />
          </div>
        </div>
      </div>

      {/* Oversized logo wordmark - cut in half by the bottom edge, in white */}
      <div
        className="relative mt-10 mx-auto w-[86%] overflow-hidden"
        style={{ aspectRatio: "1370 / 280" }}
        aria-hidden="true"
      >
        <Image
          src="/fashol-wordmark.png"
          alt=""
          fill
          sizes="86vw"
          className="object-cover object-top select-none pointer-events-none"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    </footer>
  );
}
