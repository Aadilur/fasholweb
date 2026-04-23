# Fashol — Rebuild Progress

**Last updated:** 2026-04-23
**Working directory:** `/Users/ashikpw/Desktop/Ag Doc/fashol website redesign/website V2`
**Live site:** `http://localhost:3000` (run `cd site && npm run dev`)

---

## 2026-04-23 - Agri machinery suppliers solutions page

Shipped `/solutions/agri-machinery-suppliers` for foreign brand distributors, local importers, and regional sales heads of tractors/tillers/pumps/threshers. Dual-path angle: sell outright or finance via Myfarm. The financing side is the actual unlock for Bangladesh farmer demographics where machinery cash-purchase is out of reach.

### Hero
- Full-bleed `/agmahero.jpg` at `h-[94vh] min-h-[720px]` (20% taller than the standard 78vh/600px after an explicit bump). Built with the forest-green left-to-right gradient overlay per brief, then stripped per feedback — photo renders unmodified.
- Hero text flipped from cream to ink (black). Nav logo kept green — this path was added to [DARK_HERO_PATHS](site/src/components/site/Nav.tsx) during initial build, then removed after the text-color flip.
- H1 shrunk 20% to `45/58/70px` (from the standard 56/72/88).
- Content wrapper changed to `justify-end` globally with `pb-[108px] tablet:pb-[124px] desktop:pb-[140px]` — accumulated +60px vertical shift (20+40) via two successive "push above" iterations.
- Subhead cut 76% (50 words → 12): "Tractors, tillers, pumps, threshers. Sell them or finance them through Myfarm."
- Stats use a discriminated `number | text` union — `60,000+` and `50 districts` count up on viewport entry; `Sell or finance` fades in as static text.

### Section 3 — Hinge (ink, phrase-only)
- `LetterSpaceReveal` 0.08em → 0em over 1200ms on "From a small fraction to the full network." Caption fades 400ms after. No count-up since the figure is phrasal.

