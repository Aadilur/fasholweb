"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Logo = { src: string; alt: string; ratio?: number; scale?: number; href?: string };

export function LogoMarquee({
  logos,
  height = 36,
  colored = false,
  centerAlt,
  durationSec = 50,
}: {
  logos: Logo[];
  height?: number;
  colored?: boolean;
  centerAlt?: string;
  durationSec?: number;
}) {
  const doubled = [...logos, ...logos];
  const itemClass = colored
    ? "shrink-0"
    : "shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-200";

  // anchor on the SECOND copy of the target logo so there are 12 logos visible to its left
  const firstAnchorIdx = centerAlt ? logos.findIndex((l) => l.alt === centerAlt) : -1;
  const anchorIdx = firstAnchorIdx >= 0 ? logos.length + firstAnchorIdx : -1;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let anim: Animation | null = null;
    let hasStarted = false;

    const computeStartPct = () => {
      if (!centerAlt || !anchorRef.current) return 0;
      const containerW = container.clientWidth;
      const trackW = track.scrollWidth;
      if (!trackW) return 0;
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const anchorCenterInTrack = (anchorRect.left - trackRect.left) + anchorRect.width / 2;
      const offsetPx = containerW / 2 - anchorCenterInTrack;
      return (offsetPx / trackW) * 100;
    };

    let startPct = computeStartPct();
    track.style.transform = `translateX(${startPct}%)`;

    const buildAnim = (fromPct: number) => {
      anim?.cancel();
      if (reduced) return;
      anim = track.animate(
        [
          { transform: `translateX(${fromPct}%)` },
          { transform: `translateX(${fromPct - 50}%)` },
        ],
        { duration: durationSec * 1000, iterations: Infinity, easing: "linear" }
      );
      anim.pause();
      if (hasStarted) anim.play();
    };
    buildAnim(startPct);

    const onEnter = () => anim?.pause();
    const onLeave = () => { if (hasStarted) anim?.play(); };
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !hasStarted) {
            hasStarted = true;
            anim?.play();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(container);

    const ro = new ResizeObserver(() => {
      if (hasStarted) return;
      const next = computeStartPct();
      if (Math.abs(next - startPct) < 0.01) return;
      startPct = next;
      track.style.transform = `translateX(${startPct}%)`;
      buildAnim(startPct);
    });
    ro.observe(container);

    return () => {
      io.disconnect();
      ro.disconnect();
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      anim?.cancel();
    };
  }, [centerAlt, durationSec]);

  return (
    <div className="marquee py-6" ref={containerRef}>
      <div className="marquee-track marquee-track-js" ref={trackRef}>
        {doubled.map((l, i) => {
          const h = Math.round(height * (l.scale ?? 1));
          const isAnchor = i === anchorIdx;
          const img = (
            <Image
              src={l.src}
              alt={l.alt}
              width={Math.round(h * (l.ratio ?? 3.2))}
              height={h}
              className="h-full w-auto object-contain"
            />
          );
          return (
            <div
              key={i}
              className={itemClass}
              style={{ height: h }}
              ref={isAnchor ? anchorRef : undefined}
            >
              {l.href ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read the ${l.alt} article`}
                  className="block h-full hover:opacity-80 transition-opacity duration-200"
                >
                  {img}
                </a>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
