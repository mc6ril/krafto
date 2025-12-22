---
Title: Homepage featured content editorial rules
Source Ticket: krafto-3 (B-HOME-03)
Status: In progress
---

## 1. Scope and terminology for "featured" surfaces (B-HOME-03.1)

### 1.1 Definition of "featured" content

-   **Featured content** on the Buyer homepage is any product, shop, or collection that is:
    -   Explicitly curated or boosted (manually or via rules), and
    -   Displayed in a **limited, high-visibility surface**, and
    -   Not intended to be an exhaustive or purely neutral listing.
-   Featured content always implies an **editorial choice** (human, algorithmic, or hybrid) that must respect clear rules (ethics, diversity, recency, transparency).

### 1.2 List of \"featured\" surfaces on the Buyer homepage

Based on the current Buyer homepage implementation spec (`docs/homepage/implementation.md`), the following surfaces are considered \"featured\":

1. **Featured artisans section**
    - Location: Dedicated section titled as a curated selection of artisans (see section \"Featured Artisans Section\" in `docs/homepage/implementation.md`).
    - Content type: **Shops / artisans** only.
    - Role: Showcase a small set of artisans that represent marketplace breadth and quality.
2. **Collections / thematic highlights section**
    - Location: Section that surfaces curated entry points such as seasonal themes, best-sellers, or new arrivals.
    - Content type: **Collections of products** (each collection groups multiple products under a theme).
    - Role: Provide editorial shortcuts into the catalog (e.g., \"Best-sellers\", \"New arrivals\", \"Editor's picks\").
3. **Any future \"hero highlight\" of a single product, shop, or collection**
    - Location: Within or adjacent to the hero, if a specific product, shop, or collection is highlighted in the future (e.g., campaign hero, spotlight card).
    - Content type: **Product**, **shop**, or **collection**, depending on the design.
    - Role: Temporary high-visibility spotlight linked to a campaign or strategic focus.

> Note: Standard sections such as \"Categories\" and neutral search/browse results are **not** considered featured surfaces by default, even if they are visually prominent, because they are designed to represent a broader, more systematic view of the catalog.

### 1.3 Content types per surface

-   **Featured artisans section**
    -   Content type: `FeaturedShop` (conceptual) representing an artisan or shop.
    -   Each card is a single shop/artisan with its own metadata (name, visual, positioning line, trust cues).
-   **Collections / thematic highlights section**
    -   Content type: `FeaturedCollection` (conceptual) representing a named editorial collection.
    -   Each collection references an underlying set of products, but the surface itself displays a summary (title, description, representative visuals).
-   **Hero highlight (future)**
    -   Content type: `FeaturedProduct`, `FeaturedShop`, or `FeaturedCollection`, depending on the chosen pattern.
    -   Treated as a high-visibility featured surface and must follow the same editorial rules defined in this document.

### 1.4 Distinction from standard listings and search results

To avoid confusion and ensure transparency:

-   **Standard listings and search results** (e.g., category pages, generic search results) are:
    -   Ordered primarily by neutral or clearly explained criteria (e.g., relevance, filters, sort order chosen by the user).
    -   Intended to be **systematic** and as complete as possible within their scope.
    -   Not labeled as \"editorial\" or \"featured\".
-   **Featured surfaces**, by contrast:
    -   Show a **limited subset** of content in high-visibility positions.
    -   Are the result of **editorial selection or boosting** based on explicit rules (ethics, diversity, recency, campaigns).
    -   Must be internally documented in this file and, when relevant, clearly labeled for buyers (e.g., \"Editor's picks\", \"New arrivals\", \"Best-sellers\").

### 1.5 Relationship between featured and non-featured content

-   A product or shop can exist both in:
    -   Standard listings (e.g., within its category, search results), and
    -   One or more featured surfaces (e.g., a collection or featured artisans section),
        as long as it meets the eligibility and diversity rules defined in the rest of this document.
-   Being featured **does not** change the underlying product or shop data; it only affects how and where it is surfaced on the homepage and related discovery entry points.
-   Future implementation tickets will use this scope and terminology as the basis for:
    -   Domain modeling (e.g., `FeaturedStatus`, `FeaturedSurfaceType`),
    -   Usecases (`listFeaturedProducts`, `listFeaturedShops`, `listFeaturedCollections`),
    -   Infrastructure fields (e.g., feature flags, campaign tags, rotation metadata).

## 2. Operational workflow and transparency (B-HOME-03.5)

### 2.1 Ownership and roles

-   **Editorial owner**: defines and validates the featured strategy (what we want to highlight, diversity goals, campaign priorities).
-   **Operations owner**: ensures that selected products and shops remain operationally sound (availability, service quality, issue handling).
-   **Data/implementation owner** (future): maintains the underlying rules/flags used by tooling (e.g., eligibility status, rotation metadata).

These are **roles**, not specific people; one person may hold multiple roles in early stages.

### 2.2 Workflow for proposing and approving featured content

1. **Proposal**
    - New featured sets (products, shops, collections) are proposed by the editorial owner, based on the eligibility, diversity, and recency rules in this document.
    - Proposals should reference the surfaces they target (e.g., featured artisans, specific collection).
2. **Review and approval**
    - Operations owner checks for operational risks (stock, complaints, compliance flags).
    - If any blocking issue is found, the item is either replaced or deferred until resolved.
3. **Activation**
    - Once approved, the featured configuration is applied in the relevant tooling (e.g., back-office flags, configuration files, or future admin UI).
4. **Review after go-live**
    - At each rotation, the current featured set is reviewed to confirm it still meets eligibility, diversity, and recency expectations.

### 2.3 Tooling dependencies (current and future)

-   **Short term (manual)**
    -   Featured selections can initially be managed via a simple internal list or configuration (e.g., IDs in a config file or basic back-office table), as long as it is documented and auditable.
-   **Medium term (back-office)**
    -   A dedicated back-office view should allow: marking products/shops as eligible, flagging items for featuring, and attaching them to specific surfaces or campaigns.
    -   Back-office should expose key metadata used by the rules (eligibility status, last review date, rotation history).
-   **Longer term (automation support)**
    -   When automated selection is introduced (e.g., based on performance signals), tooling must still allow manual overrides and visibility into why an item is featured.

### 2.4 Transparency and buyer communication

-   **Labeling featured content**
    -   Where relevant, featured sections should be clearly labeled with neutral, honest wording (e.g., "Editorial selection", "New arrivals", "Best-sellers").
    -   If sponsorship or paid promotion is introduced in the future, sponsored placements must be explicitly labeled as such and distinguishable from purely editorial selections.
-   **Consistency with buyer promise**
    -   Labels and microcopy must remain consistent with the Buyer value proposition and trust messaging defined in the homepage docs.

### 2.5 Constraints and non-goals for MVP

-   **No opaque pay-to-play**
    -   For MVP, there is **no** hidden pay-to-play mechanism: featuring decisions must be driven by editorial and buyer value, not undisclosed commercial agreements.
-   **No fully automated black-box ranking**
    -   Any automated component must remain explainable and compatible with the rules in this document; purely opaque ranking models are out of scope for MVP.
-   **Scope limited to homepage featured surfaces**
    -   These rules do not yet cover other parts of the product (e.g., internal search ranking, recommendation modules); those will require dedicated tickets.