### Section 4 — Four claims bento (SIGNATURE SECTION, `surface-deep`)
- Same six-card pattern as Retailers / Importers. Added optional `cardBg` field to `ClaimCard` so each claim card can match its image's median edge color — needed because supplied illustrations had baked-in cream backgrounds at different tones (no alpha channel).
- Claim card images iterated heavily: `/claim-{01..03}.png` placeholders → `/agma{1..3}.png` → PIL alpha-channel background-removal (reversed after user flagged quality loss — RGB was intact, reversed via alpha-drop) → `/agma4.png` for Card 1 → `/agma5.png`/`/agma6.png` for Cards 2/4 with per-card `cardBg` (#F8EBDB / #F9EEDE / #F7EAD9 sampled from image edge medians) → finally stripped to text-only for the whole bento.
- Grid-level `[--card-bg:#F8EBDB]` override covers the proof/closing cards; per-card `cardBg` on claim cards is retained in the data for quick re-enable.
- Closing card extended with optional `ctaLabel`/`ctaHref` for inline green link ("Talk to Fashol's agri-machinery team" → `/contact`).
- Proof card scales: Myfarm (`md`), Spare parts (`sm`), 40+ hubs (`lg`).

### Section 5 — Powered by Jogaan + Myfarm (paper, 2-up grid)
- `myfarm.png` source (1024×1024) had ~80% empty transparent padding (content rows 378-576 only). Cropped in-place to 912×221 via PIL to the content bbox plus 6% margin — logo matches Jogaan's ~4:1 aspect naturally.
- Logos use `logoHeightClass?: string` override on `ProductCard`. Jogaan default `h-10 tablet:h-12`; Myfarm currently at `h-[120px] tablet:h-[144px]` (3×) per latest iteration.
- Cards stretch to equal row height via `h-full`; CTA anchored bottom via `mt-auto pt-6` so CTAs align across cards.

### Section 6 — Editorial statement (ink, no attribution)
- Replaces the pull-quote pattern. `LetterSpaceReveal as="p"` — full-opacity cream, 0.08em → 0em over 800ms. Max-width 900px, `clamp(22px, 3vw, 44px)`, line-height 1.4.
- Copy cut 71% (59 words → 17): "Not limited by what farmers want. Limited by what they can pay. Fashol and Myfarm close the gap."

### Files
- **New**: [site/src/app/solutions/agri-machinery-suppliers/page.tsx](site/src/app/solutions/agri-machinery-suppliers/page.tsx), `site/public/agmahero.jpg`, `site/public/agma{1..6}.png`.
- **Modified**: `site/public/myfarm.png` (cropped 1024×1024 → 912×221), [Nav.tsx DARK_HERO_PATHS](site/src/components/site/Nav.tsx) (added then removed).

---

## 2026-04-23 - Agri input suppliers solutions page

Shipped `/solutions/agri-input-suppliers` for seed/fertilizer/pesticide/feed suppliers. The angle is direct farmer reach via Jogaan's 60,000-farmer network, bypassing the dealer chain.

### Hero
- Full-bleed `/aginhero.jpg` at `h-[78vh] min-h-[600px]`. Forest-green gradient overlay included initially per brief, later removed per feedback. Nav logo in cream via [DARK_HERO_PATHS](site/src/components/site/Nav.tsx).
- Subhead cut 71% (49 words → 14): "Seeds, pesticides, fertilizers, feed, straight to the farmer. No dealer layers, no margin lost."
- Stat row introduces a mixed pattern: `60,000+` (CountUp comma + "+"), `50 districts` (CountUp 50 + static " districts" tail), `40+ hubs` (CountUp 40 + "+" suffix + " hubs" tail). The tail-text pattern solves "count up only the number, keep the unit label static."

### Section 3 — Hinge (ink, count-up inside letter-spacing)
- "**60,000** farmers, one platform." — `CountUp` (0 → 60,000 over 1200ms) nested inside `LetterSpaceReveal` (0.06em → 0em over 1000ms). Same dual-animation pattern as the Exporters hinge. Caption fades 300ms later.

### Section 4 — Four claims bento (SIGNATURE SECTION, `surface-deep`)
- Standard six-card bento. Mono tags ("CLAIM 01/02/03", "PROOF POINT") and section eyebrow rendered initially then removed per feedback (same cleanup pattern as Retailers). `tag` field removed from `ClaimCard`/`ProofCard`.
- Claim illustrations: `/agin1.png`, `/agin2.png`, `/agin3.png`. Proofs: "40+" (lg), "Myfarm" (md). Closing: "The dealer was the best option. There is a better one now."

### Section 5 — Powered by Jogaan (paper, single centered card)
- Unlike Importers (2-up Banijjo + Hyperfarm), this page centers a single Jogaan card at max-width 500px.
- Logo started at `h-20 tablet:h-24` — cut in half per feedback to `h-10 tablet:h-12`.
- Render-quality fix: declared `width={1000} height={248}` (real source dims — was `1024×1024` with square aspect forced, which made Next/Image pick an undersized variant), `sizes="256px"` (was "60px" — too small for the retina-doubled render width), `quality={95}`. These three together resolved the blurry appearance.

### Section 6 — Pull quote (ink)
- Standard `QuoteReveal` letter-spacing ease-in. Rezaul Karim, Head of Distribution, fertilizer manufacturer, Dhaka.

### Files
- **New**: [site/src/app/solutions/agri-input-suppliers/page.tsx](site/src/app/solutions/agri-input-suppliers/page.tsx), `site/public/aginhero.jpg`, `site/public/agin{1,2,3}.png`.
- **Modified**: [Nav.tsx DARK_HERO_PATHS](site/src/components/site/Nav.tsx).

---

## 2026-04-23 - Importers solutions page

Shipped `/solutions/importers` for produce importers bringing foreign product into Bangladesh (fruits, onions, dates, spices). Angle: distribution-side — "the import side is yours, the distribution side is ours" — Fashol absorbs landed container volume into the downstream buyer network within one delivery cycle.

### Hero
- Full-bleed `/imhero.jpg` at `h-[78vh] min-h-[600px]`. Forest-green overlay added initially then removed per feedback. Nav logo in cream via [DARK_HERO_PATHS](site/src/components/site/Nav.tsx).
- Three hero stats all numeric: `7,000+`, `400+`, `400+` — per spec (mudi shops / restaurants / supershop outlets).
- Subhead cut 52% (46 words → 22) in one follow-up: "The import side is yours. The distribution side is ours. Once produce lands in Bangladesh, Fashol moves it through the country's largest downstream network."

### Section 3 — Hinge (ink, phrase with letter-spacing)
- "One container. One delivery cycle." — `LetterSpaceReveal` 0.08em → 0em over 1000ms. Caption via `DelayedFade` 300ms later. No count-up.

### Section 4 — Four claims bento (SIGNATURE SECTION, `surface-deep`)
- Standard six-card bento. Mono tags ("CLAIM 01/02/03", "PROOF POINT") and "WHAT FASHOL TAKES OFF AN IMPORTER'S PLATE" eyebrow rendered then removed per the same feedback pattern. `tag` field removed from both card types.
- Claim illustrations: `/im1.png`, `/im2.png`, `/im3.png`. Proofs: "Full container" (sm — phrase-length), "Same-day" (md). Closing: "Your volume lands once. It moves everywhere."

### Section 5 — Powered by Banijjo + Hyperfarm (paper, 2-up grid)
- First two-product "Powered by" section in a solutions page. Importers use Banijjo for wholesale trade settlement and Hyperfarm for demand visibility. Logos render in native brand colors (Banijjo orange, Hyperfarm violet), no `mix-blend-multiply`.

### Section 6 — Pull quote (ink)
- `QuoteReveal` letter-spacing ease-in. Farhan Chowdhury, Director, fresh produce import, Chittagong.

### Files
- **New**: [site/src/app/solutions/importers/page.tsx](site/src/app/solutions/importers/page.tsx), `site/public/imhero.jpg`, `site/public/im{1,2,3}.png`.
- **Modified**: [Nav.tsx DARK_HERO_PATHS](site/src/components/site/Nav.tsx).

---

## 2026-04-23 - Retailers solutions page

Shipped `/solutions/retailers` for single-location mudi shop owners. Same 9-section skeleton as Supershops, tuned for the "skip the 4 AM market run" emotional angle rather than margin or scale.

### Hero
- Full-bleed `/rehero.jpg` at `h-[90vh] min-h-[600px]`. No gradient overlay (mirrors Supershops / Commission agents treatment). H1 "Retailers." + stat row + `TalkToSalesButton`. All hero text cream (`var(--color-paper)`) for readability on the photo.
- Subhead iterated from a 39-word paragraph down to 14 words (65% shorter per brief): "Fresh produce at your shop before 6 AM. Wholesale prices. No minimum order."
- Stats: `7,000+` (CountUp, comma format) / "Before 6 AM" / "Grade matched".
- Registered `/solutions/retailers` in [Nav DARK_HERO_PATHS](site/src/components/site/Nav.tsx#L35) so the logo switches to cream.

### Section 3 — Ink hinge (phrase, not number)
- Unlike the other solutions pages, the hinge is the phrase **"No minimum order."** not a number. Uses `LetterSpaceReveal` with `startSpacing="0.08em"` → `0em` over 1000ms. Caption fades in via `DelayedFade` 300ms later.

### Section 4 — Four claims bento (SIGNATURE SECTION, `surface-deep`)
- Same structural layout as Supershops (4-col desktop, 2-col tablet, 1-col mobile; row-1 wide-wide, row-2 1-2-1, row-3 full). Six cards: three illustrated claims, two proof points, one closing statement.
- Proof card display scale expanded with a third `sm` variant (`clamp(24px, 2.6vw, 36px)`, lineHeight 1.15) for the "Cash on delivery" phrase — longer-than-a-number but shorter-than-a-sentence type.
- Mono tags (`CLAIM 01/02/03`, `PROOF POINT`) and Section 4 eyebrow `"WHAT FASHOL BRINGS TO A MUDI SHOP"` were rendered initially then pulled per feedback. Removed `tag` field from `ClaimCard` / `ProofCard` types, deleted the `CardTag` component, and tightened reserved top padding.
- Illustrations: `/re1.png` (claim 1), `/re3.png` (claim 2, swapped after review), `/re2.png` (claim 3, swapped after review).

### Section 5 — Powered by Hyperfarm (not Banijjo)
- Initially built with Banijjo per brief, corrected to Hyperfarm after user flagged. `h-20 tablet:h-24` logo from `/images/content/hyperfarm-logo.png`. Copy leads with "The buyer procurement desk." followed by the WhatsApp/phone/app ordering workflow. Link to `/products/hyperfarm`.

### Section 7 — How it starts
- Four step cards framing a WhatsApp-first onboarding: message → next-morning delivery → daily/weekly orders → "your sleep back." CTA: "Message Fashol's mudi shop team" (not "Talk to...") to match the WhatsApp tone.

### Files
- **New**: [site/src/app/solutions/retailers/page.tsx](site/src/app/solutions/retailers/page.tsx), `site/public/rehero.jpg`, `site/public/re{1,2,3}.png`.
- **Modified**: [Nav.tsx DARK_HERO_PATHS](site/src/components/site/Nav.tsx#L35).

---

## 2026-04-23 - Supershops solutions page

Shipped `/solutions/supershops` targeting supershop chain procurement teams and CFOs. Margin-protection lead angle with named customer credibility: Shwapno, Meena Bazar, Agora, Daily Shopping.

### Hero
- Full-bleed `/sshero.jpg` at `h-[90vh] min-h-[600px]`. Built with forest-green gradient overlay first, then iterated: subhead paragraph removed, green overlay stripped, hero text went black → back to cream. Final state: no overlay, cream text, nav logo in cream via [DARK_HERO_PATHS](site/src/components/site/Nav.tsx#L34).
- Stats: "Shwapno. Meena Bazar. Agora. Daily Shopping." (running on Fashol) / `400+ outlets` (CountUp) / "Daily delivery".

### Section 3 — Ink hinge "Up to 18%"
- Standard numeric hinge. `CountUp to={18}` over 1000ms, `sessionKey="supershops-hinge-18"`. Caption fades 300ms later.

### Section 4 — Four claims bento (SIGNATURE SECTION, `surface-deep`)
- First build of the "four-claims bento" pattern that carried over to Retailers. Six-card grid: two 2-col claim cards (01-02), then 1-2-1 (proof · claim 03 · proof), then a 4-col closing row.
- Inline discriminated union `ClaimCard | ProofCard | ClosingCard` rendered by `BentoCardView`. Stagger fade via `StaggerChildren`/`StaggerItem` at 80ms, y={20}.
- Proof card `displayScale: "lg" | "md"` (Retailers later added `"sm"` for the phrase case).
- Claim illustrations: `/claim1.png`, `/claim2.png`, `/claim3.png` at public root. `publicFileExists` (`fs.existsSync`) checks for each asset; dashed cream placeholders render if missing.
- Clipping fix: "1,000+" display at the original `clamp(56px, 6vw, 88px)` overflowed the 1-col slot. Tightened to `clamp(40px, 4.4vw, 64px)` and matched across both proof cards for visual balance.

### Section 5 — Powered by Hyperfarm
- `h-20 tablet:h-24` Hyperfarm logo, buyer-procurement-desk framing, link to `/products/hyperfarm`. Section tone iterated paper → surface-deep → paper during feedback.

### Files
- **New**: [site/src/app/solutions/supershops/page.tsx](site/src/app/solutions/supershops/page.tsx), `site/public/sshero.jpg`, `site/public/claim{1,2,3}.png`.
- **Modified**: [Nav.tsx DARK_HERO_PATHS](site/src/components/site/Nav.tsx#L34).

---

## 2026-04-23 - Commission agents solutions page + generational dual-bento

Shipped `/solutions/commission-agents` for second-generation arotdars taking over a family wholesale trade. Generational emotional register — respecting what the family built while extending it with Banijjo. Signature section went through the heaviest iteration of any solutions page to date.

### Hero
- Full-bleed `/cahero.jpg` at `h-[90vh] min-h-[600px]`. Built with forest-green gradient → subhead removed → green overlay stripped → text went black → back to cream → nav logo cream (final). H1 "Commission agents." + stats row + `TalkToSalesButton`. Hero subhead paragraph is intentionally absent; the stat row carries the context.
- Hero top padding corrected to match Farmers — height bumped from 80vh to 90vh so the H1 sits at the same vertical position relative to the nav.

### Section 4 — Signature section (the long story)
- **Attempt 1**: `GenerationalSplit` component — two-column list of operational dimensions ("Your father's arot." / "Your arot, on Banijjo."), six paired rows with muted/full opacity. Scroll-driven row reveal, right-column 250ms delay, drawing center line via `scaleY(var(--line-progress))` scroll listener, hover tint, closing line letter-spacing reveal. Five animation layers.
- **Attempt 2 (current)**: [`GenerationalBento`](site/src/components/site/GenerationalBento.tsx) replaces the split. Dual-bento side-by-side: **Without Fashol** (left, muted) vs **With Fashol** (right, confident). Six dimension cards per side in asymmetric bento layouts (left: wide-2-2-wide, right: 2-wide-2-wide). Closing line "Same arot. Two arots." with letter-spacing ease.
- Visual contrast pushed hard: Without-Fashol side uses grey-token text colors (ink-muted / ink-soft) on surface-deep card backgrounds, no borders, flat embedded feel. With-Fashol side uses full-opacity deep-green at weight 500 on paper card backgrounds with a soft `0 1px 3px rgba(0,0,0,0.06)` shadow.
- "WITH FASHOL" text label → Fashol icon (`/fashol-icon-green.png`) after multiple iterations. Icon pulled left with `-ml-2 tablet:-ml-3` + `object-left` to compensate for PNG internal whitespace; padding reduced 50%, icon size +50%.
- Section tone churned between paper and surface-deep; landed on `surface-deep` with the two halves providing internal visual differentiation.
- Scroll cascade: single container-level `IntersectionObserver` triggers everything. Delay ladder: `DELAY_LEFT_LABEL=200`, `DELAY_LEFT_CARDS=400`, `DELAY_RIGHT_LABEL=1400`, `DELAY_RIGHT_CARDS=1600`, `DELAY_CLOSING=2600`. 80ms card stagger, 400ms per-card reveal, 800ms letter-spacing on closing.

### Other section iterations
- Section 5 "Powered by Banijjo" tone cycled paper → surface-deep → paper → surface-deep several times per feedback.
- Sections 4 and 5 both ended at `surface-deep`; ink pull quote between them breaks up adjacency.

### Files
- **New**: [site/src/app/solutions/commission-agents/page.tsx](site/src/app/solutions/commission-agents/page.tsx), [site/src/components/site/GenerationalBento.tsx](site/src/components/site/GenerationalBento.tsx), `site/public/cahero.jpg`.
- **Intermediate (deleted)**: `GenerationalSplit.tsx` (replaced by GenerationalBento after the signature-section direction changed).
- **Modified**: [Nav.tsx DARK_HERO_PATHS](site/src/components/site/Nav.tsx#L33).

---

## 2026-04-22 - Quick commerce solutions page

Shipped `/solutions/quick-commerce`, replacing the `[slug]` "Coming soon." placeholder with a full editorial page. Same structure and design tokens as Wholesalers / Farmers / Restaurants / Exporters, tailored for Foodpanda / Chaldal / Foodie-style dark-store operators. Nine sections with the three-tone rhythm (paper → ink hinge → surface bento → paper → ink pull-quote → surface steps → paper related).

### Hero — photo-driven, ink text over the raw image
- Full-bleed `/qchero1.jpg` at `h-[90vh] min-h-[600px]` (matches every other solutions hero). Section carries a `backgroundColor: var(--color-deep-green)` fallback so the frame holds while the image decodes.
- **No gradient overlay** (iterated: forest-green wash → stronger left wash → removed per feedback). The raw photo reads as the hero; legibility comes from text color choice instead.
- **All hero text is ink-black** rather than cream (one-off for this page — the rider photo has enough light areas on the left that black actually reads better than paper). H1 at `!text-[var(--color-ink)]`, subhead at `rgba(0,0,0,0.8)`, stat values at `ink`, stat labels at `rgba(0,0,0,0.7)`.
- **Fashol logo stays green** over this hero. `/solutions/quick-commerce` is intentionally **not** in `DARK_HERO_PATHS` in [Nav.tsx:26-31](site/src/components/site/Nav.tsx#L26-L31) (was added, then removed once the overlay was stripped and the text went black).
- **H1 "Quick commerce."** uses `tablet:whitespace-nowrap` and the content wrap is `max-w-[820px]` (vs. the sibling pages' `max-w-[640px]`) so the two-word title stays on one line at tablet+ — otherwise the centered content block grew too tall and pushed up against the nav. On mobile it wraps naturally.
- Subhead trimmed to two sentences (45 → 25 words) after a copy pass: "Fill rate that holds, scale for festival surges, and wholesale prices that do not move mid-shift. Fashol keeps Dhaka's dark stores full, every order."
- Stats row uses text-only pills (no CountUp): "Foodpanda. Chaldal. Foodie." / "Thousands of SKUs" / "Same-day" — each with a secondary caption underneath. `TalkToSalesButton` as the primary CTA.

### Section 2 — Problem (paper, two-col with photo)
- H2 "Fresh produce is where quick commerce fulfillment breaks." on the left column with `/qc4.jpg` (1200×800) placed under it using the Restaurants photo pattern (`w-full h-auto block`, `sizes="(min-width: 1200px) 520px, 100vw"`, fade-in via `Reveal delay={0.2} y={0}`). The original spec called for no image; flipped during review.
- Right column: three paragraphs walking the failure mode (2 PM listing → 3 PM doorstep, stockouts, spot-price volatility), ending with "Quick commerce needs a supply partner that treats fresh produce like a warehouse SKU — predictable, priced, delivered."

### Section 3 — Ink hinge "Above 95%"
- Same hinge shape as the other solutions pages (`tone="ink"`, display numeral + caption). "Above " prefix static, `CountUp to={95}` triggers on viewport enter with `sessionKey="quick-commerce-hinge-95"`, "%" suffix static. Caption fades in via `DelayedFade` 300ms after the number.

### Section 4 — Three-promises bento (SIGNATURE SECTION, `surface-deep`)
- 4-column desktop grid (`min-[900px]:grid-cols-2 desktop:grid-cols-4 gap-5`) with `[grid-auto-flow:dense]` so narrow cards pack into free cells cleanly at tablet sizes.
- Five promise/stat cards + a full-width Card 6 closing statement. Cards render on `var(--card-bg)` which on `surface-deep` sections resolves to `--color-card-raised` (#FAF6E4) — visibly lifts off the cream surface.
- **Card layout** (after the "Promise 01/02/03/Proof Point" mono tags were pulled per feedback): illustration (no maxWidth cap after the last round, so `qc1/qc2/qc3.png` now expand to the full card inner width at `aspectRatio: 4 / 3`), then a shared heading + body below. Heading `clamp(26px, 2.8vw, 38px)` and body `15px` are now **unified across every promise and stat card**; the earlier split (`clamp(40px, 4vw, 56px)` for pure-number stats, `clamp(24px, 2.4vw, 32px)` for phrase stats) was collapsed to one scale per user call. `displaySize` discriminator removed from `PromiseCardData` once it was no longer needed.
- Card 6: centered closer statement "Treated like a warehouse SKU. Priced like one. Delivered like one." at `clamp(28px, 3.6vw, 52px)`, deep-green, 56px vertical padding. Kept intentionally larger than the five upper cards — it's the section seal, not a peer card.
- Scroll-in: `StaggerChildren` at `stagger={0.08}`, `y={20}`, default 500ms. Respects `prefers-reduced-motion`.

### Section 5 — Powered by (paper, single Hyperfarm card)
- Centered card at `max-w-[500px]`. Logo pulled from `/images/content/hyperfarm-logo.png` at native violet (no filter). Copy: "The buyer procurement desk. Quick commerce operators use Hyperfarm to forecast demand, order daily, track fulfillment, and reconcile same-day settlement." Link-arrow to `/products/hyperfarm`.

### Section 6 — Ink pull quote
- `QuoteReveal` letter-spacing ease-in. Attribution: Nabila Rahman, Category Manager, Fresh Produce, Foodpanda Bangladesh. No silhouette avatar.

### Section 7 — How it starts (`surface-deep`, four step cards)
- Two-column header + four-step row. "Twenty-four hours from forecast shared to first dark-store delivery." Steps: forecast call → SKU mapping on Hyperfarm → first dark store live the next morning → full-network rollout in the following days. Bottom CTA link-arrow to `/contact`.

### Section 8 — Related (paper, three cards)
- Restaurants · Supershops · Wholesalers. All land on existing `/solutions/*` routes.

### Assets added
- `/qchero1.jpg` — hero photo (food delivery rider in Dhaka traffic).
- `/qc1.png`, `/qc2.png`, `/qc3.png` — isometric illustrations for the three promise cards (dark-store interior, bar-chart surge, pricing dashboard with price tag).
- `/qc4.jpg` — supporting photo for the problem section (1200×800).

### Iteration log (what moved during the session)
1. Hero height 80vh → 90vh after the first screenshot showed "Quick" jammed against the nav (centered-content block was too tall for 80vh given the wrapping two-word H1).
2. H1 `max-w-[640px]` → `max-w-[820px]` + `tablet:whitespace-nowrap` to unwrap "Quick commerce." onto one line at tablet+ and bring the centered vertical position back in line with sibling pages.
3. Hero subhead shortened from four sentences (45 words) to two (25 words).
4. Hero gradient iterated forest-green → stronger left wash → **removed**; text went from cream → black.
5. Fashol nav logo: added path to `DARK_HERO_PATHS` for cream variant, then reverted once the hero went light-ish and black text took over.
6. Bento "1,000+" at `clamp(..., 88px)` was clipping outside the 1-col card (`~197px` inner vs. `~330px` text width). Clamps tightened first (`56px` / `32px`), then unified across all five cards to one scale.
7. Illustration maxWidth of 320px was capping `qc1/2/3.png` at a fixed size inside span-2 cards (~520px wide). Removed so images fill the inner card width at 4:3.
8. Mono tags ("PROMISE 01/02/03", "PROOF POINT") removed from every card; `tag` field dropped from `PromiseCardData` and the reserved top-margin that held space for them (`mt-10 tablet:mt-12`) was stripped.

### Files
- **New**: [site/src/app/solutions/quick-commerce/page.tsx](site/src/app/solutions/quick-commerce/page.tsx), `site/public/qc{1,2,3}.png`, `site/public/qc4.jpg`, `site/public/qchero1.jpg`.
- **Untouched**: `Nav.tsx` (add + remove cancelled out), shared components, other solutions pages.

---

## 2026-04-21 latest - Exporters solutions page + reusable Talk-to-sales CTA

Shipped `/solutions/exporters` with a bespoke **sticky Journey scroll** section and introduced a **reusable `TalkToSalesButton`** component used across the page and meant to replace ad-hoc CTAs site-wide.

### JourneyStickyScroll — sticky photo panel + scrolling 12-stop bento
- New component at [JourneyStickyScroll.tsx](site/src/components/site/JourneyStickyScroll.tsx). Desktop splits 45% / 55%: the left photo panel is `sticky top-8` while the right column scrolls through 4 phases × 3 stops each (Inquiry, Sourcing, Processing, Delivery).
- Phase detection via `IntersectionObserver` with `rootMargin: "-30% 0px -40% 0px"` picks the phase whose mid-point is closest to the viewport mid — drives the 4-segment progress bar on the sticky panel.
- Phase headings fade in via `Reveal`; stop cards use framer-motion `whileInView` with a 0.2s delay so the number glyph doesn't pop before the body copy lands. Each card is a fixed-height (220px desktop) two-column layout: oversized display numeral (180px, `clipPath: "inset(0 0 24% 0)"` to trim descenders) + headline/body.
- Left panel: hero photo `journey3.jpg` (1350×1800, mozjpeg q78, 477KB — down from a 3.1MB 2845×3793 source). Content stack goes top→bottom: "Journey." h2 at `clamp(72px, 10vw, 120px)`, a 74%-wide progress bar indented by `clamp(28px, 4.2vw, 52px)` (visually aligned with the "O" in Journey), then a 36-letter subtitle "RFQ to retail shelf in twelve precise stops." The CTA pins to the bottom of the panel via `justify-between`.

### TalkToSalesButton — reusable CTA
- New component at [TalkToSalesButton.tsx](site/src/components/site/TalkToSalesButton.tsx). Calendly URL and label are exported as constants so future call sites don't duplicate strings.
- Structure matches the Uiverse "cssbuttons-io" pattern: pill-shaped anchor with an absolute-positioned cream icon box on the right that expands to `calc(100% - 0.6em)` on hover (arrow slides, icon square morphs into a full-width "press" bar). Style defined in [globals.css:274-327](site/src/app/globals.css#L274-L327) under `.tts-btn` / `.tts-icon`.
- Colors: deep-green background `#065E3A` with white text (matches the brand forest-green, passes contrast on the image hero and on paper backgrounds). Icon box stays cream with a deep-green arrow. `!important` set on bg/color because prior iterations showed Tailwind utility specificity fighting the plain class.
- Opens Calendly (`https://calendly.com/sakibhossain`) in a new tab via `target="_blank" rel="noopener noreferrer"`.

### Exporters page structure ([page.tsx](site/src/app/solutions/exporters/page.tsx))
- **Hero**: full-bleed `/images/solutions/exporters/hero.jpg` with stacked overlays. Dark-ink horizontal wash + deep-green vertical gradient to keep left-column text legible. H1 "Exporters." at 56/72/88px, subtitle pulled up to `mt-2` (was `mt-6`), stats row `mt-[17px] tablet:mt-[25px]` (was `mt-8/10`), CTA `mt-[9px] tablet:mt-[17px]`. Stats: 60,000+ farmers · 4 regional corridors · 24/7 buyer desk.
- **Nav**: added `/solutions/exporters` to `DARK_HERO_PATHS` in [Nav.tsx:29](site/src/components/site/Nav.tsx#L29) for light-on-dark nav tokens over the hero.
- Sections follow the farmers/restaurants template: problem → hinge → four-reason benefit grid → Hyperfarm product block → testimonial → **Journey** (replaces the old "How it starts" 4-step section — removed along with its `STEPS` constant) → related roles (Importers, Wholesalers, Commission agents).

### Iteration highlights
- "How it starts" section was deleted mid-iteration and its CTA absorbed into the Journey sticky panel — then moved out of the panel, back in, and finally styled as the reusable `TalkToSalesButton` (which also replaced the hero Button). The button went through ~10 visual revisions (compact pill → frosted glass → lime/cream → `.tts-btn` with expanding icon). Net: one canonical CTA across the page, driven from one component.
- Subtitle under "Journey." was iterated against letter-count targets (43 → 38 → 35 → 36 letters) to match the width of the progress bar below it.

### Assets
- `/images/solutions/exporters/journey3.jpg` — hero sticky-panel photo, optimized from 3.1MB → 477KB.
- `/images/solutions/exporters/journey.jpg`, `/images/solutions/exporters/i3.jpg` — legacy/other-section photos.

---

## 2026-04-21 later - Restaurants stat label fix

First hero stat's caption was wrapping to two lines and breaking the stat-row rhythm. Shortened from "Restaurants, including Domino's Pizza" → "Restaurants including Domino's" — comma dropped, "Pizza" dropped (Domino's reads unambiguously in this context). Figure and other two stats untouched.

---

## 2026-04-21 - Restaurants solutions page

Shipped the Restaurants page under `/solutions/restaurants`, following the farmers-page template (hero → problem → hinge → benefits → product → testimonial → how it starts → related).

### Hero — pink overlay + dark ink underwash
- Full-bleed photo (`/images/solutions/restaurants/shero2.jpg`) with two stacked overlays on tablet+:
  - **z-5 ink wash** `rgba(19,19,19, 0.5 → 0.35 → 0)` across 0 → 30 → 60%. Added after the first pass — pink alone let bright ceiling highlights bleed through and washed out the paragraph text. The ink layer lifts contrast on the left without muddying the brand colour.
  - **z-10 pink gradient** `rgba(254,1,134, 0.9 → 0.7 → 0.2 → 0)` across 0 → 45 → 70 → 100%, matching the stop shape of the farmers-page deep-green gradient.
- Mobile: single top-to-bottom stack of the same two gradients (no `tablet:` branch).
- **Hero stats** use a `HeroStat` discriminated union — `kind: "number"` routes through `CountUp`, `kind: "text"` uses a `LetterSpaceReveal`-less `Reveal`. Stats: 400+ (Restaurants, incl. Domino's Pizza) · 5AM (Morning delivery starts) · Dhaka (Every corner).
- Nav: added `/solutions/restaurants` to `DARK_HERO_PATHS` in [Nav.tsx:27](site/src/components/site/Nav.tsx#L27) so the nav flips to light-on-dark tokens over this hero.

### Section 2 — "You run the kitchen. We run procurement."
- Paired-clause headline that frames the division-of-labor value prop before the body walks through the historical problem (4 AM Karwan Bazar runs, unposted rates, inconsistent grading, 10+ suppliers per restaurant).
- Supporting photo `/i2.webp` (1600×1627, from [The Business Standard](https://www.tbsnews.net/features/pursuit/cook-your-career-perfection-chef-788626)) placed in the left column with the farmers-page pattern (`w-full h-auto block`, `sizes="(min-width: 1200px) 520px, 100vw"`). 10px `ink-muted` credit line below the image links to the source to cover copyright attribution.

### Section 3 — "8 days a week" hinge
- Same sage dot-pattern panel as the farmers-page hinge (`#D4DDC5` base, `#B8C4A5` radial-gradient dots at 9px grid).
- Switched from an initial `LetterSpaceReveal("Eight days a week")` to the farmers-style `CountUp → 8` + " days a week" so the two hinges across solutions pages share one visual language. Subcopy: "A procurement team spends roughly one full workday per week on the wholesale market run. Fashol gives that day back."

### Section 4 — Benefits (4 cards)
- Fixed prices · Hub grading · One supplier · Owner-visible dashboard.
- `StaggerChildren` / `StaggerItem` at 0.12s stagger, 2-col on tablet+. Placeholder grain tiles stand in for imagery until illustrations are commissioned.

### Section 5 — Powered by (single-product block, farmers-style)
- Re-skinned from a text-heading card to the farmers-page "two products behind this work" treatment:
  - Layout: `grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16` with one populated cell — the empty right column reads as deliberate typographic negative space rather than a centered floater.
  - Logo: `/hyperfarm%20logo.png` (1024×1024) at `h-20 tablet:h-24 self-start`, with `mix-blend-multiply` so the source PNG's white canvas blends into the paper bg (avoided rewriting the asset to transparent).
- Descriptor: "The buyer's procurement desk. Order, grade, cold-chain fulfillment, and settlement on one platform." CTA `link-arrow` → `/products/hyperfarm`.

### Section 6 — Testimonial (orange hinge)
- Same orange dot-pattern treatment as farmers (`#FFE0C4` / `#FFAF85` at 9px grid). No avatar — quote from Tanvir Ahmed, chef-owner of a six-branch Dhaka group. Display-type blockquote, ink text.

### Section 7 — "24 Hours from sign up to the first kitchen delivery."
- Four process steps: sign up, map produce list, place order, receive by morning. 4-col on desktop, stacked on mobile.
- Headline uses the digit "24 Hours" (not the spelled-out "Twenty-four hours") to match the hero's tabular-stat style, and "kitchen delivery" instead of "kitchen order" — the copy is framed around what the restaurant *receives*, not what they submit.

### Section 8 — Related roles
- Supershops · Quick commerce · Commission agents. Standard three-card cross-sell grid in grain bg with `link-arrow` CTAs.

### Reveal helper

Added `LetterSpaceReveal` to [Reveal.tsx:145-184](site/src/components/ui/Reveal.tsx#L145-L184) when the page was scaffolded (used in the hinge's first iteration). After the hinge was swapped to `CountUp`, it's currently unused — retained as a general-purpose motion helper.

### Assets
- `/i2.webp` — kitchen photo, TBS source credited inline.
- `/images/solutions/restaurants/shero2.jpg` — hero photo.
- `/hyperfarm logo.png` — existing asset, first on-site usage.

---

## 2026-04-20 late - Nav dropdown redesign + mobile drawer rebuild + farmers page polish

### Desktop Products dropdown — 2×2 logo grid

The Products column of the nav dropdown no longer lists product names as text. Each of the four products (Jogaan / Hyperfarm / Banijjo / Myfarm) now renders as a logo tile in a 2×2 grid ([NavDropdown.tsx:61-111](site/src/components/site/NavDropdown.tsx#L61-L111)).

- **Tile aspect**: `aspect-[2/1]` (cards are shorter than tall).
- **Logo sizing**: each logo fills 80% of the tile via `w-[80%] h-[80%] object-contain`, then a per-brand `transform: scale(...)` is layered on to normalise the visual weight across logos that have different amounts of built-in whitespace. Scales: Jogaan `0.8`, Hyperfarm `1.15`, Banijjo `2.0`, Myfarm `1.485`. Stored in `PRODUCT_LOGOS` in [nav.ts](site/src/data/nav.ts) so mobile and desktop share the same values.
- **Card state**: default `bg-[rgba(19,19,19,0.06)]` (the site-standard hover grey), active/hovered tile shifts to `bg-white`. No border, no glow, no icon-color shift on hover. Default state is the grey, hover → white is the "reveal" pattern.
- **Active = pre-selected** — the Products dropdown pre-selects the first item (Jogaan) so the right preview panel has content to show on open. That same tile now also reads as the "active" tile (white bg) so the user can see which card the right panel corresponds to.

### Right preview panel rework (Products only)

- **Removed** the product name heading (`{activeItem.name}`) from the right preview panel.
- **Promoted** the descriptor (e.g. "The buyer's procurement desk.") into the h3/heading slot.
- **Added an invisible `t-eyebrow mb-4` spacer** at the top of the right column so the preview image aligns horizontally with the top of the tile grid (matches the left column's `PRODUCTS` eyebrow offset).
- Solutions dropdown right panel unchanged — still name + description + Learn more.

### Logo optimisation

Source PNGs shrunk via `sips -Z`:
- `jogaanlogo.png`: 3668×909 → **1000×248**, 60.8 KB → **40.3 KB** (−34%). Also updated `width`/`height` props in [farmers/page.tsx:356-357](site/src/app/solutions/farmers/page.tsx#L356-L357) to match new intrinsic dimensions so Next's srcset pipeline stays accurate.
- `myfarm.png`: 4267×4267 → **1024×1024**, 123.7 KB → **36.2 KB** (−71%). Huge win; the source had a massive square canvas with most of it transparent whitespace.
- Banijjo + Hyperfarm already 1024×1024 and small (~22–32 KB), left alone.

### Mobile nav restructure

The mobile drawer used to live inside the morphing nav container. When the drawer opened, the container grew tall, inherited `rounded-full`, and rendered as a giant vertical capsule with `backdrop-blur-[24px]` bleeding across the full screen (the "big blurry circle" bug). The drawer itself also rendered below the frosted `<span>` in the stacking order, so its dark-ink background was obscured.

Full restructure ([Nav.tsx:342-467](site/src/components/site/Nav.tsx#L342-L467)):

- **Drawer extracted** from inside the morphing container. Now renders as a **separate card below the nav bar**, still inside the fixed `<header>`.
- **Drawer styling mirrors the desktop dropdown**: `bg-[var(--color-paper)]` (cream), `rounded-2xl`, no border, `shadow-[0_20px_48px_-16px_rgba(0,0,0,0.18)]` (same shadow token as the desktop dropdown card).
- **Drawer width** matches the nav bar's responsive width: `w-[calc(100%-16px)] tablet:w-[calc(100%-40px)] max-w-[880px]`.
- **`open` removed from the morph condition** — the nav bar pill's appearance is now independent of drawer state. Only `scrolled` triggers the pill morph.
- **Products in mobile drawer** uses the same 2×2 logo grid pattern (shares `PRODUCT_LOGOS` via nav.ts).
- **Solutions in mobile drawer** switched from single-column to `grid grid-cols-2 gap-x-4` so the 8-item Buyers group (plus Suppliers / Partners / Financial) fits without excessive scroll.
- **`MobileLink` re-themed** for light bg: ink text tokens instead of paper/rgba cream.
- **Backdrop-blur** on the outer frosted `<span>` applied responsively: the blur stays confined to the nav bar pill's `rounded-full` region (no longer bleeds outside on mobile since the drawer is a separate element).

### Farmers page testimonial — orange dot-pattern

Section 6 "In their words" ([farmers/page.tsx:398-443](site/src/app/solutions/farmers/page.tsx#L398-L443)) swapped from `tone="ink"` (solid dark green) to a custom `<section>` matching the hinge-section treatment: base color + radial-gradient dot pattern. Palette changed from sage (hinge) to brand orange:

- Base: `#FFE0C4` (warm pale orange)
- Dots: `#FFAF85` at 1.5px / 9px grid
- Text inverted to `var(--color-ink)` for quote + name, `rgba(19,19,19,0.6)` for the role caption (mirrors the hinge's `rgba(6,94,58,0.75)` muted treatment, just in the ink colorway for the lighter bg).

### Farmers page hero — Sell with Fashol CTA

Added an `<on-dark>` variant Button below the stats row, linking to the Jogaan Play Store (`https://play.google.com/store/apps/details?id=com.fashol.agent`). Reveal delay `0.36` so the CTA fades in after the stat counters finish animating. Spacing `mt-8 tablet:mt-10` — tighter than the stats-to-paragraph gap (`mt-12`) so the button reads as part of the stats/action block rather than a separate section.

### Refactors

- `PRODUCT_LOGOS` **extracted to [nav.ts](site/src/data/nav.ts)** as exported constant. Both [NavDropdown.tsx](site/src/components/site/NavDropdown.tsx) (desktop) and [Nav.tsx](site/src/components/site/Nav.tsx) (mobile) now import the same source of truth.

### Abandoned experiments (not in final)

- **FasholIcon inline-SVG component** with 1-cycle clockwise spin animation on hover — added to "Learn more" CTAs in the RELATED section on farmers page. Reverted at user's request; the component file and associated `@keyframes fashol-spin` in globals.css were deleted.

---

## 2026-04-20 - CropCash renamed to Myfarm site-wide

Complete product name change from CropCash to Myfarm. The product's role and positioning are unchanged — still supply chain financing, still launching 2026. Only the name is different.

### Scope

Case-insensitive rename across the entire repo:
- `CropCash` → `Myfarm`
- `cropcash` → `myfarm` (slugs, href fragments, anchor ids, modal keys)
- `CROPCASH` → `MYFARM` (eyebrow label on home page)

### Route change

`/products/cropcash` → `/products/myfarm`. The dynamic `[slug]` route at [products/[slug]/page.tsx](site/src/app/products/[slug]/page.tsx) reads from [`nav.ts`](site/src/data/nav.ts), so updating the slug there was enough — no page-file move needed. Footer Platform anchor `#platform-cropcash` → `#platform-myfarm` at [Footer.tsx](site/src/components/site/Footer.tsx).

### File rename

[`CropCashRegister.tsx`](site/src/components/site/MyfarmRegister.tsx) → `MyfarmRegister.tsx`. Component, internal `CropCashModal`, and the named export all renamed. WhatsApp message prefill text and modal `aria-label` updated. Import in [`farmers/page.tsx`](site/src/app/solutions/farmers/page.tsx) updated.

### Content edits

- [`PlatformSection.tsx`](site/src/components/site/PlatformSection.tsx): tile 04 name + body, `ModalKey` type union, `CropCashModal` → `MyfarmModal`, `openModal === "cropcash"` check, intro paragraph reference.
- [`ProductStack.tsx`](site/src/components/figures/ProductStack.tsx): `BOTTOM_BOX` name, aria-label, SVG comment markers.
- [`page.tsx`](site/src/app/page.tsx) home: Farmer Value card 04 eyebrow and body.
- [`products/page.tsx`](site/src/app/products/page.tsx): metadata description, BLOCKS[3] (name / body / href / linkLabel), hero subhead, stack-diagram caption.
- [`solutions/page.tsx`](site/src/app/solutions/page.tsx): agri-machinery-suppliers description.
- [`solutions/farmers/page.tsx`](site/src/app/solutions/farmers/page.tsx): tile 04 body, Image alt, component reference.
- [`nav.ts`](site/src/data/nav.ts): Products menu 4th item (slug, href, name) and agri-machinery-suppliers descriptor.

### Did not change

- Other product names (Jogaan, Hyperfarm, Banijjo).
- The product's role or positioning — still supply chain financing, still launching 2026.
- Any layout, tokens, or component structure.
- No redirect added for `/products/cropcash` (not required; no public bookmarks existed).

### Verified

Case-insensitive grep for `CropCash | cropcash | CROPCASH` across `site/src/` and repo root returns zero matches. Stale prerendered artifacts at `site/.next/server/app/products/cropcash.*` are gitignored and will clear on the next build.

---

## 2026-04-20 late - Hero eyebrow removal + H2 alignment fix

Two structural cleanup passes across the Products and Solutions page trees. All changes are layout-only; no copy, no tokens, no animation rewrites.

### Fix 1 - Hero eyebrows removed

Stripped the narrating kicker above each hero H1 so the title is now the first element inside the hero. Hero top padding (`pt-[64px] tablet:pt-[88px]`) is preserved on every page so the hero doesn't collapse vertically; the H1 simply moves up into the vertical position the eyebrow used to occupy. H1's `mt-6` (which had been spacing it from the eyebrow) was also removed. Reveal animation delays on H1 and following body copy were shifted up one step (`0.08 → 0`, `0.16 → 0.08`, `0.24 → 0.16`) so the H1 is now the first-to-animate element and doesn't sit idle for 80ms.

- **Farmers page** ([solutions/farmers/page.tsx](site/src/app/solutions/farmers/page.tsx)): `SUPPLIERS` eyebrow removed from the left column of the hero. H1 *"Farmers."* is now flush with the hero top padding.
- **Solutions hub** ([solutions/page.tsx](site/src/app/solutions/page.tsx)): `SOLUTIONS` eyebrow removed. H1 *"One supply chain. Every role on it."* moved up.
- **Products hub** ([products/page.tsx](site/src/app/products/page.tsx)): `PRODUCTS` eyebrow removed. H1 *"Four products. One operating system."* moved up.
- **Stakeholder placeholder template** ([solutions/[slug]/page.tsx](site/src/app/solutions/[slug]/page.tsx)): `<Eyebrow>Solutions / {item.name}</Eyebrow>` removed from the "Coming soon" hero. The import is pruned. This template renders every stakeholder slug under `/solutions/*` that doesn't yet have its own page, so this one edit covers all of them.
- **Product placeholder template** ([products/[slug]/page.tsx](site/src/app/products/[slug]/page.tsx)): same treatment - `<Eyebrow>Products / {item.name}</Eyebrow>` removed, import pruned.

### Fix 2 - Leftover `mt-6` on H2s where section eyebrows were previously removed

Prior edits removed narrating eyebrows from several section headers (WHAT WE DO FOR FARMERS, POWERED BY, THE TRADITIONAL CHAIN, GETTING ON THE PLATFORM, IN THEIR WORDS, OTHER ROLES ON THE CHAIN, HOW IT FITS TOGETHER, THE COMMON STACK). The H2s in those sections kept a `mt-6` that had been positioning them below the (now gone) eyebrow, which left the H2 sitting visibly lower than the first line of the right-column intro paragraph in the same two-column row. Removed the `mt-6` so the H2 and the right-column paragraph now both start at the top of their columns and align to the same baseline.

- **Farmers page** five sections: problem, what-we-do, powered-by, how-it-starts, other-roles - all `<Reveal as="h2" className="t-h2 mt-6">` → `<Reveal as="h2" className="t-h2">` (single `replace_all` Edit since the pattern was identical across all five).
- **Products hub** stack-diagram section H2: `t-h2 mt-6 max-w-[880px]` → `t-h2 max-w-[880px]`.
- **Solutions hub** common-stack section: the leftover `mt-6` was on the **grid container** (`<div className="grid desktop:grid-cols-12 gap-10 desktop:gap-16 mt-6">`), not on the H2 itself, because the eyebrow in that section had lived outside the grid. Grid's `mt-6` removed.

### Did not change

- Copy, layout structure, Section tones, or Reveal stagger patterns beyond the delay shift-up noted above.
- Nav dropdowns (column-group eyebrows there are groupers, not narrators).
- Home-page section eyebrows (FARMER VALUE, THE PLATFORM, etc.) which categorise sections on a dense single-page nav.
- Trust register eyebrows (PARTNERS / INVESTORS) which label two distinct logo sets.
- Products hub CTA band - `WORK WITH FASHOL` eyebrow stays and its H2 keeps `mt-6` because the eyebrow is still there.
- Footer.

### Verified

- `npx tsc --noEmit` clean - no new type errors, no broken imports after pruning `Eyebrow` from the two placeholder templates.

---

## 2026-04-20 evening - Products hub page

Replaced the `/products` "Coming soon" placeholder with a full five-section editorial hub, mirroring the Solutions hub's structural rhythm.

### New page ([products/page.tsx](site/src/app/products/page.tsx))

Single-file server component, five sections stacked:

1. **Hero** (`tone="ink"`): `PRODUCTS` eyebrow, H1 *"Four products. One operating system."*, one-paragraph subhead naming Jogaan / Hyperfarm / Banijjo / Myfarm, single "Work with Fashol →" link anchoring to `#work-with-fashol`. Typography and spacing copied from the Solutions hub hero so the two pages read as siblings.
2. **Stack diagram** (`tone="paper"`): `HOW IT FITS TOGETHER` eyebrow + H2 *"Each product does one job. Together they make the platform."* + the new `ProductStack` figure + a muted centered caption beneath.
3. **Four product blocks** (alternating `surface`/`paper`/`surface`/`paper`): each block is its own `<Section>` with a `border-t border-[var(--color-line)]` between blocks 2-4, so the tone break and the divider line double up at each boundary. Two-column grid-12 layout (`col-span-4` left, `col-span-8 col-start-6` right). Left column is `desktop:sticky desktop:top-[120px]` with the number tag, product name (`t-h2`), Bengali form (`lang-bn`) where applicable, and the "For [audience]" line. Right column runs: editorial headline (`t-h3`) → body (`t-body-lg`) → "Who uses it" line with an inline `t-mono` eyebrow → status line (`t-mono` uppercase, tracked) → "Learn more about [Product] →" link using the existing `.link-arrow` class.
4. **CTA band** (`tone="ink"`, `id="work-with-fashol"`): `WORK WITH FASHOL` eyebrow + H2 *"Three ways in."* + three-card StaggerChildren grid. Cards (Partner with Fashol / Work with us / Read the data) reuse the Solutions-hub card chrome verbatim (`rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)]` with `<Button variant="on-dark">`).
5. **Footer**: shared component via the root layout, untouched.

Nav "Products" active state already handled by [Nav.tsx](site/src/components/site/Nav.tsx)'s `pathname?.startsWith(menu.href)` check - no nav code change needed.

### Stack diagram component (new) ([ProductStack.tsx](site/src/components/figures/ProductStack.tsx))

Inline SVG, no external assets, two variants driven by the `tablet` breakpoint:

- **Desktop** (`hidden tablet:block`): single `viewBox="0 0 900 420"` SVG. Three `<rect>` boxes across the top (Jogaan · Banijjo · Hyperfarm, evenly spaced at x=60/340/620, all w=220 h=90 rx=8) and one centered below (Myfarm at x=340 y=290). Horizontal flow lines between the top boxes at y=125 and three converging polylines down into Myfarm (straight drop from Banijjo, L-shapes from Jogaan and Hyperfarm meeting Myfarm's top edge at x=400/450/500). Single `<marker id="product-stack-arrow">` definition reused on every line's `markerEnd`. Strokes use `currentColor` driven by a parent `color: var(--color-deep-green)`; box fills use `var(--color-paper)`; `<text>` labels set `font-family` to `var(--font-plus-jakarta)` inline so SVG text picks up the same loaded font as the rest of the page.
- **Mobile** (`tablet:hidden`): plain flex-column stack of four bordered cards (Jogaan → Banijjo → Hyperfarm → Myfarm) with a small downward-chevron SVG between each. Same deep-green stroke, same `.lang-bn`-compatible typography.

The diagram is intentionally unframed (no wrapping card / no surrounding border) so it reads as a diagram on the paper tone, not a boxed-in illustration.

### Metadata

- `title: "Products"` (hits the layout template `%s · Fashol` → "Products · Fashol").
- `description: "Four products, one operating system. Jogaan, Hyperfarm, Banijjo, and Myfarm make up Fashol's platform for the food supply chain."`

### Verified

- `npx tsc --noEmit` clean, ESLint clean.
- `curl http://localhost:3000/products` → HTTP 200. All four product names, both Bengali strings (যোগান, বাণিজ্য), all status lines (AVAILABLE ON GOOGLE PLAY / iOS, ANDROID, AND WEB / LAUNCHING 2026), the SVG `<rect>` boxes and the `product-stack-arrow` marker all present in the rendered HTML.
- Nav active-state class (`bg-[rgba(19,19,19,0.06)]`) fires on `/products`.

### Side notes

- Cleared the 572 MB `.next/` cache mid-session after a prior Turbopack compile wedged the dev server. Unrelated to the page code; just ops.

---

## 2026-04-20 pm - Products/Solutions nav dropdowns, Solutions hub, green links

### Nav dropdowns (new) ([Nav.tsx](site/src/components/site/Nav.tsx), [NavDropdown.tsx](site/src/components/site/NavDropdown.tsx), [data/nav.ts](site/src/data/nav.ts))

- **New nav order**: Overview - Products - Solutions - About - Career - Contact. "Services" nav item removed. "Partner with Fashol" CTA untouched. `/services` page file kept on disk (no nav link).
- **Two dropdowns**: Products (4 items) and Solutions (14 items grouped as Urban buyers / Trade buyers / Suppliers / Partners / Financial). Data lives in [site/src/data/nav.ts](site/src/data/nav.ts) with `name` / `descriptor` / `description` per item. Solutions is rendered as a 3-column layout at desktop; `buildSolutionsColumns` splits Buyers into two halves ("Urban buyers" and "Trade buyers") at the rendering layer without restructuring the source data so the mobile accordion still shows a single Buyers group.
- **Trigger is a Link, not a button** ([Nav.tsx:244](site/src/components/site/Nav.tsx#L244)). Click navigates to `/products` or `/solutions` hub page; hover opens the dropdown panel; chevron rotates; Arrow Down opens and focuses the first item; Escape closes and returns focus to the trigger. `aria-haspopup`, `aria-expanded`, `aria-controls` all wired up.
- **Cream dropdown panel**: `bg-[var(--color-paper)]` with `border-[rgba(19,19,19,0.08)]` and a light drop shadow. Preview column shows a placeholder illustration (`/images/nav/placeholder.png`, generated in-repo via `sharp`), item name, short descriptor (Products) or long description (Solutions), and a "Learn more" link in deep green. Panel is `grid-cols-[11fr_9fr]` for both menus (Products left column simply has more whitespace).
- **Identical panel dimensions** between Products and Solutions so they read as siblings from the same system. `flattenMenu` injects the menu label as the first group's eyebrow when the data has none, so `Jogaan` in Products sits at the same vertical y-position as `Restaurants` in Solutions.
- **Left-column items are name-only** for both dropdowns (the Products descriptor is now only shown in the preview panel, matching the Solutions pattern). Secondary group eyebrows in Solutions Col 1 (`PARTNERS`) and Col 3 (`FINANCIAL`) aligned to the same vertical baseline using `min-h-[192px]` on primary groups.
- **Backdrop blur behind nav** ([Nav.tsx:151](site/src/components/site/Nav.tsx#L151)). When a dropdown is open, a fixed `z-30` overlay fades in over the page content with `backdrop-blur-[10px]` and `bg-[rgba(0,0,0,0.25)]`. The nav and dropdown stay sharp at `z-40`. Clicking the overlay closes the dropdown. `transition-opacity` is zeroed by the global `prefers-reduced-motion` rule.
- **Mobile accordion**: tap on Products or Solutions expands an inline list inside the drawer; no preview panel on mobile. Grouped eyebrows render for Solutions.

### Placeholder product & solution routes

- `/products` and `/solutions` hub pages, plus 18 dynamic detail pages under `/products/[slug]` and `/solutions/[slug]` via `generateStaticParams` that reads from `NAV_MENUS`. Each detail page pulls `name` + `description` from the data file, renders a "Coming soon" placeholder, and links back to its hub.
- All 22 routes statically pre-render at build; renaming a slug in `data/nav.ts` automatically updates the generated set (e.g. `modern-retail` → `supershops` and `arotdars` → `commission-agents`, both done in this session).

### Solutions hub page ([solutions/page.tsx](site/src/app/solutions/page.tsx))

Replaced the placeholder `/solutions` hub with a five-section editorial page:

1. **Hero** (`tone="ink"`): `SOLUTIONS` eyebrow, H1 *"One supply chain. Every role on it."*, two-sentence subhead, single "Work with Fashol" link anchoring to `#work-with-fashol`.
2. **Stakeholder directory** (`tone="paper"`): five grouped bands (URBAN BUYERS × 4, TRADE BUYERS × 4, SUPPLIERS × 3, PARTNERS × 2, FINANCIAL × 1). Each group: eyebrow + 60%-width intro paragraph + responsive card grid (4/4/3/2/1 cols on desktop). Card chrome matches Customer Voices: `bg-[var(--color-paper)] rounded-[4px]` with no border/shadow. Hover gives a subtle `-translate-y-1` lift. All 14 cards link to their `/solutions/[slug]` placeholder page.
3. **The common stack** (`tone="surface"`): `THE COMMON STACK` eyebrow, H2 *"Every role. Same grading, same cold chain, same settlement engine."*, single paragraph. Two-column grid-12 pattern (col-span-7 H2, col-span-5 body).
4. **CTA band** (`tone="ink"`, `id="work-with-fashol"`): three-card grid mirroring the home-page Join section's chrome (rounded-3xl, white-alpha border + fill, `on-dark` button). Cards: Partner with Fashol (`/contact`), Work with us (`/career`), Read the data (`/data`).
5. **Footer**: shared component, no changes there.

### Footer - Solutions section added ([Footer.tsx](site/src/components/site/Footer.tsx))

Below the existing 4-column grid (Platform / Company / Offices / Connect), a new full-width band renders all 14 solution links grouped as: Urban buyers / Trade buyers / Suppliers / Partners & financial. The band's heading links to `/solutions`.

### Green-link cleanup (arrows stripped site-wide)

- **CSS**: `.link` and `.link-arrow` now both render in `--color-deep-green` with `--color-deep-green-pressed` on hover. `.link-arrow::after { content: '→' }` removed entirely.
- **All button CTAs stripped of ` →` / ` ↗`**: home hero, home CTA triad, solutions hub CTAs, about, career, services, not-found, footer Subscribe, PlatformSection product tiles and Hyperfarm platform list, contact external-link column.
- **Inline text-link arrows** removed from NavDropdown and Solutions hub cards' "Learn more" links, Nav mobile drawer rows, case-study eyebrow kickers.
- **Body-text `→` ranges** converted to hyphens per the project single-hyphen rule: `2019 - 2026`, `Jan 2019 - Mar 2026`, `Jashore - Dhaka route`, `06:00 - 19:00`, `2024-12-02 - 2025-12-01`, `Exit 03, 6-minute walk north`.
- Remaining `→` in the codebase are source-code comments only (globals.css token aliases, OnboardingCurve JSDoc) - not rendered.

### Particle globe experiment (reverted)

- Added `public/sphere.html` with a three.js particle-sphere as an alternative to the cobe globe (loaded via iframe into the Global Capability section). Iterated on background transparency (removed UnrealBloomPass since it doesn't preserve alpha), particle count, dot size, sphere radius, and the halo/container circle sizing to align.
- User preferred the original cobe globe. Reverted [Globe.tsx](site/src/components/figures/Globe.tsx) to the cobe implementation and restored original halo/container sizes (280/340/400 halo, 260/320/380 container). `public/sphere.html` left on disk, unused.

### Nav data / placeholder assets

- Generated cream `/images/nav/placeholder.png` (600×450, cream token hex) via `sharp` for all dropdown preview cards until real illustrations ship.
- [site/src/data/nav.ts](site/src/data/nav.ts) is the single source of truth for both menus. Renaming an item updates the dropdown, mobile accordion, hub page index, footer section, and the dynamic `[slug]` static params in one place.

### Open items (this pass)

- `.link-arrow` CSS class name is now a misnomer (no arrow any more). Works fine but could be renamed to `.link-accent` in a future cleanup.
- `public/sphere.html` can be deleted when confirmed unused.
- `cobe` stays as a dep (used by [Globe.tsx](site/src/components/figures/Globe.tsx)); three.js was never added to `package.json` (sphere.html loaded three.js from unpkg).
- Pre-existing lint warnings in [Globe.tsx](site/src/components/figures/Globe.tsx) and [Nav.tsx](site/src/components/site/Nav.tsx) (`setState-in-effect`) unchanged; build still passes.

---

## 2026-04-20 - Farmer Value section + footer restructure

### Footer rewrite ([site/src/components/site/Footer.tsx](site/src/components/site/Footer.tsx))
- Restructured to a 5-column layout: brand column (~33%) left, four link columns (Platform, Company, Offices, Connect) in a nested 8-col grid on the right.
- Added the Bangkok office row (`TH - ITF Tower, Silom, Bangkok`) alongside BD/SG/AE.
- Fixed Bengali rendering: `ফসল` now wrapped in `<span className="lang-bn">` so the Hind Siliguri font actually applies. Replaced the em-dash in the tagline with a hyphen per the single-hyphen rule.
- Newsletter form, Fashol wordmark, and the legal bar untouched.
- Platform column links use `/#platform-jogaan`, `/#platform-hyperfarm`, `/#platform-banijjo`, `/#platform-myfarm`. Matching `id` attributes still need to be added to [`PlatformSection.tsx`](site/src/components/site/PlatformSection.tsx) for those anchors to actually land.

### New "Farmer Value" home section ([site/src/app/page.tsx](site/src/app/page.tsx))
- Inserted between "We buy direct from farmers" and "Operations register" as a `<Section tone="surface">`.
- Header reuses the Platform section's two-column pattern: `FARMER VALUE` eyebrow above the H2 on the left, intro paragraph on the right.
- Iterated through four layouts this session:
  1. Horizontal stripes separated by `divide-y`.
  2. 2x2 card grid, image-on-top (1:1).
  3. Same 2x2, image aspect tightened to 4:3 then 3:1 to pull the grid into a single viewport.
  4. 3:1 was slicing the top half off the square illustrations, so the final pass moves each card to a horizontal layout — image column on the left (~40% width on desktop) in a `aspect-square` box on mobile, stretched column on tablet+, using `object-contain` on a `var(--color-grain)` backdrop so the whole illustration always renders. Grain padding above/below reads as a gallery frame rather than a crop. Body set to `t-body-sm` so two rows fit inside a single viewport on 1080p+ laptops.
- Card chrome matches Customer Voices (`bg-[var(--color-paper)]`, `rounded-[4px]`, no border/shadow).

### Assets
- Moved four illustrations from `site/public/value-0{1..4}.png` into [site/public/images/farmer-value/](site/public/images/farmer-value/) to match the brief's referenced path.

### Open items
- Add `id="platform-jogaan"` / `-hyperfarm` / `-banijjo` / `-myfarm` to [`PlatformSection.tsx`](site/src/components/site/PlatformSection.tsx) tiles so the footer Platform column actually deep-links.
- At 900-tall viewports (13" MacBook) the Farmer Value section still spills slightly — card 01 body is the height driver. Next lever if needed: tighter image column width, or a smaller body font.

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
- **Site**: [`Nav`](site/src/components/site/Nav.tsx) (Voiceflow-style floating pill, see §4 Nav), [`Footer`](site/src/components/site/Footer.tsx), [`PageHeader`](site/src/components/site/PageHeader.tsx), [`Accordion`](site/src/components/site/Accordion.tsx), [`LogoMarquee`](site/src/components/site/LogoMarquee.tsx), [`Figure`](site/src/components/site/Figure.tsx), [`StatCard`](site/src/components/site/StatCard.tsx), [`PlatformSection`](site/src/components/site/PlatformSection.tsx) (4-product bento: Jogaan, Hyperfarm, Banijjo, Myfarm, with Hyperfarm/Myfarm modals).
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

New [`PlatformSection`](site/src/components/site/PlatformSection.tsx) — 4-product bento ("Jogaan / Hyperfarm / Banijjo / Myfarm"). Jogaan is a flagship tile (col-span-6, row-span-2); Hyperfarm and Banijjo are wide tiles; Myfarm is full-width at the bottom. Jogaan and Banijjo link out to Google Play. Hyperfarm opens an iOS/Android/Web chooser modal. Myfarm opens a 3-field WhatsApp lead form that prefills a message to the Fashol number. Section tone: `surface`. Slotted between "As featured in" and Chapter I.

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

Home page has been restructured around a single-photo hero and a 12-section stacked flow: Hero · Featured in · Platform · Chapter I · Operations register · Use Cases (four buyer types) · Global Capability (rotating globe + offices) · Founder letter · Principles · Voice from the field · Trust register · Join. Services summary, crop-peak calendar, and SDG alignment are all gone. Chapter I's SVG supply-chain figure was replaced with an isometric illustration plus a 5-node stats key. A new `PlatformSection` sits between Featured in and Chapter I with four products (Jogaan, Hyperfarm, Banijjo, Myfarm). Hero is a single 1920×815 photo (`h10.png`); the H1 block is pulled up into the image's lower portion via negative margin, with a cream fade gradient at the image floor acting as a soft mask so deep-green headline text reads cleanly against the image. Hero subhead is still commented out; commit history preserves it if the user wants it back.

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
