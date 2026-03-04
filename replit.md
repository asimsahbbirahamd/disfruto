# Disfruto — Shopify Theme (Cheese Subscription MVP)

## Project Overview
Shopify Dawn-based theme customized for Disfruto, a curated cheese subscription brand launching in Berlin. This is a lean MVP with a premium, editorial design matching the Loveable reference.

## Architecture
- **Theme Base**: Shopify Dawn theme
- **Custom Sections**: All custom sections use the `disfruto-` prefix
- **CSS**: Single custom stylesheet at `assets/disfruto.css` (loaded globally in `layout/theme.liquid`)
- **Preview**: Node.js static preview server at `preview/server.js` (port 5000, serves images from assets/)
- **Images**: All in `assets/` folder — uploaded to Shopify CDN via `shopify theme push`

## Custom Sections Created
| Section File | Purpose |
|---|---|
| `sections/disfruto-announcement.liquid` | Dark navy announcement bar at top |
| `sections/disfruto-header.liquid` | Branded nav with logo, menu, Login, gold CTA, German flag |
| `sections/disfruto-trust-bar.liquid` | Dark green trust bar with checkmarks |
| `sections/disfruto-hero.liquid` | Hero with headline, CTA, image, floating badge |
| `sections/disfruto-product-story.liquid` | Two-column product story |
| `sections/disfruto-cheese-grid.liquid` | 4-column cheese showcase grid |
| `sections/disfruto-cheesemaker.liquid` | Cheesemaker of the week feature |
| `sections/disfruto-banner.liquid` | Full-width CTA banner with background image overlay |
| `sections/disfruto-why.liquid` | 4-column benefits grid (dark bg) |
| `sections/disfruto-newsletter.liquid` | Newsletter signup |
| `sections/disfruto-footer.liquid` | Custom branded footer |

## Generated Images (Placeholder — Replace with real product photos)
| Image | Purpose |
|---|---|
| `assets/disfruto-hero.png` | Hero section — cheese board arrangement (3:4) |
| `assets/disfruto-story.png` | Product story — curated selection overhead (4:3) |
| `assets/disfruto-cheese-1.png` | Deichkäse Alt — aged hard cheese (1:1) |
| `assets/disfruto-cheese-2.png` | Friesisch Blue — blue cheese wedge (1:1) |
| `assets/disfruto-cheese-3.png` | Grosser Husumer — semi-hard cheese (1:1) |
| `assets/disfruto-cheese-4.png` | Hofkäse — soft farmhouse cheese (1:1) |
| `assets/disfruto-maker.png` | Cheesemaker portrait (4:3) |
| `assets/disfruto-banner.png` | Subscription unboxing banner (16:9) |

## Key Files
- `templates/index.json` — Homepage template with all 11 sections configured
- `assets/disfruto.css` — Complete custom design system
- `layout/theme.liquid` — Global CSS import added
- `preview/server.js` — HTML preview server (renders design outside Shopify)

## Brand Design
- **Colors**: Cream (#FAF7F2), Dark (#2C2C2C), Dark Green (#2D4A3E), Navy (#1E1B3A), Warm brown (#8B6F47), Accent green (#5C7A3A), Gold CTA (#C9A84C), Gold (#D4A853)
- **Fonts**: Playfair Display 700 (headings), Inter 400-700 (body/nav)
- **Logo**: Lowercase "disfruto" with Playfair Display, gold dot "o" icon
- **Style**: Premium, editorial, minimal, large imagery, generous whitespace

## Navigation Structure
- Menu: Unser Käse | So funktioniert's | Käsemacher | FAQs
- Right: Login icon | Gold CTA "GENUSS SET WÄHLEN" | German flag

## Business Requirements
- 1 subscription product (Käse Genuss Set)
- 2 delivery intervals (every 2 weeks / every 4 weeks)
- Delivery days: Thu-Sun
- Berlin-only delivery
- Subscription app: Seal Subscriptions (to be configured in Shopify)
