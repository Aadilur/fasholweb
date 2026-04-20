"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FASHOL_WHATSAPP = "+8801810187230";

type Props = {
  triggerLabel?: string;
  triggerClassName?: string;
};

/**
 * Self-contained "Register interest" CTA for Myfarm.
 *
 * Renders a button with the look of a link (default `.link-arrow`). Opening
 * the modal collects phone / crop / district, then prefills a WhatsApp
 * message to the Fashol number for the user to send.
 *
 * Mirrors the MyfarmModal flow used by PlatformSection on the home page
 * so the interaction is identical wherever Myfarm is surfaced.
 */
export function MyfarmRegister({
  triggerLabel = "Register interest",
  triggerClassName = "link-arrow",
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        {triggerLabel}
      </button>
      <AnimatePresence>
        {open && <MyfarmModal key="myfarm" onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MyfarmModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [crop, setCrop] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Hi Fashol, I'd like to register interest in Myfarm.\n\nContact number: ${phone}\nCurrently growing: ${crop}\nDistrict or address: ${address}`;
    const url = `https://wa.me/${FASHOL_WHATSAPP.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <ModalShell onClose={onClose} label="Myfarm registration">
      {!submitted ? (
        <>
          <h3 className="t-h3" style={{ fontWeight: 500 }}>
            Register interest
          </h3>
          <p className="t-body-sm text-[var(--color-ink-muted)] mt-2">
            Myfarm launches in 2026. Share a few details and we will reach out when onboarding opens.
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
            We have opened WhatsApp with your details. Send the message and our team will reach out when Myfarm nears launch.
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
  children: ReactNode;
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
