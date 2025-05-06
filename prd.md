# PRD: Capybara Meme Site MVP

## 1. Overview

Create a visually engaging, static landing page for a Capybara-themed meme project. The site will feature a unique horizontally scrolling layout with interactive elements, social links, and basic analytics, built with Next.js and hosted on Firebase.

## 2. Goals

*   Launch a simple, shareable web presence for the project.
*   Showcase the project's theme and basic information (e.g., Tokenomics) in a fun way.
*   Establish foundational tech stack (Next.js, Tailwind, Firebase).

## 3. Key Features

*   **Static Header:**
    *   Fixed position at the top.
    *   Contains links: DexScreener, Twitter (placeholder), Telegram (placeholder).
    *   Uses Flexbox for layout.
*   **Horizontally Scrollable Main Content:**
    *   Wider than the viewport (`overflow-x: scroll`).
    *   Background: Use `public/images/capywebbanner2.jpg`. Ensure it's wide enough or tiles appropriately.
    *   Visual indicator suggesting horizontal scrolling.
*   **Interactive Elements (within scrollable area):**
    *   **Placeholder Video:** HTML5 `<video>` element, embedded directly. Autoplaying, muted, looping, no controls visible. Placeholder source needed.
    *   **Static Cat Image:** `public/images/cat.png` positioned appropriately (e.g., on a couch element if present in background). *Asset to be added.*
    *   **Interactive Dots:** Small, visually appealing clickable elements.
        *   On click, open a modal/popup.
        *   Example Modals: "Tokenomics", "Roadmap", "How to Buy" (content TBD).
        *   Requires basic JavaScript for modal functionality.
*   **Custom Cursor:** Use `public/images/cursor.png`. *Asset to be added.*
*   **Custom Font:** Use "Luckiest Guy" (or similar playful font) via Google Fonts or local hosting.
*   **Analytics:** Integrate Google Analytics using Firebase configuration.

## 4. Technical Requirements

*   **Framework:** Next.js (`create-next-app`, TypeScript)
*   **Static Export:** Site must be exportable using `next build && next export`.
*   **Styling:** Tailwind CSS.
*   **Hosting:** Firebase Hosting.
*   **JavaScript:** Minimal vanilla JS or simple library for modals.

## 5. Assets

*   `public/images/capywebbanner2.jpg` (Provided)
*   `public/images/cursor.png` (To be created/added)
*   `public/images/cat.png` (To be created/added)
*   `public/videos/placeholder.mp4` (or similar format, to be created/added)
*   `public/images/logos/dexscreener.png` (To be sourced/added)
*   `public/images/logos/twitter.png` (To be sourced/added)
*   `public/images/logos/telegram.png` (To be sourced/added)
*   Font file(s) for "Luckiest Guy" if self-hosting.

## 6. Deployment

1.  `npx create-next-app@latest capybara-landing --ts`
2.  Install & configure Tailwind CSS.
3.  Develop components & features.
4.  `next build && next export` (Output to `out/` dir).
5.  Install `firebase-tools`.
6.  `firebase login`
7.  `firebase init hosting` (Point to `out/` directory).
8.  `firebase deploy`

## 7. MVP Success Criteria (Checklist)

*   [ ] Header with DexScreener/Social links is fixed and functional.
*   [ ] Main content area scrolls horizontally.
*   [ ] Background image displays correctly without excessive distortion.
*   [ ] Placeholder video plays automatically without controls.
*   [ ] Cat image is positioned correctly.
*   [ ] Interactive dots are present and open placeholder modals on click.
*   [ ] Custom cursor is active.
*   [ ] Custom font is applied.
*   [ ] Google Analytics script is included.
*   [ ] Site renders correctly on modern desktop & mobile browsers.
*   [ ] Site successfully deploys to Firebase Hosting.
*   [ ] No console errors in the browser. 