# Fashol — Rebuild Progress

**Last updated:** 2026-04-19 (evening)
**Working directory:** `/Users/ashikpw/Desktop/Ag Doc/fashol website redesign/website V2`
**Live site:** `http://localhost:3000` (run `cd site && npm run dev`)

---

## 1 · What's been done

### Scaffold & stack
- Project scaffolded at [`site/`](site/) — Next.js 16.2.4 (App Router, Turbopack), React 19.2, TypeScript, Tailwind v4, Framer Motion, `@iconify/react`.
- Fonts wired via `next/font/google`: Plus Jakarta Sans (display, primary), Geist Mono (retained for editorial tables/stat figures), Hind Siliguri (Bengali).
- Design tokens in [`site/src/app/globals.css`](site/src/app/globals.css) **now aligned to Fashol brand guidelines** (see §5 Brand colors).

### All 22 routes live
`/`, `/about`, `/services`, `/career`, `/contact`, `/case-study`, `/data`, `/news`, `/news/news-1` … `/news/news-10`, `/bn` (Bengali home), `/privacy`, `/terms`, `not-found` (404).

Production build passes with 24 statically-rendered routes (`npm run build`).

### Components
- **UI**: [`Button`](site/src/components/ui/Button.tsx), [`Eyebrow`](site/src/components/ui/Eyebrow.tsx), [`Section`](site/src/components/ui/Section.tsx), [`Reveal`](site/src/components/ui/Reveal.tsx) (self-unmounts after first animation to reduce layer count).
- **Site**: [`Nav`](site/src/components/site/Nav.tsx) (Voiceflow-style floating pill, see §4 Nav), [`Footer`](site/src/components/site/Footer.tsx), [`PageHeader`](site/src/components/site/PageHeader.tsx), [`Accordion`](site/src/components/site/Accordion.tsx), [`LogoMarquee`](site/src/components/site/LogoMarquee.tsx), [`Figure`](site/src/components/site/Figure.tsx), [`StatCard`](site/src/components/site/StatCard.tsx), [`PlatformSection`](site/src/components/site/PlatformSection.tsx) (4-product bento: Jogaan, Hyperfarm, Banijjo, CropCash, with Hyperfarm/CropCash modals).
- **SVG figures**: [`SupplyChain`](site/src/components/figures/SupplyChain.tsx) (no longer used on home, kept on disk), [`BangladeshMap`](site/src/components/figures/BangladeshMap.tsx), [`PriceBars`](site/src/components/figures/PriceBars.tsx), [`CropCalendar`](site/src/components/figures/CropCalendar.tsx) (no longer used on home, kept on disk), [`OnboardingCurve`](site/src/components/figures/OnboardingCurve.tsx) (40,120 endpoint), [`OnionPrice`](site/src/components/figures/OnionPrice.tsx), [`RouteEfficiency`](site/src/components/figures/RouteEfficiency.tsx).

### Images & assets
- 69 images from `content-export/assets/images/` copied to [`site/public/images/content/`](site/public/images/content/).
- 1 Pexels image sourced to replace the missing `news-9-orbit.png` — see [`SOURCED_IMAGES.md`](SOURCED_IMAGES.md) and [`MISMATCHED_IMAGES.md`](MISMATCHED_IMAGES.md).
- Oversized images resized to 1920w max with `sips`: `gallery01.jpg` went **18.6 MB → 991 KB**; also `farmer-cabbage`, `sakib-hossain`, `gallery06`, `market-aerial-bd`.
- **New brand assets** in [`site/public/`](site/public/): `fashol-logo-full.png` (full logo = icon + green wordmark) and `fashol-icon-green.png` (icon only, used as favicon).
- **Hero video**: [`site/public/herovideo2.mp4`](site/public/herovideo2.mp4) now plays autoplay/muted/looped as the home-page hero background; static paddy-aerial image is the poster + fallback.

### Scroll-perf overhaul
1. Removed **Lenis** smooth-scroll library entirely.
2. Removed `backdrop-filter: blur` from Nav and hero stat tiles (expensive per-frame compositing).
3. Collapsed `--shadow-layered` from 3 stacked shadows to 1.
4. `Reveal` self-detaches (`onAnimationComplete → setDone(true)`) so the home page stops holding ~91 motion layers forever.
5. Marquee: `content-visibility: auto`; swapped `transition-all` + `grayscale` for `transition-opacity`.

