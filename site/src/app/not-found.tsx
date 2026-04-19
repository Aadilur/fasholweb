import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
 return (
 <><Section tone="paper">
 <div className="pt-[112px] tablet:pt-[144px] pb-16 tablet:pb-28">
 <Eyebrow>Error 404</Eyebrow>
 <h1 className="t-hero mt-8" style={{ fontSize: "clamp(80px, 14vw, 180px)" }}>404.</h1>
 <p className="t-h3 mt-8 max-w-2xl">The page you requested is not in the index.</p>
 <div className="mt-12">
 <Button variant="primary" href="/">Return to overview</Button>
 </div>
 </div>
 </Section>
 </>
 );
}
