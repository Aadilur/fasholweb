"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

type Office = {
  country: string;
  city: string;
  address: string;
  lat: number;
  lon: number;
  /** Card position over the globe, as percentages of the container. */
  top: string;
  left: string;
};

const OFFICES: Office[] = [
  {
    country: "Bangladesh",
    city: "Dhaka",
    address: "Kawran Bazar",
    lat: 23.81,
    lon: 90.41,
    top: "8%",
    left: "58%",
  },
  {
    country: "Singapore",
    city: "Singapore",
    address: "Raffles Place",
    lat: 1.35,
    lon: 103.82,
    top: "62%",
    left: "68%",
  },
  {
    country: "United Arab Emirates",
    city: "Dubai",
    address: "DIFC, Sheikh Zayed Road",
    lat: 25.2,
    lon: 55.27,
    top: "30%",
    left: "4%",
  },
  {
    country: "Thailand",
    city: "Bangkok",
    address: "ITF Tower, Silom",
    lat: 13.75,
    lon: 100.5,
    top: "72%",
    left: "18%",
  },
];

export function GlobeFigure() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phiRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let width = canvas.offsetWidth;
    const onResize = () => {
      width = canvas.offsetWidth;
      globe.update({ width: width * 2, height: width * 2 });
    };

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 18000,
      mapBrightness: 5,
      baseColor: [0.024, 0.369, 0.227],
      markerColor: [0.85, 0.4, 0.3],
      glowColor: [0.96, 0.94, 0.84],
      opacity: 1,
      markers: OFFICES.map((o) => ({ location: [o.lat, o.lon], size: 0.07 })),
    });

    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      phiRef.current += 0.0035;
      globe.update({ phi: phiRef.current });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [mounted]);

  return (
    <div className="relative w-full max-w-[640px] mx-auto aspect-square">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", contain: "layout paint size" }}
        aria-hidden
      />

      {OFFICES.map((o) => (
        <div
          key={o.country}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[var(--color-paper)]/95 backdrop-blur-sm border border-[var(--color-line)] px-4 py-3 shadow-[0_8px_24px_-12px_rgba(19,19,19,0.25)] pointer-events-none"
          style={{ top: o.top, left: o.left }}
        >
          <div className="text-[13px] tracking-[-0.005em] text-[var(--color-ink)]" style={{ fontWeight: 600 }}>
            {o.country}
          </div>
          <div className="text-[12px] text-[var(--color-ink-subtle)] mt-0.5">{o.city}</div>
          <div className="text-[12px] text-[var(--color-ink-subtle)]">{o.address}</div>
        </div>
      ))}
    </div>
  );
}
