# Development Rules — NimbusCRM

**Status: Enforceable.** These are not suggestions. Code that violates a rule marked **[MUST]** should be treated as failing review/QA. Rules marked **[SHOULD]** are strong defaults that require a documented reason to deviate from. Rules marked **[MAY]** are optional allowances.

---

## 1. Code Quality Rules

1.1. **[MUST]** No inline styles (`style=""`) in HTML except for values that are genuinely dynamic and computed at runtime by JS (e.g., a progress bar's `width`, a chart bar's `height`) — and even then, prefer setting a CSS custom property inline (`style="--value: 72%"`) over raw CSS properties, so the visual definition still lives in CSS.

1.2. **[MUST]** No inline event handlers in HTML (`onclick=""`, `onchange=""`, etc.). All event binding happens in JavaScript via `addEventListener`.

1.3. **[MUST]** No `!important` in component or page CSS. The only acceptable use is in a small, clearly-labeled set of true utility classes (e.g., `.u-hidden`) where the entire purpose of the class is to override.

1.4. **[MUST]** No dead code committed: no commented-out blocks of old code left in files, no unused variables/functions, no unused CSS selectors.

1.5. **[MUST]** No `console.log` (or other debug console statements) left in code delivered/submitted. Temporary debug logging is fine during development but must be removed before a milestone is marked complete.

1.6. **[SHOULD]** Keep functions small and single-purpose (~40 lines as a soft ceiling). If a function is doing two distinct things, split it.

1.7. **[SHOULD]** Prefer clarity over cleverness. A slightly longer, obviously-correct implementation beats a terse one-liner that requires re-reading to understand.

1.8. **[MUST]** Every file must be consistently indented with **2 spaces** (no tabs, no 4-space indentation).

1.9. **[MUST]** No hard-coded "magic numbers" for spacing, color, radius, or timing anywhere in CSS or JS — always reference the design tokens (`var(--space-4)`, not `16px`; `var(--color-primary-500)`, not `#6366F1`).

---

## 2. HTML Rules

2.1. **[MUST]** Use semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>`, `<article>` where they match meaning — never a generic `<div>` when a semantic element fits.

2.2. **[MUST]** Exactly one `<h1>` per page. Heading levels must not skip (no `<h1>` directly followed by `<h3>`).

2.3. **[MUST]** All tabular data uses real `<table>` markup: `<thead>`, `<tbody>`, `<tr>`, `<th scope="col">` for headers, `<td>` for cells. Never simulate a table with nested `<div>`s.

2.4. **[MUST]** Every `<img>` has a meaningful `alt` attribute (or `alt=""` if purely decorative). Every form `<input>` has an associated `<label for="...">`.

2.5. **[MUST]** Interactive controls use the correct native element: `<button>` for actions, `<a href="">` only for real navigation, `<select>` for dropdowns, `<input type="checkbox">` for toggles — never a styled `<div>` pretending to be a button.

2.6. **[MUST]** Every page has a unique, descriptive `<title>` (e.g., "Customers · NimbusCRM", not just "NimbusCRM" on every page).

2.7. **[MUST]** Attributes use double quotes consistently (`class="card"`, not `class='card'`).

2.8. **[SHOULD]** Keep HTML files free of unnecessary wrapper `<div>`s — every element in the markup should have a clear structural or styling purpose.

2.9. **[MUST]** `<html lang="en">` is set on every page.

---

## 3. CSS Rules

3.1. **[MUST]** All colors, spacing, radii, shadows, font sizes, and transition durations are referenced via CSS custom properties defined in `css/tokens.css` — no raw hex codes, no raw pixel values for these categories anywhere else.

3.2. **[MUST]** Class naming follows BEM: `.block__element--modifier`. No ID selectors for styling (`#id { ... }` is forbidden for style rules — IDs are reserved for JS hooks and `aria-*`/`label[for]` associations).

3.3. **[MUST]** Mobile-first media queries: base (unqueried) styles target the smallest viewport; use `min-width` queries to progressively enhance for larger screens. Do not use `max-width`-only, desktop-first patterns.

3.4. **[MUST]** Only `transform`, `opacity`, `background-color`, `border-color`, `color`, and `box-shadow` may be transitioned/animated for performance reasons — never `width`, `height`, `top`, `left`, or `margin` in a transition.

3.5. **[MUST]** Every interactive element has a defined `:hover` state (where applicable) and a visible `:focus-visible` state. `outline: none` is forbidden unless immediately replaced with an equally or more visible custom focus style.

3.6. **[SHOULD]** One component = one CSS file under `css/components/`. Page-specific CSS files (`css/pages/*.css`) should contain only true one-off overrides, not component definitions.

