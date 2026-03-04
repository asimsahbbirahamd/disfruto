const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const cssPath = path.join(__dirname, '..', 'assets', 'disfruto.css');
const css = fs.readFileSync(cssPath, 'utf8');

const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Disfruto — Kuratierte Käse-Spezialitäten</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #3A3A3A; -webkit-font-smoothing: antialiased; }
    img { max-width: 100%; display: block; }
    ${css}
  </style>
</head>
<body>

  <!-- Header -->
  <header style="position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #E5DFD6;">
    <div class="disfruto-container" style="display:flex;align-items:center;justify-content:space-between;height:72px;">
      <div style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:700;color:#2C2C2C;letter-spacing:-0.02em;">Disfruto</div>
      <nav style="display:flex;gap:32px;align-items:center;">
        <a href="#" style="font-size:15px;color:#3A3A3A;text-decoration:none;font-weight:500;">So funktioniert's</a>
        <a href="#" style="font-size:15px;color:#3A3A3A;text-decoration:none;font-weight:500;">Unsere Käse</a>
        <a href="#" style="font-size:15px;color:#3A3A3A;text-decoration:none;font-weight:500;">FAQ</a>
        <a href="#" class="disfruto-btn disfruto-btn--primary" style="padding:10px 24px;font-size:13px;">Jetzt starten</a>
      </nav>
    </div>
  </header>

  <!-- Section 1: Hero -->
  <section class="disfruto-section disfruto-hero">
    <div class="disfruto-container">
      <div class="disfruto-hero__inner">
        <div class="disfruto-hero__content">
          <span class="disfruto-hero__badge">Neu in Berlin</span>
          <h1 class="disfruto-hero__title">Dein 1. Käse Genuss&nbsp;Set Gratis</h1>
          <p class="disfruto-hero__subtitle">Kuratierte Käse-Spezialitäten direkt an deine Tür in Berlin geliefert. Handverlesen von den besten Käsemachern.</p>
          <div class="disfruto-hero__actions">
            <a href="#" class="disfruto-btn disfruto-btn--primary">Jetzt ausprobieren</a>
            <a href="#" class="disfruto-btn disfruto-btn--secondary">Mehr erfahren</a>
          </div>
        </div>
        <div class="disfruto-hero__visual">
          <div class="disfruto-hero__image-wrapper">
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#E8E0D4 0%,#D4C8B8 50%,#C4B8A4 100%);min-height:500px;flex-direction:column;gap:16px;">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="70" cy="70" r="60" fill="#C4A882" opacity="0.25"/>
                <circle cx="70" cy="70" r="40" fill="#C4A882" opacity="0.35"/>
                <circle cx="70" cy="70" r="20" fill="#C4A882" opacity="0.45"/>
                <circle cx="55" cy="60" r="5" fill="#A08060" opacity="0.3"/>
                <circle cx="80" cy="65" r="7" fill="#A08060" opacity="0.3"/>
                <circle cx="65" cy="80" r="4" fill="#A08060" opacity="0.3"/>
              </svg>
              <span style="font-family:'Playfair Display',Georgia,serif;font-size:18px;color:#8B6F47;font-style:italic;opacity:0.7;">Käse Genuss Set</span>
            </div>
          </div>
          <div class="disfruto-hero__float-badge">
            <div class="disfruto-hero__float-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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

  <!-- Section 2: Trust Bar -->
  <section class="disfruto-section disfruto-trust">
    <div class="disfruto-container">
      <div class="disfruto-trust__grid">
        <div class="disfruto-trust__item">
          <div class="disfruto-trust__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div>
            <div class="disfruto-trust__label">Kostenfrei geliefert</div>
            <div class="disfruto-trust__sublabel">In ganz Berlin</div>
          </div>
        </div>
        <div class="disfruto-trust__item">
          <div class="disfruto-trust__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <div class="disfruto-trust__label">Flexibel planbar</div>
            <div class="disfruto-trust__sublabel">Alle 2 oder 4 Wochen</div>
          </div>
        </div>
        <div class="disfruto-trust__item">
          <div class="disfruto-trust__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>
          </div>
          <div>
            <div class="disfruto-trust__label">Jederzeit pausierbar</div>
            <div class="disfruto-trust__sublabel">Kein Vertrag, keine Bindung</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: Product Story -->
  <section class="disfruto-section disfruto-story">
    <div class="disfruto-container">
      <div class="disfruto-story__grid">
        <div class="disfruto-story__image">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F0EBE1,#E8E0D4);min-height:400px;flex-direction:column;gap:12px;">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="25" width="70" height="50" rx="8" fill="#C4A882" opacity="0.25"/>
              <rect x="22" y="32" width="56" height="36" rx="4" fill="#C4A882" opacity="0.2"/>
              <circle cx="38" cy="50" r="10" fill="#C4A882" opacity="0.3"/>
              <circle cx="62" cy="50" r="10" fill="#C4A882" opacity="0.3"/>
            </svg>
            <span style="font-family:'Playfair Display',Georgia,serif;font-size:14px;color:#8B6F47;font-style:italic;opacity:0.6;">Käse Auswahl</span>
          </div>
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

  <!-- Section 4: Cheese Grid -->
  <section class="disfruto-section disfruto-cheeses">
    <div class="disfruto-container">
      <div class="disfruto-cheeses__header">
        <span class="disfruto-cheeses__eyebrow">Unsere Auswahl</span>
        <h2 class="disfruto-cheeses__title">Entdecke unsere Käse-Vielfalt</h2>
        <p class="disfruto-cheeses__subtitle">Handverlesene Sorten von den besten Käsemachern Europas</p>
      </div>
      <div class="disfruto-cheeses__grid">
        <div class="disfruto-cheese-card">
          <div class="disfruto-cheese-card__image">
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F5EFE6,#EDE5D8);aspect-ratio:1;">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="30" fill="#C4A882" opacity="0.25"/><circle cx="32" cy="35" r="4" fill="#B09470" opacity="0.3"/><circle cx="48" cy="42" r="5" fill="#B09470" opacity="0.3"/><circle cx="38" cy="50" r="3" fill="#B09470" opacity="0.3"/></svg>
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
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#EDE8F0,#E0D8E8);aspect-ratio:1;">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="30" fill="#8B7BA8" opacity="0.2"/><circle cx="34" cy="36" r="5" fill="#7B6B98" opacity="0.25"/><circle cx="48" cy="44" r="4" fill="#7B6B98" opacity="0.25"/><circle cx="40" cy="52" r="3" fill="#7B6B98" opacity="0.25"/></svg>
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
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F5EFE6,#EDE5D8);aspect-ratio:1;">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="15" y="30" width="50" height="20" rx="10" fill="#C4A882" opacity="0.25"/><rect x="20" y="34" width="40" height="12" rx="6" fill="#C4A882" opacity="0.2"/></svg>
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
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#FFF8F0,#F5EBE0);aspect-ratio:1;">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="28" fill="#D4B896" opacity="0.2"/><circle cx="40" cy="40" r="18" fill="#D4B896" opacity="0.15"/></svg>
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
  </section>

  <!-- Section 5: Cheesemaker Feature -->
  <section class="disfruto-section disfruto-maker">
    <div class="disfruto-container">
      <div class="disfruto-maker__grid">
        <div class="disfruto-maker__content">
          <span class="disfruto-maker__eyebrow">Jede Woche neu</span>
          <h2 class="disfruto-maker__title">Käsemacher im Fokus</h2>
          <p class="disfruto-maker__text">Jede Woche stellen wir einen besonderen Käsemacher vor — seine Geschichte, seine Philosophie und was seinen Käse einzigartig macht.</p>
          <a href="#" class="disfruto-btn disfruto-btn--secondary">Zum Porträt</a>
        </div>
        <div class="disfruto-maker__visual">
          <div class="disfruto-maker__badge-card">
            <div class="disfruto-maker__badge-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="disfruto-maker__badge-title">Käsemacher der Woche</div>
            <div class="disfruto-maker__badge-sub">Handwerk trifft Leidenschaft</div>
            <div class="disfruto-maker__badge-name">Familie Schönberg</div>
            <div class="disfruto-maker__badge-region">Nordfriesland, Deutschland</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 6: Why Disfruto -->
  <section class="disfruto-section disfruto-why">
    <div class="disfruto-container">
      <div class="disfruto-why__header">
        <span class="disfruto-why__eyebrow">Unsere Werte</span>
        <h2 class="disfruto-why__title">Warum Disfruto</h2>
        <p class="disfruto-why__subtitle">Qualität, Handwerk und Genuss — das sind unsere Versprechen</p>
      </div>
      <div class="disfruto-why__grid">
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Verstehen, was du isst</h3>
          <p class="disfruto-why__item-text">Wir zeigen dir genau, woher dein Käse kommt, wer ihn herstellt und wie er gereift wird.</p>
        </div>
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Handwerkliche Kunst</h3>
          <p class="disfruto-why__item-text">Jeder Käse wird von erfahrenen Käsemachern nach traditionellen Methoden hergestellt.</p>
        </div>
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Vielfalt und Balance</h3>
          <p class="disfruto-why__item-text">Unsere Boxen bieten eine perfekt abgestimmte Auswahl verschiedener Geschmacksrichtungen.</p>
        </div>
        <div class="disfruto-why__item">
          <div class="disfruto-why__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <h3 class="disfruto-why__item-title">Flexible Lieferung</h3>
          <p class="disfruto-why__item-text">Wähle deinen Liefertag und passe dein Abo jederzeit an — ganz ohne Bindung.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 7: Newsletter -->
  <section class="disfruto-section disfruto-newsletter">
    <div class="disfruto-container">
      <div class="disfruto-newsletter__inner">
        <div class="disfruto-newsletter__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h2 class="disfruto-newsletter__title">Neue Sorten & Genuss-Tipps direkt ins Postfach</h2>
        <p class="disfruto-newsletter__text">Melde dich an und erfahre als Erstes von neuen Käsesorten, exklusiven Angeboten und Geschichten unserer Käsemacher.</p>
        <form class="disfruto-newsletter__form" onsubmit="event.preventDefault();">
          <input type="email" class="disfruto-newsletter__input" placeholder="Deine E-Mail-Adresse" required>
          <button type="submit" class="disfruto-btn disfruto-btn--primary">Anmelden</button>
        </form>
        <p class="disfruto-newsletter__privacy">Kein Spam, jederzeit abbestellbar. Datenschutz ist uns wichtig.</p>
      </div>
    </div>
  </section>

  <!-- Section 8: Footer -->
  <footer class="disfruto-section disfruto-footer">
    <div class="disfruto-container">
      <div class="disfruto-footer__grid">
        <div>
          <div class="disfruto-footer__brand-name">Disfruto</div>
          <p class="disfruto-footer__brand-text">Kuratierte Käse-Spezialitäten, direkt an deine Tür in Berlin geliefert.</p>
          <div class="disfruto-footer__social">
            <a href="#" class="disfruto-footer__social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="disfruto-footer__social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="disfruto-footer__social-link" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13v-3.5a6.37 6.37 0 0 0-1-.05A6.28 6.28 0 0 0 3 15.57 6.29 6.29 0 0 0 9.37 22a6.28 6.28 0 0 0 6.27-6.28V9.06a8.28 8.28 0 0 0 4.84 1.56v-3.5a4.84 4.84 0 0 1-.89-.43z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 class="disfruto-footer__heading">Produkt</h4>
          <ul class="disfruto-footer__links">
            <li><a href="#">So funktioniert's</a></li>
            <li><a href="#">Unsere Käse</a></li>
            <li><a href="#">Preise</a></li>
          </ul>
        </div>
        <div>
          <h4 class="disfruto-footer__heading">Unternehmen</h4>
          <ul class="disfruto-footer__links">
            <li><a href="#">Über uns</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h4 class="disfruto-footer__heading">Kontakt</h4>
          <ul class="disfruto-footer__links">
            <li><a href="mailto:hallo@disfruto.de">hallo@disfruto.de</a></li>
            <li><a href="#">Berlin, Deutschland</a></li>
          </ul>
        </div>
      </div>
      <div class="disfruto-footer__bottom">
        <div class="disfruto-footer__copyright">&copy; 2026 Disfruto. Alle Rechte vorbehalten.</div>
        <div class="disfruto-footer__bottom-links">
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
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Disfruto preview server running on port ' + PORT);
});
