# Design Tokens & System — NimbusCRM

**Purpose:** This is the single source of truth for every visual value used in the product. If a value isn't defined here, it shouldn't appear in the CSS. All tokens are expressed as CSS custom properties so they can be implemented directly in `css/tokens.css` and consumed everywhere else.

Design direction: **modern SaaS dashboard** — think a blend of Linear's restraint, Stripe Dashboard's clarity, and HubSpot's approachable warmth. Clean surfaces, confident but not loud color, generous whitespace, subtle depth via soft shadows rather than heavy borders.

---

## 1. Color Palette

### 1.1 Brand / Primary
| Token | Hex | Usage |
|---|---|---|
| `--color-primary-50` | `#EEF2FF` | Subtle backgrounds, hover tints |
| `--color-primary-100` | `#E0E7FF` | Light badges, selected row background |
| `--color-primary-200` | `#C7D2FE` | Borders on light primary surfaces |
| `--color-primary-300` | `#A5B4FC` | Disabled primary elements |
| `--color-primary-400` | `#818CF8` | Hover state (secondary strength) |
| `--color-primary-500` | `#6366F1` | **Core brand color** — primary buttons, links, active nav |
| `--color-primary-600` | `#4F46E5` | Primary button hover/active |
| `--color-primary-700` | `#4338CA` | Primary button pressed |
| `--color-primary-800` | `#3730A3` | Dark accents |
| `--color-primary-900` | `#312E81` | Deepest brand tone (rarely used) |

Rationale: an indigo/violet primary reads as modern SaaS without being a cliché "CRM blue." It pairs cleanly with neutral grays and doesn't clash with semantic colors below.

### 1.2 Neutrals (Grayscale) — Light Mode
| Token | Hex | Usage |
|---|---|---|
| `--color-neutral-0` | `#FFFFFF` | Page/card background |
| `--color-neutral-50` | `#F9FAFB` | App background (behind cards), sidebar background |
| `--color-neutral-100` | `#F3F4F6` | Table row hover, input background |
| `--color-neutral-200` | `#E5E7EB` | Borders, dividers |
| `--color-neutral-300` | `#D1D5DB` | Disabled borders, subtle icons |
| `--color-neutral-400` | `#9CA3AF` | Placeholder text, muted icons |
| `--color-neutral-500` | `#6B7280` | Secondary text |
| `--color-neutral-600` | `#4B5563` | Body text (secondary emphasis) |
| `--color-neutral-700` | `#374151` | Body text (primary) |
| `--color-neutral-800` | `#1F2937` | Headings |
| `--color-neutral-900` | `#111827` | Highest-emphasis text, sidebar text on dark rail |

### 1.3 Semantic Colors
| Token | Hex (base) | Usage |
|---|---|---|
| `--color-success-50` | `#ECFDF5` | Success background tint |
| `--color-success-500` | `#10B981` | Success text/icon, "Active" / "Converted" / "Completed" badges |
| `--color-success-700` | `#047857` | Success text on light bg (higher contrast) |
| `--color-warning-50` | `#FFFBEB` | Warning background tint |
| `--color-warning-500` | `#F59E0B` | Warning text/icon, "In Progress" / "Contacted" / Medium priority |
| `--color-warning-700` | `#B45309` | Warning text on light bg |
| `--color-danger-50` | `#FEF2F2` | Danger background tint |
| `--color-danger-500` | `#EF4444` | Danger text/icon, "Overdue" / "Inactive" / High priority / Delete actions |
| `--color-danger-700` | `#B91C1C` | Danger text on light bg |
| `--color-info-50` | `#EFF6FF` | Info background tint |
| `--color-info-500` | `#3B82F6` | Info text/icon, "New" lead status |
| `--color-info-700` | `#1D4ED8` | Info text on light bg |

### 1.4 Status/Priority Color Mapping (applied consistently everywhere)
| Entity | Value | Color Token |
|---|---|---|
| Customer status | Active | `success` |
| Customer status | Inactive | `neutral-500` (with `neutral-100` bg) |
| Lead status | New | `info` |
| Lead status | Contacted | `warning` |
| Lead status | Converted | `success` |
| Task priority | Low | `neutral-500` / `neutral-100` bg |
| Task priority | Medium | `warning` |
| Task priority | High | `danger` |
| Task status | Pending | `neutral-500` |
| Task status | In Progress | `info` |
| Task status | Completed | `success` |
| Overdue indicator | (any) | `danger-500` text + small icon |

