# NimbusCRM ⚡

NimbusCRM is a blazing fast, zero-bloat, **frontend-only CRM dashboard** built strictly with native web technologies.

---

## 🚀 Tech Stack

* **HTML5:** Semantic, accessible markup.
* **CSS:** Custom design tokens, CSS reset, layout shells, and micro-interaction polish.
* **JavaScript:** Modules (`app.js`, `dom.js`) handling dynamic DOM updates, real-time filtering, and custom modal state machines.

---

## 📁 Project Architecture

```text
nimbus-crm/
│
├── index.html         # Login gateway & authentication entry
├── dashboard.html     # KPI overview, sales chart, & activity log
├── customers.html     # Client directory, search, status filters, & modals
├── leads.html         # Pipeline lead tracking & multi-status badges
├── tasks.html         # Priority management, due dates, & overdue alerts
│
├── css/
│   ├── reset.css      # Browser normalization
│   ├── tokens.css     # Global design system variables (colors, spacing, shadows)
│   ├── base.css       # Typography & global element defaults
│   ├── layout.css     # Structural shell, responsive grid, & sidebar drawer
│   └── polish.css     # Micro-interactions, transitions, & empty states
│
└── js/
    ├── app.js         # Global entry & page scripts
    └── dom.js         # Lightweight DOM manipulation utility library
