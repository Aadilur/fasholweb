# Mismatched images — Fashol rebuild

This file tracks PR/product images from `content-export/assets/images/` that were *considered* for a given section but judged a poor visual fit, alongside the alternative decision taken.

## None flagged at this pass

Every PR and operational image from the content export was placed in a section where it fits the design language. The Aeline-derived aesthetic is editorial and photography-first, which is compatible with Fashol's documentary field photography style. No PR images were silently dropped.

### Notes for the user to review

1. **`news-2.md` and `news-5.md` share the same hero image (`news-5-dhakatribune.jpeg`).** This is preserved from the content export (flagged in `content-export/README.md`). Consider a unique hero for each article before launch.
2. **`news-6.md` uses the generic `warehouse.jpg`** rather than a publication-specific photo. Preserved as-is; replace when a DITECH-partnership-specific photo is available.
3. **`gallery08.jpeg` and `gallery09.jpeg`** are present in the content export but not referenced by any source page. They were copied to `public/images/content/` for completeness but are not used on any current route. Decide whether to place them in a page or delete.
4. **`fashol-mark.png`** is used as favicon and Nav / Footer mark. The full `fashol-logo.png` wordmark is *not* currently used in layout — the wordmark is rendered typographically (Plus Jakarta Sans 500/600). If you want the PNG wordmark to appear in the Nav or Footer instead, swap the text in `src/components/site/Nav.tsx` and `src/components/site/Footer.tsx`.
5. **No `news-9-orbit.png` exists in the source.** Replaced with a Pexels-sourced market image — see [SOURCED_IMAGES.md](SOURCED_IMAGES.md).
