"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Action =
  | { type: "link"; href: string }
  | { type: "platforms" }
  | { type: "form" };

type Product = {
  num: string;
  name: string;
  bn: string | null;
  audience: string;
  headline: string;
  body: string;
  cta: string;
  action: Action;
  img: string;
  imgAlt: string;
  span: string;
  nameColor: string;
  layout: "flagship" | "wide" | "full";
  // Optional: when the product has its own brand logo, show it in the image slot
  // instead of a photograph (e.g. Banijjo has a distinct wordmark).
  logo?: string;
  logoBg?: string;
};

const PRODUCTS: Product[] = [
  {
    num: "01",
    name: "Jogaan",
    bn: "যোগান",
    audience: "Farmers and field agents.",
    headline: "The grower's view of the Fashol network.",
    body: "Farmers and Fashol's field agents use Jogaan to check live buyer demand across all nine operating districts, confirm mobile-money payments within 24 hours of weighing, and keep a full record of every sale without any paperwork. The app also includes a marketplace for seed, feed, and farm equipment, plus a community feed where registered growers share advice and prices.",
    cta: "Open Jogaan on Google Play",
    action: { type: "link", href: "https://play.google.com/store/apps/details?id=com.fashol.agent" },
    img: "/images/content/card-image-2.jpg",
    imgAlt: "A Bangladeshi smallholder farmer in a paddy field checking the Jogaan app on a smartphone in warm morning light.",
    span: "tablet:col-span-2 desktop:col-span-6 desktop:row-span-2",
    nameColor: "text-[var(--color-deep-green)]",
    layout: "flagship",
  },
  {
    num: "02",
    name: "Hyperfarm",
    bn: null,
    audience: "Restaurants, retailers, quick-commerce, wholesalers, and exporters.",
    headline: "The buyer's procurement desk.",
    body: "Hyperfarm lets buyers order fresh produce, groceries, meat, poultry, and daily staples directly from verified farmers and hubs. Prices update every morning, stock is visible before you order, and delivery runs on Fashol's own route plans rather than on a wholesaler's schedule. Setup takes about ten minutes. Available on iOS, Android, and the web.",
    cta: "Get Hyperfarm",
    action: { type: "platforms" },
    img: "/images/content/platform-02-hyperfarm.jpg",
    imgAlt: "Interior of a large Bangladeshi warehouse with mounds of golden grain, workers moving product, and sacks of feed stacked in the foreground — the wholesale and procurement floor Hyperfarm digitises.",
    span: "tablet:col-span-1 desktop:col-span-6",
    nameColor: "text-[var(--color-ink)]",
    layout: "wide",
  },
  {
    num: "03",
    name: "Banijjo",
    bn: "বাণিজ্য",
    audience: "Wholesalers and distribution partners.",
    headline: "The operations desk for the mid-chain.",
    body: "Banijjo gives wholesalers and distributors inside the Fashol network the tools to run their shops: stock levels per store, order routing to buyers, and settlement records with farmers on one side and buyers on the other. It is the part of the platform the wholesale layer actually works in day to day.",
    cta: "Open Banijjo on Google Play",
    action: { type: "link", href: "https://play.google.com/store/apps/details?id=com.fashol.banijjo" },
    img: "/images/content/card-image1.jpg",
    imgAlt: "A Bangladeshi wholesale market worker moving crates of produce through the Banijjo distribution floor.",
    span: "tablet:col-span-1 desktop:col-span-6",
    nameColor: "text-[var(--color-ink)]",
    layout: "wide",
  },
  {
    num: "04",
    name: "CropCash",
    bn: null,
    audience: "Farmers, distributors, and exporters.",
    headline: "Working capital for every stage of the chain.",
    body: "CropCash will offer seasonal credit to farmers, inventory finance to distributors, and trade finance to exporters shipping across borders. Because Jogaan, Hyperfarm, and Banijjo already record every transaction on the platform, credit decisions start from a real ledger rather than a paper form. Launching in 2026.",
    cta: "Register interest",
    action: { type: "form" },
    img: "/images/content/hero-paddy-aerial.jpg",
    imgAlt: "A golden rice field at sunrise with a stack of Bangladeshi taka notes resting on weathered wood in the foreground.",
    span: "tablet:col-span-2 desktop:col-span-12",
    nameColor: "text-[var(--color-ink)]",
    layout: "full",
  },
];