### Hero readability pass (2026-04-18)
- **Removed muddy black text-shadows** on the headline and subhead. Replaced with a layered text-shadow system briefly (deep-green undershadow + creamy paper bloom), then removed entirely in favor of an overlay approach per user direction.
- **Added a glossy brand scrim** between the hero video and the text content (`pointer-events-none`, `absolute inset-0`):
  1. Bottom-anchored deep-green wash (`#065E3A`) — heavy at the floor, tapers up.
  2. Inner creamy "wet glass" bloom in the lower-mid band.
  3. Thin emerald sheen line at the scrim's top edge for the gloss highlight.
- **Iterated overlay density and ceiling**: final stop at `transparent 62%` (caps below the sun in the hero photo, doesn't wash out the sky), with floor at `rgba(6,94,58,1.0)` for max contrast under the stat tiles. Sheen and gloss layers tracked the new ceiling at 50/56/62% and 18/40%.
- **Hero copy anchored to the bottom**: hero copy container switched from `justify-center` to `justify-end pb-4 tablet:pb-6`, so the headline + CTAs sit just above the stat tiles rather than vertically centered.
- **Subhead temporarily commented out** ("Fashol moves perishable produce…") at the user's request — only the headline + CTAs render in the hero copy block now.
- **Body lede color** swapped to creamy paper at 94% (`rgba(255,251,234,0.94)`) for warmer unification with the headline (when it returns).

### Logo grids — partners & investors (2026-04-18)
- Removed `grayscale hover:grayscale-0` and the `opacity-70/80 hover:opacity-100` muting from both the partners grid ([page.tsx:438](site/src/app/page.tsx#L438)) and the investors grid ([page.tsx:448](site/src/app/page.tsx#L448)) on the home page. Logos now render at full color and full opacity by default.

### "As featured in" section pass (2026-04-18)
- **Uniform logo heights**: removed the per-logo `scale` multipliers on the home-page "As featured in" `LogoMarquee` (Prothom Alo 1.35 / Daily Star 1.45 / Tech in Asia 1.2 → all 1.0) so every outlet renders at the same pixel height on one straight baseline. Base height nudged `48 → 44px`.
- **Section height trimmed**: Section block padding overridden from the default `section-y` (`72/96/123px`) down to `!py-[14px] tablet:!py-[21px] desktop:!py-7` (roughly 14/21/28px). Inner `gap-6 → gap-2`. Net section height ≈ 30–35% of the prior version.
- **Transparent logo backgrounds**: AgFunder (`investor02.png`) and Orbit Startups (`investor03.png`) had white rectangles baked in. Stripped white to alpha=0 with a Pillow pass (threshold 240); all four corners verified transparent. Couldn't find clean transparent PNGs online — official AgFunder site now serves a black-only wordmark (no plant), and Orbit rebranded to Orbit Ventures with a white-on-dark SVG — so in-place alpha strip was the pragmatic call. If AgFunder News branding ("AFN" mark) is preferred going forward, source `black-e1742824364136.png` from `agfundernews.com/wp-content/uploads/2025/03/`.

### Home-page structural pass (2026-04-19)

Three whole sections deleted and the section-tone rhythm re-balanced.

- **Deleted: Services summary** ("Six services. One platform. Every stage of the chain.") — six numbered cards + CTA to `/services`. Full services index still lives at `/services`.
- **Deleted: Crop peak calendar** (the sub-block inside Chapter II with "Seven crops. Twelve months." and the `CropCalendarFigure`). Chapter II retains the price-bars evidence + its two CTAs.
- **Deleted: SDG alignment** ("Six of seventeen UN Sustainable Development Goals…"). Six `sdg-0*.jpg` image copies removed from `site/public/images/content/` (originals preserved in `content-export/`).
- **Section tone re-alternation**: with Services, Crop calendar, and SDG gone, Chapter I `surface→paper`, Ops register `paper→surface`, Chapter II `surface→paper`, Founder `paper→surface`. Final flow: ink · paper · surface · paper · surface · paper · surface · paper · ink · paper · ink.
- **Imports pruned** in [page.tsx](site/src/app/page.tsx): `Eyebrow`, `CropCalendarFigure`, `StatCard`, `SupplyChainFigure`, `Figure` (all unused after the deletions / Chapter I rewrite).
- **Em/en dash scrub** across [page.tsx](site/src/app/page.tsx): all `—` and `–` replaced with `-` (hard rule: no em/en dashes anywhere on the home page, incl. section-divider comments and the founder letter's `Most of them add nothing - not cold-chain…`). Arrows (→) and the box-drawing `─` in section comments are preserved.

### Platform section added above Chapter I (2026-04-19)

New [`PlatformSection`](site/src/components/site/PlatformSection.tsx) — 4-product bento ("Jogaan / Hyperfarm / Banijjo / CropCash"). Jogaan is a flagship tile (col-span-6, row-span-2); Hyperfarm and Banijjo are wide tiles; CropCash is full-width at the bottom. Jogaan and Banijjo link out to Google Play. Hyperfarm opens an iOS/Android/Web chooser modal. CropCash opens a 3-field WhatsApp lead form that prefills a message to the Fashol number. Section tone: `surface`. Slotted between "As featured in" and Chapter I.

### Chapter I — figure + copy rewrite (2026-04-19)

- **Headline rewritten**: *"Direct procurement from the farm gate; disciplined delivery to the buyer."* → *"We buy direct from farmers and deliver to the buyer's door."*
- **Body rewritten** to the two-paragraph version that names the four export markets (Dhaka, Singapore, Dubai, Bangkok) and the nine operating districts.
- **Supply-chain visual**: the `SupplyChainFigure` SVG was replaced with a single isometric illustration (`/images/content/card-image-10.png`) inside a `card-plain` container, plus an inline 5-node horizontal key (FARMER → DISTRICT HUB → PLATFORM → LAST MILE → BUYER'S DOOR) with per-node stats (60,000+ growers, 40+ hubs, 24h payout, 1,050+ MT/month, 7,000+ buyers).
- **Stage cards removed** (the three-card Stage 01/02/03 row).
- **Field photo removed** (cabbage-field `Figure` with Adil Ahnaf photo credit).

### Global Capability notch-halo redesign + hero max-height cap (2026-04-19 evening)

Second pass on the Global Capability section - switched from a flat bento grid to a notch-and-halo composition inspired by PromptPal-style cards, and capped the hero image's growth on wide viewports.

- **Globe cleaned, pin callouts made optional** ([Globe.tsx](site/src/components/figures/Globe.tsx)). Added a `showOffices?: boolean` prop (defaults to `true`). When `false`, the four absolute-positioned office callout cards are suppressed and only the rotating canvas sphere renders. The Ops Register still has no globe; only the Global Capability section calls the globe now, and it does so with `showOffices={false}` for a clean sphere.
- **Notch-and-halo composition** ([page.tsx:302-372](site/src/app/page.tsx#L302-L372)). The Global Capability section is now three stacked layers:
  1. A deep-green top panel with an eyebrow (`GLOBAL CAPABILITY`), centered H2, and a one-line subhead. Bottom padding sized precisely so the halo does not overlap text.
  2. A paper-colored `rounded-full` halo disk (`w-[280px] tablet:[340px] desktop:[400px]`) absolutely positioned at the top panel's bottom edge, translated `60%` below. Same color as the section background - punches a visible circular cutout through the green top panel AND the ink bottom tiles at their inner corners, giving the illusion the cards are cut around the globe.
  3. A clean `GlobeFigure` at `z-10` sitting on top of the halo, `w-[260/320/380]`.
- **Three-tile bottom row** (was two). Desktop grid `grid-cols-3`, mobile/tablet single column (a tablet 3-col layout would have let the halo cover the whole middle tile). Each tile uses `p-8 tablet:p-10` (~40px internal padding), `rounded-[32px]`, and a `pt-[190/230/260]` reservation for the globe's protrusion.
  - **OFFICES** tile: big `4` numeral (`64/72/80px`) paired with a `<dl>` city-role directory (`DHAKA - Headquarters and operations`, etc.) replacing the previous plain city list. The old `BANGLADESH · SINGAPORE · UAE · THAILAND` footer line was deleted (duplicated the list).
  - **EXPORT** tile (new, middle slot - sits directly under the globe): headline *"Four corridors out of Dhaka."* + body on air/sea routes and customs handling.
  - **TECHNOLOGY** tile (replaces the previous PLATFORM tile): headline *"The eagle-eye view of your supply."* + body on four-tier grading, cold-chain readings, and the buyer dashboard.
- **Copy refresh on the top panel**: H2 swapped from *"The operation is Bangladeshi. The reach is regional."* to *"We source in Bangladesh. We deliver across the region."*; subhead to *"Four offices run on a single operating system. Every order moves on the same stock, pricing, and settlement engine."* Typography restructured to explicit sizes (`28/38/46px` H2, `14/15/16px` body) with tighter tracking to keep the title zone compact above the halo.
- **Hero image capped** ([page.tsx:14-25](site/src/app/page.tsx#L14-L25)). The hero `Image` had `w-full h-auto` with no max-height, so on viewports wider than ~1440px the image scaled up proportionally and pushed the headline + stat tiles + "As featured in" below the fold. Added `max-h-[520px] tablet:max-h-[560px] desktop:max-h-[600px]` to both the wrapper and the image, plus `object-cover object-center` so the image crops cleanly from the top/bottom when the viewport wants more height than the cap permits. On a 1440×900 viewport the hero now stays at the same visual size as before; on a 1920×1080 or 2K monitor the headline and stats no longer slip past the fold.

### Use Cases card grid, Global Capability section, Ops Register cleanup (2026-04-19 late pm)

Structural rewrite of three home-page sections plus a Globe component extraction.

- **Use Cases rebuilt as a 2x2 card grid** ([page.tsx:229-297](site/src/app/page.tsx#L229-L297)). Replaced the four full-width stripe layout (which had labeled "What they need / What Fashol delivers / The outcome" columns per buyer type) with a tight 2x2 bento of compact cards. Each card: square-to-landscape illustration (`/c1-c4.webp`) → mono number tag (01-04) → display title → 2-sentence body → terracotta accent "standout" line. Cards iterated twice — first full-size (`aspect-square` image, `t-h3` title, `p-6 tablet:p-8`), then shrunk to roughly half-height on user request (`aspect-[2/1]`, `t-h5`, `t-body-sm`, `p-4 tablet:p-5`). Headline unchanged ("Four kinds of buyers. One platform, built around each."), body paragraph tightened to one sentence naming the pillar. Grid collapses to single column below `desktop`.
- **Operations Register globe removed and restructured** ([page.tsx:167](site/src/app/page.tsx#L167)). The 3-column layout (globe + at-a-glance stats + hub footprint) is now a clean 2-column split (`col-span-5` stats + `col-span-7` hub table). Globe extracted untouched for reuse in the new Global Capability section below.
- **Globe component updated** ([Globe.tsx](site/src/components/figures/Globe.tsx)). Added a fourth office pin for Thailand (Bangkok · ITF Tower, Silom · lat 13.75 / lon 100.5 · positioned at top: 72% / left: 18%). Made the `phone` field optional and removed it from the rendered callout cards — the new spec only asks for Country / City / Location. "DIFC, Sheikh Zayed Rd" expanded to "DIFC, Sheikh Zayed Road".
- **Global Capability section added** ([page.tsx:300](site/src/app/page.tsx#L300)). New paper-tone section titled "The operation is Bangladeshi. The reach is regional." with a bento grid: full-width globe tile on top (headline "Four countries. One operating system." + the extracted `GlobeFigure`) and three stat tiles below — OFFICES (4 · Dhaka/Singapore/Dubai/Bangkok), EXPORT ("Grade A, ready for retail"), PLATFORM ("One system. Every market."). Each sub-tile: thin `var(--color-line)` border, rounded-2xl, min-h-[220px].
- **Section order swapped** ([page.tsx:229, 300](site/src/app/page.tsx#L229)). On user request, Use Cases now precedes Global Capability. Final flow in this region: Ops Register (surface) → Use Cases (surface) → Global Capability (paper) → Founder Letter (surface). Ops + Use Cases share `surface` tone but their layouts (dense stats list + hub table vs. 2x2 card grid) are visually distinct enough that the tone match doesn't blur the boundary.
- **`cobe` dependency added** to [site/package.json](site/package.json) for the WebGL globe.
- **New image assets** in [`site/public/`](site/public/): `c1.webp`, `c2.webp`, `c3.webp`, `c4.webp` (isometric illustrations for each buyer type).
- No em-dashes or en-dashes anywhere in [page.tsx](site/src/app/page.tsx) or [Globe.tsx](site/src/components/figures/Globe.tsx). Single-hyphen rule enforced end-to-end. `npx tsc --noEmit` passes clean.

### Hero — complete rebuild around a static illustration (2026-04-19)

The video-hero is gone. Replaced with a single isometric illustration + stacked editorial content.

- **Video + poster swap → single static photo**: removed `<video src="/herovideo11.mp4">` and the bottom-anchored deep-green scrim overlay. The hero is now a single `<Image src="/h10.png" width={1920} height={815}>` in normal flow with `w-full h-auto` (no `fill`, no `object-cover` crop). Image iterated through many generations (illustrations h1-h7, then photography h8-h10); h10 is the current photograph at native 1920×815. Old `herovideo10.mp4` and `herovideo11.mp4` deleted; `herovideo*.mp4` gitignored.
- **Stacked layout** (no aspect-locked frame): image → headline block (H1 + CTAs, pulled up via negative margin) → stat tiles row. No more absolute-positioned content overlaying the image.
- **H1**: deep-green (`var(--color-deep-green)`), centered, `max-w-[900px]`, overridden from `t-hero` default (clamp 40-72) to `!text-[30px] tablet:!text-[44px] desktop:!text-[56px]`. 56px on desktop is intentionally larger than any other font on the home page (next-biggest is `t-h2` at 48px max), so the hero H1 is the visual anchor for the whole page.
- **CTAs**: primary lime pill (`Partner with Fashol`) + secondary outlined pill (`Read the data →`) with deep-green text + deep-green border. Both shrunk to `!h-10 !px-5 !text-[13px]`. Centered row on tablet+, stacked column on mobile.
- **Stat tiles**: compacted — `rounded-xl` border, `px-3 py-2 tablet:px-4 tablet:py-2.5` padding, figures `text-[17px] tablet:text-[22px]`, cream semi-opaque background (`rgba(255,251,234,0.92)`) with deep-green figures and ink-subtle labels. Grid stays 2-col mobile / 4-col desktop.
- **Section bg**: flat cream (`var(--color-paper)`). The existing deep-green scrim from the video era is gone.
- **Cream fade at image floor + pulled-up headline**: the headline block is pulled up into the image's bottom with `-mt-24 tablet:-mt-32 desktop:-mt-40` (96/128/160px). A cream gradient sits at the image floor (`h-[150px] tablet:h-[190px] desktop:h-[230px]`) fading from solid `var(--color-paper)` (0→75%) to transparent at the top, so the H1 sits in a fully opaque cream band while the image's upper two-thirds remain visible untouched. This technique brings the stat cards up so all four land at the ~800-900px viewport fold on a standard laptop without cropping the image itself.
- **Headline block**: `container-page text-center relative z-10 pt-0 pb-4 -mt-24 tablet:-mt-32 desktop:-mt-40 tablet:pb-5`. `z-10` keeps text above the gradient.
- **Stat tiles padding**: `pb-5 tablet:pb-6`.
- **Viewport math at 1440×900**: image renders at 611px, headline pulled up 160px (overlaps the fade), stats row below. Total hero ≈ 730-760px, leaving room above the fold for "As featured in" to peek in.
- **Nav text color**: unchanged (`var(--color-ink-subtle)` = near-black with green bias). Already readable over the cream hero and the photo's upper portion.

### "As featured in" moved directly under the hero (2026-04-18 pm)
- **Removed "The full network" partner marquee** that sat between the hero and "Chapter I — The argument" ([page.tsx:102-111](site/src/app/page.tsx#L102-L111), old). This was the Kiam / AsiaTech / Upay / Dutch-Bangla Bank / Syngenta / Foodpanda strip driven by `PARTNERS`.
- **Promoted the "As featured in" press-logo band** (Forbes, Prothom Alo, Daily Star, Tech in Asia, Business Standard, AgFunder, Orbit Startups, Dhaka Tribune, Financial Express, UNB, Daily Observer, Future Startup) from its previous position between SDG alignment and the Join CTA into that slot — directly under the hero.
- Preserved the condensed padding (`!py-[14px] tablet:!py-[21px] desktop:!py-7`) and per-logo `scale` overrides for uneven-baseline outlets (Dhaka Tribune 0.55 / Financial Express 0.4 / AgFunder 1.45 etc.).
- Dropped the now-unused `Link` import from [page.tsx](site/src/app/page.tsx). `PARTNERS` is still imported and used in the Trust-register grid further down; nothing else broke. `npx tsc --noEmit` passes clean.

### Home-page iterations (from user feedback)
- **Masthead strip** ("Issue 001 · Friday …") **deleted** across all 13 pages. Component file deleted.
- **"Latest news" 3-card section** on home → replaced with a **10-logo "Featured in" grid** (Forbes, Prothom Alo, Daily Star, Tech in Asia, Business Standard, AgFunder, Orbit Startups, Daily Sun, Foodpanda, SOSV). Each links to the article.
- **Hero** now **exactly viewport-height** (`h-svh`, with internal `pt-[72px] tablet:pt-[96px]`), `flex flex-col justify-between` — headline+lede+CTAs centred, 4 stat tiles anchored to the floor.
- **Stat tiles**: reduced to 4 (Farmers / Hubs / Waste cut / Food loss prevented). `Pre-seed raised` and `Cycle time` removed.
- **"A supply chain for" eyebrow** and **"At a glance — The register, 2026" eyebrow** + `Audited quarterly →` link: removed.
- **`Fig. 01 — Rice paddies…` caption** and all other `Fig. NN` labels: removed across every editorial page.
- **§ NN · ০N — LABEL eyebrows** (§ 06 Trust register, § 07 SDG alignment, etc.) and the two `Chapter I — § …` / `Chapter II — § …` eyebrows: removed. Kept only where `§ NN` is the actual H2 heading (privacy / terms).
- **Trust-register eyebrows** (Partners — 20 of record / Investors — 05 of record / In the press — selected / Trust register · 20 of record): removed.
- **Farmer count updated from 25,000+ → 40,000+** everywhere: hero headline, stat tiles, About lede and specs, timeline, services specs, data narrative, onboarding curve endpoint (now **40,120 · Apr 2026**, y-axis max 40k), Bengali home, SEO title.

### Navigation (Voiceflow-style) — now in place
- Full-width fixed nav at top, with **three separate groups at Y=0** (floating over the content):
  1. **Logo** — standalone `fashol-logo-full.png` in its own faint frosted chip.
  2. **Center pill** — nav links (`Overview / About / Services / News / Career / Contact`; no `01 / 02 …` numeric prefixes) in a frosted pill with `backdrop-filter: blur(24px)`, dual-layer off-white tint.
  3. **Right CTAs** — standalone `বাংলা ↗` link (own chip) + lime "Partner with Fashol" pill.
- **On scroll > 24px**: outer container shrinks from 1360px → 880px max-width, morphs into a single **unified frosted pill** (300ms cubic-bezier). Individual chip backgrounds fade out so they merge cleanly into the outer shell.
- **Typography**: Plus Jakarta Sans 13px medium (not mono) — same font as the "Partner with Fashol" button.
- **Hover indicator**: 4px terracotta/orange dot slides in on the left of each nav link; label nudges 2px right.
- **Readability over the dark hero video**: every chip (logo, center pill, বাংলা) has `rgba(255,255,255,0.78)` + dual-layer tint for high contrast against the dark paddy video.
- **Mobile**: hamburger reveals an inline dark dropdown card (`#262626` bg, `#404040` border) — Voiceflow pattern.

### Brand colors — swapped from Aeline to Fashol
Overwrote all accent tokens in [`globals.css`](site/src/app/globals.css) to match the Fashol brand guidelines. Details in §5 below and in memory at [`memory/brand_colors.md`](~/.claude/projects/-Users-ashikpw-Desktop-Ag-Doc-fashol-website-redesign-website-V2/memory/brand_colors.md).

---

## 2 · What's happening now

Home page has been restructured around a single-photo hero and a 12-section stacked flow: Hero · Featured in · Platform · Chapter I · Operations register · Use Cases (four buyer types) · Global Capability (rotating globe + offices) · Founder letter · Principles · Voice from the field · Trust register · Join. Services summary, crop-peak calendar, and SDG alignment are all gone. Chapter I's SVG supply-chain figure was replaced with an isometric illustration plus a 5-node stats key. A new `PlatformSection` sits between Featured in and Chapter I with four products (Jogaan, Hyperfarm, Banijjo, CropCash). Hero is a single 1920×815 photo (`h10.png`); the H1 block is pulled up into the image's lower portion via negative margin, with a cream fade gradient at the image floor acting as a soft mask so deep-green headline text reads cleanly against the image. Hero subhead is still commented out; commit history preserves it if the user wants it back.

A content-strategy brief lives at [`HOME_CONTENT_BRIEF.md`](HOME_CONTENT_BRIEF.md) — a snapshot of the home page's copy, voice rules, and known copy-debt for future copywriting work in a fresh chat.

---

## 3 · User directions (durable, apply going forward)

### Content
- **Never rewrite or "improve" copy.** Use the exact text from `content-export/pages/*.md` verbatim.
- **Don't invent content.** No lorem ipsum, no placeholder text.
- **Preserve the stale dates** on privacy/terms ("Last updated 2024.12") — flagged for legal review, not to be silently updated.
- **Preserve the composite farmer disclaimer** on `/case-study`.
- **Farmer count is 40,000+** (updated from 25,000+). Don't regress.

### Design / layout
- **Keep the site uncluttered.** Remove visually redundant or overlapping copy aggressively. Strip editorial furniture (Fig. NN labels, § NN section markers, "X of record" eyebrows) unless the label IS the direct headline.
- **Hero sections must fit exactly within the viewport** — no more, no less. Use `100svh` (small viewport height) to avoid mobile-browser-chrome clipping.
- **Simpler is better.** When a section feels text-heavy, prefer a logo grid / single image / tight eyebrow-and-cta over a multi-card layout.
- **Nav is Voiceflow-style**: three separate floating groups at Y=0 (logo / center pill / CTAs) that merge into a single shrinking frosted pill on scroll. Never revert to a full-width solid bar.
- **No white band under the nav.** Content (hero, page headers) must flow under the floating pill, not sit in a separate padded strip. Each page owns its own top clearance (typically `pt-[112px] tablet:pt-[144px]` on `PageHeader`).
- **No black text-shadows for readability over photos/video.** Use a brand-color overlay/scrim instead (deep-green is the workhorse; emerald/creamy paper for sheen). Black drop shadows look muddy on warm imagery — green is the optical complement and reads cleaner.

### Typography
- **Body/headline font**: Plus Jakarta Sans (primary display).
- **Nav text**: Plus Jakarta Sans — **not** Geist Mono. Secondary font (Geist Mono) is retained only for editorial tables, tabular stat figures, and data captions.
- **Bengali**: Hind Siliguri.

### Brand colors — see §5. Never hardcode hex; always use CSS tokens.

### Performance
- **Scroll perf is non-negotiable.** No smooth-scroll libraries. No `backdrop-filter: blur` stacked over large hero images. Single soft shadow only (no layered 3-stop shadows).
- **Reveal wrappers must self-detach** after their first animation.
- **Resize oversized images at source.** Never ship 5000px+ sources expecting Next/Image to save you.

### Images
- Track every external image in [`SOURCED_IMAGES.md`](SOURCED_IMAGES.md) with URL, credit, license, usage. Never hotlink.
- When a PR/content image doesn't fit aesthetically, log in [`MISMATCHED_IMAGES.md`](MISMATCHED_IMAGES.md) and source a replacement from Pexels (Unsplash fallback).
- **Logo usage**: `fashol-logo-full.png` whenever the full logo is needed as one image; `fashol-icon-green.png` when only the icon is required (favicon, compact marks).

### Framework notes
- **This is Next.js 16** — not the Next you may know from training data. Check `site/node_modules/next/dist/docs/` before writing new code. Key breaking changes: `params` and `searchParams` are Promises (`await props.params`); React 19's `JSX` namespace must be accessed as `React.JSX.IntrinsicElements`.

---

## 4 · Nav anatomy (reference)

Two states driven by `scrolled = window.scrollY > 24`:

**At Y=0** — outer wrapper is transparent. Three groups float independently with their own faint frosted chips:
- Logo chip: `border border-[rgba(19,19,19,0.06)]` + `backdrop-blur-[24px]` + `bg-[rgba(255,255,255,0.78)]` + warm tint overlay.
- Center pill: same treatment, wraps the 6 nav links.
- `বাংলা ↗` chip: same treatment.
- `Partner with Fashol`: solid emerald pill button (no frosted chip — it's a CTA).

**On scroll** — outer container animates (`320ms cubic-bezier(0.22,1,0.36,1)`) to `max-w-[880px]`, `rounded-full`, gains its own frosted bg + border + shadow. Individual chip backgrounds fade to `opacity: 0` so they visually merge into the single outer pill.

**Hover indicator**: `4px` terracotta dot on the left of each nav link, `opacity: 0 → 1` on `:hover` / `active`. Label nudges `translate-x-[2px]`.

**Mobile**: hamburger toggle reveals a **dark inline dropdown card** (`#262626` bg, `#404040` border, rounded-2xl) — not a full-screen overlay.

---

## 5 · Brand colors (Fashol guideline)

All tokens live in [`site/src/app/globals.css`](site/src/app/globals.css). Full spec also in memory at [`brand_colors.md`](~/.claude/projects/-Users-ashikpw-Desktop-Ag-Doc-fashol-website-redesign-website-V2/memory/brand_colors.md).

| Role | Token | Hex | Usage |
|---|---|---|---|
| Deep Green (primary brand) | `--color-deep-green` | `#065E3A` | Logo, brand statements, key headlines, branded borders |
| Emerald Green (vibrancy) | `--color-emerald` · `--color-lime` (alias) | `#13C171` | Primary CTA, inline highlight accents |
| Creamy White (balance) | `--color-paper` · `--color-grain` (alias) | `#FFFBEA` | Page background, light sections |
| Yellow (secondary) | `--color-sun` | `#FFD12C` | Pattern / graphic elements, highlight fills |
| Orange (secondary) | `--color-orange` · `--color-terracotta` (alias) | `#FF6740` | Warm accents, hover dots, chart callouts |
| Deep Black (anchor) | `--color-ink` | `#000000` | Dark sections (hero, footer), high-contrast text on cream |
| Near-black text | `--color-ink-subtle` | `#0F1A12` | Body copy (slight green bias for readability on cream) |

**Usage proportions (per brand pie chart):**
- ~50% primary greens
- ~25% secondary (orange + yellow)
- ~15% green tints/shades
- ~10% creamy white

**Rules:**
1. Never hardcode hex anywhere — always reference the CSS variables.
2. CTAs default to emerald bg + black text + black border.
3. Dark sections use `#000000`, not any charcoal.
4. Body text uses `ink-subtle` (#0F1A12), not pure black.
5. No blues/purples. Warm pair (orange + yellow) only.

---

## 6 · Known items still open (flagged for the user)

1. **Scoreboard drift across the home page**: hero tiles say 60,000 farmers / 7,000 buyers / 15,000+ MT / 4+ countries, but the ops-register table footer still reads 40+ hubs / 40,000+ farmers / ~1,050 MT, the ops-register H2 still says "Forty-plus hubs," and the founder-letter paragraph 3 still opens with "We are 40,000 farmers, 40-plus hubs, 26 percent less waste." The copy in each of those places is deliberately preserved (do-not-rewrite rule) and needs a copy-strategy pass — see [`HOME_CONTENT_BRIEF.md`](HOME_CONTENT_BRIEF.md) §6.
2. **Farmer-count gap**: hero claims 60,000+; district-wise ops-register table sums to ~25,620. The page doesn't reconcile the difference (registered vs. active, nine-district vs. national).
3. **"4+ Countries" not enumerated**: the page names Bangladesh, Singapore, UAE/Dubai, and Bangkok across scattered places but never lists all four in a single line under the hero.
4. **Hero subhead commented out** at [page.tsx:31](site/src/app/page.tsx#L31) — three-line pitch awaiting a rewrite or a decision to drop entirely.
5. **`news-2` and `news-5` share the same hero image** (`news-5-dhakatribune.jpeg`) — preserved from content export; consider a unique hero per article before launch.
6. **`news-6` uses generic `warehouse.jpg`** — replace when a DITECH-partnership-specific photo is available.
7. **`gallery08.jpeg` and `gallery09.jpeg`** sit in `public/images/content/` but aren't referenced on any page.
8. **Legal dates** on privacy/terms: "Last updated 2024.12" — flagged for legal review.
9. **Case-study composite farmer**: "Md. Rafiqul Islam" is a composite; a verified single-farmer case should replace before launch.
10. **Cross-page scoreboard harmonisation**: `/about`, `/data`, `/services`, `/layout.tsx` SEO still reference old numbers in places. Out of scope for home-page work but affects narrative consistency.
11. **Indentation hygiene**: a UTF-8 recovery pass during editorial cleanup collapsed some 2-space indents to 1-space in a handful of files. TypeScript doesn't care but a `prettier --write` run would normalize them.
12. **Benign Turbopack warning** at build: two package-lock.json files detected. Silence by setting `turbopack.root` in `site/next.config.ts` if desired.
13. **Unused hero-image candidates** in `site/public/`: `h1.jpg`, `h2.jpg`, `h3.png` — early alternates kept on disk but not referenced anywhere. Delete when you're sure you won't revisit.
14. **Orphaned webp/component assets**: `SupplyChain.tsx` and `CropCalendar.tsx` are still on disk but no longer imported on the home page. Left in place for reuse elsewhere.
