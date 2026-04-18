import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PriceBarsFigure } from "@/components/figures/PriceBars";

export const metadata: Metadata = {
 title: "ফসল — সরাসরি কৃষকের কাছ থেকে",
 description:
 "ফসল ডটকম — বাংলাদেশের কৃষকদের জন্য সরাসরি বাজারসংযোগ। যোগান অ্যাপের মাধ্যমে ফসল নিবন্ধন, পরের দিনের দাম, ২৪ ঘণ্টায় পরিশোধ। ৪০,০০০+ কৃষক, ৯টি জেলা।",
 alternates: { languages: { bn: "/bn", en: "/" } },
};

export default function BengaliHomePage() {
 return (
 <div className="lang-bn">{/* Hero */}
 <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
 <div className="absolute inset-0 opacity-45">
 <Image
 src="/images/content/hero-paddy-aerial.jpg"
 alt=""
 fill
 priority
 className="object-cover"
 sizes="100vw"
 />
 <div className="absolute inset-0 bg-gradient-to-b from-[rgba(19,19,19,0.3)] via-[rgba(19,19,19,0.5)] to-[rgba(19,19,19,0.9)]" />
 </div>

 <div className="container-page relative pt-[96px] tablet:pt-[128px] desktop:pt-[144px] pb-24 tablet:pb-36 desktop:pb-44">
 <Reveal>
 <Eyebrow className="!text-[rgba(255,255,255,0.7)] [&::before]:!bg-[rgba(255,255,255,0.5)]">
 ফসল · বাংলা বিশেষ্য · ন্যায্য দামে
 </Eyebrow>
 </Reveal>
 <Reveal as="h1" delay={0.08} className="t-hero mt-8 max-w-5xl">
 ফসল — সরাসরি কৃষকের কাছ থেকে, ন্যায্য দামে।
 </Reveal>
 <Reveal as="p" delay={0.16} className="t-body-lg !text-[rgba(255,255,255,0.8)] mt-8 max-w-2xl">
 ৪০,০০০+ নিবন্ধিত কৃষক, ৯টি জেলা, ৪০+ সংগ্রহকেন্দ্র। প্রতিদিন সন্ধ্যা ৭টায় পরদিনের দাম;
 সকালে সংগ্রহ; ২৪ ঘণ্টায় কৃষকের হিসাবে টাকা।
 </Reveal>
 <Reveal delay={0.24} className="mt-10 flex flex-col tablet:flex-row gap-3">
 <Button variant="primary" href="https://wa.me/+8801810187230?text=আমি একজন কৃষক হিসেবে ফসলে নিবন্ধন করতে চাই।" external>
 কৃষক নিবন্ধন →
 </Button>
 <Button variant="on-dark" href="/">EN ↗</Button>
 </Reveal>
 </div>
 </section>

 {/* § ০০ Founder letter */}
 <Section tone="paper">
 <div className="container-narrow">
 <Reveal delay={0.08} className="mt-10 t-body-lg space-y-6 !text-[var(--color-ink-subtle)]">
 <p>
 আমি যে বছরে বড় হয়েছি, সে বছরে বাজারে যেতে যেতে শুনতাম — &ldquo;এই বছর কপি যাবে না&rdquo;, &ldquo;পেঁয়াজ পঁচে গেছে&rdquo;,
 &ldquo;পিঁয়াজুর দাম টিকছে না&rdquo;। কৃষক লাগাতেন, সার দিতেন, পানি দিতেন, কাটতেন — তারপর বৃহস্পতিবারের হাটে যে দামে আড়তদার নেবেন,
 সে দামে ছেড়ে দিতে হতো। না দিলে সেই কপি বাড়িতে এনে সোমবার বিকেলে হলুদ হয়ে যেত।
 </p>
 <p>
 ফসল শুরু করেছি এই একটিমাত্র সমস্যার জন্য — শৃঙ্খলের শেষ প্রান্তের মানুষ, কৃষক, সবার পরে পান, সবচেয়ে কম পান, এবং এমনভাবে পান
 যেখানে তাঁর কোনো হিসাব নেই, ব্যাংকের কোনো কাগজ নেই, পরের মাসে ঋণ পাওয়ার কোনো প্রমাণ নেই। আমরা কৃষির শৃঙ্খল পাল্টানোর চেষ্টা করছি না।
 আমরা করছি একটি কাজ — কৃষক যা বোনেন, সেটা যেন তিনি সরাসরি ক্রেতার কাছে বেচতে পারেন, প্রকাশিত দামে, ২৪ ঘণ্টার মধ্যে পরিশোধে,
 এবং এমন কাগজে যেটা তিনি আগামীকাল ব্যাংকে নিয়ে গেলে ঋণ মেলে।
 </p>
 <p>যা এখানে লেখা হবে, সব তার জন্য লেখা। বাকিটা — বিনিয়োগ, কারিগরি, পুরস্কার — সেটা পরের পাতায়।</p>
 </Reveal>
 <Reveal delay={0.16} className="mt-10 t-mono text-[11px] text-[var(--color-ink-muted)]">
 — সাকিব হোসাইন · প্রতিষ্ঠাতা ও সিইও · ঢাকা, এপ্রিল ২০২৬।
 </Reveal>
 </div>
 </Section>

 {/* § ০১ Stats */}
 <Section tone="surface">
 <div className="grid tablet:grid-cols-2 desktop:grid-cols-4 gap-4 mt-12">
 {[
 { v: "৪০,০০০+", l: "নিবন্ধিত কৃষক", n: "২০১৯ থেকে · ৯টি জেলায় বিস্তৃত" },
 { v: "৫,০০০+", l: "সক্রিয় ক্রেতা", n: "সুপারশপ · রপ্তানি · রেস্তোরাঁ · প্রক্রিয়াজাত" },
 { v: "~১,০৫০ MT", l: "প্রতি মাসে সরবরাহ", n: "শীতের মৌসুমে সর্বোচ্চ · ২০২৬ প্র প্রান্তিক গড়" },
 { v: "২৪ ঘ.", l: "পরিশোধ সময়", n: "কৃষকের ব্যাংক বা bKash হিসাবে" },
 ].map((s) => (
 <div key={s.l} className="card-plain p-7 flex flex-col gap-3">
 <div className="t-h2 t-tabular" style={{ fontWeight: 500 }}>{s.v}</div>
 <div className="t-body-sm mt-2" style={{ fontWeight: 500 }}>{s.l}</div>
 <p className="t-caption mt-auto">{s.n}</p>
 </div>
 ))}
 </div>
 </Section>

 {/* § ০২ Five steps */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">সরাসরি খামার থেকে ক্রেতা পর্যন্ত — পাঁচটি ধাপ, একটি প্ল্যাটফর্ম।</h2>
 <p className="t-body-lg mt-4 max-w-3xl">
 বাংলাদেশের কৃষিবাজারে গড়ে পাঁচ হাত ঘুরে একটি সবজি ভোক্তার কাছে পৌঁছায়। ফসল সেই পথ ছোট করে: মাঠ → সংগ্রহকেন্দ্র → শীতল পরিবহন → ক্রেতা → ভোক্তা।
 মাঝের অস্বচ্ছতা সরিয়ে, কৃষকের নামে সরাসরি লেনদেন।
 </p>

 <div className="grid tablet:grid-cols-2 desktop:grid-cols-5 gap-4 mt-14">
 {[
 { n: "০১", t: "মাঠে নিবন্ধন", b: "জাতীয় পরিচয়পত্র, জমির মানচিত্র, ব্যাংক বা bKash নম্বর — ৪০ মিনিট। কোনো ফি নেই।" },
 { n: "০২", t: "সন্ধ্যা ৭টায় দাম", b: "অ্যাপে পরদিনের সংগ্রহমূল্য প্রকাশ। দাম, গ্রেড, সময় — কৃষক আগে জানেন।" },
 { n: "০৩", t: "মাঠ-প্রান্ত সংগ্রহ", b: "ওজন · গ্রেড A/B · কৃষকের আইডিতে ট্যাগ · তাৎক্ষণিক SMS।" },
 { n: "০৪", t: "শীতল পরিবহন", b: "৪–৬°C তাপমাত্রায় ট্রাক সরাসরি ক্রেতার কাছে। নষ্ট ২%-এর কম।" },
 { n: "০৫", t: "২৪ ঘণ্টায় পরিশোধ", b: "ক্রেতা গ্রহণের ২৪ ঘণ্টায় ব্যাংক/bKash হিসাবে টাকা। কৃষকের নামে রেকর্ড।" },
 ].map((s) => (
 <div key={s.n} className="card-plain p-6 flex flex-col gap-3">
 <span className="t-mono text-[11px] text-[var(--color-terracotta)]">{s.n}</span>
 <h3 className="t-h5" style={{ fontWeight: 500 }}>{s.t}</h3>
 <p className="t-body-sm">{s.b}</p>
 </div>
 ))}
 </div>
 </Section>

 {/* § ০৩ Price argument */}
 <Section tone="surface">
 <h2 className="t-h2 mt-6 max-w-3xl">এক কেজি বাঁধাকপিতে কৃষক আসলে কত পান।</h2>
 <p className="t-body-lg mt-4 max-w-3xl">
 যশোর ও সাতক্ষীরার ২০২৪ শীত মৌসুমের গড় হিসাব। প্রচলিত আড়তদার-শৃঙ্খল বনাম ফসলের সরাসরি সংগ্রহ।
 </p>

 <div className="mt-12">
 <h3 className="t-h5 mb-6" style={{ fontWeight: 500 }}>
 <span className="t-mono text-[11px] text-[var(--color-ink-muted)] mr-2 not-italic">চিত্র ০২</span>
 কপি Grade A · ২০২৪ শীত মৌসুম · গড় BDT / কেজি
 </h3>
 <Reveal><PriceBarsFigure /></Reveal>
 </div>

 <div className="mt-10 flex flex-wrap gap-3">
 <Button variant="primary" href="/case-study">বারো মাসের একটি কৃষকের হিসাব →</Button>
 <Button variant="secondary" href="/data">২০১৯ → ২০২৬ পুরো তথ্য</Button>
 </div>
 </Section>

 {/* § ০৪ Jogaan */}
 <Section tone="ink">
 <div className="grid desktop:grid-cols-12 gap-10 items-center">
 <div className="desktop:col-span-7">
 <h2 className="t-h2 mt-6">যোগান — মাঠ যে অ্যাপে চলে।</h2>
 <p className="t-body-lg !text-[rgba(255,255,255,0.8)] mt-6 max-w-xl">
 যোগান একটি বাংলাভাষী অ্যান্ড্রয়েড অ্যাপ। Play Store-এ বিনামূল্যে পাওয়া যায়। প্রতিদিন সন্ধ্যা ৭টায় পরদিনের দাম আসে;
 সকালে সংগ্রহ; ২৪ ঘণ্টার মধ্যে টাকা। কৃষকের প্রতিটি লেনদেন নিজের নামে জমা থাকে।
 </p>
 <ul className="mt-8 space-y-3 t-body-sm !text-[rgba(255,255,255,0.8)]">
 <li>· বাংলা ভাষায়; ছবি ও ভয়েস-গাইড সহ</li>
 <li>· কোনো নিবন্ধন ফি নেই</li>
 <li>· একমত হলে সকালে ফসল তৈরি; না হলে পরের দিন অপেক্ষা</li>
 </ul>
 <div className="mt-10">
 <Button variant="primary" href="https://play.google.com/store/apps/details?id=com.fashol.agent" external>
 Play Store এ ইনস্টল করুন ↗
 </Button>
 </div>
 </div>
 <div className="desktop:col-span-5 relative aspect-[9/16] max-w-sm mx-auto w-full">
 <Image src="/images/content/jogaan-1.png" alt="যোগান অ্যাপ — নিবন্ধন" fill sizes="(min-width: 1200px) 380px, 80vw" className="object-cover rounded-3xl border border-[rgba(255,255,255,0.15)]" />
 </div>
 </div>
 </Section>

 {/* § ০৫ Join */}
 <Section tone="paper">
 <h2 className="t-h2 mt-6 max-w-3xl">তিনটি পথ — এক ফোন, এক অ্যাপ, এক মাঠ-প্রতিনিধি।</h2>

 <div className="grid tablet:grid-cols-3 gap-6 mt-14">
 {[
 { n: "০১", t: "কৃষক হিসেবে নিবন্ধন", b: "WhatsApp-এ মাঠ-প্রতিনিধি। গত মৌসুমের কাগজ আনুন।", href: "https://wa.me/+8801810187230?text=আমি একজন কৃষক হিসেবে ফসলে নিবন্ধন করতে চাই।" },
 { n: "০২", t: "ক্রেতা হিসেবে হিসাব", b: "MSME · কুইক কমার্স · রপ্তানিকারক · হোলসেলার — ১০ মিনিটে শুরু।", href: "https://wa.me/+8801810187230?text=আমি ফসলে একটি ক্রেতা হিসাব খুলতে চাই।" },
 { n: "০৩", t: "আমাদের সঙ্গে কাজ করুন", b: "ইঞ্জিনিয়ারিং · লজিস্টিক্স · মাঠ-কার্যক্রম · ডেটা।", href: "/career" },
 ].map((c) => (
 <div key={c.n} className="card-plain p-7 flex flex-col gap-3">
 <span className="t-mono text-[11px] text-[var(--color-terracotta)]">{c.n}</span>
 <h3 className="t-h4" style={{ fontWeight: 500 }}>{c.t}</h3>
 <p className="t-body">{c.b}</p>
 <div className="mt-auto pt-4">
 <Button variant="primary" href={c.href} external={c.href.startsWith("http")}>এগিয়ে যান →</Button>
 </div>
 </div>
 ))}
 </div>

 <p className="t-caption mt-16">
 <Link href="/" className="link">Read this page in English →</Link>
 </p>
 </Section>
 </div>
 );
}