### 1.5 Light Mode Semantic Assignments
```css
:root {
  --bg-app: var(--color-neutral-50);
  --bg-surface: var(--color-neutral-0);
  --bg-surface-hover: var(--color-neutral-100);
  --bg-sidebar: var(--color-neutral-0);
  --border-default: var(--color-neutral-200);
  --border-strong: var(--color-neutral-300);
  --text-primary: var(--color-neutral-800);
  --text-secondary: var(--color-neutral-500);
  --text-muted: var(--color-neutral-400);
  --text-on-primary: #FFFFFF;
  --link-color: var(--color-primary-600);
  --focus-ring: var(--color-primary-400);
}
```

### 1.6 Dark Mode Palette
Dark mode is planned (optional feature) but token structure must exist from day one so it can be toggled via a `[data-theme="dark"]` attribute on `<html>` or `<body>`.

| Token | Hex | Usage |
|---|---|---|
| `--color-neutral-0-dark` | `#0B0E14` | App background |
| `--color-neutral-50-dark` | `#12151C` | Sidebar / navbar background |
| `--color-neutral-100-dark` | `#1A1E27` | Card/surface background |
| `--color-neutral-200-dark` | `#242938` | Borders, dividers |
| `--color-neutral-300-dark` | `#333A4D` | Disabled borders |
| `--color-neutral-400-dark` | `#6B7280` | Muted text/icons |
| `--color-neutral-500-dark` | `#9CA3AF` | Secondary text |
| `--color-neutral-700-dark` | `#D1D5DB` | Primary body text |
| `--color-neutral-900-dark` | `#F9FAFB` | Headings / highest-emphasis text |
| `--color-primary-500-dark` | `#818CF8` | Brand accent (lightened for dark bg contrast) |

```css
[data-theme="dark"] {
  --bg-app: var(--color-neutral-0-dark);
  --bg-surface: var(--color-neutral-100-dark);
  --bg-surface-hover: var(--color-neutral-200-dark);
  --bg-sidebar: var(--color-neutral-50-dark);
  --border-default: var(--color-neutral-200-dark);
  --border-strong: var(--color-neutral-300-dark);
  --text-primary: var(--color-neutral-900-dark);
  --text-secondary: var(--color-neutral-500-dark);
  --text-muted: var(--color-neutral-400-dark);
  --text-on-primary: #FFFFFF;
  --link-color: var(--color-primary-500-dark);
  --focus-ring: var(--color-primary-400);
}
```

Semantic status colors (success/warning/danger/info) should shift ~1 step lighter in dark mode (e.g., use the `-400` equivalent instead of `-500`) to maintain contrast against dark surfaces — define `--color-success-500-dark`, etc., analogously if dark mode is implemented.

---

## 2. Typography

### 2.1 Font Recommendations
- **Primary (UI) font:** `Inter` — excellent legibility at small sizes, wide weight range, the de facto modern SaaS UI font. Load via Google Fonts or self-host `.woff2`.
- **Fallback stack:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- **Monospace (optional, for IDs/timestamps/code-like data):** `'JetBrains Mono', 'SF Mono', Consolas, monospace`
- Avoid more than one typeface family in the product; use weight and size for hierarchy, not multiple fonts.

```css
:root {
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
}
```

### 2.2 Type Scale
Using a modular scale (~1.2 ratio), expressed with `rem` for accessibility (respects user font-size settings):

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `--text-xs` | `0.75rem` (12px) | `1rem` (16px) | 400/500 | Table meta text, badge labels, timestamps |
| `--text-sm` | `0.875rem` (14px) | `1.25rem` (20px) | 400/500 | Body secondary, table cell text, input text |
| `--text-base` | `1rem` (16px) | `1.5rem` (24px) | 400 | Default body text |
| `--text-lg` | `1.125rem` (18px) | `1.75rem` (28px) | 500/600 | Card titles, section subheadings |
| `--text-xl` | `1.25rem` (20px) | `1.75rem` (28px) | 600 | Page titles (e.g., "Customers") |
| `--text-2xl` | `1.5rem` (24px) | `2rem` (32px) | 600/700 | Dashboard KPI numbers |
| `--text-3xl` | `1.875rem` (30px) | `2.25rem` (36px) | 700 | Login page heading, hero-style numbers |

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

### 2.3 Font Weights
| Token | Value | Usage |
|---|---|---|
| `--font-regular` | 400 | Body text |
| `--font-medium` | 500 | Emphasized body text, nav labels |
| `--font-semibold` | 600 | Headings, card titles, buttons |
| `--font-bold` | 700 | KPI numbers, page titles |

### 2.4 Responsive Typography Rule
Rather than a full fluid-type system, apply two tiers: base sizes above (desktop/tablet) and a single mobile adjustment reducing `--text-2xl`/`--text-3xl` by ~15% (e.g., via a `@media (max-width: 576px)` override) so KPI numbers and headings don't overwhelm small screens.

