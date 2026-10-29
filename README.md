# ⚡ TechMart — Next-Gen Electronics & Smart Appliances E-Commerce Store

A modern, responsive, high-performance E-Commerce web application built using **HTML5**, **CSS3**, and **Vanilla JavaScript** (no external framework dependencies required).

Featuring a futuristic cyber-tech aesthetic with both **Dark Mode** and **Light Mode**, live currency conversion, a comprehensive product catalog (laptops, smartphones, tablets, smart appliances, audio & wearables), interactive shopping cart with free shipping progress, wishlist, quick specifications modal, and a multi-step checkout flow.

---

## 🌟 Key Features

### 1. 🛍️ Comprehensive Product Catalog
- **Laptops & PCs**: Apple MacBook Pro 16" M3 Max, Dell XPS 16 OLED, ASUS ROG Zephyrus G16, Lenovo ThinkPad X1 Carbon.
- **Smartphones**: iPhone 16 Pro Max Titanium, Samsung Galaxy S24 Ultra AI, Google Pixel 9 Pro XL, OnePlus 12 Hasselblad.
- **Tablets & 2-in-1s**: iPad Pro 13" M4 Ultra-Thin OLED, Samsung Galaxy Tab S9 Ultra, Microsoft Surface Pro 11 Copilot+ PC.
- **Smart Home & Appliances**: Dyson V15 Detect Laser Vacuum, Philips Smart Air Fryer XXL, LG Smart InstaView Refrigerator, iRobot Roomba Combo j9+ Vacuum & Mop, De'Longhi Magnifica Smart Espresso Machine.
- **Audio & Wearables**: Sony WH-1000XM5 ANC Headphones, Apple AirPods Max Spatial Audio, Apple Watch Ultra 2 Titanium, Bose Smart Soundbar.

### 2. 🔍 Advanced Search & Instant Filtering
- **Live Search**: Autocomplete suggestions dropdown with product thumbnail, category, and price preview.
- **Multi-attribute Filters**:
  - Filter by Category (Laptops, Phones, Tablets, Appliances, Audio)
  - Dynamic Price Range Slider ($200 to $4,000)
  - Filter by Brand (Apple, Samsung, Dell, Asus, Lenovo, Sony, Dyson, LG, Philips, etc.)
  - Customer Rating filter (4.8★+, 4.5★+, All)
  - "In Stock Only" and "On Sale / Deals Only" toggles
  - Sort by: Featured, Price (Low to High), Price (High to Low), Rating, Name (A-Z)
- **View Toggle**: Seamless switch between **Grid View** and **List View**.

### 3. 🛒 Interactive Slide-out Cart Drawer
- Item quantity adjustment (`+` / `-`) and instant item removal.
- **Free Shipping Progress Bar**: Dynamic calculation toward unlocking Free Express Worldwide Shipping ($150 threshold).
- **Promo Code System**:
  - `TECH20` — 20% discount on order
  - `TECH15` — 15% discount on order
  - `WELCOME50` — $50 instant cash off
  - `CYBER10` — 10% discount on gadgets
- Live calculated breakdown: Subtotal, Discount, Shipping, Estimated Tax (8%), and Grand Total.

### 4. ❤️ Wishlist & Favorites Drawer
- Save any product with the heart icon.
- View saved products in a slide-out drawer with one-click "Move to Cart" action.
- Synchronized badge counters and localStorage persistence.

### 5. 🔎 Product Quick View Modal
- High-res image gallery with interactive thumbnail switcher.
- Detailed technical specifications table (CPU, GPU, RAM, Storage, Screen, Battery, etc.).
- Colorway variant picker and quantity stepper.

### 6. 💳 Multi-Step Checkout Flow
- **Step 1: Shipping Details** — Contact information, street address, and postal code.
- **Step 2: Payment Method** — Interactive simulated credit card with live card number formatting (`•••• •••• •••• 4242`), expiry, and cardholder sync, plus PayPal, Apple Pay, and Cash on Delivery options.
- **Step 3: Confirmation & Receipt** — Auto-generated order tracking ID (`TM-XXXXXX`), estimated delivery date, summary invoice, and Print Receipt capability.

### 7. 🌐 Global Currency Converter & Themes
- Currency conversion between **USD ($)**, **EUR (€)**, **GBP (£)**, and **INR (₹)** with exchange rates.
- **Dark Mode / Light Mode** toggle with persistence in `localStorage`.
- Toast notifications for all user feedback (cart additions, wishlist updates, coupon claims).

---

## 🚀 How to Run the Project

Since TechMart is built purely with standard HTML5, CSS3, and JavaScript, no complex build tools or npm installs are required.

### Option 1: Direct in Browser
Simply double-click or open `index.html` in any modern web browser (Google Chrome, Firefox, Microsoft Edge, Safari).

### Option 2: Using Python's Built-in Web Server
Run the following command in the project root directory:

```bash
# Python 3
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

---

## 📁 File Structure

```text
TechMart/
├── index.html          # Semantic HTML5 layout with all sections and modal dialogs
├── css/
│   └── style.css       # Complete CSS design system, dark/light themes, animations, responsive rules
├── js/
│   ├── products.js     # Comprehensive tech product database (specs, images, prices, brands)
│   └── app.js          # Reactive application state, cart, wishlist, checkout, filters, search
└── README.md           # Documentation and features guide
```

---

## 🎨 Technologies Used
- **HTML5**: Semantic tags, accessible attributes, form controls.
- **CSS3**: Custom Properties (CSS variables), Flexbox, CSS Grid, Glassmorphism, animations, responsive breakpoints.
- **Vanilla JavaScript (ES6+)**: OOP architecture, localStorage data persistence, reactive DOM updates.
- **Font Awesome 6**: Vector tech icons.
- **Google Fonts**: *Outfit* (bold headers) & *Inter* (crisp UI text).

