# Product Requirements Document (PRD)
## NimbusCRM — Frontend-Only CRM Dashboard

**Document type:** Product Requirements Document
**Project type:** College frontend assignment (HTML, CSS, JavaScript only — no backend)
**Status:** Pre-development / Planning
**Audience:** Student developer(s), instructor/evaluator, and any AI coding agent picking up this project

---

## 1. Project Vision

NimbusCRM is a frontend-only Customer Relationship Management dashboard that demonstrates professional-grade SaaS product thinking and UI engineering using only HTML, CSS, and vanilla JavaScript. The vision is to produce something that *looks and behaves* like a real, modern CRM product (in the spirit of tools like HubSpot, Pipedrive, or Salesforce Lightning) while remaining entirely client-side, powered by realistic dummy/mock data.

The project should prove three things simultaneously:

1. **Product sense** — the app solves a believable business problem with sensible information architecture.
2. **Design craft** — the UI is clean, consistent, accessible, and responsive, not a generic Bootstrap template.
3. **Frontend engineering discipline** — the code is organized, semantic, maintainable, and performant even without a framework.

NimbusCRM is not meant to be "wired up" to a real database. Every number, chart, and table row is realistic sample data that simulates what a small-to-mid-size sales team would actually see.

---

## 2. Goals

### 2.1 Primary Goals
- Deliver a fully clickable, responsive CRM dashboard UI covering Login, Dashboard, Customers, Leads, and Tasks/Follow-ups.
- Demonstrate a coherent design system (color, type, spacing, elevation) applied consistently across every screen.
- Showcase realistic SaaS dashboard patterns: sidebar navigation, top navbar, KPI cards, data tables with search/filter, status badges, modals, and charts.
- Produce documentation thorough enough that a different developer (or AI agent) could pick up the project mid-way and continue it without asking clarifying questions.

### 2.2 Secondary Goals
- Lay groundwork (via design tokens and architecture) for an optional dark mode.
- Keep the codebase framework-free but structured enough that it *could* later be ported to a framework (React/Vue) with minimal redesign.
- Optimize for grading/demo scenarios: fast load, no console errors, clean dev tools inspection, and an obviously "designed" (not templated) look.

### 2.3 Non-Goals
- No real authentication, database, or API integration.
- No persistence beyond the browser session (unless `localStorage` is explicitly used for demo persistence — optional, not required).
- No multi-tenant, multi-user, or role-based access logic beyond UI representation.
- No payment, billing, or third-party integrations.

---

## 3. Problem Statement

Small and medium businesses (SMBs) frequently manage customer relationships through scattered tools — spreadsheets, email threads, sticky notes, and memory. This leads to:

- Lost or forgotten follow-ups with leads and customers.
- No single source of truth for customer contact info, deal status, or communication history.
- Difficulty prioritizing which leads or tasks need attention today.
- No visibility into sales performance trends without manually compiling reports.

**NimbusCRM's premise:** a lightweight, visually clear CRM dashboard that centralizes customers, leads, sales figures, and follow-up tasks in one place, so a small sales/support team can see — at a glance — what needs attention and how the business is trending.

Because this is an academic project, the "problem" is simulated, but the UI/UX must be designed as if solving it for real users, with realistic data volumes, edge cases (empty states, long names, overdue tasks), and workflows.

---

## 4. Target Users

### 4.1 Primary Persona — "Sales Rep Sara"
- Role: Account Executive / Sales Representative at a small B2B company.
- Goals: Quickly check today's follow-ups, update a lead's status after a call, see how many deals she's converted this month.
- Pain points: Doesn't want to dig through menus; needs status at a glance; uses the app daily, often between calls (needs speed and clarity, not depth).
- Device: Primarily desktop/laptop during work hours, occasionally checks on mobile between meetings.

### 4.2 Secondary Persona — "Sales Manager Mark"
- Role: Sales Team Lead / Manager.
- Goals: Monitor team-wide KPIs (total customers, total leads, total sales, pending tasks), spot stalled leads, review recent activity across the team.
- Pain points: Needs a high-level dashboard view first, table-level detail second.
- Device: Desktop primarily, tablet during travel.