---

## 3. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Badges, small buttons, checkboxes |
| `--radius-md` | `8px` | Inputs, buttons, table containers |
| `--radius-lg` | `12px` | Cards, KPI cards, modals |
| `--radius-xl` | `16px` | Large feature panels, login card |
| `--radius-full` | `9999px` | Avatars, pill badges, toggle switches |

---

## 4. Shadows (Elevation)

Soft, low-opacity shadows for a light, modern feel — avoid harsh/dark drop shadows.

| Token | Value | Usage |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(16, 24, 40, 0.05)` | Inputs, subtle borders-as-shadow |
| `--shadow-sm` | `0 1px 3px rgba(16, 24, 40, 0.08), 0 1px 2px rgba(16, 24, 40, 0.04)` | Cards at rest |
| `--shadow-md` | `0 4px 8px rgba(16, 24, 40, 0.08), 0 2px 4px rgba(16, 24, 40, 0.04)` | Cards on hover, dropdowns |
| `--shadow-lg` | `0 12px 16px rgba(16, 24, 40, 0.10), 0 4px 6px rgba(16, 24, 40, 0.05)` | Modals, popovers |
| `--shadow-xl` | `0 20px 24px rgba(16, 24, 40, 0.12), 0 8px 8px rgba(16, 24, 40, 0.04)` | Full-screen modal, drawer overlay |

Sidebar/navbar use a hairline border (`--border-default`) rather than a shadow to separate from content, keeping the UI feeling flat and modern rather than skeuomorphic.

---

## 5. Spacing System

An 4px-based spacing scale (all spacing values are multiples of 4) ensures visual rhythm consistency.

| Token | Value | Common Usage |
|---|---|---|
| `--space-0` | `0px` | Reset |
| `--space-1` | `4px` | Icon-to-text gap, tight badge padding |
| `--space-2` | `8px` | Compact padding, gap between small elements |
| `--space-3` | `12px` | Input padding, badge padding |
| `--space-4` | `16px` | Default card padding, gap between related elements |
| `--space-5` | `20px` | Section internal spacing |
| `--space-6` | `24px` | Card padding (comfortable), gap between cards |
| `--space-8` | `32px` | Section-to-section spacing |
| `--space-10` | `40px` | Page top padding (desktop) |
| `--space-12` | `48px` | Large section breaks |
| `--space-16` | `64px` | Major layout gaps (e.g., login page centering) |

```css
:root {
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px;
}
```

**Rule:** page-level container padding = `--space-6` on mobile, `--space-8` on tablet, `--space-10` on desktop. Card internal padding defaults to `--space-6`. Grid/flex gaps between cards default to `--space-4` to `--space-6`.

---

## 6. Breakpoints

| Token | Value | Device Target |
|---|---|---|
| `--bp-xs` | `375px` | Small phones |
| `--bp-sm` | `576px` | Large phones |
| `--bp-md` | `768px` | Tablets (portrait) |
| `--bp-lg` | `1024px` | Tablets (landscape) / small laptops |
| `--bp-xl` | `1280px` | Standard desktop |
| `--bp-2xl` | `1536px` | Large desktop |

Mobile-first approach: base styles target mobile; `min-width` media queries progressively enhance for larger screens.

```css
/* Example usage pattern */
.kpi-grid { grid-template-columns: 1fr; gap: var(--space-4); }

