# Tech Stack & Architecture — NimbusCRM

**Constraint:** HTML + CSS + JavaScript only. No frameworks (no React/Vue/Angular), no CSS preprocessors requiring a build step (plain CSS with custom properties), no backend, no package manager required to run the app. Optional: a lightweight local dev server for correct relative paths (e.g., VS Code "Live Server") — not a hard requirement.

---

## 1. HTML Structure Strategy

### 1.1 Multi-Page Architecture
Because the brief specifies distinct "pages" (Login, Dashboard, Customers, Leads, Tasks) and no SPA framework is in use, NimbusCRM is built as a **multi-page application (MPA)**: one `.html` file per page, each linking the same shared CSS and loading page-specific JS alongside shared JS utilities.

```
login.html      → entry point
dashboard.html  → landing page after login
customers.html
leads.html
tasks.html
```

Shared chrome (sidebar + navbar) is duplicated across each authenticated page's HTML (there is no client-side templating engine). To minimize drift:
- The sidebar/navbar markup block is treated as a strict, copy-identical partial across pages, differing only in the "active" class applied to the current nav item.
- A shared `js/components/sidebar.js` and `js/components/navbar.js` handle behavior (collapse, drawer toggle, active-state sync via `document.body.dataset.page` or similar) so behavior logic isn't duplicated even though markup is.
- Optional advanced approach (if instructor allows / time permits): load the sidebar/navbar via `fetch()` of a partial HTML file injected into a `<div id="sidebar-root">` container, keeping one canonical copy of the markup. This is a nice-to-have, not required.

### 1.2 Semantic HTML Requirements
- Use landmark elements: `<header>` (navbar), `<nav>` (sidebar), `<main>` (page content), `<footer>` (if applicable).
- Use `<table>` for tabular data (Customers/Leads/Tasks lists) with proper `<thead>`, `<tbody>`, `<th scope="col">` — do not fake tables with `<div>` grids (accessibility and semantics matter here, though a responsive "card" fallback view for mobile is acceptable as a *progressive enhancement*, not a replacement for the semantic table in markup).
- Use `<form>` for the login form and any add/edit customer form, with proper `<label for="">` associations on every input.
- Use `<button>` for actions (never a `<div onclick>`), and `<a href>` only for real navigation.
- Use `role="dialog" aria-modal="true"` and focus-trapping for modals.

### 1.3 Document Structure Pattern (per authenticated page)
```html
<body data-page="dashboard">
  <div class="app-shell">
    <aside class="sidebar" id="sidebar"> ... </aside>
    <div class="app-main">
      <header class="navbar"> ... </header>
      <main class="page-content">
        <!-- page-specific content -->
      </main>
    </div>
  </div>
  <!-- modals, toasts mounted here at end of body -->
</body>
```

---

## 2. CSS Architecture

### 2.1 Methodology
**ITCSS-inspired layering + BEM-like naming**, without a preprocessor:

```
1. Settings   → css/tokens.css (custom properties only, no selectors beyond :root)
2. Reset      → css/reset.css (modern CSS reset)
3. Base       → css/base.css (element defaults: body, headings, links, lists)
4. Layout     → css/layout.css (app-shell grid, sidebar/navbar structural CSS)
5. Components → css/components/*.css (one file per component: buttons, cards, table, badge, modal, form, sidebar, navbar)
6. Pages      → css/pages/*.css (page-specific overrides only — should be minimal)
7. Utilities  → css/utilities.css (small helper classes: .text-center, .hidden, .sr-only)
```

CSS custom properties (design tokens) are the *only* source of colors, spacing, radii, shadows, and durations — no raw hex codes or magic pixel numbers inside component/page files.

### 2.2 Naming Convention — BEM (Block, Element, Modifier)
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__value { }

/* Modifier */
.card--interactive { }
.badge--success { }
.badge--warning { }
.badge--danger { }

/* State (prefixed, not part of BEM name, toggled via JS) */
.is-open { }
.is-active { }
.is-disabled { }
.is-loading { }
```

Utility classes (sparingly used, layout-only, not a full utility-CSS framework):
```css
.u-hidden { display: none !important; }
.u-sr-only { /* visually hidden, screen-reader accessible */ }
.u-text-center { text-align: center; }
```

### 2.3 Layout Technique
- **CSS Grid** for the app shell (sidebar + main content area) and for KPI card grids.
- **Flexbox** for component-internal layout (navbar contents, table toolbar, button groups, form rows).
- Fluid sizing via `%`, `fr`, `minmax()`, and `clamp()` — avoid fixed `px` widths on containers (fixed `px` is acceptable for icons, borders, and small fixed elements like avatars).

```css
.app-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width, 260px) 1fr;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .app-shell { grid-template-columns: 72px 1fr; } /* icon rail */
}