3.7. **[MUST]** No fixed pixel widths on layout containers (sidebar, main content, cards, grid tracks) — use `%`, `fr`, `minmax()`, or `clamp()`. Fixed `px` is acceptable only for small fixed elements (icons, avatars, borders, the collapsed sidebar rail width).

3.8. **[MUST]** Respect `prefers-reduced-motion: reduce` — any non-essential animation/transition must be disabled or shortened for users who have this preference set.

3.9. **[SHOULD]** Avoid selector nesting deeper than 3 levels; if a selector is getting long/complex, it's a sign the BEM naming needs a new element/modifier class instead.

---

## 4. JavaScript Rules

4.1. **[MUST]** Use ES6+ syntax: `const`/`let` (never `var`), arrow functions where appropriate, template literals for string interpolation, destructuring where it improves clarity.

4.2. **[MUST]** Use ES modules (`<script type="module">`, `import`/`export`) — no global-scope script soup, no reliance on script-load-order for shared state.

4.3. **[MUST]** No direct global namespace pollution — don't attach arbitrary properties to `window` (exception: a single, deliberate app namespace if genuinely needed, documented as such).

4.4. **[MUST]** Use event delegation for repeated/dynamic elements (table rows, list items) — one listener on the container, not one listener per row.

4.5. **[MUST]** Debounce any input-driven re-render (e.g., live search) — minimum ~150ms debounce before filtering/re-rendering.

4.6. **[MUST]** No use of `eval()`, `document.write()`, or `innerHTML` assignment of unsanitized/user-influenced strings. Since this app has no real backend/user-generated persistence beyond local demo actions, `innerHTML` with hard-coded template strings for rendering dummy data is acceptable, but any future user-input-driven content must be inserted via safe DOM methods (`textContent`, `createElement`) or explicitly sanitized.

4.7. **[MUST]** All DOM queries are scoped as tightly as possible (`container.querySelector(...)` rather than repeated broad `document.querySelector(...)` calls inside loops/handlers).

4.8. **[SHOULD]** Keep data (`js/data/*.js`) strictly separate from rendering logic (`js/components/*.js`) and page control logic (`js/pages/*.js`) — no page file should contain hard-coded dummy data inline; it must import from `js/data/`.

4.9. **[MUST]** Wrap any `localStorage`/`sessionStorage` access (if used for optional persistence) in `try/catch`, since storage can be unavailable or full.

4.10. **[SHOULD]** Prefer small, named, pure functions for rendering (`renderCustomerRow(customer) → HTMLElement`) over large monolithic render functions.

---

## 5. Accessibility Rules

5.1. **[MUST]** Every interactive element must be reachable and operable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape` where relevant). Test this manually before marking a page complete.

5.2. **[MUST]** Modals trap focus while open, restore focus to the triggering element on close, and close on `Escape`.

5.3. **[MUST]** Icon-only buttons (edit/delete icons, hamburger toggle, notification bell) must have an `aria-label` describing their action (e.g., `aria-label="Delete Ananya Sharma"`, not just `aria-label="Delete"` where more specificity is reasonably available).

5.4. **[MUST]** Color is never the sole means of conveying status/priority — every badge pairs color with a text label.

5.5. **[MUST]** Text color/background combinations must meet WCAG AA contrast (≥4.5:1 for normal text, ≥3:1 for large text ≥24px or bold ≥19px). Verify token pairings, especially badge text-on-tint combinations, against this threshold.

5.6. **[MUST]** Toggle/expandable controls (sidebar drawer toggle, dropdown menus) use `aria-expanded` reflecting current state.

5.7. **[SHOULD]** Dynamic content updates that matter to the user (e.g., "3 customers found" after filtering) use `aria-live="polite"` regions so screen reader users are informed without a full page announcement.

---

## 6. Responsiveness Rules

6.1. **[MUST]** No page may produce horizontal scroll on the `<body>`/page container at any viewport width from 320px to 1920px. (Internal horizontal scroll on a specifically-wrapped table container is acceptable and expected on narrow viewports.)

6.2. **[MUST]** Every page must be manually verified at, at minimum: 320px, 375px, 768px, 1024px, 1440px.

6.3. **[MUST]** Touch targets (buttons, links, form controls) must be at least 44×44px on touch-relevant breakpoints (≤1024px).

6.4. **[MUST]** No core functionality (search, filter, add, edit, delete, status change, navigation) may be desktop-only — every feature must remain reachable on mobile, even if its presentation adapts (e.g., an actions "⋮" menu replacing inline icon buttons on narrow tables).

6.5. **[MUST]** Text must never be clipped, truncated without indication (e.g., `text-overflow: ellipsis` without a `title` attribute providing the full value), or overlapping another element at any tested breakpoint.

---

## 7. Naming Conventions (Enforced)

| Item | Convention | Example |
|---|---|---|
| HTML/CSS/JS filenames | kebab-case | `customers.html`, `format.js` |
| CSS classes | BEM | `.table__row--selected` |
| CSS custom properties | `--category-name-scale` | `--color-danger-500` |
| JS variables/functions | camelCase | `filteredCustomers`, `renderTable()` |
| JS constants | UPPER_SNAKE_CASE | `MAX_ROWS_PER_PAGE` |
| Data-attribute JS hooks | kebab-case | `data-action="delete"` |
| Git branches | `type/short-description` | `feature/customers-table`, `fix/sidebar-mobile-overlap` |

Full rationale for each convention: see `agents/tech_stack.md` §5.

---

## 8. Performance Rules

8.1. **[MUST]** No render-blocking synchronous scripts in `<head>` — use `type="module"` (deferred by default) or the `defer` attribute.

8.2. **[MUST]** Batch DOM insertions using `DocumentFragment` (or building an HTML string and setting `innerHTML` once) rather than appending elements one at a time in a loop directly to a live, attached DOM node.

8.3. **[MUST]** Debounce high-frequency event handlers (search input, resize listeners) — minimum ~150ms.

8.4. **[SHOULD]** Prefer CSS for animation/transition over JS-driven animation loops wherever the effect is achievable in CSS.

8.5. **[SHOULD]** Keep total custom CSS under a reasonable size by avoiding duplication — shared patterns belong in `components/`, not repeated per page.

8.6. **[MUST]** Any externally loaded font must use `font-display: swap` to avoid invisible-text-on-load (FOIT).

---

## 9. Git Commit Conventions

Follow **Conventional Commits** format:

```
<type>(<scope>): <short summary>