### 4.3 Tertiary Persona — "Support/Ops Olivia"
- Role: Customer success / operations support.
- Goals: Maintain accurate customer records, manage follow-up tasks, keep data clean (search/filter heavy usage).
- Pain points: Needs fast search and reliable filtering; frequently adds/edits records.
- Device: Desktop.

### 4.4 Evaluator Persona — "Instructor/Reviewer"
- Role: Grades the assignment.
- Goals: Quickly assess design quality, code quality, responsiveness, and completeness against the brief.
- Implication: Every required page/feature from the brief must be visibly present and demonstrably functional (even if only UI-level), and the app must not break at any breakpoint.

---

## 5. User Stories

### 5.1 Authentication (UI-only)
- As a user, I want to log in with an email/username and password so that I feel this is a real, secured product.
- As a user, I want a "Remember me" checkbox so I trust my session will persist (UI-only simulation).
- As a user, I want a "Forgot password" link so I know account recovery exists, even if non-functional.
- As a user, I want clear validation messages (e.g., "Please enter a valid email") so I understand input errors.

### 5.2 Dashboard
- As Sara, I want to see total customers, leads, sales, and pending tasks at a glance so I know the current state of the business.
- As Mark, I want a sales overview chart so I can spot trends over time (e.g., monthly revenue).
- As a user, I want a recent activity feed so I know what happened recently (new lead added, task completed, deal closed).
- As a user, I want quick statistic cards (conversion rate, avg. deal size, etc.) so I get context beyond raw totals.

### 5.3 Customers
- As Olivia, I want to see a table of all customers with name, email, phone, company, and status so I can manage records efficiently.
- As a user, I want to search customers by name/email/company so I can find a record quickly.
- As a user, I want to filter customers by status (e.g., Active, Inactive) so I can segment my view.
- As a user, I want an "Add Customer" button so I can (visually) create new records.
- As a user, I want edit/delete actions per row so I can manage individual records (UI-only, may show confirmation modal).

### 5.4 Leads
- As Sara, I want to see all leads with their status (New, Contacted, Converted) so I know where each prospect stands.
- As a user, I want to see the next follow-up date per lead so I never miss a check-in.
- As a user, I want to search/filter leads by status or company so I can focus on what matters today.
- As a user, I want visually distinct status badges so I can scan the table quickly without reading every cell.

### 5.5 Tasks / Follow-ups
- As Sara, I want a list of my tasks with due dates and priority so I know what to do next.
- As a user, I want to distinguish Low/Medium/High priority tasks visually (color-coded) so urgent items stand out.
- As a user, I want to mark a task's status (Pending, In Progress, Completed) so my list reflects reality.
- As a user, I want overdue tasks to be visually flagged so nothing slips through the cracks.

### 5.6 Cross-cutting
- As any user, I want the app to work well on desktop, tablet, and mobile so I can use it anywhere.
- As any user, I want hover states and smooth transitions so the app feels polished and responsive to my actions.
- As a keyboard/screen-reader user, I want accessible markup and focus states so I can navigate without a mouse.

---

## 6. Features

### 6.1 Core Features (Must-Have — In Scope for This Assignment)
| Feature | Description |
|---|---|
| Login Page | Email/username + password fields, login button, remember-me checkbox, forgot-password link. UI/validation only. |
| Dashboard | KPI summary cards, sales overview chart, recent activity feed, quick statistics. |
| Customers Page | Searchable, filterable data table with Add/Edit/Delete UI actions. |
| Leads Page | Searchable, filterable data table with status badges and follow-up dates. |
| Tasks/Follow-ups Page | Task list with priority and status indicators, due dates. |
| Responsive Navigation | Left sidebar (collapsible on mobile) + top navbar. |
| Design System | Consistent tokens for color, type, spacing, elevation, radius, motion. |

### 6.2 Optional / Stretch Features (Planned, Not Required Initially)
| Feature | Description |
|---|---|
| Dark Mode | Full dark theme using CSS custom properties, toggle in navbar. |
| Notifications | Bell icon with dropdown panel showing recent system notifications. |
| Customer Modal | Modal dialog for viewing/adding/editing a customer without leaving the page. |
| Sales Chart | Interactive chart (e.g., line/bar) built with lightweight vanilla JS or a small charting library. |
| KPI Cards (extended) | Additional cards like "This Month's Revenue," "Conversion Rate," "Avg. Response Time." |

