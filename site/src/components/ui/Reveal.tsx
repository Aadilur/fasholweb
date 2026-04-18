"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
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