const HYPERFARM_PLATFORMS = [
  { label: "App Store", detail: "iPhone, iPad", href: "https://apps.apple.com/bd/app/hyperfarm/" },
  { label: "Google Play", detail: "Android", href: "https://play.google.com/store/apps/details?id=com.fashol.hyperfarm" },
  { label: "hyperfarm.global", detail: "Web browser", href: "https://hyperfarm.global/" },
];

const FASHOL_WHATSAPP = "+8801810187230";

type ModalKey = "hyperfarm" | "cropcash";

export function PlatformSection() {
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
          The platform, in four products.
        </Reveal>
        <Reveal delay={0.08} className="desktop:col-span-6 t-body-lg">
          <p>
            Fashol&apos;s operations run on software we built in-house. Jogaan is the farmer&apos;s app. Hyperfarm is the buyer&apos;s app. Banijjo runs the wholesale layer between them. CropCash, launching in 2026, finances the working capital that moves on all three.
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
        {openModal === "cropcash" && (
          <CropCashModal key="cropcash" onClose={() => setOpenModal(null)} />
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
  const tileClass =
    "group relative flex h-full w-full min-h-[240px] flex-col overflow-hidden rounded-3xl bg-[var(--color-paper)] text-[var(--color-ink)] text-left border border-[var(--color-line)] p-7 tablet:p-10";

  const identity = (
    <div className="flex flex-col min-w-0">
      <span
        className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {product.num}
      </span>
      <h3
        className={`${product.layout === "flagship" ? "t-h2" : "t-h3"} mt-4 ${product.nameColor}`}
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
      <p className="t-body-sm mt-4 text-[var(--color-ink-muted)]">For {product.audience}</p>
    </div>
  );

  const bodyBlock = (
    <div className="flex flex-col gap-3 min-w-0">
      <h4 className={product.layout === "flagship" ? "t-h4" : "t-h5"} style={{ fontWeight: 500 }}>
        {product.headline}
      </h4>
      <p className="t-body-sm text-[var(--color-ink-subtle)]">{product.body}</p>
      <span className="mt-2 inline-flex items-center text-[13px] font-medium text-[var(--color-deep-green)] group-hover:text-[var(--color-deep-green-pressed)] transition-colors">
        {product.cta}
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
      onClick={() => onOpenModal(product.action.type === "platforms" ? "hyperfarm" : "cropcash")}
      className={tileClass}
    >
      {tileInner}
    </button>
  );
}

function HyperfarmModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} label="Hyperfarm platforms">
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
        Get Hyperfarm
      </h3>
      <p className="t-body-sm text-[var(--color-ink-muted)] mt-2">
        Available on iOS, Android, and the web. Pick your platform.
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
                  {p.detail}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </ModalShell>
  );
}

function CropCashModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [crop, setCrop] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Hi Fashol, I'd like to register interest in CropCash.\n\nContact number: ${phone}\nCurrently growing: ${crop}\nDistrict or address: ${address}`;
    const url = `https://wa.me/${FASHOL_WHATSAPP.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <ModalShell onClose={onClose} label="CropCash registration">
      {!submitted ? (
        <>
          <h3 className="t-h3" style={{ fontWeight: 500 }}>
            Register interest
          </h3>
          <p className="t-body-sm text-[var(--color-ink-muted)] mt-2">
            CropCash launches in 2026. Share a few details and we will reach out when onboarding opens.
          </p>
          <form className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>
            <Field label="Contact number" value={phone} onChange={setPhone} type="tel" placeholder="01XXXXXXXXX" required />
            <Field label="What you are growing" value={crop} onChange={setCrop} placeholder="Paddy, cabbage, mango, ..." required />
            <Field label="District or address" value={address} onChange={setAddress} placeholder="e.g. Jashore, Khulna" required />
            <button
              type="submit"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-[var(--color-deep-green)] text-[var(--color-paper)] px-6 py-3 font-medium hover:bg-[var(--color-ink)] transition-colors"
            >
              Register interest
            </button>
          </form>
        </>
      ) : (
        <>
          <h3 className="t-h3" style={{ fontWeight: 500 }}>
            Thanks, message ready.
          </h3>
          <p className="t-body-sm text-[var(--color-ink-muted)] mt-3">
            We have opened WhatsApp with your details. Send the message and our team will reach out when CropCash nears launch.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex items-center font-medium text-[var(--color-ink)] hover:text-[var(--color-deep-green)] transition-colors"
          >
            Close
          </button>
        </>
      )}
    </ModalShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 t-body text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-deep-green)] transition-colors"
      />
    </label>
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
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[rgba(19,19,19,0.04)] transition-colors"
        >
          <span aria-hidden className="text-[22px] leading-none">×</span>
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
