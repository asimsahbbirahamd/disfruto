# Disfruto — Shopify Theme (Cheese Subscription MVP)

## Project Overview
Shopify Dawn-based theme customized for Disfruto, a curated cheese subscription brand launching in Berlin. This is a lean MVP with a premium, editorial design.

## Architecture
- **Theme Base**: Shopify Dawn theme
- **Custom Sections**: All custom sections use the `disfruto-` prefix
- **CSS**: Single custom stylesheet at `assets/disfruto.css`
- **Preview**: Node.js static preview server at `preview/server.js` (port 5000)

## Custom Sections Created
| Section File | Purpose |
|---|---|
| `sections/disfruto-hero.liquid` | Hero with headline, CTA, image, floating badge |
| `sections/disfruto-trust-bar.liquid` | 3-column trust signals bar |
| `sections/disfruto-product-story.liquid` | Two-column product story |
| `sections/disfruto-cheese-grid.liquid` | 4-column cheese showcase grid |
| `sections/disfruto-cheesemaker.liquid` | Cheesemaker of the week feature |
| `sections/disfruto-why.liquid` | 4-column benefits grid (dark bg) |
| `sections/disfruto-newsletter.liquid` | Newsletter signup |
| `sections/disfruto-footer.liquid` | Custom branded footer |

## Key Files
- `templates/index.json` — Homepage template with all sections configured
- `assets/disfruto.css` — Complete custom design system
- `preview/server.js` — HTML preview server (renders design outside Shopify)

## Brand Design
- **Colors**: Cream (#FAF7F2), Dark (#2C2C2C), Warm brown (#8B6F47), Accent green (#5C7A3A), Gold (#D4A853)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Style**: Premium, editorial, minimal, large imagery, generous whitespace

## Business Requirements
- 1 subscription product (Käse Genuss Set)
- 2 delivery intervals (every 2 weeks / every 4 weeks)
- Delivery days: Thu-Sun
- Berlin-only delivery
- Subscription app: Seal Subscriptions (to be configured in Shopify)
