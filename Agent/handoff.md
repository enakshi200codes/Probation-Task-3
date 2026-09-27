# Handoff Brief — NimbusCRM

**Purpose:** This file is written so that a different AI coding agent (or human developer) can read *only this file* and immediately begin productive implementation work, without needing to read the other five documents first — though they should be referenced for deep detail. Think of this as the executive summary + build contract.

---

## 1. Project Summary

NimbusCRM is a **frontend-only CRM dashboard** built for a college assignment using **HTML, CSS, and vanilla JavaScript only** — no frameworks, no backend, no build tools required. It simulates a real SaaS CRM product (in the vein of HubSpot/Pipedrive) that helps a small sales team manage **Customers, Leads, Sales, and Tasks/Follow-ups**, using realistic hard-coded dummy data throughout.

Five pages are required: **Login, Dashboard, Customers, Leads, Tasks/Follow-ups.** Architecture is a multi-page app (separate `.html` files), with a persistent sidebar + navbar shell across all authenticated pages.

Full detail lives in:
- `prd.md` — why we're building this, requirements, success criteria
- `agents/current_state.md` — what's done, what's next, priority order
- `agents/design_tokens.md` — the complete design system (colors, type, spacing, shadows, motion)
- `agents/tech_stack.md` — HTML/CSS/JS architecture, folder structure, naming conventions
- `rules/rule.md` — enforceable coding rules (read before writing any code)

---

## 2. UI Direction

**Aesthetic:** Modern SaaS dashboard. Think Linear × Stripe Dashboard × HubSpot — clean surfaces, confident indigo/violet brand accent (`#6366F1`), soft shadows instead of heavy borders, generous whitespace, strong but not loud visual hierarchy.

**Explicitly avoid:**
- Default Bootstrap look (no unstyled `.btn-primary` blue, no default form controls).
- Overly playful/consumer styling (bright rainbow colors, cartoonish illustrations, rounded "bubbly" everything).
- Dense, cramped enterprise-software feel (no tiny 11px text everywhere, no 2px spacing).
- Any placeholder-obvious content ("Lorem ipsum," "Test User," "Company ABC").

**Explicitly aim for:**
- Confident whitespace and an 4px-based spacing rhythm (see `design_tokens.md` §5).
- One typeface (Inter), used with weight/size variation only.
- Color used *semantically* (status badges, priority indicators) — not decoratively.
- Subtle motion: hover states, 150–300ms transitions, no bouncy/playful easing.

---

## 3. Design Language (Quick Reference)

| Aspect | Value |
|---|---|
| Primary brand color | `#6366F1` (indigo) |
| Base font | Inter, sans-serif |
| Base text color | `#1F2937` (neutral-800) |
| App background | `#F9FAFB` (neutral-50) |
| Surface/card background | `#FFFFFF` |
| Border color | `#E5E7EB` (neutral-200) |
| Card radius | `12px` |
| Button/input radius | `8px` |
| Card shadow (rest) | `0 1px 3px rgba(16,24,40,0.08)` |
| Base spacing unit | `4px` (scale: 4/8/12/16/20/24/32/40/48/64) |
| Success / Warning / Danger / Info | `#10B981` / `#F59E0B` / `#EF4444` / `#3B82F6` |

→ Full token list with CSS custom properties: `agents/design_tokens.md`.

---

## 4. Components Required

Build these once, reuse everywhere (do not recreate per-page variants):

1. **Sidebar** — desktop full (icon+label) → tablet icon rail → mobile off-canvas drawer.
2. **Navbar** — page title, (optional) search, (optional) notification bell, user menu, mobile hamburger toggle.
3. **KPI/Stat Card** — label + large number + optional trend indicator.
4. **Data Table** — header row, body rows, hover state, empty state, responsive scroll wrapper.
5. **Status Badge** — pill-shaped, color-coded per status/priority mapping (see `design_tokens.md` §1.4).
6. **Button** — primary / secondary / danger / ghost / icon-only variants.
7. **Form Input** — text/email/password/select, with label, placeholder, error, and focus states.
8. **Modal** — for Add/Edit Customer and Delete confirmation (optional feature, but architect for it).
9. **Empty State** — icon/illustration + message, shown when search/filter yields no results.
10. **Toast/Notification** (optional) — brief feedback after an action (e.g., "Customer added").

---

## 5. Pages Required

### 5.1 Login (`login.html`)
- Centered card layout, app logo/name, email field, password field, "Remember me" checkbox, "Forgot password?" link, primary "Log in" button.
- Client-side validation only (required fields, email format regex). On valid submit → redirect to `dashboard.html`. No real auth.

### 5.2 Dashboard (`dashboard.html`)
- 4 KPI cards: Total Customers, Total Leads, Total Sales, Pending Tasks.
- Sales Overview chart (dummy monthly data — hand-rolled SVG preferred, see `tech_stack.md` §3.5).
- Quick Statistics row/cards (e.g., conversion rate, avg. deal size, new leads this week).
- Recent Activity feed (5–8 dummy timestamped events with type icons).

### 5.3 Customers (`customers.html`)
- Toolbar: search input, status filter dropdown, "+ Add Customer" button (right-aligned).
- Table columns: Name, Email, Phone, Company, Status (badge), Actions (Edit/Delete icons).
- 15–20 realistic dummy rows. Search filters by name/email/company in real time. Delete asks for confirmation.