Optional features must be architected for (data attributes, CSS variables, container elements present) even if not fully implemented, per the brief's instruction to "include planning... even if not implemented immediately."

---

## 7. Functional Requirements

**FR-1.** The system shall present a Login page as the default/first screen with email, password, remember-me checkbox, login button, and forgot-password link.

**FR-2.** The system shall perform client-side validation on the login form (required fields, basic email format) and display inline error states.

**FR-3.** The system shall navigate from Login to Dashboard on successful (simulated) login, with no real authentication or backend call.

**FR-4.** The Dashboard shall display four primary KPI cards: Total Customers, Total Leads, Total Sales, Pending Tasks, each populated from static/dummy data.

**FR-5.** The Dashboard shall render a Sales Overview chart visualizing dummy sales data across a time period (e.g., last 6–12 months).

**FR-6.** The Dashboard shall display a Recent Activity list of at least 5–8 dummy events with timestamps and icons/type indicators.

**FR-7.** The Dashboard shall display Quick Statistics (e.g., conversion rate, average deal size, new leads this week) as supplementary cards or a stat row.

**FR-8.** The Customers page shall render a table with columns: Name, Email, Phone, Company, Status, and an Actions column (Edit/Delete).

**FR-9.** The Customers page shall provide a search input that filters the table in real time (client-side) by name, email, or company.

**FR-10.** The Customers page shall provide a status filter dropdown (e.g., All, Active, Inactive, Lead-converted) that filters the table.

**FR-11.** The Customers page shall provide an "Add Customer" button that opens a form/modal (UI only — no persistence required, though optional in-memory/localStorage add is acceptable).

**FR-12.** The Customers page shall provide Edit and Delete actions per row; Delete shall trigger a confirmation prompt/modal before removing the row from view.

**FR-13.** The Leads page shall render a table with columns: Lead Name, Company, Contact, Status (New/Contacted/Converted), Follow-up Date.

**FR-14.** The Leads page shall visually differentiate status via color-coded badges (e.g., New = blue, Contacted = amber, Converted = green).

**FR-15.** The Leads page shall provide search and status-filter controls consistent with the Customers page pattern.

**FR-16.** The Tasks/Follow-ups page shall render tasks with Task Name, Due Date, Priority (Low/Medium/High), and Status (Pending/In Progress/Completed).

**FR-17.** The Tasks page shall visually differentiate priority via color coding and shall visually flag overdue tasks (e.g., red due-date text or icon).

**FR-18.** The Tasks page shall allow the user to change a task's status via a control (dropdown, button group, or checkbox) that updates the UI state.

**FR-19.** All list/table pages shall gracefully handle an empty state (e.g., "No customers found" with an illustration or icon) when search/filter yields zero results.

**FR-20.** The application shall provide persistent navigation (sidebar + navbar) across all authenticated pages, with the current page visually indicated (active state).

**FR-21.** The navbar shall include, at minimum: app logo/name, (optional) global search, notification icon (optional feature), and a user/profile menu.

**FR-22.** The sidebar shall collapse into an icon-only rail on tablet and into a toggleable off-canvas drawer on mobile.

---

## 8. Non-Functional Requirements

**NFR-1. Performance:** Initial page load (Dashboard) should render meaningfully within ~1–2 seconds on a typical broadband connection with no backend calls; no unused/blocking heavy libraries.

**NFR-2. Responsiveness:** The application must be fully usable at three breakpoint tiers minimum: mobile (≤576px), tablet (577–1024px), desktop (≥1025px). No horizontal scrolling, no overlapping elements, no truncated unreadable text at any width from 320px to 1920px.

**NFR-3. Accessibility:** The app should target WCAG 2.1 AA where feasible for a frontend-only project: semantic HTML, sufficient color contrast (≥4.5:1 for body text), visible focus states, keyboard operability for all interactive elements, and appropriate ARIA labeling for icon-only controls.

**NFR-4. Consistency:** All spacing, color, typography, and component styling must derive from the design tokens defined in `agents/design_tokens.md` — no ad-hoc one-off values in CSS.

