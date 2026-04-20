"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "li" | "span" | "h1" | "h2" | "h3" | "p";
  once?: boolean;
  amount?: number;
};

/**
 * Reveal unmounts its motion wrapper after the first animation completes so
 * it stops contributing a composited layer to the scroll pipeline.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 14,
  className,
  style,
  as = "div",
  once = true,
  amount = 0.2,
}: Props) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const Tag = as as keyof React.JSX.IntrinsicElements;

  if (reduce || done) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      onAnimationComplete={() => setDone(true)}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  if (reduce || done) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        initial: {},
        animate: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      onAnimationComplete={() => setDone(true)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function QuoteReveal({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <blockquote className={className} style={style}>
        {children}
      </blockquote>
    );
  }
  return (
    <motion.blockquote
      initial={{ opacity: 0, letterSpacing: "0.08em" }}
      whileInView={{ opacity: 1, letterSpacing: "0em" }}
      viewport={{ once: true, margin: "0px 0px -40% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.blockquote>
  );
}

export function LetterSpaceReveal({
  children,
  className,
  style,
  as = "div",
  startSpacing = "0.06em",
  duration = 1,
  amount = 0.4,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
  startSpacing?: string;
  duration?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = as as keyof React.JSX.IntrinsicElements;
  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, letterSpacing: startSpacing }}
      whileInView={{ opacity: 1, letterSpacing: "0em" }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

export function DelayedFade({
  children,
  className,
  delay = 0.4,
  duration = 0.3,
  viewportMargin = "0px 0px -40% 0px",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  viewportMargin?: string;
  as?: "div" | "figcaption" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = as as keyof React.JSX.IntrinsicElements;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
