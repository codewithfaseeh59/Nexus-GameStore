# NEXUS — Gaming Store 🎮

A fully responsive, dark-themed gaming e-commerce website built with vanilla HTML, CSS, and JavaScript. Features smooth scroll animations, custom cursor, magnetic effects, horizontal scroll categories, and a fully functional cart system.

---

## 🔗 Links

- **Live Preview:** [https://codewithfaseeh59.github.io/Nexus-GameStore/]
- **Repository:** [https://github.com/codewithfaseeh59/Nexus-GameStore]

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/codewithfaseeh59/Nexus-GameStore
cd Nexus-GameStore
```

### 2. Run Locally
```bash
# VS Code Live Server (recommended)
# Right click index.html → Open with Live Server

# Or using Python
python -m http.server 5500
```

Then open: [http://127.0.0.1:5500](http://127.0.0.1:5500)

---

## 🗂️ Project Structure
```
nexus/
├── index.html
├── shop.html
├── product.html
├── cart.html
├── about.html
├── faq.html
├── shipping.html
├── returns.html
├── track-order.html
├── contact.html
├── README.md
│
└── Assets/
      ├── css/
      │     ├── main.css
      │     └── responsive.css
      │
      ├── js/
      │     ├── main.js
      │     ├── store.js
      │     ├── shop.js
      │     ├── product.js
      │     └── cart.js
      │
      ├── Fonts/
      │     ├── Barlow/
      │     │     ├── BarlowCondensed-Regular.ttf
      │     │     └── BarlowCondensed-Bold.ttf
      │     └── SpaceMono/
      │           ├── SpaceMono-Regular.ttf
      │           └── SpaceMono-Bold.ttf
      │
      └── Images/
            ├── hero-bg.webp
            ├── hero-product.webp
            ├── brand-promise.webp
            ├── shop-banner.webp
            ├── about-story.webp
            ├── cat-pc.webp
            ├── cat-keyboard.webp
            ├── cat-mouse.webp
            ├── cat-ps5.webp
            ├── cat-xbox.webp
            ├── cat-monitor.webp
            ├── cat-headset.webp
            ├── prod-1.webp → prod-12.webp
            ├── product-main.webp
            ├── product-thumb-1.webp
            ├── product-thumb-2.webp
            ├── product-thumb-3.webp
            ├── team-1.webp
            ├── team-2.webp
            ├── team-3.webp
            └── og-image.jpg
```

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, Stats, Categories, Featured Products, Brand Promise |
| Shop | `shop.html` | Full product listing with sidebar filters and sort |
| Product | `product.html` | Single product detail with image gallery and accordion |
| Cart | `cart.html` | Cart items from localStorage, quantity controls, order summary, coupon code |
| About | `about.html` | Story, Values, Team, Stats |
| Contact | `contact.html` | Contact form, info, Google Maps embed |
| FAQ | `faq.html` | Frequently asked questions accordion |
| Shipping Policy | `shipping.html` | Delivery times, costs and international shipping |
| Return Policy | `returns.html` | 30-day return rules and refund steps |
| Track Order | `track-order.html` | Demo order tracker with sample timeline |

---

## 🎨 Design System

### Colors
| Name | Value | Usage |
|------|-------|-------|
| Background | `#050508` | Page background |
| White | `#f0f0f0` | Headings, primary text |
| Grey | `#888888` | Secondary text, labels |
| Accent | `#7b2fff` | Purple — CTAs, highlights |
| Card BG | `#0e0e14` | Cards, inputs |

### Typography
| Font | Usage |
|------|-------|
| `Barlow Condensed` | Headings, logo, numbers |
| `Space Mono` | Body text, labels, buttons |

### Font Sizes
All font sizes use `clamp()` for fluid responsive scaling:
```css
font-size: clamp(min, fluid, max);
font-size: clamp(4rem, 12vw, 10rem);
```

---

## 📦 CDNs Used

### CSS — paste in `<head>` of every page
```html
<!-- Locomotive Scroll CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css">

<!-- SheryJS CSS -->
<link rel="stylesheet" href="https://unpkg.com/sheryjs/dist/Shery.css" />

<!-- Font Awesome 7 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
    integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
```

### JS — paste before `</body>` of every page
```html
<!-- Locomotive Scroll -->
<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js"></script>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- GSAP ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- SheryJS -->
<script src="https://unpkg.com/sheryjs/dist/Shery.js"></script>

<!-- Main JS + shared cart module — every page -->
<script defer src="./Assets/js/main.js"></script>
<script defer src="./Assets/js/store.js"></script>
```

### Page Specific JS
```html
<!-- shop.html only -->
<script defer src="./Assets/js/shop.js"></script>

<!-- product.html only -->
<script defer src="./Assets/js/product.js"></script>

<!-- cart.html only -->
<script defer src="./Assets/js/cart.js"></script>
```

---

## 🧠 JavaScript Architecture

### main.js — loads on every page
| Function | Description |
|----------|-------------|
| `initLoader()` | Page loader (about 2s) that finishes as soon as hero images and fonts are ready; skipped with reduced motion |
| `initLocoScroll()` | Locomotive Scroll + ScrollTrigger sync |
| `initCursor()` | SheryJS custom cursor with skew |
| `initMagnetic()` | SheryJS magnetic effect on buttons and logo |
| `initNavbar()` | Hide on scroll down, show on scroll up |
| `initSearch()` | Search bar toggle |
| `initMobileMenu()` | Hamburger + mobile menu open/close |
| `initHeroAnimations()` | GSAP hero stagger entrance animations |
| `initStatsCounter()` | Scroll-triggered number count up |
| `initScrollReveals()` | GSAP scroll reveal for all sections |
| `initHorizontalScroll()` | GSAP ScrollTrigger pinned horizontal scroll |
| `initProductFilter()` | Featured products filter by category |

### store.js — loads on every page
| Function | Description |
|----------|-------------|
| `NexusCart.add()` / `setQty()` / `remove()` | Read and write the localStorage cart |
| `updateBadge()` | Sync the navbar cart counter on every page |
| `initAddToCart()` | Delegated "Add to Cart" handler for every product card |
| `initFaq()` | FAQ accordion |
| `initTrackOrder()` | Demo order tracker form |

### shop.js — shop.html only
| Function | Description |
|----------|-------------|
| `initPriceSlider()` | Price range slider filter |
| `initCategoryFilter()` | Sidebar checkbox category filter |
| `initRatingFilter()` | Minimum rating filter |
| `initSort()` | Sort products by price/rating/latest |
| `filterProducts()` | Combined filter logic |
| `sortProducts()` | Re-order products with GSAP animation |
| `initLoadMore()` | Load more button |
| `initShopReveal()` | Scroll reveal animations |

### product.js — product.html only
| Function | Description |
|----------|-------------|
| `initImageGallery()` | Thumbnail click to swap main image |
| `initQuantity()` | Quantity selector +/- |
| `initWishlist()` | Wishlist toggle button |
| `initAddToCart()` | Add the product (with chosen quantity) to the shared cart |
| `initAccordion()` | Specs/Shipping/Returns accordion |
| `initProductReveal()` | Scroll reveal animations |

### cart.js — cart.html only
| Function | Description |
|----------|-------------|
| `renderCart()` | Render cart items from localStorage |
| `updateSummary()` | Recalculate subtotal, tax, total |
| `changeQuantity()` | Per-item quantity +/- |
| `removeRow()` | Remove item with GSAP animation |
| `showEmptyCart()` | Show empty state when cart is cleared |
| `initCheckout()` | Demo checkout message (no payment is processed) |
| `initCoupon()` | Coupon code validation (NEXUS10) |
| `initCartReveal()` | Reveal animations |

----------|-------------|
| `getCart()` | Get cart from localStorage |
| `saveCart()` | Save cart to localStorage |
| `renderCart()` | Render cart items dynamically |
| `updateSummary()` | Recalculate subtotal, tax, total |
| `updateNavCartCount()` | Sync navbar cart badge |
| `initCartQuantity()` | Per-item quantity +/- |
| `initRemoveItem()` | Remove item with GSAP animation |
| `showEmptyCart()` | Show empty state when cart is cleared |
| `initCoupon()` | Coupon code validation (NEXUS10) |
| `initCartReveal()` | Scroll reveal animations |

---

## 🔄 Cart System

Cart data is stored in `localStorage` under the key `nexus_cart`, shared by every page.

### Cart Item Structure
```json
{
  "id": "nexus-mx-pro-keyboard",
  "name": "Nexus MX Pro Keyboard",
  "tag": "Keyboard",
  "price": 129.99,
  "img": "./Assets/Images/prod-1.webp",
  "qty": 1
}
```

### Coupon Codes
| Code | Discount |
|------|----------|
| `NEXUS10` | Applied (UI only) |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `max-width: 1024px` | Small laptops |
| `max-width: 768px` | Tablets |
| `max-width: 480px` | Mobile phones |

All breakpoints are in `responsive.css`.

---

## ✨ Animations

| Animation | Library | Trigger |
|-----------|---------|---------|
| Page Loader | GSAP | On page load |
| Hero entrance | GSAP Timeline | On load |
| Scroll reveals | GSAP + ScrollTrigger | On scroll |
| Stats counter | GSAP + ScrollTrigger | On scroll |
| Horizontal categories | GSAP + ScrollTrigger | Pinned scroll |
| Navbar hide/show | GSAP | Scroll direction |
| Custom cursor | SheryJS | Mouse move |
| Magnetic buttons | SheryJS | Mouse hover |
| Product filter | GSAP | Click |
| Cart item remove | GSAP | Click |
| Image gallery swap | GSAP | Click |

---

## ⚠️ Important Notes

- **Locomotive Scroll** requires `id="wrapper"` on main div — do NOT add `height` or `overflow: hidden` to it
- **SheryJS cursor** replaces default cursor — `cursor: none` removed from CSS, SheryJS handles it
- **Cart data** persists via `localStorage` — clear browser storage to reset cart
- **Google Maps** embed in contact page defaults to Los Angeles — replace `iframe src` with your location
- All **font sizes** use `clamp()` — no separate font-size media queries needed
- **About & Contact** pages use `main.js` only — no separate JS file needed

---

## 👨‍💻 Built With

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling — Grid, Flexbox, clamp() |
| Vanilla JS (ES6+) | Logic & interactions |
| [GSAP 3](https://greensock.com/gsap/) | Animations |
| [ScrollTrigger](https://greensock.com/scrolltrigger/) | Scroll animations |
| [Locomotive Scroll v4](https://locomotivemtl.github.io/locomotive-scroll/) | Smooth scroll |
| [SheryJS](https://github.com/aayushchouhan24/sheryjs) | Custom cursor & magnetic |
| [Font Awesome 7](https://fontawesome.com/) | Icons |

---

## 📝 License

This project is for educational and portfolio purposes only. Not for commercial use.

---

*Made with ♥ by CodeWithFaseeh*