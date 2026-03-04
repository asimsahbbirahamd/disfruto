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
    .preview-announcement { background: #1E1B3A; color: #fff; text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; }
    .preview-announcement a { color: #D4A853; text-decoration: underline; text-underline-offset: 2px; }
    .preview-header { background: #fff; border-bottom: 3px solid #2D4A3E; position: sticky; top: 0; z-index: 100; }
    .preview-header__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .preview-header__left { display: flex; align-items: center; gap: 40px; }
    .preview-header__logo { text-decoration: none; display: flex; align-items: center; }
    .preview-header__logo img { height: 28px; width: auto; }
    .preview-header__nav { display: flex; align-items: center; gap: 28px; }
    .preview-header__nav a { font-size: 14px; font-weight: 600; color: #2C2C2C; text-decoration: none; }
    .preview-header__nav a:hover { color: #8B6F47; }
    .preview-header__right { display: flex; align-items: center; gap: 20px; }
    .preview-header__login { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; color: #2C2C2C; text-decoration: none; }
    .preview-header__cta { display: inline-flex; align-items: center; padding: 10px 22px; background: #C9A84C; color: #2C2C2C; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; border-radius: 6px; }
    .preview-header__cta:hover { background: #B8963F; }
    .preview-header__flag { width: 24px; height: 16px; border-radius: 2px; overflow: hidden; display: flex; flex-direction: column; }
    .preview-header__flag span { flex: 1; }
    .preview-footer { background: #2C2C2C; color: rgba(255,255,255,0.7); padding: 72px 0 36px; }
    .preview-footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
    .preview-footer__brand { font-family: 'Playfair Display',serif; font-size: 26px; font-weight: 700; color: #fff; margin: 0 0 14px; }
    .preview-footer__text { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.5); margin: 0 0 20px; max-width: 280px; }
    .preview-footer h4 { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; margin: 0 0 18px; }
    .preview-footer ul { list-style: none; padding: 0; margin: 0; }
    .preview-footer li { margin-bottom: 10px; }
    .preview-footer a { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; }
    .preview-footer a:hover { color: #fff; }
    .preview-footer__bottom { padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; color: rgba(255,255,255,0.35); }
    .preview-footer__bottom a { font-size: 12px; color: rgba(255,255,255,0.35); text-decoration: none; margin-left: 20px; }

    @media (max-width: 989px) {
      .preview-header__nav, .preview-header__flag { display: none; }
      .preview-footer__grid { grid-template-columns: 1fr 1fr; }
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
            <a href="#cheeses">Unser Käse</a>
            <a href="#story">So funktioniert's</a>
            <a href="#maker">Käsemacher</a>
            <a href="#why">FAQs</a>
          </nav>
        </div>
        <div class="preview-header__right">
          <a href="#" class="preview-header__login">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Login
          </a>
          <a href="#" class="preview-header__cta">Genuss Set Wählen</a>
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
            <div class="disfruto-cheese-card__image"><img src="/assets/disfruto-cheese-1.png" alt="Deichkäse Alt" loading="lazy"></div>
            <div class="disfruto-cheese-card__body">
              <h3 class="disfruto-cheese-card__name">Deichkäse Alt</h3>
              <p class="disfruto-cheese-card__desc">Kräftiger Charakter mit nussigen Noten, 12 Monate gereift an der Nordseeküste.</p>
              <span class="disfruto-cheese-card__tag">Hartkäse</span>
            </div>
          </div>
          <div class="disfruto-cheese-card">
            <div class="disfruto-cheese-card__image"><img src="/assets/disfruto-cheese-2.png" alt="Friesisch Blue" loading="lazy"></div>
            <div class="disfruto-cheese-card__body">
              <h3 class="disfruto-cheese-card__name">Friesisch Blue</h3>
              <p class="disfruto-cheese-card__desc">Cremiger Blauschimmelkäse mit milder Würze aus friesischer Tradition.</p>
              <span class="disfruto-cheese-card__tag">Blauschimmel</span>
            </div>
          </div>
          <div class="disfruto-cheese-card">
            <div class="disfruto-cheese-card__image"><img src="/assets/disfruto-cheese-3.png" alt="Grosser Husumer" loading="lazy"></div>
            <div class="disfruto-cheese-card__body">
              <h3 class="disfruto-cheese-card__name">Grosser Husumer</h3>
              <p class="disfruto-cheese-card__desc">Vollmundiger Schnittkäse mit aromatischer Reife und butterweicher Textur.</p>
              <span class="disfruto-cheese-card__tag">Schnittkäse</span>
            </div>
          </div>
          <div class="disfruto-cheese-card">
            <div class="disfruto-cheese-card__image"><img src="/assets/disfruto-cheese-4.png" alt="Hofkäse" loading="lazy"></div>
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
      <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(44,44,44,0.75) 0%,rgba(44,44,44,0.35) 50%,transparent 100%);display:flex;align-items:center;">
        <div class="disfruto-container" style="width:100%;">
          <div style="max-width:460px;">
            <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:34px;font-weight:700;color:#fff;margin:0 0 14px;line-height:1.15;">Starte deine Käse-Reise</h2>
            <p style="font-size:16px;color:rgba(255,255,255,0.8);margin:0 0 24px;line-height:1.6;">Entdecke jeden Monat neue Geschmackswelten mit unserer kuratierten Käse-Box.</p>
            <a href="#" class="disfruto-btn disfruto-btn--gold">Jetzt abonnieren</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Disfruto -->
  <section id="why" class="disfruto-section disfruto-why">
    <div class="disfruto-container">
      <div class="disfruto-why__header">
        <span class="disfruto-why__eyebrow">Unsere Werte</span>
        <h2 class="disfruto-why__title">Warum Disfruto</h2>
        <p class="disfruto-why__subtitle">Qualität, Handwerk und Genuss — das sind unsere Versprechen</p>
      </div>
      <div class="disfruto-why__grid">
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Verstehen, was du isst</h3>
          <p class="disfruto-why__item-text">Wir zeigen dir genau, woher dein Käse kommt, wer ihn herstellt und wie er gereift wird.</p>
        </div>
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Handwerkliche Kunst</h3>
          <p class="disfruto-why__item-text">Jeder Käse wird von erfahrenen Käsemachern nach traditionellen Methoden hergestellt.</p>
        </div>
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Vielfalt und Balance</h3>
          <p class="disfruto-why__item-text">Unsere Boxen bieten eine perfekt abgestimmte Auswahl verschiedener Geschmacksrichtungen.</p>
        </div>
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Flexible Lieferung</h3>
          <p class="disfruto-why__item-text">Wähle deinen Liefertag und passe dein Abo jederzeit an — ganz ohne Bindung.</p>
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
  <section class="disfruto-section" style="padding:80px 0;background:#F5F1EB;">
    <div class="disfruto-container">
      <div style="max-width:560px;margin:0 auto;text-align:center;">
        <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:700;color:#2C2C2C;margin:0 0 14px;">Neue Sorten & Genuss-Tipps direkt ins Postfach</h2>
        <p style="font-size:16px;color:#6B6B6B;margin:0 0 32px;line-height:1.6;">Melde dich an und erfahre als Erstes von neuen Käsesorten, exklusiven Angeboten und Geschichten unserer Käsemacher.</p>
        <form style="display:flex;gap:10px;max-width:460px;margin:0 auto;" onsubmit="event.preventDefault();">
          <input type="email" placeholder="Deine E-Mail-Adresse" required style="flex:1;padding:14px 18px;border:1px solid #E5DFD6;border-radius:8px;font-size:14px;font-family:Inter,sans-serif;background:#fff;color:#3A3A3A;outline:none;">
          <button type="submit" class="disfruto-btn disfruto-btn--primary">Anmelden</button>
        </form>
        <p style="font-size:12px;color:#6B6B6B;margin-top:14px;">Kein Spam, jederzeit abbestellbar. Datenschutz ist uns wichtig.</p>
      </div>
    </div>
  </section>

  <!-- Footer (Dawn built-in, enhanced via CSS + color scheme-4) -->
  <footer class="preview-footer">
    <div class="disfruto-container">
      <div class="preview-footer__grid">
        <div>
          <div class="preview-footer__brand">Disfruto</div>
          <p class="preview-footer__text">Kuratierte Käse-Spezialitäten, direkt an deine Tür in Berlin geliefert.</p>
        </div>
        <div>
          <h4>Produkt</h4>
          <ul>
            <li><a href="#">So funktioniert's</a></li>
            <li><a href="#">Unsere Käse</a></li>
            <li><a href="#">Preise</a></li>
          </ul>
        </div>
        <div>
          <h4>Unternehmen</h4>
          <ul>
            <li><a href="#">Über uns</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul>
            <li><a href="mailto:hallo@disfruto.de">hallo@disfruto.de</a></li>
            <li><a href="#">Berlin, Deutschland</a></li>
          </ul>
        </div>
      </div>
      <div class="preview-footer__bottom">
        <span>&copy; 2026 Disfruto. Alle Rechte vorbehalten.</span>
        <div>
          <a href="#">Datenschutz</a>
          <a href="#">AGB</a>
          <a href="#">Impressum</a>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/assets/')) {
    const filePath = path.join(__dirname, '..', req.url);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const file = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=3600' });
      res.end(file);
      return;
    }
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Disfruto preview server running on port ' + PORT);
});
