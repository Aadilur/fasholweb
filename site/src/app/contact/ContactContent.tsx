"use client";

import { useLang } from "@/components/site/LanguageProvider";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/i18n";


const DETAILS: Array<[string, string, string, string, string | null]> = [
 ["General", "সাধারণ", "info@fashol.com", "info@fashol.com", "mailto:info@fashol.com"],
 ["Press", "প্রেস", "press@fashol.com", "press@fashol.com", "mailto:press@fashol.com"],
 ["Careers", "ক্যারিয়ার", "careers@fashol.com", "careers@fashol.com", "mailto:careers@fashol.com"],
 ["Phone", "ফোন", "+880 9613 105 505", "+880 9613 105 505", "tel:+8809613105505"],
 ["Hours", "সময়", "Sun-Thu, 09:00-18:00 BST", "রবি-বৃহঃ, 09:00-18:00 BST", null],
 ["Response time", "সাড়া দেওয়ার সময়", "Within one business day", "এক কর্মদিবসের মধ্যে", null],
];

type Office = {
 country: string;
 countryBn: string;
 role: string;
 roleBn: string;
 lines: string[];
 cta: { label: string; href: string };
};

const OFFICES: Office[] = [
 {
 country: "Dhaka, Bangladesh",
 countryBn: "ঢাকা, বাংলাদেশ",
 role: "Head office",
 roleBn: "হেড অফিস",
 lines: ["Fashol Dotcom Limited", "130 Kabbokash, Kawran Bazar", "Dhaka 1215, Bangladesh"],
 cta: { label: "+880 9613 105 505", href: "tel:+8809613105505" },
 },
 {
 country: "Singapore",
 countryBn: "সিঙ্গাপুর",
 role: "Regional office",
 roleBn: "রিজিওনাল অফিস",
 lines: ["Fashol Singapore Pte Ltd", "33A Pagoda Street", "Singapore 059192"],
 cta: { label: "sg@fashol.com", href: "mailto:sg@fashol.com" },
 },
 {
 country: "Dubai, UAE",
 countryBn: "দুবাই, সংযুক্ত আরব আমিরাত",
 role: "Regional office",
 roleBn: "রিজিওনাল অফিস",
 lines: ["Office 406, Abdullah Fahed Bldg 2", "Al Qussais 2", "Dubai, United Arab Emirates"],
 cta: { label: "ae@fashol.com", href: "mailto:ae@fashol.com" },
 },
];

const CHANNELS: Array<[string, string, string, string, string]> = [
 ["Farmer registration", "কৃষক রেজিস্ট্রেশন", "Register on WhatsApp", "হোয়াটসঅ্যাপে রেজিস্টার করুন", "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20register%20as%20a%20farmer%20with%20Fashol."],
 ["Buyer account", "বায়ার অ্যাকাউন্ট", "Open an account on WhatsApp", "হোয়াটসঅ্যাপে অ্যাকাউন্ট খুলুন", "https://wa.me/+8801810187230?text=Hello!%20I%E2%80%99d%20like%20to%20open%20a%20buyer%20account%20with%20Fashol."],
 ["Facebook", "ফেসবুক", "/fasholcom", "/fasholcom", "https://www.facebook.com/fasholcom/"],
 ["LinkedIn", "লিংকডইন", "/company/fashol", "/company/fashol", "https://www.linkedin.com/company/fashol"],
 ["YouTube", "ইউটিউব", "Fashol channel", "ফসল চ্যানেল", "https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ"],
 ["App", "অ্যাপ", "Jogaan on Google Play", "Google Play-তে যোগান", "https://play.google.com/store/apps/details?id=com.fashol.agent"],
];


export function ContactContent() {
  const lang = useLang();
 return (
 <><PageHeader
 title={t(lang, "Contact", "যোগাযোগ")}
 lede={t(lang, "Reach us by email or phone. We reply within one business day.", "ইমেইল বা ফোনে আমাদের সঙ্গে যোগাযোগ করুন। আমরা এক কর্মদিবসের মধ্যে উত্তর দিই।")}
 />

 {/* Contact details */}
 <Section tone="surface" size="sm">
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-y-6 gap-x-10">
 {DETAILS.map(([kEn, kBn, vEn, vBn, href]) => (
 <div key={kEn} className="border-t border-[var(--color-line)] pt-4">
 <div className="t-mono text-[11px] text-[var(--color-ink-muted)]">{t(lang, kEn, kBn)}</div>
 {href ? (
 <a href={href} className="t-body-lg mt-1 link block">{t(lang, vEn, vBn)}</a>
 ) : (
 <div className="t-body-lg mt-1 text-[var(--color-ink)]">{t(lang, vEn, vBn)}</div>
 )}
 </div>
 ))}
 </div>
 </Section>

 {/* Offices */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">{t(lang, "Offices", "অফিস")}</h2>

 <div className="grid tablet:grid-cols-3 gap-6 mt-14">
 {OFFICES.map((o) => (
 <div key={o.country} className="card-plain p-8 flex flex-col gap-5">
 <div>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{t(lang, o.country, o.countryBn)}</h3>
 <p className="t-mono text-[11px] text-[var(--color-ink-muted)] mt-1">{t(lang, o.role, o.roleBn)}</p>
 </div>
 <address className="not-italic t-body space-y-1">
 {o.lines.map((l) => <div key={l}>{l}</div>)}
 </address>
 <div className="mt-auto pt-4">
 <Button variant="secondary" href={o.cta.href}>{o.cta.label}</Button>
 </div>
 </div>
 ))}
 </div>
 </Section>

 {/* Other channels */}
 <Section tone="surface">
 <h2 className="t-h2 mt-6 max-w-3xl">{t(lang, "Other channels", "অন্যান্য মাধ্যম")}</h2>

 <ul className="mt-14 border-t border-[var(--color-line-strong)]">
 {CHANNELS.map(([kEn, kBn, vEn, vBn, href]) => (
 <li key={kEn} className="grid tablet:grid-cols-[220px_1fr] items-center py-5 border-b border-[var(--color-line)] gap-4">
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)]">{t(lang, kEn, kBn)}</span>
 <a href={href} className="t-h5 link" style={{ fontWeight: 500 }} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
 {t(lang, vEn, vBn)}
 </a>
 </li>
 ))}
 </ul>
 </Section>
 </>
 );
}