**NFR-5. Maintainability:** Code must be organized per `agents/tech_stack.md` (clear folder structure, naming conventions, modular CSS/JS) so that a new contributor can locate and modify any component within minutes.

**NFR-6. Browser Support:** The application should function correctly on the latest two versions of Chrome, Firefox, Edge, and Safari. No reliance on browser-specific/non-standard APIs.

**NFR-7. Data Realism:** All dummy data must look plausible (realistic names, companies, emails, phone number formats, dates, and monetary values) — no "Lorem ipsum," "Test User 1," or placeholder-obvious data in the final UI.

**NFR-8. Visual Quality:** The UI must avoid the "default Bootstrap/unstyled" look. Custom typography pairing, a considered color palette, intentional spacing rhythm, and subtle elevation/shadow use are required (see `agents/design_tokens.md`).

**NFR-9. No Console Errors:** The browser console must be free of JavaScript errors and warnings during normal use and at all breakpoints.

**NFR-10. Graceful Degradation:** If JavaScript fails to load, the page should not appear entirely broken (base layout and content should still be visible via HTML/CSS).

---

## 9. Information Architecture

```
NimbusCRM
│
├── Login (unauthenticated entry point)
│
└── App Shell (authenticated — sidebar + navbar persist)
    ├── Dashboard (default landing page after login)
    │   ├── KPI Summary Cards (4)
    │   ├── Sales Overview Chart
    │   ├── Quick Statistics
    │   └── Recent Activity Feed
    │
    ├── Customers
    │   ├── Toolbar (Search, Filter, Add Customer)
    │   ├── Customers Table
    │   └── Customer Modal (Add/Edit) [optional feature]
    │
    ├── Leads
    │   ├── Toolbar (Search, Filter)
    │   ├── Leads Table
    │   └── Lead Detail / Status Badge System
    │
    ├── Tasks / Follow-ups
    │   ├── Toolbar (Search/Filter — optional)
    │   ├── Task List/Table (grouped or flat)
    │   └── Priority + Status Controls
    │
    └── Global Elements (present on every authenticated page)
        ├── Left Sidebar (nav links, active state, collapse control)
        ├── Top Navbar (branding, search, notifications, profile menu)
        ├── (Optional) Notification Panel
        └── (Optional) Dark Mode Toggle
```

### 9.1 Content Model (Dummy Data Entities)

**Customer**
`id, name, email, phone, company, status (Active/Inactive), avatarInitials, createdDate`

**Lead**
`id, leadName, company, contact (name/email/phone), status (New/Contacted/Converted), followUpDate, source (optional)`

**Task**
`id, taskName, relatedTo (customer/lead — optional), dueDate, priority (Low/Medium/High), status (Pending/In Progress/Completed)`

**Activity (Dashboard feed)**
`id, type (new_lead/task_completed/deal_closed/customer_added), description, actor, timestamp`

---

## 10. Navigation Structure

### 10.1 Sidebar (Primary Navigation — persistent, left-aligned)
1. Dashboard (home icon)
2. Customers (people icon)
3. Leads (target/funnel icon)
4. Tasks / Follow-ups (checklist icon)
5. — Divider —
6. Settings (optional, gear icon — can be a stub page or disabled state)
7. Logout (bottom-anchored)

Behavior:
- Active route is visually highlighted (background tint + accent-colored left border or icon fill).
- Desktop: full sidebar with icon + label, ~240–260px wide.
- Tablet: collapses to icon-only rail (~72px), labels appear on hover/tooltip.
- Mobile: hidden by default, opens as an off-canvas drawer triggered by a hamburger icon in the navbar; overlay dims the background; closes on outside tap or link selection.

### 10.2 Top Navbar (Secondary/Global Navigation)
- Left: hamburger toggle (mobile/tablet only) + page title (reflects current section).
- Center/Left-of-center (desktop only, optional): global search input.
- Right: notification bell (optional feature, badge count), dark mode toggle (optional), user avatar + name with dropdown (Profile, Settings, Logout).

