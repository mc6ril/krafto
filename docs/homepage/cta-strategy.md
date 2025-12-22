---
Title: Buyer homepage CTA strategy and hierarchy
Source Ticket: krafto-4 (B-HOME-04)
Status: In progress
---

## 1. CTA landscape and hierarchy (B-HOME-04.1)

### 1.1 List of homepage-relevant CTAs

Based on the current Buyer homepage implementation spec (`docs/homepage/implementation.md`) and future plans, the main CTAs that can appear on or be triggered from the Buyer homepage are:

-   **Buyer-focused (buy-side) CTAs**
    -   **Explore catalogs** (primary)
    -   **See how Krafto works** (secondary)
    -   **Talk to us** / **Book a demo** (tertiary)
-   **Seller-focused CTAs** (onboarding / supply-side)
    -   **Sell on Krafto** (wording to be refined)
    -   **Become a supplier** (alternative wording)
-   **Neutral / support CTAs**
    -   Links to information such as **Security & payments**, **How we select artisans**, or **Help/FAQ** (conceptual, may be implemented via links rather than buttons).

This list focuses on CTAs that could reasonably appear on or be closely tied to the Buyer homepage; deeper product-level CTAs (e.g., add to cart, request quote) are out of scope for this ticket.

### 1.2 Target audience and goal per CTA

For each CTA, we clarify the primary target audience and main goal:

-   **Explore catalogs**
    -   Audience: **Buyer**
    -   Goal: Start the main discovery journey into supplier catalogs (products and shops), leading to exploration and comparison.
-   **See how Krafto works**
    -   Audience: **Buyer**
    -   Goal: Provide a short explanation of how Krafto helps purchasing teams, for visitors who need more context before engaging deeply.
-   **Talk to us / Book a demo**
    -   Audience: **Buyer (and Buyer-side stakeholders)**
    -   Goal: Open a direct conversation or demo request when a Buyer is interested but needs personalized guidance.
-   **Sell on Krafto / Become a supplier**
    -   Audience: **Seller / Supplier**
    -   Goal: Onboard new suppliers by pointing them to the appropriate Seller-facing flow or information.
-   **Security & payments / How we select artisans / Help/FAQ**
    -   Audience: **Buyer (with secondary relevance to Sellers)**
    -   Goal: Reduce perceived risk and answer key questions about how Krafto operates (trust, selection, support).

### 1.3 Hierarchy: primary, secondary, tertiary

At the homepage level, the CTA hierarchy is:

-   **Primary CTA(s)** – for Buyers
    -   **Explore catalogs**
        -   Main entry point into the Buyer journey and discovery experience.
-   **Secondary CTA(s)** – for Buyers
    -   **See how Krafto works**
        -   Supports Buyers who need understanding before exploring.
    -   **Talk to us / Book a demo**
        -   Provides a higher-touch path for interested Buyers.
-   **Tertiary CTAs and links**
    -   Trust and information links (e.g., **Security & payments**, **How we select artisans**, **Help/FAQ**).
    -   Seller onboarding CTAs (**Sell on Krafto**, **Become a supplier**) when present on the homepage are always treated as **secondary or tertiary**, never as primary on the Buyer homepage.

Primary CTAs should be visually dominant; secondary CTAs should be clearly visible but visually lighter; tertiary CTAs can be text links or lower-emphasis buttons.

### 1.4 Mapping CTAs to homepage sections

Using the sections defined in `docs/homepage/implementation.md`, the baseline mapping is:

-   **Hero section**
    -   Primary CTA: **Explore catalogs**.
    -   Secondary CTA: **See how Krafto works**.
    -   Optional tertiary: **Talk to us / Book a demo** (subordinate styling, often as a text link).
-   **Discovery sections (featured artisans, categories, collections)**
    -   Section-level CTAs are mainly navigational (e.g., **View all artisans**, **See all categories**, **View collection**), reinforcing the primary **explore** behavior rather than introducing new global CTAs.
-   **Trust signals section**
    -   May contain tertiary CTAs/links to more detailed information (e.g., **Learn more about our guarantees**, **See how we select artisans**).
-   **Header/footer (global areas)**
    -   Can host Seller-focused CTAs such as **Sell on Krafto** or **Become a supplier**, keeping them visible without conflicting with the hero’s primary Buyer CTA.

This mapping ensures that the **hero** remains the main decision point for Buyers (explore vs learn), while other sections reinforce discovery and trust without introducing competing primary CTAs.

## 2. Primary Buyer CTAs and repetition rules (B-HOME-04.2)

