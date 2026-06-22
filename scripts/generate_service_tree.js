const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/dpshenin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const ROOT = process.cwd();
const SITE = 'https://ligeniqo.com';
const START_URLS = [
  `${SITE}/`,
  `${SITE}/services/`,
];

function walkFiles(dir, out = new Map()) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
    } else {
      out.set(entry.name, path.relative(ROOT, full).replaceAll(path.sep, '/'));
    }
  }
  return out;
}

const assetByBase = walkFiles(path.join(ROOT, 'assets'));

function localizeImage(src) {
  try {
    const url = new URL(src, SITE);
    const base = path.basename(url.pathname);
    return assetByBase.get(base) || src;
  } catch {
    return src;
  }
}

function imageSrc(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
    return src;
  }
  return src.startsWith('/') ? src : `/${src}`;
}

function routeFromUrl(url) {
  const u = new URL(url);
  let pathname = u.pathname;
  if (pathname === '/' || pathname === '') return 'index.html';
  if (pathname === '/services/' || pathname === '/services') return 'services/index.html';
  pathname = pathname.replace(/\/+$/, '');
  return `${pathname.slice(1)}/index.html`;
}

function labelFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean).slice(1);
  return parts
    .map((part) =>
      part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(' / ');
}

function pickHeroImage(pathname, images) {
  const localImages = images.map(localizeImage);
  const group = pathname.split('/').filter(Boolean)[1] || '';
  const heroFallbacks = {
    'lead-generation': 'assets/ligeniqo-live/lead-generation/leadPilotImg.png',
    'demand-generation': 'assets/ligeniqo-live/demand-generation/demg2.png',
    'consultancy-and-training': 'assets/ligeniqo-live/consultancy-and-training/ct1.png',
    'marketing-automation': 'assets/ligeniqo-live/marketing-automation/mat1.png',
    'brand-developing': 'assets/ligeniqo-live/brand-developing/gt1.png',
    'influencer-marketing-services': 'assets/ligeniqo-live/influencer-marketing-services/infl1.png',
  };
  return localImages.find((src) => typeof src === 'string' && !src.includes('logoSVG.svg') && !src.includes('logoFootSvg.svg')) || heroFallbacks[group] || 'assets/services-rup4.png';
}

