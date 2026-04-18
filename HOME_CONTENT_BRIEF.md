# Fashol home page — content brief

Snapshot of the live home page (`/`) for copy-strategy work in a fresh chat. Everything needed to reason about messaging, tone, hierarchy, and what each block is trying to do.

**Source of truth:** [`site/src/app/page.tsx`](site/src/app/page.tsx)
**Last synced:** 2026-04-18 pm

---

## 1 · Who Fashol is (one-paragraph primer)

Fashol is a Bangladesh-founded farm-to-business platform. It buys perishable produce directly from smallholder farmers, handles cold logistics and quality grading, and sells into domestic buyers (MSMEs, quick-commerce, retailers) and cross-border markets. Thesis: the traditional 5–7-intermediary aratdar chain is extractive, opaque, and wasteful; a disciplined platform can replace it. Founded 2019. Offices in Bangladesh, Singapore, UAE. Founder: Sakib Hossain.

---

## 2 · Voice and tone (hard constraints)

The home reads like an editorial broadsheet / annual-report essay — not a SaaS landing page. These are durable rules the site owner has set:

- **Never invent copy.** Use verbatim text from source where it exists. No lorem ipsum, no filler. Source copy lives in [`content-export/pages/*.md`](content-export/pages/).
- **Editorial, not marketing.** Flat, declarative sentences. Numbers first, claims second. No stack-of-adjectives.
- **Strip furniture.** The site owner has already deleted `Fig. NN` captions, `§ NN` markers, `Chapter I/II` eyebrows, `— of record` tags, and masthead strips. Don't bring them back.
- **Uncluttered.** If a section feels text-heavy, default to a tighter version or a visual. Never add ornament.
- **Single-sentence headlines** that contain a full thought. No two-line SaaS stacks ("Supply chain. / Reimagined.").
- **Warm industrial / Swiss editorial aesthetic.** Copy should read like long-form journalism or a company dossier. Plus Jakarta Sans throughout (display + body); Geist Mono only for stat figures / editorial tables; Hind Siliguri for Bengali inline snippets.

### Active voice anchors (keep hitting these)
- **Direct procurement.** Farm gate → buyer door, no aratdars.
- **Cold chain + four-tier grading** applied at hub intake (not at the urban wholesale market).
- **24-hour settlement** via mobile money.
- **Farmer owns the record** (Jogaan app).
- **Cycle time: 18–24 hours** farm gate → buyer door.
- **Nine operating districts** in Bangladesh, 2026 Q1.

---

## 3 · Current live stats (verbatim, as shown on page)

These are in the hero stat tiles, as of the most recent update:

| Tile | Figure | Label |
|---|---|---|
| 1 | **60,000+** | Registered farmers |
| 2 | **7,000+** | Buyers |
| 3 | **15,000+ MT** | Food loss prevented |
| 4 | **4+ Countries** | cross-border supply chain solution |

> ⚠ **Known copy debt:** the old numbers (40,000 farmers / 40+ hubs / 26% waste / 10,000 MT) still appear in other places on the home page (founder letter, ops-register table footer, services summary section). These need to be reconciled — see §6 Known tensions.

