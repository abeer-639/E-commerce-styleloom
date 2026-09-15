# StyleLoom

A dark-themed fashion e-commerce storefront built with Next.js 14, TypeScript, and Redux Toolkit — with full bilingual support (Arabic/English) including right-to-left layout switching.

This started as a UI I built from a Figma community template, and grew into a full front-end app with role-based access control, a real admin dashboard, and a custom internationalization system — all without a backend, using Redux + `localStorage` to simulate persistence.

## Live Demo

*(add your deployed link here)*

## Screenshots

*(add screenshots here — product listing, product detail, dashboard, light/dark mode)*

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design tokens (CSS variables for theming)
- **State management:** Redux Toolkit
- **i18n:** Custom-built Context-based system (Arabic/English, RTL/LTR)
- **Icons:** lucide-react

No backend — this is a front-end-only project. Data is seeded from static files and persisted client-side through Redux + `localStorage`, which simulates what a real API would do.

## Features

### Shopping experience
- Product catalog with filtering by audience (Menswear / Womenswear / Kidswear) and pagination
- Product detail pages with a generated ratings breakdown, materials/care info, and size fit
- Cart with quantity controls, stock limits, and a clear-cart confirmation dialog
- Checkout flow that creates a real order in the order history

### Admin dashboard (role-based)
- Full product CRUD — admin-added products appear site-wide immediately
- A single form handles both adding and editing (no duplicated UI)
- Order management — admins see and update the status of *all* customer orders, not just their own
- Regular users only see and manage their own cart/orders; the cart and dashboard are hidden entirely for admin accounts

### Internationalization
- Every string in the UI is translated (Arabic/English)
- Switching language flips the entire layout direction (RTL/LTR) live, no reload
- Admin-added products without a dictionary entry gracefully fall back to whatever the admin typed in, instead of breaking

### Theming
- Dark/light mode with **zero flash on load** — a small blocking script in `<head>` reads the saved preference before the page paints, instead of flashing the wrong theme and correcting it after hydration

### Polish / motion
- Scroll-reveal animations on sections (IntersectionObserver-based, respects `prefers-reduced-motion`)
- Hover micro-interactions on product cards
- A navbar that shrinks and gains a blur backdrop on scroll
- Animated count-up stats on the homepage hero

### Accessibility
- 44px minimum touch targets on interactive controls
- Visible focus indicators throughout
- aria-labels on icon-only buttons, translated per language
- `role="status"` / `aria-live` on toast notifications so screen readers announce them

## Project Structure

```
src/
├── app/                  # Routes (App Router)
│   ├── products/         # Catalog (the actual homepage — "/" just redirects here)
│   │   └── [id]/         # Product detail page
│   ├── cart/
│   ├── orders/
│   ├── dashboard/        # Admin only
│   ├── login/ register/
│   └── terms/ privacy/
├── components/           # Page-level and shared components
│   └── ui/                # Small reusable primitives (Button, Badge, ConfirmDialog...)
├── store/
│   └── slices/           # auth, cart, orders, products — each with hydrate/persist
├── i18n/                 # Dictionary + Context provider
├── data/                 # Seed data, types, mock users/orders
├── lib/                  # Small utilities (formatPrice, getProductContent...)
└── hooks/                # Shared hooks (useInView, useCountUp)
```

## A few architectural decisions worth knowing about

**Products live in Redux, not just static data.** The catalog is seeded from `data/products.ts` but treated as real Redux state (`productsSlice`), persisted to `localStorage`. That's what lets an admin add/edit/delete a product and have it reflected instantly everywhere — the product list, the detail page, and the cart all read from the same store.

**The cart doesn't know where products come from.** `cartSlice` takes `stock` as an argument from whoever calls it, instead of importing product data directly. That keeps it decoupled from any particular data source — it'll work the same whether the stock number came from the static seed or from something an admin just edited.

**i18n uses React Context, not Redux.** Locale is UI configuration, not business data — it changes rarely, and every consumer needs the full translated object anyway, so Context is just as efficient here and simpler than adding a fifth Redux slice for it.

**Every route Redux slice follows the same hydrate/persist pattern.** State starts with a safe default (matching what the server renders), then a `hydrate*()` action pulls the real value from `localStorage` once the app mounts on the client. This avoids Next.js hydration mismatches — a real bug class I ran into and fixed properly rather than papering over.

## Known Limitations

- No FAQ section is built yet — the footer link is disabled rather than pointing nowhere
- Testimonial avatar images are placeholders
- The cart is shared per-browser, not per-user — a natural consequence of having no real backend/auth session; logging in with two different accounts in the same browser would share one cart

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test the admin dashboard, log in with the seeded admin account (see `src/data/users.ts` for mock credentials).

## Credits

UI design adapted from a Figma community template. All engineering, architecture, and feature work in this repo is my own.

## About

I'm a self-taught front-end developer based in Syria. I built this project to go deep on the kind of decisions a real production app requires — state architecture, accessibility, i18n, and role-based access — not just to ship a UI.