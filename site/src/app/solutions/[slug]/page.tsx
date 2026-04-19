import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SOLUTIONS_MENU, allItems, findMenuItem } from "@/data/nav";

export function generateStaticParams() {
  return allItems(SOLUTIONS_MENU).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findMenuItem(SOLUTIONS_MENU, slug);
  if (!item) return { title: "Solution" };
  return {
    title: item.name,
    description: item.description,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findMenuItem(SOLUTIONS_MENU, slug);
  if (!item) notFound();

  return (
    <Section tone="paper">
      <div className="pt-[112px] tablet:pt-[144px] pb-16 tablet:pb-24">
        <Eyebrow>Solutions / {item.name}</Eyebrow>
        <h1 className="t-hero mt-6">Coming soon.</h1>
        <p className="t-body-lg mt-6 max-w-2xl">{item.description}</p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button variant="primary" href="/contact">
            Partner with Fashol
          </Button>
          <Link href="/solutions" className="link-arrow">
            All solutions
          </Link>
        </div>
      </div>
    </Section>
  );
}