### 10.3 Page-Level Navigation
- Customers/Leads: Toolbar row above the table containing Search input (left), Filter dropdown(s) (center/right), primary action button (right, e.g., "+ Add Customer").
- Tasks: Toolbar row with optional filter chips (All / Pending / In Progress / Completed) and a priority filter.
- Pagination or "Load more" control beneath any table expected to exceed ~10–15 rows of dummy data.

---

## 11. Responsive Strategy

| Breakpoint | Range | Sidebar | Table Behavior | Cards/Grid |
|---|---|---|---|---|
| Mobile | ≤576px | Off-canvas drawer (hidden by default) | Tables convert to stacked "card" rows or allow horizontal scroll within a contained wrapper | KPI cards stack 1-per-row |
| Small Tablet | 577–768px | Off-canvas drawer or icon rail | Horizontal scroll within contained wrapper; sticky first column optional | KPI cards 2-per-row |
| Tablet/Small Desktop | 769–1024px | Icon-only collapsed rail | Full table, tighter column padding | KPI cards 2–4 per row |
| Desktop | 1025–1440px | Full sidebar (labels visible) | Full table, comfortable padding | KPI cards 4-per-row |
| Large Desktop | ≥1441px | Full sidebar, content max-width applied to avoid overly stretched lines | Full table, generous padding | KPI cards 4-per-row, extra whitespace |

General rules:
- Layout uses CSS Grid/Flexbox with fluid units (`%`, `fr`, `clamp()`), not fixed pixel widths for containers.
- Typography scales modestly across breakpoints using `clamp()` or a small number of media-query overrides (see `agents/design_tokens.md`).
- Touch targets on mobile/tablet must be at least 44×44px.
- No feature is desktop-exclusive: every core action (search, filter, add, edit, delete, status change) must remain reachable on mobile, even if presented differently (e.g., action menu "⋮" instead of inline buttons on small screens).

---

## 12. Success Metrics

Since this is an academic/demo project without real users, "success" is measured through evaluation and self-QA criteria rather than live analytics:

| Metric | Target |
|---|---|
| Brief coverage | 100% of required pages/features from the assignment brief present and functional at UI level |
| Responsive QA | Zero layout breakage across 320px–1920px viewport widths |
| Accessibility spot-check | All interactive elements reachable via Tab key; visible focus indicators; contrast ratios pass AA for body text |
| Console cleanliness | Zero JS errors/warnings in DevTools console during a full click-through |
| Design consistency | 100% of colors/spacing/typography sourced from design tokens (no hard-coded one-off values) |
| Perceived polish | Hover states, transitions, and micro-interactions present on all interactive elements (buttons, table rows, nav items, cards) |
| Data realism | Dummy data reviewed for plausibility (no placeholder/lorem text visible in final UI) |
| Documentation completeness | All six deliverable files present, internally consistent, and usable as a standalone handoff package |

---

## 13. Future Enhancements

These are explicitly out of scope for the current assignment but documented to show product maturity and forward planning:

1. **Backend integration** — REST or GraphQL API, real authentication (JWT/session-based), persistent database (PostgreSQL/MongoDB).
2. **Role-based access control** — Admin vs. Sales Rep vs. Read-only viewer permissions.
3. **Real-time collaboration** — WebSocket-based live updates when teammates edit records.
4. **Advanced analytics** — Cohort analysis, sales funnel visualization, forecasting.
5. **Email/calendar integration** — Sync follow-up tasks with Google Calendar/Outlook; log emails against customer records.
6. **Bulk actions** — Multi-select rows for bulk status change, export, or delete.
7. **Export/Import** — CSV/Excel export of customers/leads; CSV import with field mapping.
8. **Activity timeline per customer** — Full historical log of interactions, notes, and attached files.
9. **Mobile app (native or PWA)** — Convert to an installable Progressive Web App with offline support.
10. **Internationalization (i18n)** — Multi-language and multi-currency support.
11. **Automated workflows** — Trigger-based task creation (e.g., auto-create a follow-up task 3 days after a lead is marked "Contacted").
12. **Framework migration** — Port the vanilla JS architecture to React/Vue if the project graduates beyond the assignment stage, leveraging the component-like structure already established in the CSS/JS architecture.

---

*End of PRD. See `agents/current_state.md` for current project status and `agents/handoff.md` for a build-ready summary.*
