# Sourced images — Fashol rebuild

All externally-sourced photography is stored in [`site/public/images/sourced/`](site/public/images/sourced/) and referenced with descriptive filenames. This file tracks the provenance of each external image.

| Filename | Source URL | Photographer / Credit | License | Used on |
|---|---|---|---|---|
| `news-9-orbit-market.jpg` | https://www.pexels.com/photo/2749165/ | Pexels contributor | Pexels License (free, no attribution required) | News article: Orbit Startups feature (`/news/news-9`) — replaces the missing `news-9-orbit.png` referenced in the original content but not present in `content-export/assets/images/`. Chosen for its South-Asian produce-market aesthetic, consistent with the rest of the operations photography. |

## Notes

- All 69 images in `content-export/assets/images/` were copied to `site/public/images/content/` and used as-is.
- Only **one** external image was needed: the missing `news-9-orbit.png` flagged in `content-export/README.md` under &ldquo;Source-side issues.&rdquo;
- Every other hero, supporting shot, and figure background uses the original content export photography (hero paddy aerial, farmer photos, gallery frames, warehouse, PR images, and partner/investor/SDG marks).
- Images are served via Next.js `next/image` which auto-generates responsive WebP variants — no hotlinking, originals preserved at source filename.
