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
| scheme-1 | Beige | #F5F5F0 | Header, body |
| scheme-2 | Blue-Gray | #DCE7F1 | Newsletter, cards |
| scheme-3 | Purple | #2D1A40 | Announcement bar |
| scheme-4 | Purple | #2D1A40 | Footer |
| scheme-5 | Teal | #1E4A47 | Trust bar |

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
| `sections/disfruto-page-unser-kaese.liquid` | "Unser Käse" page intro: philosophy headline + 3 feature cards (handwerk, nachhaltig, lieferung) with icons |
| `sections/disfruto-page-how-it-works.liquid` | "So funktioniert's" page: 3-step numbered process with CTA |
| `sections/disfruto-page-kaesemacher.liquid` | "Käsemacher" page: 6-card grid of cheesemaker profiles with photo, region, description, specialty badge |

## Page Templates
| Template File | Page | Sections Used |
|---|---|---|
| `templates/page.unser-kaese.json` | Unser Käse | disfruto-page-unser-kaese + disfruto-cheese-grid (6 cheeses) |
| `templates/page.so-funktionierts.json` | So funktioniert's | disfruto-page-how-it-works + disfruto-product-story + disfruto-faq (3 items) |
| `templates/page.kaesemacher.json` | Käsemacher | disfruto-page-kaesemacher (6 makers) + disfruto-cheesemaker (weekly spotlight) |
| `templates/page.faqs.json` | FAQs | disfruto-faq (9 questions) |

To use these in Shopify: Create pages in Shopify Admin → Pages, set each page's template to the matching template suffix (e.g., "unser-kaese"), then link them in the navigation menu.

## Product Page (main-product.liquid enhancements)
4 custom block types added to Dawn's `sections/main-product.liquid`:

| Block Type | Name | Purpose |
|---|---|---|
| `cheese_badges` | Qualitätsbadges | Row of 4 editable trust badges with SVG icons (leaf, star, map-pin, checkmark) |
| `tasting_profile` | Geschmacksprofil | Flavor profile card: milk type, texture, intensity (1-5 dot scale), aging, notes, pairing |
| `subscription_info` | Abo-Vorteile | 3-item subscription highlights with icons (clock, refresh, truck) |
| `delivery_info` | Lieferinfo | Compact teal-bordered banner: eyebrow, main text, note |

All block settings are fully editable in Shopify theme editor with German defaults.

Product page block order (templates/product.json):
vendor → title → cheese_badges → price → subscription_info → delivery_info → variant_picker → quantity_selector → buy_buttons → tasting_profile → description → 4 collapsible tabs (Zutaten, Herkunft, Lagerung, Versand) → share

Preview: `/product` route in preview server

The same 4 block types are also available in `sections/featured-product.liquid` (Dawn's "Featured product" section) for use on the homepage or any other page via the theme editor.

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
- **Colors**: Purple (#2D1A40), Teal (#1E4A47), Blue-Gray (#DCE7F1), Beige (#F5F5F0)
- **CTA Color**: Teal (#1E4A47) with white text
- **Fonts**: Inter 700 (headings), Inter 400-700 (body/nav) — all Inter, no Playfair Display
- **Logo**: `assets/disfruto-logo.png` — upload to Shopify admin theme editor as the logo
- **Style**: Premium, editorial, minimal, large imagery, generous whitespace

## Navigation Structure
- Menu: Unser Käse | So funktioniert's | Käsemacher | FAQs
- Right: Login icon | Teal CTA "GENUSS SET WÄHLEN" | German flag

## Cheese Collection
- Horizontally scrollable at all screen sizes (not grid)
- Hover reveals Geschmacksprofil overlay (milk, texture, intensity dots, aging, aromas, pairing)

## Business Requirements
- 1 subscription product (Käse Genuss Set)
- 2 delivery intervals (every 2 weeks / every 4 weeks)
- Delivery days: Thu-Sun
- Berlin-only delivery
- Subscription app: Seal Subscriptions (to be configured in Shopify admin)
