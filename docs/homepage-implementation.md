---
Title: Buyer Homepage Implementation Specification
Source Tickets: krafto-1 (B-HOME-01), krafto-2 (B-HOME-02)
Related Docs: docs/buyer-personas-homepage.md
Status: Ready for implementation
---

# Buyer Homepage Implementation Specification

This document defines the complete content, structure, and navigation flows for the Buyer homepage. Use this as the **source of truth** when implementing the homepage in `src/app/page.tsx` and related components.

---

## 1. Value Proposition (Hero Section)

### Hero Title and Subtitle

-   **Hero title (H1)**: "Make supplier catalogs clear, centralized, and easy to act on."
-   **Hero subtitle**: "Krafto helps purchasing teams centralize supplier offers, compare options faster, and share an always up-to-date catalog with their internal stakeholders."

### Core Promises

Display these three promises near the hero (as bullets or a benefits strip):

1. **Centralize supplier catalogs in one place**
    - Bring products, prices, and conditions from multiple suppliers into a single, structured catalog instead of scattered files and emails.
2. **Compare offers and decide faster**
    - Quickly see differences between suppliers and products so purchasing decisions take minutes instead of days.
3. **Keep internal stakeholders aligned and informed**
    - Share a clear, up-to-date catalog that makes it easy for teams to choose the right products while respecting purchasing constraints.

### Hero CTAs

-   **Primary CTA**: "Explore catalogs"
    -   Target: Leads to main discovery experience (scrolls to featured artisans/categories or routes to `/catalogs` or `/explore`).
-   **Secondary CTA**: "See how Krafto works"
    -   Target: Scrolls to "how it works" section on homepage or routes to `/how-it-works`.
-   **Optional tertiary action** (text link, lower priority): "Talk to us" or "Book a demo"
    -   Links to contact/demo flow (future ticket).

### Hero Layout Guidelines

-   Must be fully visible "above the fold" on desktop (H1, subtitle, primary CTA visible without scrolling).
-   On mobile: H1, subtitle, and primary CTA visible on first screen; secondary CTA may be stacked below.
-   Visual hierarchy: primary CTA is dominant; secondary CTA is lighter but clearly actionable.

---

## 2. Featured Artisans Section

### Goal

Highlight a small, curated set of artisans representing marketplace breadth and quality (styles, locations, product types), making it easy to explore each artisan's shop.

### Content Model (Per Artisan Card)

-   Primary visual: hero photo or representative image (artisan or their work).
-   Name of artisan or shop.
-   Short positioning line (specialty, style, or location) – 1 line only.
-   Optional trust cue (e.g., "Verified", "Top rated") – trust logic defined in later tickets.

### Section-Level Elements

-   Title: communicates this is a curated selection of artisans.
-   Optional short description (1 line) explaining why these artisans are featured (e.g., "editor's picks", diversity, recency).
-   "View all artisans" CTA leading to main artisan exploration page/route.

### Quantity and Ordering

-   MVP: 3–6 featured artisans on desktop, 3–4 on mobile (scrollable if needed).
-   Appears **before** categories section to emphasize the human side of the marketplace.

### Navigation

-   Clicking an artisan card → artisan's shop page (future B-SHOP-01 implementation).

---

## 3. Categories Section

### Goal

Give Buyers a fast way to browse by high-level needs (product type, usage, theme) using a small set of clear, mutually understandable categories.

### Content Model (Per Category Tile/Card)

-   Category label (short, plain language, no jargon).
-   Visual element (icon or simple illustration) for scanning and differentiation.
-   Optional short helper text (1 line) clarifying what's inside the category.

### Section-Level Elements

-   Title: makes it explicit this block is for browsing by category.
-   Optional description clarifying more categories exist (e.g., "See all categories" or "Browse all" link).

### Category Selection Rules

-   MVP: 6–10 top-level categories surfaced on homepage, derived from taxonomy defined in B-CAT-01.
-   Categories should cover main use cases/persona needs from `docs/buyer-personas-homepage.md`.
-   Avoid overlapping meanings; each category must be clearly distinct.

### Navigation

-   Clicking a category → pre-filtered exploration view (future B-EXPLORE-01 and B-CAT-01 implementation).

---

## 4. Collections / Thematic Highlights Section

### Goal

Surface a small number of curated entry points (seasonal themes, best-sellers, new arrivals) that help Buyers discover relevant products without knowing exactly what to search for.

### Types of Collections

-   Seasonal or event-based (e.g., "Holiday gifting", "Back to work").
-   Performance-based (e.g., "Best-sellers", "Most loved by teams").
-   Freshness-based (e.g., "New arrivals").

### Content Model (Per Collection Block)

-   Title of collection (short, action-friendly).
-   Short description (1 line) explaining what makes this collection special.
-   Visual: hero image or small grid of 2–4 representative products.
-   CTA leading to full collection view (future dedicated filtered page or search preset).