@media (min-width: 576px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .kpi-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 7. Animation & Transition Timings

Motion should feel quick and purposeful, never sluggish or bouncy/playful (this is a professional B2B tool).

| Token | Value | Usage |
|---|---|---|
| `--duration-instant` | `100ms` | Micro feedback (checkbox check, button press) |
| `--duration-fast` | `150ms` | Hover states, color transitions |
| `--duration-base` | `200ms` | Default transition (most UI state changes) |
| `--duration-slow` | `300ms` | Modal open/close, drawer slide |
| `--duration-slower` | `400ms` | Page-level transitions (rare) |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering (modal open, drawer in) |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting (modal close, drawer out) |

```css
:root {
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
```

**Rules:**
- Always transition `transform`, `opacity`, `box-shadow`, `background-color`, `border-color`, `color` — never `width`/`height`/`top`/`left` for performance reasons (use `transform` instead where animating position/size).
- Respect `prefers-reduced-motion: reduce` — wrap non-essential transitions/animations in a media query and disable/shorten them for users who request reduced motion.

---

## 8. Component Styling Guidelines

### 8.1 Buttons
- **Primary:** `--color-primary-500` bg, white text, `--radius-md`, `--shadow-xs`. Hover → `--color-primary-600` bg + `--shadow-sm`. Active/pressed → `--color-primary-700`, no shadow (pressed-down feel).
- **Secondary:** white/`--bg-surface` bg, `--border-default` border, `--text-primary` text. Hover → `--bg-surface-hover`.
- **Danger:** `--color-danger-500` bg (or outline variant with danger text/border for less-destructive contexts like row-level delete).
- **Ghost/Text:** transparent bg, `--text-secondary` text, hover → `--bg-surface-hover` bg.
- Padding: `--space-2` `--space-4` (compact) or `--space-3` `--space-5` (default). Font: `--text-sm`, `--font-medium`.
- All buttons: `transition: background-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard);`

### 8.2 Inputs / Form Fields
- Background `--bg-surface`, border `1px solid --border-default`, `--radius-md`, padding `--space-3`.
- Focus state: border → `--color-primary-500`, add `box-shadow: 0 0 0 3px var(--color-primary-100)` (focus ring), no default browser outline removed without replacement.
- Error state: border → `--color-danger-500`, helper text below in `--color-danger-700`, `--text-xs`.
- Placeholder text: `--text-muted`.

### 8.3 Cards (KPI cards, general panels)
- Background `--bg-surface`, `--radius-lg`, `--shadow-sm`, padding `--space-6`.
- Hover (if interactive/clickable): `--shadow-md`, subtle `transform: translateY(-2px)`, transition `--duration-base`.
- KPI card anatomy: small label (`--text-sm`, `--text-secondary`) → large number (`--text-2xl`/`--text-3xl`, `--font-bold`, `--text-primary`) → optional trend indicator (small colored text/icon, success green for positive, danger red for negative).

### 8.4 Data Tables
- Container: `--bg-surface`, `--radius-lg`, `--shadow-sm`, `overflow-x: auto` wrapper for responsive scroll.
- Header row: `--bg-app` or `--color-neutral-50` background, `--text-xs`, `--font-semibold`, `--text-secondary`, uppercase with letter-spacing 0.03em, bottom border `--border-default`.
- Body rows: `--text-sm`, `--text-primary`; bottom border `--border-default` (or zebra striping using `--color-neutral-50` on even rows as an alternative — choose one, not both).
- Row hover: `--bg-surface-hover`, transition `--duration-fast`.
- Cell padding: `--space-4` vertical `--space-4`–`--space-5` horizontal.

### 8.5 Status Badges
- Pill shape: `--radius-full`, padding `--space-1` `--space-3`, `--text-xs`, `--font-medium`.
- Background = semantic color at `-50` tint; text = semantic color at `-700` (for contrast); optional small dot (8px circle) in `-500` before the label.

### 8.6 Sidebar
- Background `--bg-sidebar`, right border `1px solid --border-default`.
- Nav item: padding `--space-3` `--space-4`, `--radius-md`, `--text-sm`, `--font-medium`, `--text-secondary`; icon + label, `--space-3` gap.
- Active nav item: background `--color-primary-50`, text/icon `--color-primary-600`, optional 3px left accent bar in `--color-primary-500`.
- Hover (inactive item): background `--bg-surface-hover`.

### 8.7 Navbar
- Height: 64px desktop / 56px mobile. Background `--bg-surface`, bottom border `--border-default`, `--shadow-xs` optional for slight separation.
- Sticky/fixed to top; content area padded to avoid overlap.

### 8.8 Modals
- Overlay: `rgba(17, 24, 39, 0.5)` (neutral-900 at 50% opacity), fade in `--duration-base`.
- Panel: `--bg-surface`, `--radius-xl`, `--shadow-xl`, max-width ~480–560px, padding `--space-8`, slide/scale in via `transform` + `opacity` transition using `--ease-out`.

### 8.9 Charts
- Line/bar chart primary series uses `--color-primary-500`; comparison/secondary series uses `--color-neutral-300` or a semantic color if meaningfully different (e.g., target line in `--color-warning-500`).
- Gridlines: `--border-default` at reduced opacity; axis labels `--text-xs`, `--text-secondary`.

---

## 9. Iconography
- Use a single consistent icon set throughout (recommend an outline-style set such as Lucide or Feather — consistent stroke width ~1.5–2px).
- Icon sizes: `16px` (inline with text), `20px` (buttons/nav), `24px` (KPI card icons, empty states).
- Icon color inherits `currentColor` so it follows text color tokens automatically.

---

*This file is the contract for `css/tokens.css`. Any new visual value needed during implementation must be added here first, then to the CSS — never the reverse.*
