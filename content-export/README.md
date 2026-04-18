## Fashol — content export

Design-agnostic content library extracted from the legacy `/site/` HTML for hand-off to a new design system. Read-only export — original project files were not modified.

- **Source:** `/site/*.html` (22 pages, ~7,955 words of body prose)
- **Generated:** 2026-04-18
- **Format:** one markdown file per page, frontmatter + headings + lists + image references. No CSS, classes, divs, layout descriptors, or JSON-LD.

### Folder layout

```
content-export/
├── README.md                ← this file
├── pages/                   ← 22 markdown files (3,248 lines total)
└── assets/images/           ← 69 image files (flat folder)
```

### Conventions

- **Frontmatter** on every page file: `route`, `source`, `lang`, `page_title`, `meta_description`.
- **Headings** mirror the page's content hierarchy (`#` → `####`).
- **CTAs** marked as `**CTA:** "visible label" → destination` (mailto/tel/wa.me/URL preserved verbatim).
- **Pull-quotes** as markdown blockquotes (`>`).
- **Images** referenced inline as `![alt verbatim](../assets/images/<filename>)`. Original masters only — responsive variants (`-640.webp`, `-1280.webp`, `-1920.webp`, `-640.avif`, `-1280.avif`, `-1920.avif`) were stripped. All images live flat in `../assets/images/` regardless of source subfolder.
- **SVG figures** (charts, maps, diagrams): the figure's text content (titles, axis labels, legends, annotations, data callouts) is extracted as a list or table under the figure heading, marked `*[Inline SVG figure: <type>]*`. Path geometry was discarded — those belong to the visual layer.
- **Bengali Unicode** preserved exactly where it appears (homepage BN, case-study, news-1).
- **Skipped:** decorative SVG ornament marks (`mark-asterisk`, `mark-radar`, `mark-target`, `mark-contour`), CSS classes/styles, layout descriptors, JSON-LD blocks (most were stale placeholders per the legacy inventory anyway), HTML comments, skip-links.

---

### Pages (22)

| File | Route | Lang | Lines | What it covers |
|---|---|---|---:|---|
| [home.md](pages/home.md) | `/` | en | 452 | Homepage / editorial overview — densest page. Hero, founder editorial, four inline SVG figures (supply diagram, BD map, price chart, crop calendar), partner + investor + SDG grids, press cards |
| [home.bn.md](pages/home.bn.md) | `/index.bn` | bn | 236 | Bengali farmer-audience homepage — different IA from EN: founder's letter first, Jogaan section, all three founders, BN price chart |
| [about.md](pages/about.md) | `/about` | en | 157 | Company dossier — origin story, three founder bios (Sakib Hossain, Mamunur Rashid, Numair Hussain), values |
| [services.md](pages/services.md) | `/services` | en | 207 | Six services + Jogaan app detail. Source already has anchor IDs (`#farm-to-market`, `#logistics`, `#buyer-solutions`, `#market-intelligence`, `#quality-assurance`, `#financial-solvency`) — preserved as H3 slugs |
| [career.md](pages/career.md) | `/career` | en | 176 | Open roles directory. Titles only — full JDs hosted externally at `hr.fashol.com/jobs`. Speculative applications via `mailto:careers@fashol.com` |
| [contact.md](pages/contact.md) | `/contact` | en | 170 | Offices (BD/SG/AE), channels, inline-SVG hub map. NO `<form>` — all routing is `mailto:` / `tel:` / `wa.me/` |
| [case-study.md](pages/case-study.md) | `/case-study` | en+bn | 247 | Longform 12-month farmer ledger — heaviest single page. Composite farmer (disclaimer preserved). Two BN pull-quotes |
| [data.md](pages/data.md) | `/data` | en | 219 | Three-chart data essay. Three inline SVG charts (growth curve, 3-line onion price, horizontal bar) — extracted as labels + tables. Underlying datasets not recoverable from markup |
| [news.md](pages/news.md) | `/news` | en | 105 | Press hub — 10-publication logo grid + 10-row index |
| [news-1.md](pages/news-1.md) | `/news-1` | en+bn | 95 | Prothom Alo feature (Bengali headline + EN body) |
| [news-2.md](pages/news-2.md) | `/news-2` | en | 96 | The Daily Star — pre-seed announcement (shares hero image with news-5) |
| [news-3.md](pages/news-3.md) | `/news-3` | en | 102 | Forbes founder feature — contains the only pull-quote across the news set |
| [news-4.md](pages/news-4.md) | `/news-4` | en | 96 | The Business Standard — eCMA 2023 |
| [news-5.md](pages/news-5.md) | `/news-5` | en | 96 | Dhaka Tribune — pre-seed (shares hero image with news-2) |
| [news-6.md](pages/news-6.md) | `/news-6` | en | 96 | The Daily Star — DITECH partnership. Reuses generic `warehouse.jpg` |
| [news-7.md](pages/news-7.md) | `/news-7` | en | 96 | Tech in Asia — pre-seed regional lens. Source uses bare `<img>` |
| [news-8.md](pages/news-8.md) | `/news-8` | en | 96 | AgFunder News — GROW Accelerator |
| [news-9.md](pages/news-9.md) | `/news-9` | en | 96 | Orbit Startups — middleman removal. Source uses bare `<img>` |
| [news-10.md](pages/news-10.md) | `/news-10` | en | 95 | Daily Sun — upay payroll |
| [privacy.md](pages/privacy.md) | `/privacy` | en | 118 | Privacy policy, 7 numbered sections |
| [terms.md](pages/terms.md) | `/terms` | en | 134 | Terms of service, 11 numbered sections |
| [404.md](pages/404.md) | `/404` | en | 63 | Error page (~15 words of body) |

