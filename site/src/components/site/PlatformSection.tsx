"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/site/LanguageProvider";

type Action =
  | { type: "link"; href: string }
  | { type: "platforms" };

type Product = {
  num: string;
  name: string;
  bn: string | null;
  audience: string;
  audienceBn: string;
  headline: string;
  headlineBn: string;
  body: string;
  bodyBn: string;
  cta: string;
  ctaBn: string;
  action: Action;
  img: string;
  imgAlt: string;
  span: string;
  nameColor: string;
  layout: "flagship" | "wide" | "full";
  // Optional: when the product has its own brand logo, show it in the image slot
  // instead of a photograph.
  logo?: string;
  logoBg?: string;
};

const PRODUCTS: Product[] = [
  {
    num: "01",
    name: "Jogaan",
    bn: null,
    audience: "Farmers and field agents.",
    audienceBn: "কৃষক ও ফিল্ড এজেন্টদের জন্য।",
    headline: "The grower's view of the Fashol network.",
    headlineBn: "ফসল নেটওয়ার্কের চাষির চোখে দেখা রূপ।",
    body: "Farmers and field agents use Jogaan to check live buyer demand across nine districts, get paid by mobile money within 24 hours of weighing, and keep a paperless record of every sale. It also carries a marketplace for seed, feed, and equipment.",
    bodyBn: "কৃষক আর ফিল্ড এজেন্টরা যোগান দিয়ে নয়টি জেলায় বায়ারের সরাসরি চাহিদা দেখেন, ওজনের 24 ঘণ্টার মধ্যে মোবাইল মানিতে টাকা পান, আর প্রতিটি বিক্রির কাগজবিহীন হিসাব রাখেন। এতে বীজ, খাবার আর যন্ত্রপাতির একটি মার্কেটপ্লেসও আছে।",
    cta: "Open Jogaan on Google Play",
    ctaBn: "গুগল প্লে-তে যোগান খুলুন",
    action: { type: "link", href: "https://play.google.com/store/apps/details?id=com.fashol.agent" },
    img: "/images/content/card-image-2.jpg",
    imgAlt: "A Bangladeshi smallholder farmer in a paddy field checking the Jogaan app on a smartphone in warm morning light.",
    span: "tablet:col-span-1 desktop:col-span-6",
    nameColor: "text-[var(--color-deep-green)]",
    layout: "flagship",
  },
  {
    num: "02",
    name: "Hyperfarm",
    bn: null,
    audience: "Restaurants, retailers, quick-commerce, wholesalers, and exporters.",
    audienceBn: "রেস্তোরাঁ, রিটেইলার, কুইক-কমার্স, পাইকার আর এক্সপোর্টারদের জন্য।",
    headline: "The buyer's procurement desk.",
    headlineBn: "বায়ারের প্রোকিউরমেন্ট ডেস্ক।",
    body: "Buyers order fresh produce, groceries, meat, poultry, and staples straight from verified farmers and hubs. Prices update each morning, stock shows before you order, and delivery runs on Fashol's own routes. Setup takes ten minutes; available on iOS, Android, and web.",
    bodyBn: "বায়াররা যাচাই করা কৃষক আর হাব থেকে সরাসরি তাজা পণ্য, মুদি সামগ্রী, মাংস, পোলট্রি আর নিত্যপণ্য অর্ডার করেন। প্রতিদিন সকালে দাম হালনাগাদ হয়, অর্ডারের আগেই স্টক দেখা যায়, আর ডেলিভারি চলে ফসলের নিজস্ব রুটে। সেটআপ লাগে দশ মিনিট; পাওয়া যায় iOS, Android আর ওয়েবে।",
    cta: "Get Hyperfarm",
    ctaBn: "হাইপারফার্ম নিন",
    action: { type: "platforms" },
    img: "/images/content/platform-02-hyperfarm.jpg",
    imgAlt: "Interior of a large Bangladeshi warehouse with mounds of golden grain, workers moving product, and sacks of feed stacked in the foreground - the procurement floor Hyperfarm digitises.",
    span: "tablet:col-span-1 desktop:col-span-6",
    nameColor: "text-[var(--color-ink)]",
    layout: "flagship",
  },
];