### 5.4 Leads (`leads.html`)
- Same toolbar pattern as Customers.
- Table columns: Lead Name, Company, Contact, Status (badge: New=info, Contacted=warning, Converted=success), Follow-up Date.
- 12–18 realistic dummy rows.

### 5.5 Tasks / Follow-ups (`tasks.html`)
- List/table with: Task Name, Due Date, Priority (badge: Low/Medium/High), Status (Pending/In Progress/Completed, changeable via control).
- Overdue tasks (due date < today, status ≠ Completed) visually flagged (red due-date text/icon).
- 10–15 realistic dummy tasks.

---

## 6. User Flows

**Flow A — Login → Dashboard**
1. User lands on `login.html`.
2. Enters email/password → clicks "Log in."
3. If validation fails → inline error shown, no navigation.
4. If validation passes → navigate to `dashboard.html`.

**Flow B — Finding a Customer**
1. User is on `dashboard.html`, clicks "Customers" in sidebar.
2. Lands on `customers.html`, sees full table.
3. Types into search box → table filters live (debounced).
4. Optionally selects a status filter → table narrows further.
5. If no matches → empty state shown.

**Flow C — Managing a Lead's Status (conceptual — status shown as data, not necessarily editable unless time permits)**
1. User navigates to `leads.html`.
2. Scans status badges to identify leads needing follow-up (e.g., filter to "New").
3. Notes/acts on the follow-up date shown per row.

**Flow D — Completing a Task**
1. User navigates to `tasks.html`.
2. Identifies high-priority / overdue tasks via visual flags.
3. Updates a task's status control from "Pending"/"In Progress" to "Completed."
4. UI updates immediately to reflect new status badge.

**Flow E — Responsive Navigation (Mobile)**
1. User on a phone taps the hamburger icon in the navbar.
2. Sidebar slides in as an off-canvas drawer with a dimmed overlay behind it.
3. User taps a nav link (or taps the overlay) → drawer closes, navigates to selected page.

---

## 7. Acceptance Criteria

A page/feature is considered **done** only when all of the following are true:

- [ ] Matches the design tokens in `agents/design_tokens.md` (no hard-coded colors/spacing/radii outside the token set).
- [ ] Fully responsive at 320px, 576px, 768px, 1024px, 1440px, and 1920px with zero horizontal scroll on the page body and zero overlapping/clipped elements.
- [ ] All interactive elements have visible hover and focus states.
- [ ] All interactive elements are keyboard-operable (Tab/Enter/Space/Escape as appropriate).
- [ ] No JavaScript console errors or warnings.
- [ ] Uses semantic HTML (proper landmarks, table markup, form labels — see `tech_stack.md` §8).
- [ ] Empty states are handled gracefully where a list/table can return zero results.
- [ ] Dummy data is realistic (real-sounding names, companies, emails, phone formats, dates) — no placeholder text visible.
- [ ] Sidebar correctly highlights the current page as active.
- [ ] Code follows the naming conventions and file structure in `agents/tech_stack.md`.
- [ ] Code follows every rule in `rules/rule.md`.

---

## 8. Coding Standards (Summary — full rules in `rules/rule.md`)

- BEM CSS naming; no inline `style=""` attributes; no `!important` except in true utility classes.
- Vanilla ES6+ JS modules; no inline `onclick=""` handlers in HTML — bind listeners in JS.
- All colors/spacing/radii/shadows/durations come from CSS custom properties defined in `css/tokens.css`.
- 2-space indentation across HTML/CSS/JS; consistent quote style (single quotes in JS, double quotes in HTML attributes).
- Every function has a clear single responsibility; avoid functions longer than ~40 lines — extract helpers.
- Comment *why*, not *what*, for any non-obvious logic (e.g., "// debounce to avoid re-render thrash on every keystroke").

---

## 9. Future Improvements (Not Required Now)

See `prd.md` §13 for the full list. Top of mind for whoever continues this project later:
- Dark mode toggle (tokens already scaffolded in `design_tokens.md` §1.6).
- Notifications dropdown panel.
- Modal-based Add/Edit Customer flow with `localStorage` persistence.
- Interactive sales chart (period switcher, tooltips).
- Backend integration path: swap `js/data/*.js` static exports for `fetch()` calls with minimal changes to render logic, since data layer is already isolated (see `tech_stack.md` §3.3).

---

## 10. Development Order (Do Not Reorder)

1. Implement `css/tokens.css` from `design_tokens.md` — get this exactly right first.
2. Build the app shell: sidebar + navbar, responsive behavior, on a blank test page.
3. Build `login.html` end-to-end (validates the design language on a simple page).
4. Build `dashboard.html` (static sections first, chart last).
5. Build `customers.html` — this becomes the **canonical table pattern**.
6. Build `leads.html` by reusing the Customers table pattern (do not reinvent).
7. Build `tasks.html` by reusing the same list/table pattern.
8. Cross-page consistency pass (nav active states, spacing, component behavior parity).
9. Full responsive QA pass across all breakpoints.
10. Accessibility pass (keyboard nav, focus rings, ARIA, contrast).
11. Micro-interaction/polish pass.
12. Only then: optional features (dark mode, notifications, modals, chart interactivity), gated by remaining time.

This mirrors `agents/current_state.md` §4–5 exactly — treat that file as the living tracker and update its checklist as each step completes.

---

*If you are an AI agent starting work: read this file, skim `design_tokens.md` and `tech_stack.md` for exact values, follow `rules/rule.md` while coding, and update `agents/current_state.md`'s checklist as you complete each milestone.*