### Section-Level Guidelines

-   MVP: start with **one main collection** (e.g., "Best-sellers" or "Editor's picks") to keep scope manageable.
-   Appears **after** featured artisans and categories to avoid overwhelming the top of the page.
-   Make it visually distinct from categories (more editorial, less grid-like navigation).

### Navigation

-   Each collection CTA → pre-filtered product listing representing that collection.

---

## 5. Trust Signals Section

### Goal

Provide clear, concise evidence that using Krafto is safe and professional-grade for purchasing teams (not a random marketplace).

### Types of Trust Elements

-   Social proof (short quote/testimonial from buyer, overall satisfaction metric).
-   Scale/credibility indicators (number of artisans, products, or companies using Krafto – when available).
-   Guarantees and safeguards (secure payments, clear return/dispute policy, curated artisans).

### Content Model

-   Section title focused on reassurance (exact wording to be refined later).
-   2–4 trust "blocks" or bullets, each with:
    -   Short heading (e.g., "Verified artisans").
    -   One short explanatory line.
    -   Optional icon or badge visual.

### Placement

-   Appears **before** final strong CTAs or any conversion-heavy block (e.g., before secondary hero or "Get started" strip).
-   Can be close to or integrated with global trust strategy defined in X-TRUST-01 later.

### Navigation

-   Trust elements can link to detailed pages (e.g., "How Krafto selects artisans", "Security & payments").

---

## 6. Final Section Order (Top → Bottom)

1. **Hero** (value proposition + primary/secondary CTAs, linked to buyer exploration and "how it works").
2. **Core promises** (if visually separated from hero) or integrated near hero.
3. **Featured artisans** (human angle, curated set).
4. **Categories** (overview of main product "entry points").
5. **Collections / thematic highlights** (editorial shortcuts: best-sellers, new arrivals, etc.).
6. **Trust signals** (reassurance before committing).
7. **Footer** or any global site-level elements (not specific to this ticket).

---

## 7. Primary Navigation Flows

### From Hero CTAs

-   **Primary CTA ("Explore catalogs")**:
    -   Scrolls to or navigates into exploration area anchored near featured artisans/categories.
    -   May map to `/catalogs` or `/explore` route with pre-configured filters (future implementation ticket).
-   **Secondary CTA ("See how Krafto works")**:
    -   Scrolls to "how it works" explanatory block on homepage or navigates to `/how-it-works` route.

### From Sections

-   **Featured artisans**: Each artisan card → artisan's shop page (future B-SHOP-01).
-   **Categories**: Each category → filtered product search or category page (future B-EXPLORE-01 and B-CAT-01).
-   **Collections**: Each collection → pre-filtered product listing representing that collection.

---

## 8. Secondary Navigation and Loops

-   After visiting artisan shop or category/collection page, users can navigate back to:
    -   Homepage (via logo or "Home" link).
    -   Another discovery entry point (categories menu, collections carousel) – details in future navigation/header tickets.
-   Trust signals may include links ("Learn more about our guarantees") leading to:
    -   Dedicated informational pages (security, artisan selection policy).
    -   FAQ or help center (to be specified in cross-cutting tickets).

---

## 9. Implementation Notes for Future Tickets

### Navigation and Routes

-   Implementation tickets must define actual Next.js routes:
    -   `/` (homepage)
    -   `/catalogs` or `/explore` (discovery)
    -   `/how-it-works` (explanation)
    -   `/shops/[id]` (artisan shop pages)
    -   `/categories/[slug]` (category pages)
    -   `/collections/[slug]` (collection pages)

### Shared Components

-   Good candidates for reusable UI components under `presentation/components/ui/`:
    -   Category tiles
    -   Collection cards
    -   Trust blocks
    -   Artisan cards

### Tracking/Analytics (Future)

-   Main entry points to instrument:
    -   Hero primary CTA
    -   Hero secondary CTA
    -   Clicks on featured artisans
    -   Clicks on categories
    -   Clicks on collections

---

## 10. Copy Variants and Notes

### Alternative Hero Title Options

-   "Turn scattered supplier data into a clear, actionable catalog."
-   "Give purchasing teams a clear view of all supplier options in one place."

### Positioning Notes

-   Emphasize "centralization" and "clarity" as primary themes.
-   Reinforce "speed of decision" and "internal alignment" as key outcomes.
-   Keep sentences short and scannable to work well in homepage hero layout.

---

## Related Documentation

-   `docs/buyer-personas-homepage.md` – Buyer personas and needs
-   `jira/1.md` – B-HOME-01 ticket (value proposition definition)
-   `jira/2.md` – B-HOME-02 ticket (homepage sections definition)
-   `report/planning/plan-krafto-2-b-home-02.md` – Detailed planning with sub-ticket specs