[optional longer description]
```

**Types:**
| Type | Use for |
|---|---|
| `feat` | New feature or page (e.g., `feat(customers): add search and filter toolbar`) |
| `fix` | Bug fix (e.g., `fix(sidebar): resolve overlap on tablet breakpoint`) |
| `style` | Visual/CSS-only change with no logic change (e.g., `style(badge): adjust padding to match token scale`) |
| `refactor` | Code restructuring with no behavior change (e.g., `refactor(table): extract row-render into shared helper`) |
| `docs` | Documentation-only change (e.g., `docs(prd): update success metrics section`) |
| `chore` | Tooling, config, non-source changes (e.g., `chore: add .gitignore`) |
| `test` | Adding/adjusting manual QA notes or (if applicable) test scaffolding |

**Rules:**
9.1. **[MUST]** Every commit message starts with a valid `type(scope):` prefix.
9.2. **[MUST]** Summary line is imperative mood ("add," not "added"/"adds") and under ~72 characters.
9.3. **[MUST]** One logical change per commit — don't bundle an unrelated bug fix into a feature commit.
9.4. **[SHOULD]** Commit at each meaningful milestone from `agents/current_state.md` §5, not just at the very end.

---

## 10. File Organization Rules

10.1. **[MUST]** Follow the exact folder structure defined in `agents/tech_stack.md` §4 — no ad-hoc top-level files, no CSS/JS mixed into the wrong directory (e.g., a component's CSS must live in `css/components/`, never inline in a page's `<style>` block or in `css/pages/`).

10.2. **[MUST]** One component = one CSS file and (if it has behavior) one JS file, named identically to the component (`badge.css` ↔ badge styling only).

10.3. **[MUST]** Dummy data lives only in `js/data/*.js` — never hard-coded inline inside a page's HTML or inside a page controller JS file.

10.4. **[MUST]** Shared/reusable logic goes in `js/components/` or `js/utils/`; page-specific wiring goes in `js/pages/`. A page file should primarily *orchestrate* (import data, import components, bind events) rather than *define* new reusable logic inline.

10.5. **[SHOULD]** Keep `assets/icons/`, `assets/images/`, and `assets/fonts/` cleanly separated by type; remove unused assets before final submission.

10.6. **[MUST]** No orphaned files: every CSS/JS file that exists must be actually linked/imported from at least one HTML page. Remove or integrate anything unused before a milestone is marked complete.

---

## Enforcement Note

Before marking any page or component "done" in `agents/current_state.md`, run through this checklist:
- [ ] Section 1 (Code Quality) — no violations
- [ ] Section 2 (HTML) — no violations
- [ ] Section 3 (CSS) — no violations
- [ ] Section 4 (JavaScript) — no violations
- [ ] Section 5 (Accessibility) — no violations
- [ ] Section 6 (Responsiveness) — verified at all listed breakpoints
- [ ] Section 7 (Naming) — consistent throughout new code
- [ ] Section 8 (Performance) — no violations
- [ ] Section 10 (File Organization) — files in correct locations, nothing orphaned

A page/feature that fails any **[MUST]** rule is not complete, regardless of whether it "looks done" visually.
