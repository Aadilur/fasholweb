import Image from "next/image";

type Logo = { src: string; alt: string; ratio?: number; scale?: number; href?: string };

export function LogoMarquee({
  logos,
  height = 36,
  colored = false,
}: {
  logos: Logo[];
  height?: number;
  colored?: boolean;
}) {
  const doubled = [...logos, ...logos];
  const itemClass = colored
    ? "shrink-0"
    : "shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-200";
  return (
    <div className="marquee py-6">
      <div className="marquee-track">
        {doubled.map((l, i) => {
          const h = Math.round(height * (l.scale ?? 1));
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
            <div key={i} className={itemClass} style={{ height: h }}>
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