**Totals:** 22 pages · 3,248 lines of markdown.

---

### Images (69 files in `assets/images/`)

Originals only — all responsive variants (`-640`, `-1280`, `-1920` in `.webp` and `.avif`) were stripped during export. Files are flat (no subfolders).

| Group | Count | Files |
|---|---:|---|
| Photography | 8 | `hero-paddy-aerial.jpg`, `farmer-cabbage.jpg`, `farmer-sowing.jpg`, `farmer-watering.jpg`, `cabbage-field-bd.jpg`, `market-aerial-bd.jpg`, `market-women.jpg`, `warehouse.jpg` |
| Founders / team | 3 | `sakib-hossain.png`, `mamunur-rashid.jpg`, `numair-hussain.jpg` |
| Brand | 2 | `fashol-logo.png`, `fashol-mark.png` |
| Jogaan app screens | 3 | `jogaan-1.png`, `jogaan-2.png`, `jogaan-3.png` |
| Field / gallery | 9 | `gallery01.jpg`, `gallery02.jpeg` … `gallery09.jpeg` (gallery08 + gallery09 are not referenced in any page — see anomalies) |
| Partners | 20 | `partner01.png` … `partner20.png` |
| Investors | 5 | `investor01.jpg`, `investor02.png` … `investor05.png` |
| UN SDG icons | 6 | `sdg-01.jpg`, `sdg-02.jpg`, `sdg-08.jpg`, `sdg-09.jpg`, `sdg-12.jpg`, `sdg-13.jpg` |
| Media outlet logos | 6 | `business-standard.png`, `daily-star.png`, `daily-sun.png`, `forbes.png`, `prothom-alo.png`, `tech-in-asia.png` |
| News article photos | 7 | `news-1-prothom-alo.jpg`, `news-3-sakib.jpg`, `news-4-ecma.png`, `news-5-dhakatribune.jpeg`, `news-7-techinasia.webp`, `news-8-agfunder.jpeg`, `news-10-dailysun.jpg` |

**Total: 69 image files. 67 are referenced from page markdown; 2 are unreferenced (gallery08, gallery09); 1 page references a file that does not exist in the source (news-9-orbit.png).**

