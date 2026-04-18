import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
 title: "Privacy Policy",
 description: "Privacy policy for Fashol Dotcom Limited and the Jogaan mobile application.",
};

const SECTIONS = [
 {
 title: "§ 01 Information we collect",
 items: [
 "Personal information — name, email, phone number, and location — when you register for our services.",
 "Agricultural data — crop information, farm details, transaction and settlement history — when you use Jogaan or the Fashol platform.",
 "Device information and usage analytics to monitor platform stability and to improve performance.",
 "Location data, when permitted, to provide location-based services and to plan logistics routes.",
 "Communication records — messages exchanged with customer support — for service improvement.",
 ],
 },
 {
 title: "§ 02 How we use your information",
 items: [
 "To provide and maintain the Fashol platform and the Jogaan application.",
 "To connect farmers with buyers and to facilitate settlement of agricultural transactions.",
 "To improve our products, debug issues, and develop new features.",
 "To send service-related communications, updates, and notifications.",
 "To ensure platform security, prevent fraud, and protect against misuse.",
 "To comply with legal, regulatory, and audit obligations in the jurisdictions we operate in.",
 ],
 },
 {
 title: "§ 03 How information is shared",
 items: [
 "We do not sell your personal information to third parties.",
 "Information may be shared with verified business partners — buyers, logistics operators, banking partners — for the sole purpose of facilitating a transaction.",
 "Service providers (hosting, analytics, communications) who assist in operating the platform may access data under a data-processing agreement.",
 "Legal authorities may receive information when required by law, by court order, or by a valid regulatory request.",
 "Aggregated, de-identified data may be shared for research, benchmarking, and platform improvement.",
 ],
 },
 {
 title: "§ 04 Data security",
 items: [
 "All data transmission between your device and our systems is encrypted using TLS 1.2 or newer.",
 "Access to personal information inside the company is limited to authorised personnel and logged for audit.",
 "We run regular internal security reviews and engage external audits as needed.",
 "Data backup and disaster-recovery systems are maintained to preserve continuity of service.",
 ],
 },
 {
 title: "§ 05 Your rights",
 items: [
 "Access and review your personal information held by us.",
 "Request correction of inaccurate or incomplete data.",
 "Request deletion of your personal information, subject to legal and regulatory retention requirements.",
 "Opt out of marketing communications at any time.",
 "Receive a portable copy of your agricultural records.",
 "File a complaint with the relevant data-protection authority in your jurisdiction.",
 ],
 },
 {
 title: "§ 06 Data retention",
 items: [
 "Personal information is retained only as long as necessary for service provision or as required by law.",
 "Agricultural transaction records are retained for regulatory and financial-audit purposes.",
 "Account information is retained until an account-deletion request is processed.",
 "Anonymised aggregate data may be retained indefinitely for research and reporting.",
 ],
 },
];

export default function PrivacyPage() {
 return (
 <><PageHeader
 eyebrow="§ Legal · Privacy"
 title="Privacy Policy."
 lede="This document describes how Fashol Dotcom Limited collects, uses, and protects information gathered through the Fashol platform and the Jogaan mobile application. It applies to farmers, field agents, buyers, and site visitors."
 />

 <Section tone="paper">
 <div className="container-narrow">
 <p className="t-body-lg">
 At Fashol Dotcom Limited we are committed to protecting your privacy and to the security of your personal information.
 This policy describes the information we collect, how we use it, the parties we share it with, and the rights you have over it.
 </p>

 <div className="mt-16 space-y-16">
 {SECTIONS.map((sec) => (
 <div key={sec.title}>
 <h2 className="t-h3">{sec.title}</h2>
 <ul className="mt-6 space-y-3">
 {sec.items.map((it) => (
 <li key={it} className="flex gap-4 t-body">
 <span className="w-1 h-1 rounded-full bg-[var(--color-ink)] mt-3 shrink-0" />
 <span>{it}</span>
 </li>
 ))}
 </ul>
 </div>
 ))}

 <div>
 <h2 className="t-h3">§ 07 Contact</h2>
 <p className="mt-6 t-body">
 Questions about this policy or about our data practices can be sent to <a href="mailto:info@fashol.com" className="link">info@fashol.com</a>, or by post to
 Fashol Dotcom Limited, 130 Kabbokash, Kawran Bazar, Dhaka 1215, Bangladesh. Phone: <a href="tel:+8809613105505" className="link">+880 9613 105 505</a>.
 </p>
 </div>
 </div>
 </div>
 </Section>
 </>
 );
}
