# Ligeniqo Design QA

Final result: passed after reference-alignment rework

## Source

- Current WordPress site: https://ligeniqo.com/
- Source screenshot used for comparison: `/tmp/ligeniqo-source-desktop-ready.png`
- Extracted brand tokens from source CSS:
  - Font: Lato
  - Primary blue: #0B0AA3
  - CTA cyan: #02D2FE
  - Ink: #111111
  - Text grays: #425466, #616161
  - Soft backgrounds: #EEF0FF, #F1F7FB, #FBF8F1

## Checks

- Local page loads at http://127.0.0.1:4179/
- `index.html`, `styles.css`, `script.js`, and local assets return HTTP 200.
- Chrome smoke-test passed for:
  - Services card active state
  - Industries filter, market text, and designer image swap
  - Process carousel step navigation and arrow navigation
  - FAQ accordion
  - Book-a-call modal open and close
  - Mobile menu open
- Broken image check passed: `[]`
- Final desktop screenshot: `/tmp/ligeniqo-local-final-desktop.png`
- Final mobile screenshot: `/tmp/ligeniqo-local-final-mobile.png`
- Industries screenshot: `/tmp/ligeniqo-industries-desktop.png`
- Process carousel screenshot: `/tmp/ligeniqo-process-carousel.png`

## Notes

- A few WordPress/CDN assets returned an HTML "Bad Gateway" page instead of image bytes. Those were not used.
- The first implementation was too modernized and did not match the public reference closely enough.
- Reworked the top viewport to match the reference direction: white fixed header, original blue logo, centered navigation, search icon, cyan CTA, white hero, blue/cyan Lato headline, hand-drawn cyan underline, centered CTA, partner proof block, and soft-blue Services band.
- The client logos use the downloaded long WordPress PNG. Because it behaves like a horizontal strip/carousel on the source site, exact visible logo order may differ by viewport/time, but the asset, scale, and monochrome treatment now follow the reference more closely.
- Replaced the text-only Industries block with the original WordPress/Elementor designer images: `t1.png` through `t5.png`, stored locally as `assets/industry-*.png`.
- Replaced the simplified "What is next?" text card with the original WordPress image carousel slides `img1.png` through `img5.png`, stored locally as `assets/process-slide-*.png`.