function renderPage({ pathname, title, description, h1, paragraphs, images, relatedLinks }) {
  const heroImage = pickHeroImage(pathname, images);
  const socialMarkup = `
          <a href="https://www.instagram.com/ligeniqo" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/ligeniqo" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V17M8 8V8.01M12 17V13M16 17V13C16 11.3431 14.6569 10 13 10C12.4477 10 11.8954 10.2239 11.5 10.5M12 17V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </a>`;
  const imageMarkup = images
    .map((src) => localizeImage(src))
    .filter((src) => typeof src === 'string')
    .slice(0, 6)
    .map((src) => `<figure class="service-media"><img src="${imageSrc(src)}" alt=""><figcaption>${path.basename(src)}</figcaption></figure>`)
    .join('');
  const textMarkup = paragraphs
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join('\n');
  const relatedMarkup = relatedLinks.length
    ? relatedLinks
        .map((link) => `<a href="${link.href}">${link.text}</a>`)
        .join('\n')
    : '<p>No related service links discovered on the live page.</p>';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${description.replaceAll('"', '&quot;')}" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css?v=2" />
</head>
<body>
  <header class="site-header" data-header>
    <a class="brand" href="/" aria-label="Ligeniqo home">
      <img src="/assets/logo-brand.png" alt="Ligeniqo" />
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span>
    </button>
    <nav class="site-nav" id="site-nav">
      <a href="/">Home</a>
      <a href="/services/" class="is-active">Services</a>
      <a href="/#about">About</a>
      <a href="/#pricing">Pricing</a>
      <a href="/#blog">Blog</a>
      <a href="/#faq">FAQ</a>
      <a href="/#contact">Contact Us</a>
    </nav>
    <div class="header-actions">
      <button class="search-button" type="button" aria-label="Search"></button>
      <button class="header-cta" type="button" data-open-modal><span>*</span> Book a Call</button>
    </div>
  </header>
  <main>
    <section class="services-hero">
      <div class="services-hero__content">
        <h1>${h1}</h1>
        <p class="service-subtitle">${description}</p>
      </div>
    </section>
    <section class="section service-detail">
      <div class="service-sidebar">
        <h3>Related services</h3>
        ${relatedMarkup}
      </div>
      <div class="service-content">
        <p class="eyebrow">Live mirror</p>
        <h2>${h1}</h2>
        ${textMarkup}
        <h3>Visuals from the live page</h3>
        <div class="service-media-grid">
          <figure class="service-media service-media--hero">
            <img src="/${heroImage}" alt="${h1}">
            <figcaption>Hero visual</figcaption>
          </figure>
          ${imageMarkup}
        </div>
      </div>
    </section>
    <section class="section services-cta">
      <div class="services-cta__inner">
        <h2>Ready to grow?</h2>
        <p>Let's keep mirroring the live site until the local copy matches the routes you need.</p>
        <button class="btn btn--primary" type="button" data-open-modal>Book a Call</button>
      </div>
    </section>
  </main>
  <footer class="footer" id="contact">
    <div class="footer__grid">
      <div class="footer__brand">
        <img class="footer__logo" src="/assets/logo-footer.svg" alt="Ligeniqo" />
        <p>Check out how we help our clients elevate their lead generation and boost ROI.</p>
        <div class="footer__social">
${socialMarkup}
        </div>
      </div>
      <div class="footer__col">
        <h3>Our Services</h3>
        <a href="/services/lead-generation/">Lead Generation</a>
        <a href="/services/demand-generation/">Demand Generation</a>
        <a href="/services/consultancy-and-training/">Consultancy and Training</a>
        <a href="/services/marketing-automation/">Marketing Automation</a>
        <a href="/services/brand-developing/">Brand Developing</a>
        <a href="/services/influencer-marketing-services/">Influencer Marketing</a>
      </div>
      <div class="footer__col">
        <h3>Company</h3>
        <a href="/#about">About us</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#faq">FAQ's</a>
      </div>
      <div class="footer__col">
        <h3>Call Us</h3>
        <a href="mailto:info@ligeniqo.com">info@ligeniqo.com</a>
        <a href="tel:+19294565579">+ 1 929 456 55 79</a>
        <button class="btn btn--primary" type="button" data-open-modal>Book a Call</button>
      </div>
    </div>
    <div class="footer__bottom">
      <span>2024 Ligeniqo, All Rights Reserved</span>
      <a href="/#privacy">Privacy Policy</a>
    </div>
    <div class="footer__strip"></div>
  </footer>
  <div class="modal" data-modal aria-hidden="true">
    <div class="modal__backdrop" data-close-modal></div>
    <form class="modal__panel" id="lead-form">
      <button class="modal__close" type="button" aria-label="Close" data-close-modal>Close</button>
      <p class="eyebrow">Book a call</p>
      <h2>Tell us where growth should start</h2>
      <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
      <label>Email<input name="email" type="email" placeholder="you@company.com" required /></label>
      <label>Phone Number<input name="phone" type="tel" placeholder="+1 (123) 456-7890" /></label>
      <label>Message<textarea name="message" placeholder="What do you want to grow?"></textarea></label>
      <button class="btn btn--primary" type="submit">Send</button>
      <p class="form-note" data-form-note></p>
    </form>
  </div>
  <script src="/script.js"></script>
</body>
</html>`;
}

async function crawl() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
  const queue = [...START_URLS];
  const seen = new Set();
  const pages = [];

  while (queue.length) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);

    console.log(`Crawling ${url}`);
    let data;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(750);
      data = await page.evaluate(() => {
        const main = document.querySelector('main') || document.body;
        const textNodes = [...main.querySelectorAll('p')].map((p) => p.textContent.trim()).filter(Boolean);
        const images = [...document.images].map((img) => img.currentSrc || img.src).filter(Boolean);
        const links = [...document.querySelectorAll('a[href*="/services/"]')].map((a) => ({
          text: (a.textContent || '').trim(),
          href: a.href,
        })).filter((item) => item.href && item.href.includes('/services/'));
        const h1 = document.querySelector('h1')?.textContent?.trim() || document.title;
        const meta = document.querySelector('meta[name="description"]')?.content || '';
        return { h1, meta, textNodes, images, links, title: document.title };
      });
    } catch (error) {
      console.warn(`Skipping ${url}: ${error.message}`);
      continue;
    }

    const pathname = new URL(url).pathname;
    pages.push({
      url,
      pathname,
      title: data.title,
      h1: data.h1,
      description: data.meta || data.textNodes[0] || data.h1,
      paragraphs: data.textNodes.slice(0, 5),
      images: [...new Set(data.images)],
      relatedLinks: [...new Map(data.links.map((link) => [link.href, link])).values()],
    });

    for (const link of data.links) {
      if (!seen.has(link.href) && !queue.includes(link.href)) queue.push(link.href);
    }
  }

  await browser.close();

  for (const pageData of pages) {
    const route = routeFromUrl(pageData.url);
    const outPath = path.join(ROOT, route);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const relatedLinks = pageData.relatedLinks
      .filter((link) => link.href !== pageData.url)
      .slice(0, 12)
      .map((link) => ({
        text: link.text || labelFromPath(new URL(link.href).pathname),
        href: new URL(link.href).pathname.endsWith('/')
          ? new URL(link.href).pathname
          : `${new URL(link.href).pathname}/`,
      }));

    fs.writeFileSync(
      outPath,
      renderPage({
        pathname: pageData.pathname,
        title: pageData.title,
        description: pageData.description,
        h1: pageData.h1,
        paragraphs: pageData.paragraphs,
        images: pageData.images,
        relatedLinks,
      }),
    );
  }

  console.log(`Generated ${pages.length} service pages.`);
}

crawl().catch((error) => {
  console.error(error);
  process.exit(1);
});
