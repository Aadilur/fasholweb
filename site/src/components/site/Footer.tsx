import Link from "next/link";
import Image from "next/image";
import { getLang } from "@/lib/i18n.server";
import { t, type Lang } from "@/lib/i18n";

type FLink = { href: string; en: string; bn: string; external?: boolean };

const companyLinks: FLink[] = [
  { href: "/", en: "Overview", bn: "হোম" },
  { href: "/about", en: "About", bn: "আমাদের সম্পর্কে" },
  { href: "/services", en: "Services", bn: "সার্ভিস" },
  { href: "/career", en: "Career", bn: "ক্যারিয়ার" },
  { href: "/contact", en: "Contact", bn: "যোগাযোগ" },
];

const platformLinks: FLink[] = [
  { href: "/#platform-jogaan", en: "Jogaan", bn: "যোগান" },
  { href: "/#platform-hyperfarm", en: "Hyperfarm", bn: "হাইপারফার্ম" },
  { href: "/solutions/restaurants", en: "Solutions", bn: "সলিউশন" },
  { href: "/privacy", en: "Privacy policy", bn: "প্রাইভেসি পলিসি" },
  { href: "/terms", en: "Terms of service", bn: "টার্মস অব সার্ভিস" },
];

const connectLinks: FLink[] = [
  { href: "tel:+8809613105505", en: "+880 9613 105 505", bn: "+৮৮০ ৯৬১৩ ১০৫ ৫০৫" },
  { href: "mailto:info@fashol.com", en: "info@fashol.com", bn: "info@fashol.com" },
  { href: "https://www.facebook.com/fasholcom/", en: "Facebook", bn: "ফেসবুক", external: true },
  { href: "https://www.linkedin.com/company/fashol", en: "LinkedIn", bn: "লিংকডইন", external: true },
  { href: "https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ", en: "YouTube", bn: "ইউটিউব", external: true },
];

const linkOnDark =
  "text-[rgba(0,0,0,0.72)] hover:text-black transition-colors";
const headingOnDark = "text-[var(--color-ink)] text-[15px] tracking-[-0.01em]";

function LinkColumn({
  heading,
  links,
  lang,
}: {
  heading: string;
  links: FLink[];
  lang: Lang;
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
                {t(lang, l.en, l.bn)}
              </a>
            ) : (
              <Link href={l.href} className={linkOnDark}>
                {t(lang, l.en, l.bn)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const lang = await getLang();
  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-ink)]">
      {/* Background photograph */}
      <Image
        src="/footer-field.jpg"
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
      {/* Mobile only: the footer is tall on phones, so content stacks into the dark
          lower half of the photo. A paper wash keeps the content zone light for the
          dark text, then fades out near the base so the white wordmark still reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 tablet:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(248,243,222,0.90) 0%, rgba(248,243,222,0.86) 62%, rgba(248,243,222,0.80) 80%, rgba(255,251,234,0) 90%, rgba(0,0,0,0.22) 100%)",
        }}
      />

      <div className="relative container-page pt-16 tablet:pt-20 desktop:pt-24">
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
              {t(lang, "A safe, sustainable food supply chain.", "নিরাপদ, টেকসই সাপ্লাই চেইন।")}
            </h2>
          </div>

          {/* Link columns */}
          <div className="tablet:col-span-7 grid grid-cols-2 tablet:grid-cols-3 gap-10">
            <LinkColumn heading={t(lang, "Company", "কোম্পানি")} links={companyLinks} lang={lang} />
            <LinkColumn heading={t(lang, "Navigation", "নেভিগেশন")} links={platformLinks} lang={lang} />
            <LinkColumn heading={t(lang, "Connect", "যোগাযোগ")} links={connectLinks} lang={lang} />
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
