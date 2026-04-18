---
route: /data
source: site/data.html
lang: en
page_title: Impact data, 2019 → 2026 — Fashol
meta_description: Three charts that describe what Fashol has done in six and a half years: the monthly farmer onboarding curve, the 2023 onion-shortage price comparison, and the route efficiency map by district.
---

## Navigation

- 01 Overview → index.html
- 02 About → about.html
- 03 Services → services.html
- 04 News → news.html
- 05 Career → career.html
- 06 Contact → contact.html

**CTA:** "Impact data →" → data.html (current page)

**Breadcrumb:** Overview › Impact data

---

## Hero

§ Report 02 — Impact · Published 2026.03.28 · Figures 01 → 03 · Internal reporting, audited quarterly

# Impact data, 2019 → 2026.

Three charts that describe what six and a half years of platform work has added up to. The growth curve, the price test, and the logistics map. No rounding of inconvenient numbers; no claim without the method below it.

---

## § 01 — Onboarding, monthly

## From 300 farmers to 25,000 in seventy-nine months.

Every line is a named, ID-verified, bank-linked registration. Peaks mark seasonal hiring pushes; the two dips are Covid-19 lockdowns (April 2020, August 2021) and the 2022 fuel crisis. Nothing has been smoothed.

### Fig. 01 — Cumulative registered farmers, Jan 2019 → Mar 2026. Monthly granularity.

*[Inline SVG figure: line chart — cumulative growth curve]*

**Accessible title:** Line chart showing cumulative registered farmers growing from 300 in early 2019 to 25,000+ in early 2026, with two visible dips for the Covid-19 lockdowns and the 2022 fuel crisis.

**X-axis** — Year, January tick each year:

- 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026

**Y-axis** — Cumulative registered farmers, 5,000-unit increments:

- 0, 5,000, 10,000, 15,000, 20,000, 25,000

**Annotations on the curve (in order along the timeline):**

- **Covid · lockdown** — Apr 2020 · registrations frozen 11 wks (vertical dashed marker)
- **10,000 farmers** — Mar 2022 (dot marker on curve)
- **Fuel crisis → flat Aug 2022** (faint label, mid-2022 plateau)
- **$1M pre-seed** — Nov 2022 (vertical dashed marker)
- **20,000 farmers** — Feb 2024 (dot marker on curve)
- **End point: 25,380 · Mar 2026** (highlighted end-of-curve dot + label)

**Method.** Monthly cumulative registration count, pulled from the Jogaan master farmer table. De-duplicated on national ID. Dormant farmers (no transaction in 365 days) are excluded retroactively from the running total, which is why the curve is monotonic only in aggregate: nine individual months show micro-declines of under 40 farmers.

---

The curve is not smooth. Two visible plateaus mark real operational pain: seven weeks in April–May 2020 when field agents could not travel, and the fuel-rationing months of August to October 2022 when the collection-truck fleet halved. Both plateaus closed within the same quarter; neither produced a net farmer-count decline.

What the curve understates is the churn behind it. Roughly 7.2% of onboarded farmers in any given twelve-month window transact fewer than three times and are logged as dormant. A further 1.8% formally deregister. The 25,380 figure above is the net — registered, not-dormant, within the last 365 days.

---

## § 02 — The 2023 onion-shortage test

## When retail onion prices tripled, Fashol farmers held a price floor.

Between September and December 2023, Bangladesh's onion price more than tripled after India imposed an export ban. Retail prices peaked at BDT 220 / kg. What did Fashol farmers receive through the same window?

### Fig. 02 — Weekly onion farm-gate price, Sep–Dec 2023. Three channels compared.

*[Inline SVG figure: three-line chart — weekly price comparison]*

**Accessible title:** Three-line chart comparing weekly onion prices from September through December 2023: open-market retail (which spiked from 60 to 220 BDT/kg), traditional farm-gate aratdar price (which stayed near 40 BDT/kg with a brief spike to 70), and Fashol contract farm-gate price (which rose from 48 to 95 BDT/kg and held).

**X-axis** — Week of 2023, 17-week window:

- Sep W1, Oct W1, Nov W1, Dec W1, Dec W4

**Y-axis** — BDT / kg, 50-unit increments:

- 0, 50, 100, 150, 200

**Series (legend):**

- **Open-market retail (Dhaka wholesale Karwan Bazar)** — terracotta line, ends at BDT 216
- **Fashol contract farm-gate** — accent line, ends at BDT 85
- **Traditional aratdar farm-gate** — ink line, ends at BDT 38

**Event annotation:**

- **India export ban — 08 Dec 2023** (vertical dashed line near Dec W2)

**End-of-line callouts (right edge):**

- Retail · BDT 216
- Fashol gate · BDT 85
- Aratdar gate · BDT 38

**Method.** Retail series is the Karwan Bazar weekly quoted price, published by TCB. Aratdar farm-gate is an internal survey of eight named traders across Natore, Pabna, and Faridpur, weekly. Fashol farm-gate is the Jogaan-published offer price at the start of each week, averaged across Grade A / B onions.

---

What the chart shows: when wholesale retail prices spiked from BDT 60 to BDT 220 per kilo in three months, traditional farm-gate prices barely moved — aratdars keep a wide, stable margin and pass almost all upside to the downstream. Over the same window, Fashol's contract price rose from BDT 48 to BDT 85. The delta between "Fashol" and "aratdar" at the peak (Dec W1) was *BDT 53 per kilo*, an income uplift of roughly *+140%* against the same week's traditional-chain farmer.