const HYPERFARM_PLATFORMS = [
  { label: "App Store", detail: "iPhone, iPad", detailBn: "iPhone, iPad", href: "https://apps.apple.com/bd/app/hyperfarm/" },
  { label: "Google Play", detail: "Android", detailBn: "Android", href: "https://play.google.com/store/apps/details?id=com.fashol.hyperfarm" },
  { label: "hyperfarm.global", detail: "Web browser", detailBn: "ওয়েব ব্রাউজার", href: "https://hyperfarm.global/" },
];

type ModalKey = "hyperfarm";

export function PlatformSection() {
  const lang = useLang();
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  useEffect(() => {
    if (!openModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openModal]);

  return (
    <Section tone="surface">
      <div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 items-start">
        <Reveal as="h2" className="t-h2 desktop:col-span-6">
          {t(lang, "The platform, in two products.", "প্ল্যাটফর্ম, দুটি প্রোডাক্টে।")}
        </Reveal>
        <Reveal delay={0.08} className="desktop:col-span-6 t-body-lg">
          <p>
            {t(lang, "Fashol's operations run on software we built in-house. Jogaan is the farmer's app. Hyperfarm is the buyer's app. Both run on the same stock, pricing, and settlement engine, so every order moves on one shared record.", "ফসলের সব কার্যক্রম চলে আমাদের নিজেদের তৈরি সফটওয়্যারে। যোগান কৃষকের অ্যাপ। হাইপারফার্ম বায়ারের অ্যাপ। দুটোই চলে একই স্টক, প্রাইসিং আর সেটেলমেন্ট ইঞ্জিনে, তাই প্রতিটি অর্ডার এক অভিন্ন রেকর্ডে পরিচালিত হয়।")}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 tablet:mt-20 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-12 gap-4 tablet:gap-5 [grid-auto-rows:minmax(240px,auto)]">
        {PRODUCTS.map((p) => (
          <Reveal key={p.num} className={p.span}>
            <PlatformTile product={p} onOpenModal={setOpenModal} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {openModal === "hyperfarm" && (
          <HyperfarmModal key="hyperfarm" onClose={() => setOpenModal(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}

function PlatformTile({
  product,
  onOpenModal,
}: {
  product: Product;
  onOpenModal: (k: ModalKey) => void;
}) {
  const lang = useLang();
  const tileClass =
    "group relative flex h-full w-full min-h-[240px] flex-col overflow-hidden rounded-3xl bg-[var(--color-paper)] text-[var(--color-ink)] text-left border border-[var(--color-line)] p-7 tablet:p-10";

  const identity = (
    <div className="flex flex-col min-w-0">
      <h3
        className={`${product.layout === "flagship" ? "t-h2" : "t-h3"} ${product.nameColor}`}
        style={{ fontWeight: 500, letterSpacing: "-0.02em" }}
      >
        {product.name}
      </h3>
      {product.bn && (
        <p
          className={`lang-bn ${product.layout === "flagship" ? "t-h3" : "t-h4"} mt-1 text-[var(--color-ink-subtle)]`}
          style={{ fontWeight: 500 }}
        >
          {product.bn}
        </p>
      )}
      <p className="t-body-sm mt-4 text-[var(--color-ink-muted)]">{t(lang, `For ${product.audience}`, product.audienceBn)}</p>
    </div>
  );

  const bodyBlock = (
    <div className="flex flex-col gap-3 min-w-0">
      <h4 className={product.layout === "flagship" ? "t-h4" : "t-h5"} style={{ fontWeight: 500 }}>
        {t(lang, product.headline, product.headlineBn)}
      </h4>
      <p className="t-body-sm text-[var(--color-ink-subtle)]">{t(lang, product.body, product.bodyBn)}</p>
      <span className="mt-2 inline-flex items-center text-[13px] font-medium text-[var(--color-deep-green)] group-hover:text-[var(--color-deep-green-pressed)] transition-colors">
        {t(lang, product.cta, product.ctaBn)}
      </span>
    </div>
  );

  const aspectClasses =
    product.layout === "flagship"
      ? "aspect-[5/4]"
      : product.layout === "full"
      ? "aspect-[16/10] desktop:aspect-auto desktop:h-full"
      : "aspect-[5/4] desktop:aspect-auto desktop:h-full";
  const imageSlot = product.logo ? (
    <div
      className={`relative overflow-hidden rounded-2xl ${product.logoBg ?? "bg-[rgba(6,94,58,0.06)]"} ${aspectClasses} flex items-center justify-center p-10 tablet:p-12`}
    >
      <Image
        src={product.logo}
        alt={`${product.name} logo`}
        width={512}
        height={512}
        sizes="(min-width: 1200px) 240px, 50vw"
        className="w-full h-full object-contain max-w-[220px] max-h-[220px]"
      />
    </div>
  ) : (
    <div className={`relative overflow-hidden rounded-2xl bg-[rgba(6,94,58,0.06)] ${aspectClasses}`}>
      <Image
        src={product.img}
        alt={product.imgAlt}
        fill
        sizes="(min-width: 1200px) 40vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  const tileInner =
    product.layout === "flagship" ? (
      <>
        <div className="flex flex-1 flex-col gap-6 tablet:gap-8">
          {imageSlot}
          <div className="flex flex-1 flex-col gap-6 tablet:gap-8">
            {identity}
            {bodyBlock}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="grid grid-cols-1 desktop:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 desktop:gap-10 items-stretch flex-1">
          <div className="flex flex-col gap-6 tablet:gap-8 min-w-0">
            {identity}
            {bodyBlock}
          </div>
          {imageSlot}
        </div>
      </>
    );

  if (product.action.type === "link") {
    return (
      <a
        href={product.action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={tileClass}
      >
        {tileInner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpenModal("hyperfarm")}
      className={tileClass}
    >
      {tileInner}
    </button>
  );
}

function HyperfarmModal({ onClose }: { onClose: () => void }) {
  const lang = useLang();
  return (
    <ModalShell onClose={onClose} label={t(lang, "Hyperfarm platforms", "হাইপারফার্ম প্ল্যাটফর্ম")}>
      <div className="relative h-16 w-16 mb-5">
        <Image
          src="/images/content/hyperfarm-logo.png"
          alt="Hyperfarm"
          width={128}
          height={128}
          sizes="64px"
          className="h-full w-full object-contain"
          priority
        />
      </div>
      <h3 className="t-h3" style={{ fontWeight: 500 }}>
        {t(lang, "Get Hyperfarm", "হাইপারফার্ম নিন")}
      </h3>
      <p className="t-body-sm text-[var(--color-ink-muted)] mt-2">
        {t(lang, "Available on iOS, Android, and the web. Pick your platform.", "পাওয়া যায় iOS, Android আর ওয়েবে। আপনার প্ল্যাটফর্মটি বেছে নিন।")}
      </p>
      <ul className="mt-8 flex flex-col gap-3">
        {HYPERFARM_PLATFORMS.map((p) => (
          <li key={p.label}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] px-5 py-4 hover:border-[var(--color-deep-green)] transition-colors"
            >
              <div>
                <div className="t-body font-medium text-[var(--color-ink)]">{p.label}</div>
                <div className="text-[11px] tracking-[0.14em] uppercase font-medium text-[var(--color-ink-muted)] mt-1" style={{ fontFamily: "var(--font-display)" }}>
                  {t(lang, p.detail, p.detailBn)}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </ModalShell>
  );
}

function ModalShell({
  onClose,
  label,
  children,
}: {
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const lang = useLang();
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className="absolute inset-0 bg-[rgba(6,94,58,0.55)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        className="relative z-10 w-full max-w-md bg-[var(--color-paper)] border border-[var(--color-line)] rounded-3xl p-8 tablet:p-10 shadow-xl"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t(lang, "Close", "বন্ধ করুন")}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[rgba(19,19,19,0.04)] transition-colors"
        >
          <span aria-hidden className="text-[22px] leading-none">×</span>
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
