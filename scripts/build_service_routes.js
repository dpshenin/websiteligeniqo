const fs = require('fs');
const path = require('path');

const routes = [
  { source: 'services.html', target: 'services/index.html' },
  { source: 'services/lead-generation.html', target: 'services/lead-generation/index.html' },
  { source: 'services/demand-generation.html', target: 'services/demand-generation/index.html' },
  { source: 'services/consultancy-and-training.html', target: 'services/consultancy-and-training/index.html' },
  { source: 'services/marketing-automation.html', target: 'services/marketing-automation/index.html' },
  { source: 'services/brand-developing.html', target: 'services/brand-developing/index.html' },
  { source: 'services/influencer-marketing.html', target: 'services/influencer-marketing-services/index.html' },
];

function rewriteAssetPaths(html) {
  return html
    .replaceAll('../styles.css', '/styles.css')
    .replaceAll('../script.js', '/script.js')
    .replaceAll('../assets/', '/assets/')
    .replaceAll('href="../index.html"', 'href="/"')
    .replaceAll('href="../services.html"', 'href="/services/"')
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="services.html"', 'href="/services/"')
    .replaceAll('href="services/lead-generation.html"', 'href="/services/lead-generation/"')
    .replaceAll('href="services/demand-generation.html"', 'href="/services/demand-generation/"')
    .replaceAll('href="services/consultancy-and-training.html"', 'href="/services/consultancy-and-training/"')
    .replaceAll('href="services/marketing-automation.html"', 'href="/services/marketing-automation/"')
    .replaceAll('href="services/brand-developing.html"', 'href="/services/brand-developing/"')
    .replaceAll('href="services/influencer-marketing.html"', 'href="/services/influencer-marketing-services/"')
    .replaceAll('href="../index.html#', 'href="/#')
    .replaceAll('href="index.html#', 'href="/#')
    .replaceAll('href="../services.html#', 'href="/services/#')
    .replaceAll('href="services.html#', 'href="/services/#');
}

for (const { source, target } of routes) {
  const sourcePath = path.join(process.cwd(), source);
  const targetPath = path.join(process.cwd(), target);
  const html = fs.readFileSync(sourcePath, 'utf8');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, rewriteAssetPaths(html));
}

console.log(`Built ${routes.length} service route pages.`);