@media (max-width: 768px) {
  .app-shell { grid-template-columns: 1fr; } /* sidebar becomes off-canvas */
}
```

### 2.4 CSS File Loading Order (in `<head>`)
```html
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components/buttons.css">
<link rel="stylesheet" href="css/components/cards.css">
<link rel="stylesheet" href="css/components/table.css">
<link rel="stylesheet" href="css/components/badge.css">
<link rel="stylesheet" href="css/components/forms.css">
<link rel="stylesheet" href="css/components/modal.css">
<link rel="stylesheet" href="css/components/sidebar.css">
<link rel="stylesheet" href="css/components/navbar.css">
<link rel="stylesheet" href="css/pages/dashboard.css"> <!-- only on dashboard.html -->
<link rel="stylesheet" href="css/utilities.css">
```
(In practice, once stable, these can be concatenated into a single `css/styles.css` for production/submission to reduce HTTP requests — but keep them split during development for maintainability, then optionally merge.)

---

## 3. JavaScript Architecture

### 3.1 Style
- **Vanilla JS, ES6+ modules** (`type="module"` in script tags), no bundler required — modern browsers support native ES modules.
- No global namespace pollution: each file exports named functions/consts; nothing attaches to `window` except where unavoidable (e.g., a single small app-level namespace if truly needed).
- No jQuery, no heavy dependencies. If a chart library is used, keep it minimal (see §3.5).

### 3.2 Folder & Module Structure
```
js/
├── data/
│   ├── customers.js      // export const customers = [...]
│   ├── leads.js           // export const leads = [...]
│   ├── tasks.js            // export const tasks = [...]
│   └── activity.js         // export const activity = [...]
│
├── components/
│   ├── sidebar.js          // collapse/drawer behavior, active state
│   ├── navbar.js            // dropdown menus, mobile toggle
│   ├── modal.js              // generic open/close/focus-trap logic
│   ├── table.js               // generic render/search/filter/sort helpers
│   ├── badge.js                 // status → badge class mapping
│   └── toast.js                  // optional feedback notifications
│
├── utils/
│   ├── dom.js               // small DOM helper functions (qs, qsa, createEl)
│   ├── format.js             // date/currency/phone formatting helpers
│   └── validate.js            // form validation helpers
│
├── pages/
│   ├── login.js
│   ├── dashboard.js
│   ├── customers.js
│   ├── leads.js
│   └── tasks.js
│
└── main.js   // (optional) shared bootstrap logic imported by every page
```

### 3.3 Data Layer Pattern
All dummy data lives in `js/data/*.js` as plain exported arrays of objects — this is the "mock database." Page controllers import the relevant dataset(s) and render from them. This keeps a clean seam: if a real backend is added later, only the data layer needs replacing (fetch calls instead of static imports), while component/render logic stays the same.

```js
// js/data/customers.js
export const customers = [
  { id: 'cus_001', name: 'Ananya Sharma', email: 'ananya.sharma@brightwave.io', phone: '+91 98765 43210', company: 'Brightwave Media', status: 'Active' },
  { id: 'cus_002', name: 'Daniel Osei', email: 'd.osei@vertexlogix.com', phone: '+1 (415) 555-0192', company: 'VertexLogix', status: 'Active' },
  { id: 'cus_003', name: 'Mei Lin Tan', email: 'meilin.tan@harboredge.co', phone: '+65 9123 4567', company: 'Harbor Edge Pte Ltd', status: 'Inactive' },
  // ... 15–20 total realistic rows recommended
];
```

### 3.4 Rendering Pattern (no framework — manual but structured)
Use small, pure render functions that take data and return DOM nodes or HTML strings, plus a thin "controller" per page that wires data + events together.

```js
// js/components/table.js
export function renderCustomerRow(customer) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${customer.name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.company}</td>
    <td>${renderBadge(customer.status)}</td>
    <td class="table__actions">
      <button class="btn btn--icon" data-action="edit" data-id="${customer.id}" aria-label="Edit ${customer.name}">✎</button>
      <button class="btn btn--icon btn--danger" data-action="delete" data-id="${customer.id}" aria-label="Delete ${customer.name}">🗑</button>
    </td>`;
  return tr;
}
```

```js
// js/pages/customers.js
import { customers } from '../data/customers.js';
import { renderCustomerRow } from '../components/table.js';

let state = { query: '', statusFilter: 'all', records: [...customers] };

function applyFilters() {
  return state.records.filter(c =>
    (state.statusFilter === 'all' || c.status === state.statusFilter) &&
    (c.name.toLowerCase().includes(state.query) || c.email.toLowerCase().includes(state.query) || c.company.toLowerCase().includes(state.query))
  );
}

function render() {
  const tbody = document.querySelector('#customers-tbody');
  tbody.innerHTML = '';
  const filtered = applyFilters();
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="table__empty">No customers found.</td></tr>`;
    return;
  }
  filtered.forEach(c => tbody.appendChild(renderCustomerRow(c)));
}

// event bindings: search input, filter select, add/edit/delete delegation
```

Use **event delegation** on table/list containers (one listener on `<tbody>` handling `data-action` attributes) rather than binding a listener per row — cleaner and scales better as rows are re-rendered.

### 3.5 Charts (Sales Overview)
Recommended approach, in order of preference given "no heavy dependency" goal:
1. **Hand-rolled inline SVG** bar/line chart generated from the dummy dataset via JS (full control, zero dependencies, tiny footprint) — preferred for a college project demonstrating real skill.
2. If more visual sophistication is desired and permitted, a single lightweight library loaded via CDN `<script>` tag (e.g., Chart.js) is acceptable — but this should be a deliberate, documented choice, not a default, since it's an external dependency in an otherwise dependency-free project.

### 3.6 State Management
No formal state library needed. Each page controller keeps a small local `state` object (as shown above) scoped to that page's module — there is no cross-page shared state requirement since this is an MPA with no persistence mandate. If `localStorage` persistence is implemented (optional), wrap reads/writes in a small `js/utils/storage.js` helper with try/catch guards.

---

## 4. Folder Structure (Full Project Tree)

```
nimbus-crm/
├── login.html
├── dashboard.html
├── customers.html
├── leads.html
├── tasks.html
│
├── css/
│   ├── reset.css
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── utilities.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── table.css
│   │   ├── badge.css
│   │   ├── forms.css
│   │   ├── modal.css
│   │   ├── sidebar.css
│   │   └── navbar.css
│   └── pages/
│       ├── login.css
│       ├── dashboard.css
│       ├── customers.css
│       ├── leads.css
│       └── tasks.css
│
├── js/
│   ├── data/
│   │   ├── customers.js
│   │   ├── leads.js
│   │   ├── tasks.js
│   │   └── activity.js
│   ├── components/
│   │   ├── sidebar.js
│   │   ├── navbar.js
│   │   ├── modal.js
│   │   ├── table.js
│   │   ├── badge.js
│   │   └── toast.js
│   ├── utils/
│   │   ├── dom.js
│   │   ├── format.js
│   │   ├── validate.js
│   │   └── storage.js
│   └── pages/
│       ├── login.js
│       ├── dashboard.js
│       ├── customers.js
│       ├── leads.js
│       └── tasks.js
│
├── assets/
│   ├── icons/         (SVG icon set)
│   ├── images/         (avatars, illustrations for empty states)
│   └── fonts/            (self-hosted Inter .woff2, if not using Google Fonts CDN)
│
└── README.md
```

---

## 5. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| HTML files | lowercase, kebab-case, matches page name | `dashboard.html`, `login.html` |
| CSS files | lowercase, kebab-case | `sidebar.css`, `tokens.css` |
| JS files | lowercase, kebab-case | `customers.js`, `format.js` |
| CSS classes | BEM: `block__element--modifier` | `.card__title`, `.badge--success` |
| CSS custom properties | `--category-name-scale` | `--color-primary-500`, `--space-4` |
| JS variables/functions | camelCase | `renderCustomerRow`, `filteredLeads` |
| JS constants (fixed values) | UPPER_SNAKE_CASE | `const MAX_ROWS_PER_PAGE = 15;` |
| Data attributes (JS hooks) | `data-*`, kebab-case | `data-action="edit"`, `data-status-filter` |
| IDs (unique DOM anchors) | kebab-case | `#customers-tbody`, `#sidebar` |
| Image/icon assets | kebab-case, descriptive | `icon-users.svg`, `empty-state-search.svg` |

**Rule of thumb:** never use a `data-*` attribute *and* a class for the same JS hook purpose — JS behavior hooks use `data-*` or `js-` prefixed classes (e.g. `.js-toggle-sidebar`); styling hooks use plain BEM classes. This separation prevents a CSS refactor from accidentally breaking JS.

---

## 6. Responsive Strategy (Technical Implementation)

- Mobile-first CSS: base styles unprefixed by media query = mobile; `min-width` queries layer on tablet/desktop enhancements (see breakpoints in `design_tokens.md` §6).
- Sidebar responsive behavior implemented via a combination of CSS (`grid-template-columns` changes, `transform: translateX()` for the off-canvas drawer) and a small JS controller (`sidebar.js`) toggling an `.is-open` class + `aria-expanded` attribute on the toggle button.
- Tables: wrapped in `.table-wrapper { overflow-x: auto; }` as the baseline responsive strategy (simplest, most robust); a stacked "card row" view for mobile is an enhancement (`@media (max-width: 576px)` swapping table row display to a flex/grid card layout) — implement only after the scroll-wrapper baseline works reliably.
- Images/icons: `max-width: 100%; height: auto;` by default; SVG icons sized via CSS, not inline width/height attributes where possible.
- Test matrix (manual, via browser DevTools device toolbar): 320px, 375px, 414px, 768px, 1024px, 1280px, 1440px, 1920px.

---

## 7. Performance Considerations

- **No render-blocking heavy assets:** self-host or CDN-load only the fonts/icons actually used; use `font-display: swap` for web fonts.
- **Minimize reflow:** batch DOM updates (build rows via `DocumentFragment` before appending to `tbody`, rather than appending one row at a time in a loop directly to the live DOM).
- **Defer non-critical JS:** use `type="module"` (deferred by default) or `defer` attribute on classic scripts; avoid blocking `<script>` tags in `<head>`.
- **Avoid layout thrashing in animations:** animate `transform`/`opacity` only (per `design_tokens.md` §7), never animate `width`/`height`/`top`/`left`.
- **Image optimization:** use SVG for icons/illustrations (scalable, tiny file size); compress any raster avatar images; use `loading="lazy"` on any below-the-fold images.
- **CSS/JS file size discipline:** keep component CSS files focused/small; avoid duplicating rules across page-specific CSS files (page CSS should only contain true one-off overrides).
- **No unnecessary re-renders:** on search/filter input, debounce the input handler (~150–200ms) before re-rendering the table to avoid excessive re-renders on every keystroke.

---

## 8. Accessibility Requirements

- **Semantic structure:** landmarks (`header`, `nav`, `main`), one `<h1>` per page, logical heading order (no skipped levels).
- **Keyboard operability:** every interactive element (nav links, buttons, table action icons, filter dropdowns, modal controls) must be reachable and operable via `Tab`/`Shift+Tab`/`Enter`/`Space`; modals must trap focus while open and return focus to the triggering element on close; `Escape` closes modals/drawers.
- **Focus visibility:** never remove `:focus` outlines without providing a replacement focus style (`--focus-ring` token, per `design_tokens.md`).
- **Color contrast:** body text and interactive text must meet WCAG AA (≥4.5:1); large text (≥24px or ≥19px bold) may use the AA large-text threshold (≥3:1). Verify token combinations, especially semantic badge text-on-tint combinations, with a contrast checker.
- **ARIA where needed:** icon-only buttons get `aria-label`; toggles get `aria-expanded`; modals get `role="dialog" aria-modal="true" aria-labelledby="modal-title"`; live-updating regions (e.g., search result count, toast notifications) use `aria-live="polite"`.
- **Form accessibility:** every input has an associated `<label>`; error messages are programmatically associated via `aria-describedby`; required fields marked with `aria-required="true"` or the `required` attribute (which also gives free browser-level validation UX).
- **Don't rely on color alone:** status badges/priority indicators pair color with a text label (and optionally an icon/shape), so colorblind users aren't dependent on hue alone to distinguish e.g. "High" vs "Low" priority.
- **Reduced motion:** wrap decorative transitions/animations in `@media (prefers-reduced-motion: no-preference)` so users who've opted out of motion get instant state changes instead.

---

## 9. Deployment Recommendations

Since this is a static frontend-only project with no build step required:

1. **GitHub Pages** — simplest option for a college project; push the repo, enable Pages on the `main` branch (root or `/docs` folder), get a shareable URL for submission/demo.
2. **Netlify / Vercel (static drag-and-drop or Git-connected)** — also trivial for a no-build static site; adds free HTTPS and a clean URL; supports instant redeploys on push if Git-connected.
3. **Local submission fallback** — if online deployment isn't required by the instructor, ensure the project runs correctly via a simple local server (e.g., `npx serve`, Python's `http.server`, or VS Code Live Server extension) since native `<script type="module">` imports can be blocked by CORS policy when opened directly via `file://` in some browsers. Document this requirement clearly in the project `README.md`.
4. **Pre-deployment checklist:** relative paths only (no absolute local file paths), all asset links case-correct (case-sensitive on Linux-based hosts like GitHub Pages even if working locally on Windows/Mac), no leftover `console.log` debug statements, favicon present, `<title>` set per page.

---

*This document pairs with `agents/design_tokens.md` (visual contract) and `rules/rule.md` (enforceable coding standards). Together, the three form the complete technical contract for implementation.*