#### Skipped intentionally
- `assets/marks/mark-asterisk.svg`, `mark-contour.svg`, `mark-radar.svg`, `mark-target.svg` — legacy decorative ornaments belonging to the v3 design furniture (corner annotations / pulsing brand mark). They are design system, not content.
- All `*-640.webp`, `*-1280.webp`, `*-1920.webp`, `*-640.avif`, `*-1280.avif`, `*-1920.avif` — responsive variants of the masters above. The new design system will regenerate its own.

---

### Anomalies and notes for the new design team

#### Source-side issues (preserved as-is in the export — not fixed)

1. **Missing image file: `news-9-orbit.png`.** The `news-9.html` source references `assets/news/news-9-orbit.png` but that file does not exist anywhere in the project. The reference is preserved in `pages/news-9.md` so the absence is visible; supply the actual photograph or substitute one before relaunch.
2. **Unused image files: `gallery08.jpeg`, `gallery09.jpeg`.** Present in `assets/images/` for completeness but not referenced from any page. Decide: place into a page or delete.
3. **Stale legal dates.** Both `privacy.md` and `terms.md` show "Last updated 2024.12" — 16 months stale relative to today (2026-04-18). Preserved verbatim. Flag for legal review.
4. **Composite farmer disclaimer (case-study.md).** The featured farmer is explicitly a composite — three places in the source say "Illustrative composite" / "verified single-farmer case will replace this before launch". Preserved verbatim. Do not silently swap to a single farmer's data without re-reading the disclaimer.
5. **No `<form>` on contact.html.** All contact routes are `mailto:` / `tel:` / `wa.me/` links. Office line `+8809613105505` is distinct from WhatsApp `+8801810187230`. If the new design adds a form, route handling must be added too.
6. **No structured job descriptions on career.html.** Each open role is title-only. Full JDs live at `https://hr.fashol.com/jobs`.
7. **Stale press metadata.** `news.md` page title and meta description say "Ten publications, four award ceremonies, one accelerator cohort" but the visible page only contains the 10-row press index — there are no separate awards or accelerator sections. Preserved verbatim.
8. **Shared / reused photography.** `news-2.md` and `news-5.md` use the same hero image (`news-5-dhakatribune.jpeg`). `news-6.md` reuses the generic `warehouse.jpg` from photography rather than a publication-specific photo. Replace per-article if relevant to the new direction.
9. **No "Kawran Bazar schematic" exists in case-study.html.** Earlier project notes (PROGRESS.md) mention it; the file does not contain one. Either build it for the new design or drop the reference.
10. **Bengali nameplate inconsistency on home.bn.md.** The masthead displays "ISSUE ০০২" (Bengali numerals for 002) but other furniture annotations call this Issue 001. Both preserved as-found.
11. **Two CTAs use long pre-encoded WhatsApp URLs** with `%21` / `%E2%80%99` escapes — kept verbatim because the URL itself is the destination.

#### Extraction caveats

- **Chart datasets are not recoverable.** For the inline SVG charts on `data.md` (Figs. 01 and 02 of the data essay) and `home.md` (Fig. 05 price chart), data is encoded as `<path d>` / `<rect width>` geometry, which approximates rather than encodes the underlying numbers. The charts on `data.md` Fig. 03 and the homepage crop calendar (Fig. 06) are label-driven and were extracted cleanly. For the geometric charts, a designer rebuilding them will need the underlying datasets from Fashol — only labels, axes, legends, callouts, and methodology footnotes are preserved here.
- **`fashol-mark.png` (favicon-class brand mark) is included** but not referenced from any page markdown — it appeared only in `<head>` favicon links across pages. Kept in `assets/images/` so the new design can decide whether it survives.
- **Footer is identical across all 22 pages** and is preserved verbatim under `## Footer` in every file. If the new design centralizes footer content, dedupe at that point.
- **Page-level kicker / dateline strips** (e.g., "Issue 001 · Friday 17 April 2026 · The Overview · Dhaka 23.7806° N · 90.4193° E") were treated as visible content, not as decorative furniture, and preserved on each page even where the source flagged them `aria-hidden`.
- **Bengali in EN-marked pages** (case-study, news-1) uses the `lang: en+bn` frontmatter so the new system can flag bilingual handling.