What the chart does *not* show: Fashol did not capture the full spike either. Downstream buyer contracts had fixed ceilings, and the operational reality of the Dumuria–Natore onion belt is that quality varies week to week. What the platform did was move the farmer-side price floor up by the full available margin, week after week, without passing the downstream volatility back to the farmer.

---

## § 03 — Route efficiency, per district

## Some districts cost eighty kilometres per tonne. Some cost five.

Route cost is the single largest variable in the fresh-produce economics. This chart is the one we watch every Monday morning.

### Fig. 03 — Kilometres driven per metric tonne delivered, by district. 2025 Q4 mean.

*[Inline SVG figure: horizontal bar chart — route efficiency by district]*

**Accessible title:** Horizontal bar chart of kilometres driven per metric tonne delivered, by operating district. Satkhira and Dhaka-Savar are the most efficient at around 9 km/MT; Sylhet is the least efficient at 78 km/MT.

**X-axis** — kilometres driven per metric tonne delivered:

- 0, 20, 40, 60, 80 km / MT

**Threshold marker:** dashed line at **20 km / MT** — labelled "Route-profitable threshold: 20 km / MT"

**Categories (sorted ascending — most efficient first):**

| District | km / MT | Volume (MT / month) | Threshold status |
|---|---|---|---|
| Satkhira | 9 | 180 | Below — profitable |
| Dhaka (Savar) | 11 | 74 | Below — profitable |
| Jashore | 14 | 142 | Below — profitable |
| Khulna | 18 | 96 | Below — profitable |
| Bogura | 26 | 110 | Above — requires cross-subsidy |
| Rajshahi | 32 | 128 | Above — requires cross-subsidy |
| Mymensingh | 42 | 84 | Above — requires cross-subsidy |
| Comilla | 58 | 78 | Above — requires cross-subsidy |
| Sylhet | 78 | 62 | Above — requires cross-subsidy |

**Legend:**

- Below threshold — route is structurally profitable (accent colour)
- Above threshold — requires cross-subsidy or bulked-up volume to clear (accent-2 colour)

**Method.** Truck telematics distance (origin to primary dispatch dock), divided by metric tonnes billed. Median of Oct, Nov, Dec 2025 weekly readings. Does not include buyer-side last-mile kilometres.

---

The shape of this chart — asymmetric, heavy in the top three, cliff-edge above 40 km/MT — is the argument for why Fashol's geographic expansion is slow. The easy wins have all landed. The remaining districts are harder, further from arterial roads, and frequently require batch-consolidation across a second village before the route crosses the threshold.

Sylhet, the worst line, is not in dispute. The district is valuable (tea, lemon, ginger — high-ticket produce) but geographically scattered and road-constrained. The programme there is to operate at volume loss through 2026 while the collection-hub mesh densifies; the 2027 target is 42 km/MT or retreat.

---

## § 04 — What this adds up to

The three charts disagree with each other in useful ways. The first says we have a seven-year curve that has survived two shocks without a net decline. The second says that when the market does what markets do, the platform mechanically moves the farmer's price floor up rather than absorbing the volatility on their side. The third says the easy geography is saturated and the next hundred thousand farmers will be expensive per kilogram — the cost of continuing to be useful outside the easy districts.

No individual chart on its own is a thesis. Together they describe what the platform does when it is operating: it compounds slowly, it holds the floor under volatility, and it tells you, in kilometres per tonne, exactly where it is working and where it is not.

### Data provenance

| Source | Detail |
|---|---|
| Fig. 01 source | Jogaan farmer master, deduplicated on NID |
| Fig. 01 cut | Dormant-adjusted, 365-day activity window |
| Fig. 02 retail | TCB weekly Karwan Bazar quote |
| Fig. 02 aratdar | Internal survey · 8 traders · weekly |
| Fig. 02 Fashol | Jogaan Monday offer price, Grade A/B mean |
| Fig. 03 source | Truck telematics + SAP billing |
| Fig. 03 cut | Median Oct–Dec 2025 weekly |
| Audit | Internal, quarterly. Next external review Q3 2026. |
| Companion | [Case study — one farmer's year →](case-study.html) |

---

## Footer

ফসল — Bengali noun. A harvest.

A farm-to-business platform operating out of Dhaka, Singapore, and Dubai. Founded 2019.

### Site

- Overview → index.html
- About → about.html
- Services → services.html
- News → news.html
- Case study → case-study.html
- Data → data.html (current page)
- Career → career.html
- Contact → contact.html

### Offices

- **BD** — 130 Kabbokash, Kawran Bazar, Dhaka 1215
- **SG** — 33A Pagoda Street, Singapore 059192
- **AE** — Office 406, Abdullah Fahed Bldg 2, Al Qussais 2, Dubai

### Direct

- +880 9613 105 505
- info@fashol.com
- Facebook → https://www.facebook.com/fasholcom/
- LinkedIn → https://www.linkedin.com/company/fashol?originalSubdomain=bd
- YouTube → https://www.youtube.com/channel/UCMAWUuelzAQc9nYKZ2s-fxQ

© 2019–2026 Fashol Dotcom Limited · Dhaka, Bangladesh · [Privacy](privacy.html) · [Terms](terms.html) · v 2026.04
