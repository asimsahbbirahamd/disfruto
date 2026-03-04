# Disfruto — Shopify Dawn Theme (Cheese Subscription MVP)

## Project Overview
Shopify Dawn-based theme customized for Disfruto, a curated artisan cheese subscription brand launching in Berlin, Germany. Premium, editorial, minimal design. Subscription-first MVP, Berlin-only delivery, Thu-Sun delivery days via Seal Subscriptions.

## Architecture
- **Theme Base**: Shopify Dawn theme
- **Custom Sections**: 7 custom sections use the `disfruto-` prefix (hero, trust-bar, product-story, cheese-grid, cheesemaker, banner, why)
- **Dawn Built-in Sections**: Header, footer, announcement bar, and newsletter use Dawn's native sections — enhanced via CSS overrides in `disfruto.css` and configured via color schemes in `settings_data.json`
- **CSS**: Single custom stylesheet at `assets/disfruto.css` (loaded globally in `layout/theme.liquid`)
- **Preview**: Node.js static preview server at `preview/server.js` (port 5000) — uses preview-specific inline styles for header/footer since those are Dawn built-in sections in Shopify
- **Images**: All in `assets/` folder — deployed to Shopify CDN via `shopify theme push` or git

## Color Schemes (settings_data.json)
| Scheme | Name | Background | Used By |
|---|---|---|---|
| scheme-1 | Cream | #FAF7F2 | Header, body |
| scheme-2 | Light | #F5F1EB | Newsletter, cards |
| scheme-3 | Navy | #1E1B3A | Announcement bar |
| scheme-4 | Dark | #2C2C2C | Footer |
| scheme-5 | Dark Green | #2D4A3E | Trust bar |

## Custom Sections
| Section File | Purpose |
|---|---|
| `sections/disfruto-trust-bar.liquid` | Dark green trust bar with checkmarks (lives in header group) |
| `sections/disfruto-hero.liquid` | Hero with headline, CTA, image, floating badge |
| `sections/disfruto-product-story.liquid` | Two-column product story |
| `sections/disfruto-cheese-grid.liquid` | 4-column cheese showcase grid |
| `sections/disfruto-cheesemaker.liquid` | Cheesemaker of the week feature |
| `sections/disfruto-banner.liquid` | Full-width CTA banner with background image overlay |
| `sections/disfruto-why.liquid` | Editorial split layout: manifesto left (sticky) + numbered benefits right, IntersectionObserver animations |
| `sections/disfruto-faq.liquid` | Collapsible FAQ accordion (uses native `<details>` element) |

## Dawn Built-in Sections (NOT custom)
| Section | Config File | Color Scheme |
|---|---|---|
| Announcement Bar | `sections/header-group.json` | scheme-3 (navy) |
| Header | `sections/header-group.json` | scheme-1 (cream) — custom settings: show_search toggle, account label, CTA button, German flag |
| Newsletter | `templates/index.json` | scheme-2 (light) |
| Footer | `sections/footer-group.json` | scheme-4 (dark) |

## Generated Images (Placeholder — Replace with real product photos)
| Image | Purpose |
|---|---|
| `assets/disfruto-logo.png` | Brand logo |
| `assets/disfruto-hero.png` | Hero section — cheese board arrangement |
| `assets/disfruto-story.png` | Product story — curated selection overhead |
| `assets/disfruto-cheese-1.png` | Deichkäse Alt — aged hard cheese |
| `assets/disfruto-cheese-2.png` | Friesisch Blue — blue cheese wedge |
| `assets/disfruto-cheese-3.png` | Grosser Husumer — semi-hard cheese |
| `assets/disfruto-cheese-4.png` | Hofkäse — soft farmhouse cheese |
| `assets/disfruto-maker.png` | Cheesemaker portrait |
| `assets/disfruto-banner.png` | Subscription unboxing banner |

## Key Files
- `config/settings_data.json` — Theme settings with Disfruto color schemes, fonts, brand info
- `sections/header-group.json` — Header group: announcement-bar → trust-bar → header
- `sections/footer-group.json` — Footer group: Dawn footer with brand info, menus, contact
- `templates/index.json` — Homepage: hero → story → cheeses → maker → banner → why → newsletter
- `assets/disfruto.css` — Custom design system + Dawn section overrides
- `layout/theme.liquid` — Global CSS import
- `preview/server.js` — HTML preview server for client review outside Shopify

## Brand Design
- **Colors**: Cream (#FAF7F2), Dark (#2C2C2C), Dark Green (#2D4A3E), Navy (#1E1B3A), Warm brown (#8B6F47), Gold CTA (#C9A84C), Gold accent (#D4A853)
- **Fonts**: Playfair Display 700 (headings), Inter 400-700 (body/nav)
- **Logo**: `assets/disfruto-logo.png` — upload to Shopify admin theme editor as the logo
- **Style**: Premium, editorial, minimal, large imagery, generous whitespace

## Navigation Structure
- Menu: Unser Käse | So funktioniert's | Käsemacher | FAQs
- Right: Login icon | Gold CTA "GENUSS SET WÄHLEN" | German flag

## Business Requirements
- 1 subscription product (Käse Genuss Set)
- 2 delivery intervals (every 2 weeks / every 4 weeks)
- Delivery days: Thu-Sun
- Berlin-only delivery
- Subscription app: Seal Subscriptions (to be configured in Shopify admin)
