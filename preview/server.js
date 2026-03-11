const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const cssPath = path.join(__dirname, '..', 'assets', 'disfruto.css');
const css = fs.readFileSync(cssPath, 'utf8');

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Disfruto — Kuratierte Käse-Spezialitäten</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #3A3A3A; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    img { max-width: 100%; display: block; }
    a { color: inherit; }
    ${css}

    /* Preview-only header/footer styles (Dawn handles these in Shopify) */
    .preview-announcement { background: #2D1A40; color: #fff; text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; }
    .preview-announcement a { color: #3dbdb5; text-decoration: underline; text-underline-offset: 2px; }
    .preview-header { background: #fff; border-bottom: 3px solid #1E4A47; position: sticky; top: 0; z-index: 100; }
    .preview-header__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .preview-header__left { display: flex; align-items: center; gap: 40px; }
    .preview-header__logo { text-decoration: none; display: flex; align-items: center; }
    .preview-header__logo img { height: 28px; width: auto; }
    .preview-header__nav { display: flex; align-items: center; gap: 28px; }
    .preview-header__nav a { font-size: 14px; font-weight: 600; color: #2D1A40; text-decoration: none; }
    .preview-header__nav a:hover { color: #1E4A47; }
    .preview-header__right { display: flex; align-items: center; gap: 10px; }
    .preview-header__login { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; color: #2D1A40; text-decoration: none; }
    .preview-header__cta { display: inline-flex; align-items: center; padding: 10px 24px; height: 40px; box-sizing: border-box; background: #1E4A47; color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 6px; border: 1px solid #1E4A47; }
    .preview-header__cta:hover { background: #163836; border-color: #163836; }
    .preview-header__flag { width: 26px; height: 18px; border-radius: 2px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .preview-header__flag span { flex: 1; }
    .preview-footer { background: #F5F5F0; color: #3A3A3A; padding: 56px 0 0; border-top: 1px solid #E0E0DA; }
    .preview-footer__inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .preview-footer__grid { display: grid; grid-template-columns: 1.5fr 2.5fr 1fr 1.2fr; gap: 48px; align-items: start; padding-bottom: 40px; }
    .preview-footer__brand { font-family: 'Inter',sans-serif; font-size: 26px; font-weight: 700; color: #2D1A40; margin: 0; letter-spacing: -0.02em; }
    .preview-footer h4 { font-size: 14px; font-weight: 700; color: #2D1A40; margin: 0 0 12px; }
    .preview-footer__newsletter-desc { font-size: 13px; line-height: 1.6; color: #6B6B6B; margin: 0 0 16px; }
    .preview-footer__newsletter-form { display: flex; gap: 0; }
    .preview-footer__newsletter-input { flex: 1; padding: 10px 14px; border: 1px solid #D0D0CA; border-right: none; border-radius: 6px 0 0 6px; font-size: 14px; font-family: 'Inter', sans-serif; background: #fff; color: #3A3A3A; outline: none; }
    .preview-footer__newsletter-input::placeholder { color: #A0A09A; }
    .preview-footer__newsletter-input:focus { border-color: #1E4A47; }
    .preview-footer__newsletter-btn { padding: 10px 20px; background: #2D1A40; color: #fff; font-size: 13px; font-weight: 600; border: none; border-radius: 0 6px 6px 0; cursor: pointer; font-family: 'Inter', sans-serif; white-space: nowrap; }
    .preview-footer__newsletter-btn:hover { background: #3d2656; }
    .preview-footer__social { display: flex; gap: 16px; }
    .preview-footer__social a { color: #2D1A40; text-decoration: none; display: flex; align-items: center; }
    .preview-footer__social a:hover { color: #1E4A47; }
    .preview-footer ul { list-style: none; padding: 0; margin: 0; }
    .preview-footer li { margin-bottom: 8px; }
    .preview-footer a { font-size: 14px; color: #6B6B6B; text-decoration: none; }
    .preview-footer a:hover { color: #2D1A40; }
    .preview-footer__bottom { padding: 20px 24px; border-top: 1px solid #E0E0DA; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #A0A09A; max-width: 1200px; margin: 0 auto; }
    .preview-footer__bottom a { font-size: 12px; color: #A0A09A; text-decoration: none; margin-left: 20px; }
    .preview-footer__bottom a:hover { color: #2D1A40; }

    @media (max-width: 989px) {
      .preview-header__nav, .preview-header__flag { display: none; }
      .preview-footer__grid { grid-template-columns: 1fr 1fr; }
      .preview-featured-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    }
    @media (max-width: 549px) {
      .preview-footer__grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- Announcement Bar (Dawn built-in, styled via color scheme-3) -->
  <div class="preview-announcement">
    Dein 1. Käse Genuss Set <a href="#">gratis</a> — Nur für kurze Zeit!
  </div>

  <!-- Header (Dawn built-in, enhanced via CSS overrides + logo image) -->
  <header class="preview-header">
    <div class="disfruto-container">
      <div class="preview-header__inner">
        <div class="preview-header__left">
          <a href="/" class="preview-header__logo">
            <img src="/assets/disfruto-logo.png" alt="Disfruto">
          </a>
          <nav class="preview-header__nav">
            <a href="/pages/unser-kaese">Unser Käse</a>
            <a href="/pages/so-funktionierts">So funktioniert's</a>
            <a href="/pages/kaesemacher">Käsemacher</a>
            <a href="/pages/faqs">FAQs</a>
          </nav>
        </div>
        <div class="preview-header__right">
          <a href="#" class="preview-header__login">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Login
          </a>
          <a href="#" class="preview-header__cta">GENUSS SET WÄHLEN</a>
          <div class="preview-header__flag" title="Deutsch">
            <span style="background:#000;"></span>
            <span style="background:#DD0000;"></span>
            <span style="background:#FFCC00;"></span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Trust Bar -->
  <section class="disfruto-section disfruto-trust">
    <div class="disfruto-container">
      <div class="disfruto-trust__grid">
        <div class="disfruto-trust__item">
          <div class="disfruto-trust__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="disfruto-trust__label">Kostenfrei geliefert</div>
        </div>
        <div class="disfruto-trust__item">
          <div class="disfruto-trust__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="disfruto-trust__label">Flexibel planbar</div>
        </div>
        <div class="disfruto-trust__item">
          <div class="disfruto-trust__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="disfruto-trust__label">Jederzeit pausierbar</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Hero -->
  <section class="disfruto-section disfruto-hero">
    <div class="disfruto-container">
      <div class="disfruto-hero__inner">
        <div class="disfruto-hero__content">
          <span class="disfruto-hero__badge">Neu in Berlin</span>
          <h1 class="disfruto-hero__title">Dein 1. Käse Genuss&nbsp;Set Gratis</h1>
          <p class="disfruto-hero__subtitle">Kuratierte Käse-Spezialitäten direkt an deine Tür in Berlin geliefert. Handverlesen von den besten Käsemachern.</p>
          <div class="disfruto-hero__actions">
            <a href="#" class="disfruto-btn disfruto-btn--gold">Genuss Set Wählen</a>
            <a href="#story" class="disfruto-btn disfruto-btn--secondary">Mehr erfahren</a>
          </div>
        </div>
        <div class="disfruto-hero__visual">
          <div class="disfruto-hero__image-wrapper">
            <img src="/assets/disfruto-hero.png" alt="Disfruto Käse Genuss Set" loading="eager">
          </div>
          <div class="disfruto-hero__float-badge">
            <div class="disfruto-hero__float-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div class="disfruto-hero__float-text">Kostenlose Lieferung</div>
              <div class="disfruto-hero__float-sub">In ganz Berlin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Product Story -->
  <section id="story" class="disfruto-section disfruto-story">
    <div class="disfruto-container">
      <div class="disfruto-story__grid">
        <div class="disfruto-story__image">
          <img src="/assets/disfruto-story.png" alt="Kuratierte Käse-Auswahl" loading="lazy">
        </div>
        <div class="disfruto-story__content">
          <span class="disfruto-story__eyebrow">Unser Konzept</span>
          <h2 class="disfruto-story__title">Käse mit Charakter. Bewusst ausgewählt.</h2>
          <p class="disfruto-story__text">Jede Box ist eine Reise durch die besten Käsereien Europas. Wir wählen handwerklich hergestellte Käsesorten aus, die du in keinem Supermarkt findest — direkt zu dir nach Hause in Berlin.</p>
          <a href="#" class="disfruto-btn disfruto-btn--warm">Mehr erfahren</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Cheese Grid -->
  <section id="cheeses" class="disfruto-section disfruto-cheeses">
    <div class="disfruto-container">
      <div class="disfruto-cheeses__header">
        <span class="disfruto-cheeses__eyebrow">Unsere Auswahl</span>
        <h2 class="disfruto-cheeses__title">Entdecke unsere Käse-Vielfalt</h2>
        <p class="disfruto-cheeses__subtitle">Handverlesene Sorten von den besten Käsemachern Europas</p>
      </div>
    </div>
    <div class="disfruto-cheeses__slider-wrap">
      <div class="disfruto-container">
        <div class="disfruto-cheeses__grid">
          <div class="disfruto-cheese-card">
            <div class="disfruto-cheese-card__image">
              <img src="/assets/disfruto-cheese-1.png" alt="Deichkäse Alt" loading="lazy">
              <div class="disfruto-cheese-card__profile">
                <div class="disfruto-cheese-card__profile-title">Geschmacksprofil</div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Milch</span><span class="disfruto-cheese-card__profile-value">Kuhmilch</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Textur</span><span class="disfruto-cheese-card__profile-value">Fest & körnig</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Intensität</span><span class="disfruto-cheese-card__profile-value"><span class="disfruto-cheese-card__profile-dots"><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot"></span></span></span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Reifung</span><span class="disfruto-cheese-card__profile-value">12 Monate</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Aromen</span><span class="disfruto-cheese-card__profile-value">Nussig, salzig</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Passt zu</span><span class="disfruto-cheese-card__profile-value">Rotwein, Brot</span></div>
              </div>
            </div>
            <div class="disfruto-cheese-card__body">
              <h3 class="disfruto-cheese-card__name">Deichkäse Alt</h3>
              <p class="disfruto-cheese-card__desc">Kräftiger Charakter mit nussigen Noten, 12 Monate gereift an der Nordseeküste.</p>
              <span class="disfruto-cheese-card__tag">Hartkäse</span>
            </div>
          </div>
          <div class="disfruto-cheese-card">
            <div class="disfruto-cheese-card__image">
              <img src="/assets/disfruto-cheese-2.png" alt="Friesisch Blue" loading="lazy">
              <div class="disfruto-cheese-card__profile">
                <div class="disfruto-cheese-card__profile-title">Geschmacksprofil</div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Milch</span><span class="disfruto-cheese-card__profile-value">Kuhmilch</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Textur</span><span class="disfruto-cheese-card__profile-value">Cremig & weich</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Intensität</span><span class="disfruto-cheese-card__profile-value"><span class="disfruto-cheese-card__profile-dots"><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot"></span><span class="disfruto-cheese-card__profile-dot"></span></span></span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Reifung</span><span class="disfruto-cheese-card__profile-value">8 Wochen</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Aromen</span><span class="disfruto-cheese-card__profile-value">Würzig, mild</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Passt zu</span><span class="disfruto-cheese-card__profile-value">Portwein, Birne</span></div>
              </div>
            </div>
            <div class="disfruto-cheese-card__body">
              <h3 class="disfruto-cheese-card__name">Friesisch Blue</h3>
              <p class="disfruto-cheese-card__desc">Cremiger Blauschimmelkäse mit milder Würze aus friesischer Tradition.</p>
              <span class="disfruto-cheese-card__tag">Blauschimmel</span>
            </div>
          </div>
          <div class="disfruto-cheese-card">
            <div class="disfruto-cheese-card__image">
              <img src="/assets/disfruto-cheese-3.png" alt="Grosser Husumer" loading="lazy">
              <div class="disfruto-cheese-card__profile">
                <div class="disfruto-cheese-card__profile-title">Geschmacksprofil</div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Milch</span><span class="disfruto-cheese-card__profile-value">Kuhmilch</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Textur</span><span class="disfruto-cheese-card__profile-value">Geschmeidig</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Intensität</span><span class="disfruto-cheese-card__profile-value"><span class="disfruto-cheese-card__profile-dots"><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span></span></span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Reifung</span><span class="disfruto-cheese-card__profile-value">10 Monate</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Aromen</span><span class="disfruto-cheese-card__profile-value">Aromatisch, butter</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Passt zu</span><span class="disfruto-cheese-card__profile-value">Riesling, Feige</span></div>
              </div>
            </div>
            <div class="disfruto-cheese-card__body">
              <h3 class="disfruto-cheese-card__name">Grosser Husumer</h3>
              <p class="disfruto-cheese-card__desc">Vollmundiger Schnittkäse mit aromatischer Reife und butterweicher Textur.</p>
              <span class="disfruto-cheese-card__tag">Schnittkäse</span>
            </div>
          </div>
          <div class="disfruto-cheese-card">
            <div class="disfruto-cheese-card__image">
              <img src="/assets/disfruto-cheese-4.png" alt="Hofkäse" loading="lazy">
              <div class="disfruto-cheese-card__profile">
                <div class="disfruto-cheese-card__profile-title">Geschmacksprofil</div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Milch</span><span class="disfruto-cheese-card__profile-value">Kuhmilch</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Textur</span><span class="disfruto-cheese-card__profile-value">Zart & weich</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Intensität</span><span class="disfruto-cheese-card__profile-value"><span class="disfruto-cheese-card__profile-dots"><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot disfruto-cheese-card__profile-dot--active"></span><span class="disfruto-cheese-card__profile-dot"></span><span class="disfruto-cheese-card__profile-dot"></span><span class="disfruto-cheese-card__profile-dot"></span></span></span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Reifung</span><span class="disfruto-cheese-card__profile-value">4 Wochen</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Aromen</span><span class="disfruto-cheese-card__profile-value">Mild, cremig</span></div>
                <div class="disfruto-cheese-card__profile-row"><span class="disfruto-cheese-card__profile-label">Passt zu</span><span class="disfruto-cheese-card__profile-value">Weißwein, Trauben</span></div>
              </div>
            </div>
            <div class="disfruto-cheese-card__body">
              <h3 class="disfruto-cheese-card__name">Hofkäse</h3>
              <p class="disfruto-cheese-card__desc">Traditionell hergestellter Hofkäse mit zarter Rinde und mildem Geschmack.</p>
              <span class="disfruto-cheese-card__tag">Weichkäse</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Cheesemaker Feature -->
  <section id="maker" class="disfruto-section disfruto-maker">
    <div class="disfruto-container">
      <div class="disfruto-maker__grid">
        <div class="disfruto-maker__content">
          <span class="disfruto-maker__eyebrow">Jede Woche neu</span>
          <h2 class="disfruto-maker__title">Käsemacher im Fokus</h2>
          <p class="disfruto-maker__text">Jede Woche stellen wir einen besonderen Käsemacher vor — seine Geschichte, seine Philosophie und was seinen Käse einzigartig macht.</p>
          <a href="#" class="disfruto-btn disfruto-btn--secondary">Zum Porträt</a>
        </div>
        <div class="disfruto-maker__visual">
          <div class="disfruto-maker__badge-card" style="padding:0;overflow:hidden;position:relative;">
            <img src="/assets/disfruto-maker.png" alt="Käsemacher" style="width:100%;height:240px;object-fit:cover;">
            <div style="padding:28px 28px 32px;text-align:center;">
              <div class="disfruto-maker__badge-title">Käsemacher der Woche</div>
              <div class="disfruto-maker__badge-sub">Handwerk trifft Leidenschaft</div>
              <div class="disfruto-maker__badge-name">Familie Schönberg</div>
              <div class="disfruto-maker__badge-region">Nordfriesland, Deutschland</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Banner -->
  <section class="disfruto-section" style="padding:0;">
    <div style="width:100%;height:340px;overflow:hidden;position:relative;">
      <img src="/assets/disfruto-banner.png" alt="Disfruto Subscription" style="width:100%;height:100%;object-fit:cover;">
      <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(45,26,64,0.8) 0%,rgba(45,26,64,0.4) 50%,transparent 100%);display:flex;align-items:center;">
        <div class="disfruto-container" style="width:100%;">
          <div style="max-width:460px;">
            <h2 style="font-family:'Inter',sans-serif;font-size:34px;font-weight:700;color:#fff;margin:0 0 14px;line-height:1.15;">Starte deine Käse-Reise</h2>
            <p style="font-size:16px;color:rgba(255,255,255,0.8);margin:0 0 24px;line-height:1.6;">Entdecke jeden Monat neue Geschmackswelten mit unserer kuratierten Käse-Box.</p>
            <a href="#" class="disfruto-btn disfruto-btn--gold">Jetzt abonnieren</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Product -->
  <section class="disfruto-section" style="padding:80px 0;background:#fff;">
    <div class="disfruto-container">
      <div style="text-align:center;margin-bottom:48px;">
        <span style="font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#1E4A47;">Unser Bestseller</span>
        <h2 style="font-family:'Inter',sans-serif;font-size:36px;font-weight:700;color:#2D1A40;margin:12px 0 0;line-height:1.15;">Käse Genuss Set — Klassik</h2>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;" class="preview-featured-grid">
        <div style="border-radius:16px;overflow:hidden;border:1px solid #E5DFD6;">
          <img src="/assets/disfruto-hero.png" alt="Käse Genuss Set — Klassik" style="width:100%;aspect-ratio:1;object-fit:cover;">
        </div>
        <div>
          <div class="disfruto-product__badges">
            <div class="disfruto-product__badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13.5 2.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>
              <span>100% Natürlich</span>
            </div>
            <div class="disfruto-product__badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>Handwerklich hergestellt</span>
            </div>
            <div class="disfruto-product__badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Regionale Höfe</span>
            </div>
            <div class="disfruto-product__badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Kleine Chargen</span>
            </div>
          </div>

          <div style="margin:20px 0 4px;">
            <span style="font-size:28px;font-weight:700;color:#2D1A40;">€29,90</span>
            <span style="font-size:16px;font-weight:400;color:#6B6B6B;"> / Lieferung</span>
          </div>
          <p style="font-size:13px;color:#6B6B6B;margin:0 0 20px;">inkl. MwSt. • Kostenloser Versand in Berlin</p>

          <div class="disfruto-product__subscription">
            <div class="disfruto-product__sub-heading">Dein Käse-Abo</div>
            <div class="disfruto-product__sub-items">
              <div class="disfruto-product__sub-item">
                <div class="disfruto-product__sub-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="disfruto-product__sub-text">
                  <span class="disfruto-product__sub-label">Alle 2 oder 4 Wochen</span>
                  <span class="disfruto-product__sub-sublabel">Du wählst deinen Rhythmus</span>
                </div>
              </div>
              <div class="disfruto-product__sub-item">
                <div class="disfruto-product__sub-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </div>
                <div class="disfruto-product__sub-text">
                  <span class="disfruto-product__sub-label">Jederzeit pausieren</span>
                  <span class="disfruto-product__sub-sublabel">Flexibel & ohne Bindung</span>
                </div>
              </div>
              <div class="disfruto-product__sub-item">
                <div class="disfruto-product__sub-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div class="disfruto-product__sub-text">
                  <span class="disfruto-product__sub-label">Berlin-Lieferung Do–So</span>
                  <span class="disfruto-product__sub-sublabel">Frisch & gekühlt an deine Tür</span>
                </div>
              </div>
            </div>
          </div>

          <div class="disfruto-product__delivery">
            <div class="disfruto-product__delivery-eyebrow">LIEFERGEBIET</div>
            <div class="disfruto-product__delivery-text">Nur Berlin • Zustellung Do–So</div>
            <div class="disfruto-product__delivery-note">Frisch verpackt, gekühlt geliefert</div>
          </div>

          <div style="margin:20px 0;">
            <a href="/product" class="disfruto-btn disfruto-btn--gold" style="display:block;text-align:center;padding:16px 28px;">GENUSS SET WÄHLEN</a>
          </div>

          <div class="disfruto-product__tasting">
            <h3 class="disfruto-product__tasting-title">Geschmacksprofil</h3>
            <div class="disfruto-product__tasting-grid">
              <div class="disfruto-product__tasting-row">
                <span class="disfruto-product__tasting-label">Milch</span>
                <span class="disfruto-product__tasting-value">Kuhmilch</span>
              </div>
              <div class="disfruto-product__tasting-row">
                <span class="disfruto-product__tasting-label">Textur</span>
                <span class="disfruto-product__tasting-value">Cremig & geschmeidig</span>
              </div>
              <div class="disfruto-product__tasting-row">
                <span class="disfruto-product__tasting-label">Intensität</span>
                <span class="disfruto-product__tasting-value">
                  <span class="disfruto-product__intensity">
                    <span class="disfruto-product__intensity-dot disfruto-product__intensity-dot--active"></span>
                    <span class="disfruto-product__intensity-dot disfruto-product__intensity-dot--active"></span>
                    <span class="disfruto-product__intensity-dot disfruto-product__intensity-dot--active"></span>
                    <span class="disfruto-product__intensity-dot"></span>
                    <span class="disfruto-product__intensity-dot"></span>
                  </span>
                </span>
              </div>
              <div class="disfruto-product__tasting-row">
                <span class="disfruto-product__tasting-label">Reifung</span>
                <span class="disfruto-product__tasting-value">8–12 Wochen gereift</span>
              </div>
              <div class="disfruto-product__tasting-row">
                <span class="disfruto-product__tasting-label">Aromen</span>
                <span class="disfruto-product__tasting-value">Nussig, leicht salzig, lange Finish</span>
              </div>
              <div class="disfruto-product__tasting-row">
                <span class="disfruto-product__tasting-label">Passt zu</span>
                <span class="disfruto-product__tasting-value">Riesling, Sauerteig, Feigensenf</span>
              </div>
            </div>
          </div>

          <p style="font-size:15px;line-height:1.7;color:#3A3A3A;margin:16px 0 0;">
            Unser Klassik-Set bringt dir jeden Monat eine handverlesene Auswahl aus 4–5 Käsesorten von kleinen Hofkäsereien aus Norddeutschland.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Disfruto — Editorial Layout -->
  <section id="why" class="disfruto-section disfruto-why">
    <div class="disfruto-container">
      <div class="disfruto-why__layout">
        <div class="disfruto-why__manifesto is-visible">
          <span class="disfruto-why__eyebrow">Warum Disfruto</span>
          <h2 class="disfruto-why__title">Käse, der Geschichten erzählt</h2>
          <p class="disfruto-why__statement">Wir glauben, dass großartiger Käse mehr ist als ein Lebensmittel. Er ist Ausdruck von Handwerk, Terroir und der Leidenschaft der Menschen, die ihn herstellen. Disfruto bringt diese Geschichten direkt zu dir nach Hause — kuratiert, authentisch und immer aus den besten Käsereien Europas.</p>
          <a href="#" class="disfruto-btn disfruto-btn--outline">Unsere Geschichte entdecken</a>
        </div>
        <div class="disfruto-why__divider" aria-hidden="true"></div>
        <div class="disfruto-why__benefits">
          <div class="disfruto-why__item is-visible">
            <span class="disfruto-why__number">01</span>
            <div class="disfruto-why__item-content">
              <h3 class="disfruto-why__item-title">Vom Hof auf deinen Tisch</h3>
              <p class="disfruto-why__item-text">Jeder Käse erzählt seine Geschichte — vom Deichkäse Alt aus Nordfriesland bis zum cremigen Friesisch Blue. Du erfährst, wer ihn macht, woher die Milch stammt und wie er gereift wurde.</p>
            </div>
          </div>
          <div class="disfruto-why__item is-visible">
            <span class="disfruto-why__number">02</span>
            <div class="disfruto-why__item-content">
              <h3 class="disfruto-why__item-title">Generationen von Handwerk</h3>
              <p class="disfruto-why__item-text">Wir arbeiten mit Käsereien, die ihr Handwerk über Generationen perfektioniert haben. Keine Massenproduktion — nur Tradition, Sorgfalt und echte Leidenschaft für Käse.</p>
            </div>
          </div>
          <div class="disfruto-why__item is-visible">
            <span class="disfruto-why__number">03</span>
            <div class="disfruto-why__item-content">
              <h3 class="disfruto-why__item-title">Jede Box eine Entdeckung</h3>
              <p class="disfruto-why__item-text">Von kräftigem Hartkäse über milden Weichkäse bis zu edlem Blauschimmel — jede Box ist eine sorgfältig komponierte Reise durch Geschmack, Textur und Reife.</p>
            </div>
          </div>
          <div class="disfruto-why__item is-visible">
            <span class="disfruto-why__number">04</span>
            <div class="disfruto-why__item-content">
              <h3 class="disfruto-why__item-title">Berlin, kostenlos geliefert</h3>
              <p class="disfruto-why__item-text">Donnerstag bis Sonntag direkt an deine Tür — alle 2 oder 4 Wochen, immer versandkostenfrei. Pausiere, überspringe oder kündige jederzeit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="disfruto-section disfruto-faq">
    <div class="disfruto-container">
      <div class="disfruto-faq__header">
        <span class="disfruto-faq__eyebrow">Häufige Fragen</span>
        <h2 class="disfruto-faq__title">Alles, was du wissen musst</h2>
        <p class="disfruto-faq__subtitle">Hier findest du Antworten auf die häufigsten Fragen rund um Disfruto</p>
      </div>
      <div class="disfruto-faq__list">
        <details class="disfruto-faq__item">
          <summary class="disfruto-faq__question">
            <span class="disfruto-faq__question-text">Was ist Disfruto?</span>
            <span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          </summary>
          <div class="disfruto-faq__answer"><p>Disfruto ist ein Käse-Abonnement, das dir kuratierte Käse-Spezialitäten direkt an die Tür in Berlin liefert. Jede Box enthält handverlesene Sorten von den besten Käsemachern Europas.</p></div>
        </details>
        <details class="disfruto-faq__item">
          <summary class="disfruto-faq__question">
            <span class="disfruto-faq__question-text">Wie oft wird geliefert?</span>
            <span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          </summary>
          <div class="disfruto-faq__answer"><p>Du kannst zwischen zwei Lieferintervallen wählen: alle 2 Wochen oder alle 4 Wochen. Dein Abo kannst du jederzeit anpassen.</p></div>
        </details>
        <details class="disfruto-faq__item">
          <summary class="disfruto-faq__question">
            <span class="disfruto-faq__question-text">An welchen Tagen wird geliefert?</span>
            <span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          </summary>
          <div class="disfruto-faq__answer"><p>Wir liefern donnerstags bis sonntags in ganz Berlin. Du wählst bei der Bestellung deinen bevorzugten Liefertag.</p></div>
        </details>
        <details class="disfruto-faq__item">
          <summary class="disfruto-faq__question">
            <span class="disfruto-faq__question-text">Kann ich mein Abo pausieren oder kündigen?</span>
            <span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          </summary>
          <div class="disfruto-faq__answer"><p>Ja, du kannst dein Abonnement jederzeit pausieren, überspringen oder kündigen — ganz ohne Bindung oder versteckte Kosten.</p></div>
        </details>
        <details class="disfruto-faq__item">
          <summary class="disfruto-faq__question">
            <span class="disfruto-faq__question-text">Liefert ihr auch außerhalb von Berlin?</span>
            <span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          </summary>
          <div class="disfruto-faq__answer"><p>Aktuell liefern wir nur innerhalb Berlins, um die Frische und Qualität unserer Käse-Spezialitäten zu garantieren. Eine Expansion ist geplant.</p></div>
        </details>
        <details class="disfruto-faq__item">
          <summary class="disfruto-faq__question">
            <span class="disfruto-faq__question-text">Ist die Lieferung kostenlos?</span>
            <span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          </summary>
          <div class="disfruto-faq__answer"><p>Ja, die Lieferung ist für alle Abonnenten in Berlin komplett kostenlos — egal ob du alle 2 oder alle 4 Wochen bestellst.</p></div>
        </details>
      </div>
    </div>
  </section>

  <!-- Newsletter (Dawn built-in, enhanced via CSS) -->
  <section class="disfruto-section" style="padding:80px 0;background:#DCE7F1;">
    <div class="disfruto-container">
      <div style="max-width:560px;margin:0 auto;text-align:center;">
        <h2 style="font-family:'Inter',sans-serif;font-size:32px;font-weight:700;color:#2D1A40;margin:0 0 14px;">Neue Sorten & Genuss-Tipps direkt ins Postfach</h2>
        <p style="font-size:16px;color:#6B6B6B;margin:0 0 32px;line-height:1.6;">Melde dich an und erfahre als Erstes von neuen Käsesorten, exklusiven Angeboten und Geschichten unserer Käsemacher.</p>
        <form style="display:flex;gap:10px;max-width:460px;margin:0 auto;" onsubmit="event.preventDefault();">
          <input type="email" placeholder="Deine E-Mail-Adresse" required style="flex:1;padding:14px 18px;border:1px solid #E5DFD6;border-radius:8px;font-size:14px;font-family:Inter,sans-serif;background:#fff;color:#3A3A3A;outline:none;">
          <button type="submit" class="disfruto-btn disfruto-btn--primary">Anmelden</button>
        </form>
        <p style="font-size:12px;color:#6B6B6B;margin-top:14px;">Kein Spam, jederzeit abbestellbar. Datenschutz ist uns wichtig.</p>
      </div>
    </div>
  </section>

  <footer class="preview-footer">
    <div class="preview-footer__inner">
      <div class="preview-footer__grid">
        <div>
          <div class="preview-footer__brand">disfruto</div>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p class="preview-footer__newsletter-desc">Neue Sorten, Käsereien & Genuss-Tipps direkt ins Postfach.</p>
          <form class="preview-footer__newsletter-form" onsubmit="return false;">
            <input type="email" class="preview-footer__newsletter-input" placeholder="E-Mail-Adresse">
            <button type="submit" class="preview-footer__newsletter-btn">Anmelden</button>
          </form>
        </div>
        <div>
          <h4>Social</h4>
          <div class="preview-footer__social">
            <a href="#" aria-label="Instagram"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="Facebook"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          </div>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul>
            <li><a href="mailto:support@disfruto.de">support@disfruto.de</a></li>
            <li><a href="#">Kontaktformular</a></li>
          </ul>
        </div>
      </div>
      <div class="preview-footer__bottom">
        <span>&copy; 2026 disfruto</span>
        <div>
          <a href="#">Datenschutz</a>
          <a href="#">AGB</a>
          <a href="#">Impressum</a>
          <a href="#">Cookie-Einstellungen</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var items = document.querySelectorAll('.disfruto-why__item, .disfruto-why__manifesto');
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        items.forEach(function(item) { observer.observe(item); });
      } else {
        items.forEach(function(item) { item.classList.add('is-visible'); });
      }
    });
  </script>
</body>
</html>`;

const productHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Käse Genuss Set — Klassik | Disfruto</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #3A3A3A; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background: #F5F5F0; }
    img { max-width: 100%; display: block; }
    a { color: inherit; }
    ${css}

    .preview-announcement { background: #2D1A40; color: #fff; text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; }
    .preview-announcement a { color: #3dbdb5; text-decoration: underline; text-underline-offset: 2px; }
    .preview-header { background: #fff; border-bottom: 3px solid #1E4A47; position: sticky; top: 0; z-index: 100; }
    .preview-header__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .preview-header__left { display: flex; align-items: center; gap: 40px; }
    .preview-header__logo { text-decoration: none; display: flex; align-items: center; }
    .preview-header__logo img { height: 28px; width: auto; }
    .preview-header__nav { display: flex; align-items: center; gap: 28px; }
    .preview-header__nav a { font-size: 14px; font-weight: 600; color: #2D1A40; text-decoration: none; }
    .preview-header__nav a:hover { color: #1E4A47; }
    .preview-header__right { display: flex; align-items: center; gap: 10px; }
    .preview-header__login { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; color: #2D1A40; text-decoration: none; }
    .preview-header__cta { display: inline-flex; align-items: center; padding: 10px 24px; height: 40px; box-sizing: border-box; background: #1E4A47; color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 6px; border: 1px solid #1E4A47; }
    .preview-header__cta:hover { background: #163836; border-color: #163836; }
    .preview-header__flag { width: 26px; height: 18px; border-radius: 2px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .preview-header__flag span { flex: 1; }

    .preview-product { max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
    .preview-product__media { position: sticky; top: 100px; }
    .preview-product__media-main { background: #fff; border-radius: 16px; overflow: hidden; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border: 1px solid #E0E0DA; }
    .preview-product__media-main img { width: 100%; height: 100%; object-fit: cover; }
    .preview-product__media-thumbs { display: flex; gap: 12px; margin-top: 16px; }
    .preview-product__media-thumb { width: 80px; height: 80px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; cursor: pointer; background: #fff; }
    .preview-product__media-thumb--active { border-color: #1E4A47; }
    .preview-product__media-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .preview-product__info { display: flex; flex-direction: column; gap: 0; }
    .preview-product__vendor { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #1E4A47; margin-bottom: 8px; }
    .preview-product__title { font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 700; color: #2D1A40; line-height: 1.2; margin-bottom: 12px; }
    .preview-product__price { font-size: 24px; font-weight: 700; color: #2D1A40; margin-bottom: 4px; }
    .preview-product__price-note { font-size: 13px; color: #6B6B6B; margin-bottom: 20px; }
    .preview-product__buy-row { display: flex; gap: 12px; margin: 20px 0; }
    .preview-product__buy-btn { flex: 1; padding: 14px 28px; background: #1E4A47; color: #fff; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; border: none; border-radius: 8px; cursor: pointer; text-align: center; }
    .preview-product__buy-btn:hover { background: #163836; }
    .preview-product__buy-btn--secondary { background: transparent; border: 2px solid #2D1A40; color: #2D1A40; }
    .preview-product__buy-btn--secondary:hover { background: #2D1A40; color: #fff; }
    .preview-product__description { font-size: 15px; line-height: 1.7; color: #3A3A3A; margin: 16px 0; }
    .preview-product__accordion { border-top: 1px solid #E0E0DA; }
    .preview-product__accordion details { border-bottom: 1px solid #E0E0DA; }
    .preview-product__accordion summary { padding: 16px 0; font-size: 14px; font-weight: 600; color: #2D1A40; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; }
    .preview-product__accordion summary::-webkit-details-marker { display: none; }
    .preview-product__accordion summary::after { content: '+'; font-size: 18px; color: #1E4A47; transition: transform 0.2s; }
    .preview-product__accordion details[open] summary::after { content: '−'; }
    .preview-product__accordion .accordion-content { padding: 0 0 16px; font-size: 14px; line-height: 1.7; color: #6B6B6B; }

    .preview-footer { background: #F5F5F0; color: #3A3A3A; padding: 56px 0 0; border-top: 1px solid #E0E0DA; }
    .preview-footer__inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .preview-footer__grid { display: grid; grid-template-columns: 1.5fr 2.5fr 1fr 1.2fr; gap: 48px; align-items: start; padding-bottom: 40px; }
    .preview-footer__brand { font-family: 'Inter',sans-serif; font-size: 26px; font-weight: 700; color: #2D1A40; margin: 0; letter-spacing: -0.02em; }
    .preview-footer h4 { font-size: 14px; font-weight: 700; color: #2D1A40; margin: 0 0 12px; }
    .preview-footer__newsletter-desc { font-size: 13px; line-height: 1.6; color: #6B6B6B; margin: 0 0 16px; }
    .preview-footer__newsletter-form { display: flex; gap: 0; }
    .preview-footer__newsletter-input { flex: 1; padding: 10px 14px; border: 1px solid #D0D0CA; border-right: none; border-radius: 6px 0 0 6px; font-size: 14px; font-family: 'Inter', sans-serif; background: #fff; color: #3A3A3A; outline: none; }
    .preview-footer__newsletter-input::placeholder { color: #A0A09A; }
    .preview-footer__newsletter-input:focus { border-color: #1E4A47; }
    .preview-footer__newsletter-btn { padding: 10px 20px; background: #2D1A40; color: #fff; font-size: 13px; font-weight: 600; border: none; border-radius: 0 6px 6px 0; cursor: pointer; font-family: 'Inter', sans-serif; white-space: nowrap; }
    .preview-footer__newsletter-btn:hover { background: #3d2656; }
    .preview-footer__social { display: flex; gap: 16px; }
    .preview-footer__social a { color: #2D1A40; text-decoration: none; display: flex; align-items: center; }
    .preview-footer__social a:hover { color: #1E4A47; }
    .preview-footer ul { list-style: none; padding: 0; margin: 0; }
    .preview-footer li { margin-bottom: 8px; }
    .preview-footer a { font-size: 14px; color: #6B6B6B; text-decoration: none; }
    .preview-footer a:hover { color: #2D1A40; }
    .preview-footer__bottom { padding: 20px 24px; border-top: 1px solid #E0E0DA; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #A0A09A; max-width: 1200px; margin: 0 auto; }
    .preview-footer__bottom a { font-size: 12px; color: #A0A09A; text-decoration: none; margin-left: 20px; }
    .preview-footer__bottom a:hover { color: #2D1A40; }

    @media (max-width: 989px) {
      .preview-product { grid-template-columns: 1fr; gap: 32px; padding: 24px 16px 60px; }
      .preview-product__media { position: static; }
      .preview-product__title { font-size: 26px; }
      .preview-header__nav { display: none; }
      .preview-footer__grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    }
    @media (max-width: 599px) {
      .preview-footer__grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="preview-announcement">
    Dein 1. Käse Genuss Set <a href="#">gratis</a> — Nur für kurze Zeit!
  </div>

  <header class="preview-header">
    <div class="disfruto-container">
      <div class="preview-header__inner">
        <div class="preview-header__left">
          <a href="/" class="preview-header__logo"><img src="/assets/disfruto-logo.png" alt="Disfruto" width="120" height="28"></a>
          <nav class="preview-header__nav">
            <a href="/pages/unser-kaese">Unser Käse</a>
            <a href="/pages/so-funktionierts">So funktioniert's</a>
            <a href="/pages/kaesemacher">Käsemacher</a>
            <a href="/pages/faqs">FAQs</a>
          </nav>
        </div>
        <div class="preview-header__right">
          <a href="#" class="preview-header__login">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Login
          </a>
          <a href="#" class="preview-header__cta">GENUSS SET WÄHLEN</a>
          <div class="preview-header__flag">
            <span style="background:#000"></span>
            <span style="background:#DD0000"></span>
            <span style="background:#FFCC00"></span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main class="preview-product">
    <div class="preview-product__media">
      <div class="preview-product__media-main">
        <img src="/assets/disfruto-hero.png" alt="Käse Genuss Set — Klassik">
      </div>
      <div class="preview-product__media-thumbs">
        <div class="preview-product__media-thumb preview-product__media-thumb--active">
          <img src="/assets/disfruto-hero.png" alt="Thumbnail 1">
        </div>
        <div class="preview-product__media-thumb" style="background: #F5F5F0; display: flex; align-items: center; justify-content: center;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1E4A47" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
        <div class="preview-product__media-thumb" style="background: #F5F5F0; display: flex; align-items: center; justify-content: center;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1E4A47" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
      </div>
    </div>

    <div class="preview-product__info">
      <div class="preview-product__vendor">DISFRUTO</div>
      <h1 class="preview-product__title">Käse Genuss Set — Klassik</h1>

      <div class="disfruto-product__badges">
        <div class="disfruto-product__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13.5 2.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>
          <span>100% Natürlich</span>
        </div>
        <div class="disfruto-product__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>Handwerklich hergestellt</span>
        </div>
        <div class="disfruto-product__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>Regionale Höfe</span>
        </div>
        <div class="disfruto-product__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Kleine Chargen</span>
        </div>
      </div>

      <div class="preview-product__price">€29,90 <span style="font-size: 16px; font-weight: 400; color: #6B6B6B;">/ Lieferung</span></div>
      <div class="preview-product__price-note">inkl. MwSt. • Kostenloser Versand in Berlin</div>

      <div class="disfruto-product__subscription">
        <div class="disfruto-product__sub-heading">Dein Käse-Abo</div>
        <div class="disfruto-product__sub-items">
          <div class="disfruto-product__sub-item">
            <div class="disfruto-product__sub-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="disfruto-product__sub-text">
              <span class="disfruto-product__sub-label">Alle 2 oder 4 Wochen</span>
              <span class="disfruto-product__sub-sublabel">Du wählst deinen Rhythmus</span>
            </div>
          </div>
          <div class="disfruto-product__sub-item">
            <div class="disfruto-product__sub-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </div>
            <div class="disfruto-product__sub-text">
              <span class="disfruto-product__sub-label">Jederzeit pausieren</span>
              <span class="disfruto-product__sub-sublabel">Flexibel & ohne Bindung</span>
            </div>
          </div>
          <div class="disfruto-product__sub-item">
            <div class="disfruto-product__sub-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div class="disfruto-product__sub-text">
              <span class="disfruto-product__sub-label">Berlin-Lieferung Do–So</span>
              <span class="disfruto-product__sub-sublabel">Frisch & gekühlt an deine Tür</span>
            </div>
          </div>
        </div>
      </div>

      <div class="disfruto-product__delivery">
        <div class="disfruto-product__delivery-eyebrow">LIEFERGEBIET</div>
        <div class="disfruto-product__delivery-text">Nur Berlin • Zustellung Do–So</div>
        <div class="disfruto-product__delivery-note">Frisch verpackt, gekühlt geliefert</div>
      </div>

      <div class="preview-product__buy-row">
        <button class="preview-product__buy-btn">ABO STARTEN</button>
      </div>

      <div class="disfruto-product__tasting">
        <h3 class="disfruto-product__tasting-title">Geschmacksprofil</h3>
        <div class="disfruto-product__tasting-grid">
          <div class="disfruto-product__tasting-row">
            <span class="disfruto-product__tasting-label">Milch</span>
            <span class="disfruto-product__tasting-value">Kuhmilch</span>
          </div>
          <div class="disfruto-product__tasting-row">
            <span class="disfruto-product__tasting-label">Textur</span>
            <span class="disfruto-product__tasting-value">Cremig & geschmeidig</span>
          </div>
          <div class="disfruto-product__tasting-row">
            <span class="disfruto-product__tasting-label">Intensität</span>
            <span class="disfruto-product__tasting-value">
              <span class="disfruto-product__intensity">
                <span class="disfruto-product__intensity-dot disfruto-product__intensity-dot--active"></span>
                <span class="disfruto-product__intensity-dot disfruto-product__intensity-dot--active"></span>
                <span class="disfruto-product__intensity-dot disfruto-product__intensity-dot--active"></span>
                <span class="disfruto-product__intensity-dot"></span>
                <span class="disfruto-product__intensity-dot"></span>
              </span>
            </span>
          </div>
          <div class="disfruto-product__tasting-row">
            <span class="disfruto-product__tasting-label">Reifung</span>
            <span class="disfruto-product__tasting-value">8–12 Wochen gereift</span>
          </div>
          <div class="disfruto-product__tasting-row">
            <span class="disfruto-product__tasting-label">Aromen</span>
            <span class="disfruto-product__tasting-value">Nussig, leicht salzig, lange Finish</span>
          </div>
          <div class="disfruto-product__tasting-row">
            <span class="disfruto-product__tasting-label">Passt zu</span>
            <span class="disfruto-product__tasting-value">Riesling, Sauerteig, Feigensenf</span>
          </div>
        </div>
      </div>

      <p class="preview-product__description">
        Unser Klassik-Set bringt dir jeden Monat eine handverlesene Auswahl aus 4–5 Käsesorten von kleinen Hofkäsereien aus Norddeutschland. Jede Lieferung erzählt eine Geschichte — von den Weiden Nordfrieslands bis auf deinen Tisch in Berlin.
      </p>

      <div class="preview-product__accordion">
        <details>
          <summary>Zutaten & Allergene</summary>
          <div class="accordion-content">
            <p>Pasteurisierte Kuhmilch, Salz, mikrobielle Labaustauschstoffe, Milchsäurekulturen. Kann Spuren von Nüssen enthalten.</p>
            <p style="margin-top: 8px;"><strong>Allergene:</strong> Milch, Laktose</p>
          </div>
        </details>
        <details>
          <summary>Herkunft & Produzent</summary>
          <div class="accordion-content">
            <p>Unsere Käse stammen von ausgewählten Hofkäsereien aus Schleswig-Holstein und Niedersachsen. Jeder Produzent arbeitet nach traditionellen Methoden mit Milch von freilaufenden Kühen.</p>
          </div>
        </details>
        <details>
          <summary>Lagerung & Haltbarkeit</summary>
          <div class="accordion-content">
            <p>Kühl lagern bei 2–6°C. Nach Erhalt innerhalb von 14 Tagen verzehren. Vor dem Servieren ca. 30 Minuten bei Raumtemperatur ruhen lassen — so entfaltet sich das volle Aroma.</p>
          </div>
        </details>
        <details>
          <summary>Versand & Lieferung</summary>
          <div class="accordion-content">
            <p>Lieferung ausschließlich innerhalb Berlins. Zustellung Donnerstag bis Sonntag. Alle Sendungen werden gekühlt und nachhaltig verpackt. Kostenloser Versand ab der ersten Bestellung.</p>
          </div>
        </details>
      </div>
    </div>
  </main>

  <footer class="preview-footer">
    <div class="preview-footer__inner">
      <div class="preview-footer__grid">
        <div>
          <div class="preview-footer__brand">disfruto</div>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p class="preview-footer__newsletter-desc">Neue Sorten, Käsereien & Genuss-Tipps direkt ins Postfach.</p>
          <form class="preview-footer__newsletter-form" onsubmit="return false;">
            <input type="email" class="preview-footer__newsletter-input" placeholder="E-Mail-Adresse">
            <button type="submit" class="preview-footer__newsletter-btn">Anmelden</button>
          </form>
        </div>
        <div>
          <h4>Social</h4>
          <div class="preview-footer__social">
            <a href="#" aria-label="Instagram"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="Facebook"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          </div>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul>
            <li><a href="mailto:support@disfruto.de">support@disfruto.de</a></li>
            <li><a href="#">Kontaktformular</a></li>
          </ul>
        </div>
      </div>
      <div class="preview-footer__bottom">
        <span>&copy; 2026 disfruto</span>
        <div>
          <a href="#">Datenschutz</a>
          <a href="#">AGB</a>
          <a href="#">Impressum</a>
          <a href="#">Cookie-Einstellungen</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;

function buildPageHtml(title, bodyContent) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Disfruto</title>
  <link rel="stylesheet" href="/assets/disfruto.css">
  <style>
    body { margin: 0; font-family: 'Inter', sans-serif; background: var(--disfruto-cream); color: var(--disfruto-dark); }
    .preview-announcement { background: var(--disfruto-dark); color: white; text-align: center; padding: 10px 16px; font-size: 14px; }
    .preview-announcement a { color: #3dbdb5; font-weight: 600; }
    .preview-header { background: white; border-bottom: 1px solid #E8E8E3; padding: 0 24px; position: sticky; top: 0; z-index: 100; }
    .preview-header__inner { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; height: 64px; }
    .preview-header__left { display: flex; align-items: center; gap: 40px; }
    .preview-header__logo img { height: 28px; width: auto; }
    .preview-header__nav { display: flex; gap: 28px; }
    .preview-header__nav a { text-decoration: none; color: var(--disfruto-dark); font-size: 15px; font-weight: 500; }
    .preview-header__nav a:hover { color: var(--disfruto-dark-green); }
    .preview-header__right { display: flex; align-items: center; gap: 16px; }
    .preview-header__login { display: flex; align-items: center; gap: 6px; text-decoration: none; color: var(--disfruto-dark); font-size: 14px; }
    .preview-header__cta { background: var(--disfruto-dark-green); color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase; }
    .preview-header__flag { font-size: 22px; }
    .page-hero { background: white; padding: 64px 24px 48px; text-align: center; border-bottom: 1px solid #E8E8E3; }
    .page-hero h1 { font-family: 'Inter', sans-serif; font-size: 44px; font-weight: 700; color: var(--disfruto-dark); margin: 0 0 12px; }
    .page-hero p { font-size: 17px; color: #6B6B6B; max-width: 600px; margin: 0 auto; line-height: 1.6; }
    .disfruto-unser-kaese { padding: 48px 0 56px; }
    .disfruto-uk__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; max-width: 960px; margin: 0 auto; }
    .disfruto-uk__left { min-width: 0; }
    .disfruto-uk__image { border-radius: 16px; overflow: hidden; background: #F0EBE1; }
    .disfruto-uk__image img { width: 100%; height: auto; display: block; border-radius: 16px; }
    .disfruto-uk__image-placeholder { width: 100%; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; background: linear-gradient(145deg, #EDEDE8 0%, #E2E0D8 100%); border-radius: 16px; }
    .disfruto-uk__image-caption { text-align: center; font-size: 13px; color: #999; font-style: italic; margin: 12px 0 24px; }
    .disfruto-uk__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .disfruto-uk__stat { background: white; border: 1px solid #E8E8E3; border-radius: 12px; padding: 20px 16px; text-align: center; transition: border-color 0.2s; }
    .disfruto-uk__stat:hover { border-color: #1E4A47; }
    .disfruto-uk__stat-value { font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 700; color: #2D1A40; line-height: 1.15; }
    .disfruto-uk__stat-label { font-size: 13px; color: #777; margin-top: 4px; line-height: 1.35; }
    .disfruto-uk__price { text-align: center; padding-top: 8px; }
    .disfruto-uk__price-amount { font-family: 'Inter', sans-serif; font-size: 36px; font-weight: 700; color: #2D1A40; letter-spacing: -0.5px; }
    .disfruto-uk__price-note { display: block; font-size: 14px; color: #999; margin-top: 4px; }
    .disfruto-uk__right { min-width: 0; }
    .disfruto-uk__heading { font-family: 'Inter', sans-serif; font-size: 36px; font-weight: 700; color: #2D1A40; margin: 0 0 24px; line-height: 1.15; letter-spacing: -0.5px; }
    .disfruto-uk__subheading { font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 700; color: #2D1A40; margin: 32px 0 16px; line-height: 1.2; letter-spacing: -0.3px; }
    .disfruto-uk__bullets { display: flex; flex-direction: column; gap: 16px; }
    .disfruto-uk__bullet { display: flex; gap: 12px; align-items: flex-start; }
    .disfruto-uk__bullet-dot { width: 8px; height: 8px; min-width: 8px; border-radius: 50%; background: #1E4A47; margin-top: 7px; flex-shrink: 0; }
    .disfruto-uk__bullet-text { font-size: 15px; color: #555; line-height: 1.7; margin: 0; }
    .disfruto-uk__bullet-text strong { color: #2D1A40; font-weight: 600; }
    .disfruto-uk__cta-banner { background: #1E4A47; text-align: center; padding: 80px 24px; }
    .disfruto-uk__cta-title { font-family: 'Inter', sans-serif; font-size: 36px; font-weight: 700; color: white; margin: 0 0 12px; letter-spacing: -0.5px; }
    .disfruto-uk__cta-sub { font-size: 16px; color: rgba(255,255,255,0.65); margin: 0 0 32px; }
    .disfruto-uk__cta-btn { display: inline-block; background: transparent; color: white !important; padding: 16px 40px; border-radius: 50px; font-weight: 700; font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; border: 2px solid white; transition: background 0.2s, color 0.2s, transform 0.15s; }
    .disfruto-uk__cta-btn:hover { background: white; color: #1E4A47 !important; transform: translateY(-1px); }
    @media (max-width: 899px) { .disfruto-uk__grid { gap: 36px; } }
    @media (max-width: 767px) { .disfruto-uk__grid { grid-template-columns: 1fr; gap: 32px; } .disfruto-uk__left { max-width: 420px; margin: 0 auto; } .disfruto-uk__heading { font-size: 28px; } .disfruto-uk__subheading { font-size: 20px; } .disfruto-uk__cta-title { font-size: 28px; } .disfruto-uk__cta-banner { padding: 56px 24px; } .disfruto-unser-kaese { padding: 36px 0 40px; } }
    @media (max-width: 599px) { .disfruto-uk__stats { gap: 8px; } .disfruto-uk__stat { padding: 16px 10px; } .disfruto-uk__stat-value { font-size: 26px; } .disfruto-uk__price-amount { font-size: 30px; } .disfruto-uk__heading { font-size: 26px; } .disfruto-uk__subheading { font-size: 18px; } .disfruto-uk__cta-title { font-size: 24px; } .disfruto-unser-kaese { padding: 28px 0 32px; } }
    .preview-footer { background: #F5F5F0; border-top: 1px solid #E8E8E3; padding: 48px 24px 0; }
    .preview-footer__inner { max-width: 1200px; margin: 0 auto; }
    .preview-footer__grid { display: grid; grid-template-columns: 1fr 1.5fr 1fr 1fr; gap: 40px; padding-bottom: 40px; }
    .preview-footer__brand { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 24px; color: var(--disfruto-dark); letter-spacing: -0.5px; }
    .preview-footer h4 { font-size: 14px; font-weight: 600; color: var(--disfruto-dark); margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px; }
    .preview-footer ul { list-style: none; padding: 0; margin: 0; }
    .preview-footer ul li { margin-bottom: 8px; }
    .preview-footer ul a { text-decoration: none; color: #6B6B6B; font-size: 14px; }
    .preview-footer ul a:hover { color: var(--disfruto-dark-green); }
    .preview-footer__newsletter-desc { font-size: 14px; color: #6B6B6B; margin: 0 0 12px; line-height: 1.5; }
    .preview-footer__newsletter-form { display: flex; gap: 8px; }
    .preview-footer__newsletter-input { flex: 1; padding: 10px 14px; border: 1px solid #D0D0CB; border-radius: 8px; font-size: 14px; background: white; outline: none; }
    .preview-footer__newsletter-btn { background: var(--disfruto-dark-green); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
    .preview-footer__social { display: flex; gap: 12px; }
    .preview-footer__social a { color: #6B6B6B; transition: color 0.2s; }
    .preview-footer__social a:hover { color: var(--disfruto-dark-green); }
    .preview-footer__bottom { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-top: 1px solid #E8E8E3; font-size: 13px; color: #999; }
    .preview-footer__bottom a { color: #999; text-decoration: none; margin-left: 20px; }
    .preview-footer__bottom a:hover { color: var(--disfruto-dark-green); }
    @media (max-width: 899px) { .preview-footer__grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
    @media (max-width: 549px) { .preview-footer__grid { grid-template-columns: 1fr; } .preview-header__nav { display: none; } }
  </style>
</head>
<body>
  <div class="preview-announcement">Dein 1. Käse Genuss Set <a href="#">gratis</a> — Nur für kurze Zeit!</div>
  <header class="preview-header">
    <div class="preview-header__inner">
      <div class="preview-header__left">
        <a href="/" class="preview-header__logo"><img src="/assets/disfruto-logo.png" alt="Disfruto"></a>
        <nav class="preview-header__nav">
          <a href="/pages/unser-kaese">Unser Käse</a>
          <a href="/pages/so-funktionierts">So funktioniert's</a>
          <a href="/pages/kaesemacher">Käsemacher</a>
          <a href="/pages/faqs">FAQs</a>
        </nav>
      </div>
      <div class="preview-header__right">
        <a href="#" class="preview-header__login"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Login</a>
        <a href="/product" class="preview-header__cta">GENUSS SET WÄHLEN</a>
        <span class="preview-header__flag">🇩🇪</span>
      </div>
    </div>
  </header>
  <main>${bodyContent}</main>
  <footer class="preview-footer">
    <div class="preview-footer__inner">
      <div class="preview-footer__grid">
        <div><div class="preview-footer__brand">disfruto</div></div>
        <div>
          <h4>Newsletter</h4>
          <p class="preview-footer__newsletter-desc">Neue Sorten, Käsereien & Genuss-Tipps direkt ins Postfach.</p>
          <form class="preview-footer__newsletter-form" onsubmit="return false;">
            <input type="email" class="preview-footer__newsletter-input" placeholder="E-Mail-Adresse">
            <button type="submit" class="preview-footer__newsletter-btn">Anmelden</button>
          </form>
        </div>
        <div>
          <h4>Social</h4>
          <div class="preview-footer__social">
            <a href="#" aria-label="Instagram"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="Facebook"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          </div>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul>
            <li><a href="mailto:support@disfruto.de">support@disfruto.de</a></li>
            <li><a href="#">Kontaktformular</a></li>
          </ul>
        </div>
      </div>
      <div class="preview-footer__bottom">
        <span>&copy; 2026 disfruto</span>
        <div>
          <a href="#">Datenschutz</a>
          <a href="#">AGB</a>
          <a href="#">Impressum</a>
          <a href="#">Cookie-Einstellungen</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

const unseresKaeseBody = `
  <section class="disfruto-section disfruto-unser-kaese">
    <div class="disfruto-container">
      <div class="disfruto-uk__grid">
        <div class="disfruto-uk__left">
          <div class="disfruto-uk__image">
            <img src="https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&h=600&fit=crop&q=80" alt="Kuratierte Käse-Auswahl – Beispiel einer Disfruto Lieferung" loading="lazy">
          </div>
          <p class="disfruto-uk__image-caption">Beispiel einer Lieferung. Zusammenstellung variiert.</p>
          <div class="disfruto-uk__stats">
            <div class="disfruto-uk__stat"><div class="disfruto-uk__stat-value">4</div><div class="disfruto-uk__stat-label">Käsesorten pro Lieferung</div></div>
            <div class="disfruto-uk__stat"><div class="disfruto-uk__stat-value">600g</div><div class="disfruto-uk__stat-label">Mindestgewicht</div></div>
            <div class="disfruto-uk__stat"><div class="disfruto-uk__stat-value">1</div><div class="disfruto-uk__stat-label">Käserei im Fokus</div></div>
            <div class="disfruto-uk__stat"><div class="disfruto-uk__stat-value">∞</div><div class="disfruto-uk__stat-label">Kombinationen</div></div>
          </div>
          <div class="disfruto-uk__price">
            <span class="disfruto-uk__price-amount">€ 39.99</span>
            <span class="disfruto-uk__price-note">inkl. MwSt & Versandkosten</span>
          </div>
        </div>
        <div class="disfruto-uk__right">
          <h1 class="disfruto-uk__heading">Unser Konzept</h1>
          <div class="disfruto-uk__bullets">
            <div class="disfruto-uk__bullet"><span class="disfruto-uk__bullet-dot"></span><p class="disfruto-uk__bullet-text">Jede Lieferung enthält <strong>vier unterschiedliche Käsesorten</strong> aus einer europäischen Käserei, die im Mittelpunkt steht. Mindestens <strong>600 g Käse</strong> pro Lieferung.</p></div>
            <div class="disfruto-uk__bullet"><span class="disfruto-uk__bullet-dot"></span><p class="disfruto-uk__bullet-text">Pro Lieferung steht <strong>eine Käserei im Mittelpunkt</strong> – so lernst du mit jeder Box eine neue handwerkliche Tradition kennen.</p></div>
          </div>
          <h2 class="disfruto-uk__subheading">Genussempfehlung</h2>
          <div class="disfruto-uk__bullets">
            <div class="disfruto-uk__bullet"><span class="disfruto-uk__bullet-dot"></span><p class="disfruto-uk__bullet-text"><strong>Portionierung:</strong> Als Hauptgericht reicht eine Lieferung für ca. 3 Portionen. Als Teil eines Dinner-Snacks für ca. 6 Portionen.</p></div>
            <div class="disfruto-uk__bullet"><span class="disfruto-uk__bullet-dot"></span><p class="disfruto-uk__bullet-text"><strong>Lagerung & Temperatur:</strong> Den Käse bitte bei max. 7 °C lagern. Für den optimalen Geschmack empfehlen wir, den Käse ca. 30 Minuten vor dem Servieren aus dem Kühlschrank zu nehmen.</p></div>
          </div>
          <h2 class="disfruto-uk__subheading">Lieferung</h2>
          <div class="disfruto-uk__bullets">
            <div class="disfruto-uk__bullet"><span class="disfruto-uk__bullet-dot"></span><p class="disfruto-uk__bullet-text">Lieferrhythmus: alle <strong>2 oder 4 Wochen</strong> – du wählst deinen Rhythmus.</p></div>
            <div class="disfruto-uk__bullet"><span class="disfruto-uk__bullet-dot"></span><p class="disfruto-uk__bullet-text">Lieferslots von <strong>Donnerstag bis Sonntag</strong> – direkt an deine Haustür.</p></div>
            <div class="disfruto-uk__bullet"><span class="disfruto-uk__bullet-dot"></span><p class="disfruto-uk__bullet-text"><strong>Sehr kurze Lieferstrecke:</strong> Von unserer gekühlten Lagerung ist der Käse innerhalb von max. 45 Minuten in isolierten Thermotaschen bei dir an der Haustür.</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="disfruto-section disfruto-uk__cta-banner">
    <div class="disfruto-container">
      <h2 class="disfruto-uk__cta-title">Bereit für deine erste Lieferung</h2>
      <p class="disfruto-uk__cta-sub">Kuratierter Käse. Regelmäßig neu zusammengestellt.</p>
      <a href="/product" class="disfruto-btn disfruto-uk__cta-btn">GENUSS SET ABONNIEREN</a>
    </div>
  </section>`;

const soFunktioniertsBody = `
  <div class="page-hero">
    <h1>So funktioniert's</h1>
    <p>In nur drei Schritten zu deinem persönlichen Käse-Erlebnis — kuratiert, geliefert, genossen.</p>
  </div>
  <section class="disfruto-section disfruto-how-it-works">
    <div class="disfruto-container">
      <div class="disfruto-how-it-works__steps">
        <div class="disfruto-how-it-works__step">
          <div class="disfruto-how-it-works__step-number">1</div>
          <h3 class="disfruto-how-it-works__step-title">Genuss Set wählen</h3>
          <p class="disfruto-how-it-works__step-text">Wähle zwischen unserem Klassik oder Premium Set — je nach deinem Geschmack und Appetit. Beide Sets werden von unseren Käse-Experten sorgfältig zusammengestellt.</p>
        </div>
        <div class="disfruto-how-it-works__step">
          <div class="disfruto-how-it-works__step-number">2</div>
          <h3 class="disfruto-how-it-works__step-title">Lieferrhythmus bestimmen</h3>
          <p class="disfruto-how-it-works__step-text">Entscheide, ob du alle 2 oder alle 4 Wochen beliefert werden möchtest. Wähle deinen bevorzugten Liefertag (Do–So). Flexibel änderbar, jederzeit pausierbar.</p>
        </div>
        <div class="disfruto-how-it-works__step">
          <div class="disfruto-how-it-works__step-number">3</div>
          <h3 class="disfruto-how-it-works__step-title">Genießen & entdecken</h3>
          <p class="disfruto-how-it-works__step-text">Deine kuratierte Käse-Box kommt frisch an deine Tür in Berlin. Mit Tasting Notes, Herkunftsgeschichten und Genuss-Tipps zu jeder Sorte.</p>
        </div>
      </div>
      <div class="disfruto-how-it-works__cta">
        <a href="/product" class="disfruto-btn disfruto-btn--warm">Genuss Set wählen</a>
      </div>
    </div>
  </section>
  <section class="disfruto-section disfruto-story">
    <div class="disfruto-container">
      <div class="disfruto-story__grid">
        <div class="disfruto-story__image">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:400px;">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none"><rect x="15" y="25" width="70" height="50" rx="8" fill="#C4A882" opacity="0.3"/><text x="50" y="55" text-anchor="middle" fill="#1E4A47" font-family="Georgia" font-size="12">Käse Auswahl</text></svg>
          </div>
        </div>
        <div class="disfruto-story__content">
          <span class="disfruto-story__eyebrow">Unser Konzept</span>
          <h2 class="disfruto-story__title">Käse mit Charakter. Bewusst ausgewählt.</h2>
          <p class="disfruto-story__text">Jede Box ist eine Reise durch die besten Käsereien Europas. Wir wählen handwerklich hergestellte Käsesorten aus, die du in keinem Supermarkt findest — direkt zu dir nach Hause in Berlin.</p>
          <a href="/product" class="disfruto-btn disfruto-btn--warm">Mehr erfahren</a>
        </div>
      </div>
    </div>
  </section>
  <section id="faq" class="disfruto-section disfruto-faq">
    <div class="disfruto-container">
      <div class="disfruto-faq__header">
        <span class="disfruto-faq__eyebrow">Noch Fragen?</span>
        <h2 class="disfruto-faq__title">Häufige Fragen zum Ablauf</h2>
      </div>
      <div class="disfruto-faq__list">
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Wie oft wird geliefert?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Du kannst zwischen zwei Lieferintervallen wählen: alle 2 Wochen oder alle 4 Wochen. Dein Abo kannst du jederzeit anpassen.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">An welchen Tagen wird geliefert?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Wir liefern donnerstags bis sonntags in ganz Berlin. Du wählst bei der Bestellung deinen bevorzugten Liefertag.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Kann ich mein Abo pausieren?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Ja, du kannst dein Abonnement jederzeit pausieren, überspringen oder kündigen — ganz ohne Bindung oder versteckte Kosten.</p></div></details>
      </div>
    </div>
  </section>`;

const kaesemacherBody = `
  <div class="page-hero">
    <h1>Käsemacher</h1>
    <p>Wir arbeiten mit den besten handwerklichen Käsereien Europas zusammen. Jeder Käsemacher steht für Tradition, Qualität und Hingabe.</p>
  </div>
  <section class="disfruto-section disfruto-makers-page">
    <div class="disfruto-container">
      <div class="disfruto-makers-page__grid">
        <div class="disfruto-makers-page__card">
          <div class="disfruto-makers-page__card-image"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:280px;"><svg width="60" height="60" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="32" r="16" fill="#1E4A47" opacity="0.15"/><path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="#1E4A47" opacity="0.1"/></svg></div></div>
          <div class="disfruto-makers-page__card-content">
            <h3 class="disfruto-makers-page__card-name">Familie Schönberg</h3>
            <span class="disfruto-makers-page__card-region">Nordfriesland, Deutschland</span>
            <p class="disfruto-makers-page__card-text">Seit drei Generationen stellt Familie Schönberg auf ihrer kleinen Hofkäserei in Nordfriesland handwerklichen Käse her. Ihre Kühe grasen auf den salzigen Weiden der Nordseeküste.</p>
            <span class="disfruto-makers-page__card-specialty">Spezialität: Nordfriesischer Deichkäse</span>
          </div>
        </div>
        <div class="disfruto-makers-page__card">
          <div class="disfruto-makers-page__card-image"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:280px;"><svg width="60" height="60" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="32" r="16" fill="#1E4A47" opacity="0.15"/><path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="#1E4A47" opacity="0.1"/></svg></div></div>
          <div class="disfruto-makers-page__card-content">
            <h3 class="disfruto-makers-page__card-name">Pierre & Claire Dubois</h3>
            <span class="disfruto-makers-page__card-region">Auvergne, Frankreich</span>
            <p class="disfruto-makers-page__card-text">In den vulkanischen Highlands der Auvergne reifen die Käse von Pierre und Claire in natürlichen Höhlen. Ihre Methoden sind seit 150 Jahren unverändert.</p>
            <span class="disfruto-makers-page__card-specialty">Spezialität: Höhlen-gereifter Blauschimmel</span>
          </div>
        </div>
        <div class="disfruto-makers-page__card">
          <div class="disfruto-makers-page__card-image"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:280px;"><svg width="60" height="60" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="32" r="16" fill="#1E4A47" opacity="0.15"/><path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="#1E4A47" opacity="0.1"/></svg></div></div>
          <div class="disfruto-makers-page__card-content">
            <h3 class="disfruto-makers-page__card-name">Marco Benedetti</h3>
            <span class="disfruto-makers-page__card-region">Piemont, Italien</span>
            <p class="disfruto-makers-page__card-text">Marco Benedetti pflegt die piemontesische Käsetradition mit Milch von seinen eigenen Ziegen. Jeder Laib wird von Hand geformt und mindestens 6 Monate gereift.</p>
            <span class="disfruto-makers-page__card-specialty">Spezialität: Piemonteser Ziegenkäse</span>
          </div>
        </div>
        <div class="disfruto-makers-page__card">
          <div class="disfruto-makers-page__card-image"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:280px;"><svg width="60" height="60" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="32" r="16" fill="#1E4A47" opacity="0.15"/><path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="#1E4A47" opacity="0.1"/></svg></div></div>
          <div class="disfruto-makers-page__card-content">
            <h3 class="disfruto-makers-page__card-name">Heidi & Thomas Berger</h3>
            <span class="disfruto-makers-page__card-region">Allgäu, Deutschland</span>
            <p class="disfruto-makers-page__card-text">Auf 1.200 Meter Höhe im Allgäu produzieren Heidi und Thomas ihren berühmten Bergkäse. Nur Heumilch von ihren eigenen Kühen, gereift in den kühlen Kellern ihrer Alpe.</p>
            <span class="disfruto-makers-page__card-specialty">Spezialität: Allgäuer Bergkäse</span>
          </div>
        </div>
        <div class="disfruto-makers-page__card">
          <div class="disfruto-makers-page__card-image"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:280px;"><svg width="60" height="60" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="32" r="16" fill="#1E4A47" opacity="0.15"/><path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="#1E4A47" opacity="0.1"/></svg></div></div>
          <div class="disfruto-makers-page__card-content">
            <h3 class="disfruto-makers-page__card-name">Anke van der Berg</h3>
            <span class="disfruto-makers-page__card-region">Gouda, Niederlande</span>
            <p class="disfruto-makers-page__card-text">Anke führt eine der letzten traditionellen Boerenkaas-Käsereien in der Region Gouda. Ihr Käse wird ausschließlich aus roher Weidemilch hergestellt und bis zu 36 Monate gereift.</p>
            <span class="disfruto-makers-page__card-specialty">Spezialität: Boerenkaas Gouda</span>
          </div>
        </div>
        <div class="disfruto-makers-page__card">
          <div class="disfruto-makers-page__card-image"><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:280px;"><svg width="60" height="60" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="32" r="16" fill="#1E4A47" opacity="0.15"/><path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="#1E4A47" opacity="0.1"/></svg></div></div>
          <div class="disfruto-makers-page__card-content">
            <h3 class="disfruto-makers-page__card-name">Josef & Anna Gruber</h3>
            <span class="disfruto-makers-page__card-region">Tirol, Österreich</span>
            <p class="disfruto-makers-page__card-text">Im Herzen Tirols stellt Familie Gruber traditionellen Graukäse her — einen der ältesten Käse der Alpenregion. Fettarm, charakterstark und unverwechselbar im Geschmack.</p>
            <span class="disfruto-makers-page__card-specialty">Spezialität: Tiroler Graukäse</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;

const faqsBody = `
  <div class="page-hero">
    <h1>FAQs</h1>
    <p>Hier findest du Antworten auf die häufigsten Fragen rund um Disfruto.</p>
  </div>
  <section id="faq" class="disfruto-section disfruto-faq">
    <div class="disfruto-container">
      <div class="disfruto-faq__list">
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Was ist Disfruto?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Disfruto ist ein Käse-Abonnement, das dir kuratierte Käse-Spezialitäten direkt an die Tür in Berlin liefert. Jede Box enthält handverlesene Sorten von den besten Käsemachern Europas.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Wie oft wird geliefert?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Du kannst zwischen zwei Lieferintervallen wählen: alle 2 Wochen oder alle 4 Wochen. Dein Abo kannst du jederzeit anpassen.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">An welchen Tagen wird geliefert?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Wir liefern donnerstags bis sonntags in ganz Berlin. Du wählst bei der Bestellung deinen bevorzugten Liefertag.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Kann ich mein Abo pausieren oder kündigen?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Ja, du kannst dein Abonnement jederzeit pausieren, überspringen oder kündigen — ganz ohne Bindung oder versteckte Kosten.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Liefert ihr auch außerhalb von Berlin?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Aktuell liefern wir nur innerhalb Berlins, um die Frische und Qualität unserer Käse-Spezialitäten zu garantieren. Eine Expansion ist geplant.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Ist die Lieferung kostenlos?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Ja, die Lieferung ist für alle Abonnenten in Berlin komplett kostenlos — egal ob du alle 2 oder alle 4 Wochen bestellst.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Was ist im Genuss Set enthalten?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Jedes Genuss Set enthält 3–5 handverlesene Käsesorten (je nach Klassik oder Premium), dazu Tasting Notes mit Herkunftsgeschichten, Genuss-Tipps und passenden Begleitern.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Wie werden die Käse transportiert?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Alle Käse werden in einer gekühlten, nachhaltigen Verpackung geliefert, damit sie frisch und in perfektem Zustand bei dir ankommen.</p></div></details>
        <details class="disfruto-faq__item"><summary class="disfruto-faq__question"><span class="disfruto-faq__question-text">Kann ich ein Abo verschenken?</span><span class="disfruto-faq__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></summary><div class="disfruto-faq__answer"><p>Ja! Unser Geschenkabo ist das perfekte Geschenk für Käseliebhaber. Du wählst die Laufzeit, wir kümmern uns um den Rest.</p></div></details>
      </div>
    </div>
  </section>`;

const pageHtmlMap = {
  'unser-kaese': buildPageHtml('Unser Käse', unseresKaeseBody),
  'so-funktionierts': buildPageHtml("So funktioniert's", soFunktioniertsBody),
  'kaesemacher': buildPageHtml('Käsemacher', kaesemacherBody),
  'faqs': buildPageHtml('FAQs', faqsBody),
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/assets/')) {
    const filePath = path.join(__dirname, '..', req.url);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const file = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache, no-store, must-revalidate' });
      res.end(file);
      return;
    }
  }
  const pageMatch = req.url.match(/^\/pages\/([a-z-]+)/);
  if (pageMatch && pageHtmlMap[pageMatch[1]]) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(pageHtmlMap[pageMatch[1]]);
    return;
  }
  if (req.url === '/product' || req.url.startsWith('/product?') || req.url.startsWith('/products/')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(productHtml);
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Disfruto preview server running on port ' + PORT);
});
