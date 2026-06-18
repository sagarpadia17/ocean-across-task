# Nectar – Online Grocery Store

A full-featured grocery shopping app built with React, TypeScript, and Tailwind CSS. Browse products, manage your cart and favourites, and place orders — all with persistent state across sessions.

---

## Features

- **Authentication flow** — phone number → OTP verification → sign up / login → location setup
- **Shop** — browse curated sections (Exclusive Offer, Best Selling, Groceries) with live search across all products
- **Explore** — searchable category grid; tap a category to browse its products
- **Category Products** — per-category product grid with live search + filter sheet (sort by price/rating, minimum rating, discount-only toggle)
- **Product Details** — multi-image carousel, quantity selector, add to cart, favourite toggle
- **Cart** — add / remove / update quantities, persisted to `localStorage`, live badge count in navbar
- **Favourites** — heart any product from its detail page, view/remove from the Favourites tab, "Add All to Cart" shortcut
- **Checkout** — order summary sheet with a simulated place-order flow (~60% accept / ~40% fail) with appropriate success/failure dialogs
- **Account** — user profile page

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix UI |
| State | Zustand v5 (with `persist` middleware) |
| Icons | Lucide React + React Icons |
| Build | Vite 8 |

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Project Structure

```
src/
├── assets/          # SVGs – logo, banners, category icons, grocery items
├── components/      # Shared UI components (ProductCard, CartCard, Navbar, …)
│   └── ui/          # shadcn base components (Button, Sheet, Dialog, …)
├── constants/       # Static data (grocery categories)
├── data/            # Mock product catalogue (25 products across 9 categories)
├── hooks/           # Custom hooks (useCurrentUser, ProtectedRoute, …)
├── pages/
│   ├── Authentication/  # SignIn, Number, Verification, SignUp, Location, Login
│   └── Store/           # Shop, Explore, CategoryProducts, ProductDetails, Cart, Favorite
├── stores/          # Zustand stores
│   ├── cartStore.ts       # Cart + localStorage persistence
│   ├── favoritesStore.ts  # Favourites + localStorage persistence
│   ├── ordersStore.ts     # Order history
│   ├── productsStore.ts   # Products
│   └── userStore.ts       # Auth / user session
├── types.ts         # Shared TypeScript interfaces (Product, CartItem, User, …)
└── utils/           # Navigation helpers, OTP manager, session manager, validation
```

---

## Key Implementation Notes

- **Cart & Favourites** both use Zustand's `persist` middleware — data survives full page refreshes via `localStorage`.
- **Add to Cart button** disables and shows a checkmark once a product is in the cart; the state updates reactively without a page reload.
- **Navbar cart badge** subscribes directly to `cartItems` so it updates immediately on every cart change.
- **Checkout** simulates a real network call with a 1.5 s delay and a random accept/fail outcome. On success the cart is cleared and an order is saved; on failure the user can retry or go home.
- **Product images** support multiple images per product — the detail page renders them in a swipeable/thumbnail carousel.

---

## License

MIT
