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
cd Nexs-GameStore
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
├── contact.html
├── README.md
│
└── Assets/
      ├── css/
      │     ├── main.css
      │     ├── component.css
      │     └── responsive.css
      │
      ├── js/
      │     ├── main.js
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
            ├── hero-bg.jpg
            ├── hero-product.jpg
            ├── brand-promise.jpg
            ├── shop-banner.jpg
            ├── about-story.jpg
            ├── cat-pc.jpg
            ├── cat-keyboard.jpg
            ├── cat-mouse.jpg
            ├── cat-ps5.jpg
            ├── cat-xbox.jpg
            ├── cat-monitor.jpg
            ├── cat-headset.jpg
            ├── prod-1.jpg → prod-12.jpg
            ├── product-main.jpg
            ├── product-thumb-1.jpg
            ├── product-thumb-2.jpg
            ├── product-thumb-3.jpg
            ├── team-1.jpg
            ├── team-2.jpg
            └── team-3.jpg
```

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, Stats, Categories, Featured Products, Brand Promise |
| Shop | `shop.html` | Full product listing with sidebar filters and sort |
| Product | `product.html` | Single product detail with image gallery and accordion |
| Cart | `cart.html` | Cart items, order summary, coupon code |
| About | `about.html` | Story, Values, Team, Stats |
| Contact | `contact.html` | Contact form, info, Google Maps embed |

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

<!-- Main JS — every page -->
<script src="./Assets/js/main.js"></script>
```

### Page Specific JS
```html
<!-- shop.html only -->
<script src="./Assets/js/shop.js"></script>

<!-- product.html only -->
<script src="./Assets/js/product.js"></script>

<!-- cart.html only -->
<script src="./Assets/js/cart.js"></script>
```

---

## 🧠 JavaScript Architecture

### main.js — loads on every page
| Function | Description |
|----------|-------------|
| `initLoader()` | Cinematic page loader with GSAP split animation |
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
| `initGlobalAddToCart()` | Add to cart from any page via localStorage |
| `addToCart()` | Add/update item in localStorage cart |
| `updateNavCount()` | Update navbar cart count badge |

### shop.js — shop.html only
| Function | Description |
|----------|-------------|
| `initPriceSlider()` | Price range slider filter |
| `initCategoryFilter()` | Sidebar checkbox category filter |
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
| `initAddToCart()` | Add to cart with localStorage |
| `initAccordion()` | Specs/Shipping/Returns accordion |
| `initProductReveal()` | Scroll reveal animations |

### cart.js — cart.html only
| Function | Description |
|----------|-------------|
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

Cart data is stored in `localStorage` under the key `nexus-cart`.

### Cart Item Structure
```json
{
  "name": "Nexus MX Pro Keyboard",
  "category": "Keyboard",
  "price": 129.99,
  "image": "Assets/Images/prod-1.jpg",
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