### 2.1 Primary Buyer CTAs and target flows

-   **Explore catalogs** (primary)
    -   Target flow: leads into the main discovery experience (scroll to discovery sections or route to `/catalogs` / `/explore` when available).
    -   Intent: default action for Buyers ready to browse and compare supplier products.
-   **See how Krafto works** (secondary)
    -   Target flow: leads to a concise explanation of how Krafto operates for purchasing teams (scroll to \"how it works\" section or route to `/how-it-works`).
    -   Intent: support visitors who need clarity on the product before exploring catalogs.
-   **Talk to us / Book a demo** (secondary/tertiary)
    -   Target flow: leads to a contact or demo-request flow (future route or embedded form).
    -   Intent: provide a higher-touch path for Buyers who want guidance or have complex needs.

### 2.2 Placement rules (hero and lower-page)

-   **Hero section**
    -   Must contain exactly one **primary** CTA: **Explore catalogs**.
    -   Can contain one **secondary** CTA: **See how Krafto works**.
    -   May contain one tertiary CTA: **Talk to us / Book a demo**, styled as lower emphasis (e.g., text link).
-   **Below the fold**
    -   **Explore catalogs** can be repeated once as a prominent CTA in a lower section (e.g., near discovery sections or trust signals) to capture users who scroll.
    -   **See how Krafto works** may be repeated in proximity to explanatory content if a dedicated \"how it works\" section exists on the homepage.
    -   **Talk to us / Book a demo** should appear where it is contextually relevant (e.g., near trust signals or explanatory content), but not as a competing primary CTA block.

### 2.3 Repetition and density guidelines

-   **Maximum strong CTAs**
    -   Above the fold: at most **one** primary and **one** secondary Buyer CTA (plus an optional tertiary link) in the hero.
    -   Across the full homepage: primary **Explore catalogs** should not appear as a strong button more than **2–3 times**; additional instances should use lighter styling or be embedded in content.
-   **Avoiding clutter**
    -   Do not place multiple strong buttons with different destinations side by side in the same visual group unless one is clearly primary and the other is styled as secondary.
    -   Section-level CTAs (e.g., \"View all artisans\") are allowed but should be visually scoped to their section and not compete with global primary CTAs.

### 2.4 Relationship to discovery sections

-   **Featured artisans, categories, collections**
    -   These sections function as the continuation of the **Explore catalogs** flow and should feel like natural next steps after the hero CTA.
    -   Section CTAs (\"View all artisans\", \"See all categories\", \"View collection\") reinforce the exploration path rather than introduce new global CTAs.
-   **Trust signals section**
    -   Can be followed by a repeated **Explore catalogs** CTA or a combined CTA block (e.g., \"Explore catalogs\" + \"Talk to us\") where the primary action remains exploration.

## 3. Seller onboarding entry points and constraints (B-HOME-04.3)

### 3.1 Possible Seller CTAs and locations

Potential Seller-facing CTAs that could be exposed from the Buyer homepage context are:

-   **Sell on Krafto** (primary Seller onboarding label candidate).
-   **Become a supplier** (alternative wording, same underlying flow).

Possible locations:

-   **Header**: a persistent navigation link or small button (e.g., in the top-right area), visually lighter than Buyer primary CTAs.
-   **Footer**: a link in a "For suppliers" or "For partners" area.
-   **Dedicated informational block** further down the homepage: a small section explaining benefits for suppliers, with a single Seller CTA.

### 3.2 Visual and hierarchy relationship to Buyer CTAs

-   Seller CTAs must **never** compete visually with the primary Buyer CTA in the hero ("Explore catalogs").
-   When present in the header, Seller CTAs should use a lighter visual style (e.g., text link or outline button) compared with Buyer primary CTAs.
-   Any Seller-focused block on the homepage should be clearly separated from the main Buyer discovery and trust sections, and contain only **one** prominent Seller CTA.

### 3.3 MVP vs later-phase strategy

-   **MVP**
    -   The Buyer homepage may start with Seller CTAs present only in global areas (header/footer), without a dedicated Seller block in the main scroll.
    -   Priority is to keep the Buyer value proposition and discovery path clear; Seller onboarding is secondary.
-   **Later phases**
    -   A dedicated Seller-section on the homepage can be added once Seller messaging and flows are more mature.
    -   At that point, the section should still avoid being placed above core Buyer discovery content and must contain a single, clearly labeled Seller CTA.

### 3.4 Constraints and safeguards for Seller CTAs

-   Do not place a strong Seller CTA in the hero on the Buyer homepage.
-   Avoid grouping Seller and Buyer primary CTAs in the same visual container; if both must appear together (e.g., in header), Buyer CTAs should remain visually dominant.
-   Ensure Seller CTAs use copy that clearly indicates they are for suppliers (e.g., "Sell on Krafto"), reducing ambiguity for Buyers.

## 4. Conflict/dilution safeguards and experimentation rules (B-HOME-04.4)

### 4.1 Safeguards to avoid conflicting CTAs

-   **Single clear primary per view**
    -   Each major viewport area (e.g., hero) should have at most **one** clearly primary CTA for Buyers.
    -   If multiple buttons are present, visual styling must make one clearly primary and the others secondary/tertiary.
-   **Separation of Buyer vs Seller intent**
    -   Do not mix strong Buyer and Seller CTAs in the same visual block; if both are visible, ensure they are placed in distinct areas (e.g., hero vs header link).
-   **Section-scope CTAs**
    -   Section-specific CTAs (e.g., "View all artisans") must visually read as part of their section, not as global actions competing with hero CTAs.

### 4.2 Limits on CTA density and prominence

-   **Above the fold (desktop and mobile)**
    -   Hero: up to 1 primary and 1 secondary Buyer CTA, plus at most one tertiary link.
    -   Avoid more than 3 interactive elements styled as buttons in the hero copy area.
-   **Across full homepage**
    -   Repeated primary CTAs should reduce in visual weight (e.g., smaller, secondary style) when they appear lower on the page.
    -   Avoid back-to-back blocks that each introduce new, unrelated CTAs without clear narrative flow.

### 4.3 Guardrails for experiments (A/B tests)

Any A/B tests involving CTAs on the Buyer homepage must:

-   Respect the established hierarchy (primary vs secondary vs tertiary) even when labels/positions change.
-   Preserve the separation of Buyer vs Seller intent (no test should introduce a Seller primary CTA in the Buyer hero).
-   Avoid variants that increase CTA density beyond agreed limits above the fold.
-   Be documented with:
    -   The hypotheses being tested (e.g., alternate wording for primary CTA).
    -   The exact changes in placement or styling vs the baseline.

### 4.4 Future refinement

-   As the product matures and more data is collected, these guardrails can be refined, but changes must remain consistent with:
    -   The Buyer value proposition defined in B-HOME-01.
    -   The homepage section structure from B-HOME-02.
    -   The editorial rules for featured content from B-HOME-03.

## 5. Cross-references and follow-up tickets (B-HOME-04.5)

### 5.1 Documentation updates needed

-   `docs/homepage/implementation.md`
    -   Add a short subsection summarizing the CTA hierarchy (primary: Explore catalogs; secondary: See how Krafto works; tertiary: Talk to us / Book a demo) and pointing to `docs/homepage-cta-strategy.md` as the detailed source of truth.
    -   Ensure hero CTAs in the implementation spec explicitly match the strategy (labels and target flows).
-   `docs/homepage/featured-editorial-rules.md`
    -   Cross-reference how primary CTAs interact with featured sections (e.g., Explore catalogs leading into featured artisans/categories/collections).
-   `docs/plan.md`
    -   Optionally link this CTA strategy as part of the Buyer homepage planning stack (B-HOME-01 → 04).

### 5.2 Suggested follow-up implementation tickets

-   **B-HOME-05 – Implement homepage CTAs and routing**
    -   Implement hero and lower-page CTAs in `src/app/page.tsx` and related components, using the CTA strategy as reference.
    -   Wire primary and secondary CTAs to the correct routes/scroll targets (e.g., `/catalogs`, `/how-it-works`, contact/demo flow placeholder).
-   **B-HOME-06 – Add basic CTA analytics tracking**
    -   Define and implement tracking events for key CTAs (Explore catalogs, See how Krafto works, Talk to us / Book a demo, Seller CTAs).
-   **B-HOME-07 – Implement Seller onboarding entry points**
    -   Implement header/footer Seller CTAs and, if in scope, the first Seller-focused block on the homepage, respecting constraints from this strategy.

### 5.3 Dependencies with featured editorial rules (B-HOME-03)

-   CTA placements that lead into discovery (e.g., Explore catalogs) should land users in sections that respect featured editorial rules (eligibility, diversity, rotation).
-   Any experiments involving CTAs that drive traffic to featured content must also comply with the fairness and rotation rules defined in `docs/homepage-featured-editorial-rules.md`.