Other durable numbers referenced on the page:
- **5–7 intermediaries** in the traditional chain
- **~1/3 of produce** spoils before sale (Bangladesh baseline)
- **1/5 of consumer price** is what the farmer currently receives
- **25% higher prices** vs. aratdar (farmer testimonial)
- **~1,050 MT/month** total network volume (ops register table)
- **~40 hubs** across nine districts (still mentioned in body copy; the 40+ number is in the ops register table's footer even though the hero tile dropped "40+ Hubs")
- **Four-tier quality grade** applied at hub intake
- **Six services** (see §5.7)
- **Six principles** (see §5.10)
- **Six of 17 UN SDGs** mapped (SDG 01, 02, 08, 09, 12, 13)

---

## 4 · Audiences (who we're writing to, in priority order)

The home is written for a mixed B2B reader and must serve all four in a single page:

1. **Buyers** — MSMEs, quick-commerce, exporters, wholesalers. They want: trust, cold-chain reliability, quality grading, delivery punctuality. CTA: "Partner with Fashol."
2. **Farmers / field agents** — rural smallholders. They want: 24-hour settlement, fair price, respect. Primary conversion is WhatsApp onboarding.
3. **Investors / partners / policy** — need: proof of scale, unit economics, SDG alignment, press credibility. They read the founder letter and the operations register most.
4. **Prospective hires** — need: mission, "real work," principles. CTA: "Work with us."

---

## 5 · Home page — section-by-section walkthrough

The page is one long vertical scroll. Thirteen sections, in this order:

### 5.1 · Hero (full-viewport, video background)

**Role:** Anchor the thesis in one sentence, then show the scoreboard.

**Background:** Autoplay looping drone video of rice paddies (`herovideo10.mp4`), with a bottom-anchored deep-green glossy scrim over it for text legibility.

**Copy:**
- H1: **"Building a better food supply chain"** (whitespace: nowrap on desktop — one line)
- Subhead: *currently commented out* — see §6.1
- CTAs: `Partner with Fashol` (primary lime) + `Read the data →` (on-dark)

**Stat tiles** (anchored to hero floor — see §3 for figures).

**Copy notes:**
- Hero headline is deliberately plain. Previous drafts ("Feeding cities. Funding farmers.") were rejected as too SaaS.
- The subhead is absent right now. A copywriter should propose: a single sentence that names the three pillars (direct pricing + real-time logistics + measurable waste reduction) without being listy.

### 5.2 · "As featured in" press-logo band

**Role:** Credibility badge, directly under the hero.

**Copy:** Single small label: `As featured in`

Logos: Forbes, Prothom Alo, The Daily Star, Tech in Asia, The Business Standard, AgFunder, Orbit Startups, Dhaka Tribune, The Financial Express, UNB, The Daily Observer, Future Startup. Each links to a specific article.

**Copy notes:** The label is one phrase; Forbes is pinned at viewport center when the band enters view. No body copy needed. A copywriter may only want to change the label.

### 5.3 · Chapter I — The argument

**Role:** Establish the thesis and the mechanism.

**Copy:**
- H2: **"Direct procurement from the farm gate; disciplined delivery to the buyer."**
- Body (two paragraphs, right column):
  1. "Bangladesh's agricultural supply chain passes produce through five to seven intermediaries before it reaches a retailer. Pricing is opaque. Payment is late. Roughly a third of what is grown spoils before it is sold."
  2. "Fashol removes the middle layers and replaces them with a platform — agent network, cold logistics, quality grading, settlement."
- Sub-figure heading: **"The Fashol chain, five nodes. Cycle time: 18–24 hours, farm gate → buyer door."** (displayed above the SupplyChain SVG figure)

**Three stage cards:**
- Stage 01 · Farm-gate onboarding — "Field agents register smallholders via the Jogaan app. Each farmer holds a record of what they grow, when, in what quantity, and at what price. No paper ledger. No verbal agreement. Transparent from day one."
- Stage 02 · Cold logistics & grading — "Pickup, cold storage, and a four-tier quality grade applied at hub intake. Produce is catalogued before it leaves the district — not relabeled at the urban wholesale market, as is the common practice."
- Stage 03 · Settlement & dispatch — "Buyers — MSMEs, quick-commerce operators, exporters, wholesalers — order through the platform. Farmers are paid via mobile financial services within 24 hours of weighing. Delivery runs on company route plans, not on aratdar convenience."

**Editorial photo caption:** "Cabbage collection, company-registered farmer. Jashore district, 2024. Photograph by Adil Ahnaf."

### 5.4 · Operations register (map + table)

**Role:** "Here's the receipts." Nine-district map with a tabular breakdown.

**Copy:**
- H2: **"Forty-plus hubs. Nine districts. One platform behind every farmer."**
- Body: "A partial index of current operating districts. Numbers are reported internally and audited quarterly."
- Map caption: "Fashol operating districts, Bangladesh — 2026 Q1."
- Table: 9 districts × 8 columns (№ · District · Division · Hubs · Farmers · Vol/mo · Since · Leading crops)
- Table footer row: Total 40+ hubs, 40,000+ farmers, ~1,050 MT/mo

**Copy notes:** Table figures sum to ~25,620 farmers — that's the *district-wise registered-farmer subtotal*, not the headline "60,000+" figure. There's a gap here that copy should address (what's the 60k vs 25k distinction? Registered vs. active? National vs. district-audited?). The H2 headline still says "Forty-plus hubs" even though the hero tile no longer features "40+ Hubs" — if hubs are still a live narrative, the headline can stay; if they're being de-emphasized, headline needs a rewrite.

### 5.5 · Chapter II — The evidence (price bars)

**Role:** Quantify the unit-economics claim.

**Copy:**
- H2: **"What a farmer actually earns for one kilo of cabbage."**
- Body: "Comparison between the traditional aratdar chain and Fashol direct procurement. Figures are averages across Jashore and Satkhira, 2024 harvest season."
- Sub-figure heading: **"Farmer share of end-consumer price, BDT per kg. Lower bars = less to the grower."**
- 3-item footnote list:
  1. "Traditional chain assumes five intermediaries: farmer → local trader → aratdar → urban wholesaler → retailer → consumer."
  2. "Fashol chain: farmer → field agent → hub → buyer → consumer. Cold-chain loss and quality grading applied at intake."
  3. "Averages for Grade A cabbage, Jashore & Satkhira, Nov 2024 – Feb 2025. Internal reporting; figures rounded to the nearest BDT."
- CTAs: `One farmer, twelve harvests →` (primary to `/case-study`) + `Full impact data, 2019 → 2026` (secondary to `/data`)

### 5.6 · Crop peak calendar (inside Chapter II)

**Role:** Operational texture. Shows the network runs a seasonal calendar, not a pitch deck.

**Copy:**
- H2: **"Seven crops. Twelve months. Peak windows, mapped."**
- Body: "The Fashol network's leading seven crop lines, indexed against the months they peak across our operating districts. Grey = off-season. Terracotta = peak harvest. Use this to plan procurement or farmer onboarding."
- Sub-figure heading: **"Crop peak calendar, 2026 — Jashore · Satkhira · Rajshahi · Bogura · Comilla composite."**

### 5.7 · From the founder (editorial essay)

**Role:** The long-form voice. Human anchor for the brand.

**Attribution:** *From the founder · Sakib Hossain · Dhaka, April 2026*

**Copy (3 paragraphs, italic h2 title):**
- H2 (italic): **"What we talk about when we talk about a supply chain."**
- Paragraph 1: Personal opener — farmer/child/balance-sheet framing. Tomato grower receives 1/5 of retail.
- Paragraph 2: What Fashol does and why — software, cold-chain, four-tier grade, 24h settlement. "None of these ideas are clever. The work is doing them."
- Paragraph 3: The scoreboard line: **"We are 40,000 farmers, 40-plus hubs, 26 percent less waste, and a few early numbers that say the model holds."** Call for collaborators.

**Copy notes:** This letter is a keystone piece and should not be rewritten for pitch reasons — but the numbers are now stale (see §6.2). The third paragraph needs to be updated to reflect the current scoreboard (60,000 farmers, 7,000 buyers, 15,000+ MT food loss prevented, 4+ countries). How to do that without breaking the rhythm is a copy-strategy question.

### 5.8 · Services summary (six cards)

**Role:** The services index in compressed form. Full list lives at `/services`.

**Copy:**
- H2: **"Six services. One platform. Every stage of the chain."**
- Six cards, numbered 01–06, each with a title, a ~2-sentence blurb, and a small mono tag:

| # | Title | Blurb | Tag |
|---|---|---|---|
| 01 | Farm-to-market platform | Direct farmer-to-buyer matching. No aratdars. Pricing visible to both sides. | Fashol · B2B |
| 02 | Smart logistics network | Cold chain and last-mile pickup for rural, climate-vulnerable districts. | Fleet · Route |
| 03 | Buyer solutions | Ordering, inventory, fulfilment for MSMEs, quick-commerce, exporters, wholesalers. | SaaS · Retail |
| 04 | Market intelligence | Real-time price data and seasonal analytics for smallholder decision-making. | Data · Pricing |
| 05 | Quality assurance | Four-tier grading applied at hub intake — before stock reaches the buyer. | Grade · QC |
| 06 | Financial solvency | 24-hour settlement via mobile money. Agricultural credit for established growers. | Payments · Credit |

- CTA: `See the full services index →` → `/services`

### 5.9 · Principles (six cards)

**Role:** Operating values. Declaratively written, not aspirational.

**Copy:**
- H2: **"Six principles. Operational, not aspirational."**
- Body: "Written into how we decide, hire, and settle with farmers."
- Six items (P.01 – P.06):
  - P.01 · Farmer first — "Every pricing decision starts from what the grower will take home. Not from the margin the platform can hold."
  - P.02 · Accountability — "Named owners for each commitment — to farmers, to buyers, to investors. Escalation paths are visible."
  - P.03 · Sustainability — "Waste reduction is measured per district, per season, per crop. It is a ledger entry, not a talking point."
  - P.04 · Human-centered — "Jogaan is tested with agents and farmers who have never used a smartphone. If they cannot use it, it ships again."
  - P.05 · Optimisation — "Data first. First principles next. Opinion last. Decisions are traceable to numbers we can show."
  - P.06 · Leadership — "Bangladesh's agricultural infrastructure deserves to be designed, not inherited. We carry that responsibility."

### 5.10 · Voice from the field (farmer testimonial)

**Role:** Human quote, dark section, ink-on-cream contrast break.

**Copy:**
- Blockquote: *"Fashol has changed the shape of my farming. Prices are **25 percent higher** than what the aratdar paid me — and the money is in my mobile wallet within a day, not a month."*
- Attribution: — Mohammad Rahim Uddin — Vegetable farmer, Satkhira — Onboarded 2023
- Photo caption overlay: "A registered farmer sowing. Rice paddy, South Asia, 2024."

### 5.11 · Trust register (partners + investors logo grids)

**Role:** Social proof at scale. A literal wall of brand logos.

**Copy:**
- Eyebrow: *Our Network* (terracotta)
- H2: **"Trusted by 7,000+ customers: Market leaders, Global organizations, and The best in the business."**
- Partners grid (20 logos, from `PARTNERS` in `site/src/data/site.ts`)
- Investors grid (5 logos, from `INVESTORS` in `site/src/data/site.ts`)

**Copy notes:** "7,000+ customers" here aligns with the new hero Buyers tile — good. But the old "20 of record" / "05 of record" eyebrows have been stripped, so there's no label on either grid now. Decide whether "Partners" and "Investors" sub-labels should come back (at the very least for screen readers / non-visual scanners).

### 5.12 · SDG alignment (6 UN goals mapped)

**Role:** ESG / investor-facing alignment statement.

**Copy:**
- H2: **"Six of seventeen UN Sustainable Development Goals, mapped to operations."**
- Body: "We audit against these each quarter. The icon is the UN's; the measurement is ours."
- Six cards with UN SDG icon + goal name + how Fashol operationalizes it:
  - SDG 01 · No poverty — "Farmer income lift, measured at onboarding vs. 12-month benchmark."
  - SDG 02 · Zero hunger — "Food loss prevented in metric tons, per district, per season."
  - SDG 08 · Decent work — "Full-time hub roles created in rural districts with historically thin employment."
  - SDG 09 · Industry & infrastructure — "Cold storage and route-planning built in districts previously served by none."
  - SDG 12 · Responsible consumption — "Quality grading reduces returns; traceability reduces over-ordering."
  - SDG 13 · Climate action — "Climate-vulnerable farmers prioritised for onboarding in flood-prone coastal belts."

### 5.13 · Join — CTA triad (final section, dark)

**Role:** Closing conversion block. Three explicit doors.

**Copy:**
- H2: **"The chain is still being built. Join as a farmer, a buyer, or a colleague."**
- Three cards with button CTAs:
  - 01 · Farmer onboarding — "WhatsApp a field agent. Bring your last season's records, if available." → WhatsApp deep-link
  - 02 · Buyer account — "MSMEs, quick-commerce, exporters, wholesalers. Ten-minute setup." → WhatsApp deep-link
  - 03 · Work with us — "Open roles in engineering, logistics, field operations, and data." → `/career`

---

## 6 · Known tensions / copy debt (open items)

### 6.1 · Hero subhead is commented out
The subhead under the H1 ("Fashol moves perishable produce from farms across Bangladesh to buyers in Dhaka, Singapore, and Dubai. Direct pricing. Real-time logistics. 26 percent less waste.") is currently disabled in code. It needs to either come back as-is, be rewritten, or the hero stays bare. Question for the copywriter: does the hero need a subhead at all, or is the H1 + 4-tile stat panel + 2 CTAs enough context?

### 6.2 · Numbers drift — the "scoreboard" is stale in 4 places
Hero tiles now say 60,000 / 7,000 / 15,000+ MT / 4+ countries, but the old figures persist in:

1. **Ops register table footer** — "40+ hubs / 40,000+ farmers / ~1,050 MT" at [page.tsx:242–244](site/src/app/page.tsx#L242-L244)
2. **Ops register H2** — "Forty-plus hubs. Nine districts."
3. **Founder letter paragraph 3** — "We are 40,000 farmers, 40-plus hubs, 26 percent less waste"
4. **Services summary / subtext** — implicit (waste cut, hub count mentions)

Also cross-page: the `/about`, `/data`, `/services`, and `/layout.tsx` (SEO) still use the old numbers. Those are out-of-scope for home-page copy but affect narrative consistency.

**Copy question:** is the right move to harmonize everything on the new scoreboard, or are some references *correct-as-of-a-specific-date* (e.g. historical timeline entries) that should stay?

### 6.3 · Farmer-count gap between hero (60k) and ops-register table (~25k district-wise)
The hero claims "60,000+ registered farmers." The ops-register table's district-wise total is ~25,620. Either:
- The 60k includes farmers outside the nine listed districts
- The 60k is "ever-registered" vs. the table's "current active"
- The table is behind on an update

The home page doesn't resolve this. A copywriter should decide whether to add a reconciling footnote, update the table totals, or change one of the numbers.

### 6.4 · "4+ Countries" isn't enumerated anywhere
Hero says 4+ countries; other copy only names 3 (Bangladesh, Singapore, UAE/Dubai). Either list the 4 somewhere on the home (maybe as a new line on the map or a small strip under the hero) or loosen the claim.

### 6.5 · Hub count narrative
Hero tiles no longer feature "40+ Hubs" — but body copy (ops register H2 and the founder letter) still leans on "forty-plus hubs." If the strategic intent is to de-emphasize hubs and lead with buyers, the narrative needs a rewrite. If hubs still matter as a trust/scale signal, then the hero tile was a mistake to remove.

### 6.6 · SDG section reads as ESG housekeeping, not a promise
Current copy is descriptive ("measured against…"). Could be rewritten as claims ("We have added 1,400 full-time hub roles across nine districts since 2019."), making it a proof section rather than a taxonomy section. Open strategic choice.

### 6.7 · No "What we don't do" / humility anchor
The page is claims-heavy. There's no line that acknowledges what's broken or what's next. The founder letter gestures at it ("a long way from done") but the marketing sections don't. A small candor block could raise trust.

### 6.8 · No direct comparison to an alternative
The site implicitly positions against "the aratdar chain" but never names a competitor or a direct alternative (e.g. Foodpanda's procurement, exporters' own procurement arms, WFP programs). Decide whether to include a subtle comparison or stay silent.

---

## 7 · Word-level style rules (from repo memory)

- Farmer count is **60,000+** (was 40,000+; updated 2026-04-18).
- Never hardcode hex colors — reference CSS tokens.
- Bengali snippets use a dedicated class (`lang-bn`) and Hind Siliguri font. App name "Jogaan" has a Bengali form: যোগান.
- The founder is *Sakib Hossain*, based in Kawran Bazar, Dhaka.
- Use en-dashes for ranges (2019 → 2026), em-dashes for editorial pauses — like this.
- Keep American/British spelling consistent with the existing text (the page currently leans British: "Optimisation" in Principle 05, "Prioritised" in SDG 13). Don't flip mid-page.
- Legal dates on `/privacy` and `/terms` are stale on purpose ("Last updated 2024.12") pending legal review — don't touch.
- Case-study farmer "Md. Rafiqul Islam" is a *composite* (flagged for replacement before launch).

---

## 8 · What would be useful from a copy-strategy session

If pasted into a fresh Claude chat, the most productive asks are:

1. **Write three subhead options for the hero** — one expansive, one concise, one list-rhythm. None should sound SaaS.
2. **Reconcile the scoreboard** — propose a rewrite of the founder letter's third paragraph that uses the new numbers without losing rhythm.
3. **Write a 4-country line** — one sentence that explains the cross-border reach, suitable to sit either under the hero or as a caption on the ops register map.
4. **Audit each section's H2** — flag the ones that feel tired or out of balance, propose alternatives.
5. **Decide on "What we don't do"** — should it exist? If yes, draft it.
6. **Farmer testimonial additions** — we have one (Rahim Uddin). Draft 2–3 more in the same register, with composite-farmer disclosures if appropriate.
7. **Trust-register eyebrow labels** — do Partners / Investors grids need sub-labels back?

---

## 9 · How the home is structured in code (for reference)

Single file: [`site/src/app/page.tsx`](site/src/app/page.tsx). Each section is a `<Section>` (with `tone="ink" | "paper" | "surface"`). Alternating tones create visual rhythm:

1. Hero — ink (dark)
2. Featured in — paper
3. Chapter I (argument) — surface
4. Operations register — paper
5. Chapter II (evidence + crop calendar) — surface
6. Founder letter — paper
7. Services summary — surface
8. Principles — paper
9. Voice from the field (testimonial) — ink (dark)
10. Trust register — paper
11. SDG alignment — surface
12. Join (CTA triad) — ink (dark)

Every section reveals on scroll via `<Reveal>` (Framer Motion — self-unmounts after first animation for perf).
