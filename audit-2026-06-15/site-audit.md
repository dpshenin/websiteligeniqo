# Ligeniqo Site Audit

Source: `http://127.0.0.1:4173/`

Capture folder: `/Users/dpshenin/Website Ligeniqo/audit-2026-06-15`

## Step List

1. Home page, desktop full page
   - Health: Mostly strong, but the page is very long and heavy.
   - Screenshot: `01-home-hero.png`
   - Notes: The hero is clear, the CTA is obvious, and the visual style feels polished. The main downside is the amount of content after the fold, which makes the page feel dense and slow to scan.

2. Home page, book-a-call modal
   - Health: Good, with a few small usability risks.
   - Screenshot: `02-home-book-call-modal.png`
   - Notes: The modal is easy to spot and the form fields are understandable. The close control is small, and the form is vertically tall enough that the bottom edge feels tight in the viewport.

3. Services page, desktop full page
   - Health: Needs work.
   - Screenshot: `03-services-overview.png`
   - Notes: The service page has a clean layout, but the large visual block under "Visuals from the live page" reads like a blank or broken image area. That makes the page feel unfinished and weakens trust.

4. About page, contact section and footer
   - Health: Good.
   - Screenshot: `04-about-contact.png`
   - Notes: The page gives a fuller picture of the company and contact options. The contact area is clear, but the page is information-dense and will need careful keyboard and focus treatment to stay easy to use.

5. Home page, mobile closed state
   - Health: Good, with mobile scanability concerns.
   - Screenshot: `05-home-mobile-closed.png`
   - Notes: The site does adapt to a narrow viewport, but the headline and section stack become very tall, so the page demands a lot of scrolling. Several sections feel crowded by size rather than balanced by spacing.

6. Home page, mobile menu open
   - Health: Moderate.
   - Screenshot: `06-home-mobile-menu-open.png`
   - Notes: The menu opens successfully, but the navigation behaves like a large inline panel and the page content is still visible underneath. That makes the open state feel less distinct than a true overlay or drawer.

## Main Findings

1. The services page has the clearest visual defect: the big preview area looks empty or non-functional, which makes the page feel incomplete.
2. The homepage is visually polished, but it is long and text-heavy, so the experience relies on users staying engaged for a lot of scrolling.
3. Mobile navigation works, but the open menu state is not very clearly separated from the page behind it.

## Accessibility Risks

1. The site uses very large, all-caps headings in multiple places. That can be readable on desktop, but it becomes harder to scan on mobile.
2. The modal and mobile menu should be checked for keyboard focus order, escape handling, and scroll locking. Screenshots alone cannot confirm those behaviors.
3. Several sections depend on iconography and visual framing, so color contrast, touch target size, and text scaling should be tested directly in the browser.

## Limits

1. This audit is based on screenshots from the current local run only.
2. I could not verify keyboard navigation, screen reader output, focus trapping, or form submission behavior from screenshots alone.
3. I did not check backend behavior, analytics, or real user data.

