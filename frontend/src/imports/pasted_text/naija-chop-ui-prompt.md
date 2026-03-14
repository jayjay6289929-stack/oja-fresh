Here's a comprehensive UI design prompt for a Nigerian online food store:

---

# 🍛 UI Design Prompt: Nigerian Online Food Store

## Project Overview

Design a **full-featured e-commerce UI** for **"Naija Chop" — a Nigerian online food store** that sells authentic Nigerian meals, ingredients, snacks, and drinks for delivery. The platform targets urban Nigerians in cities like Lagos, Abuja, and Port Harcourt, as well as the Nigerian diaspora craving home-cooked flavours.

---

## Brand Identity

| Attribute | Direction |
|-----------|-----------|
| **Brand Name** | Naija Chop |
| **Tagline** | *"Taste of Home, Right to Your Door"* |
| **Personality** | Warm, vibrant, trustworthy, proudly Nigerian |
| **Tone** | Energetic but approachable — like your favourite aunty's kitchen |

---

## Visual Language

### Colour Palette
- **Primary:** Deep forest green `#1A6B3C` *(Nigerian flag, freshness)*
- **Secondary:** Warm saffron/yam orange `#F5A623` *(jollof rice, suya spice)*
- **Accent:** Tomato red `#D92B2B` *(pepper soup vibes)*
- **Neutral Base:** Warm cream `#FDF6EC` *(not cold white — feels homely)*
- **Text:** Rich charcoal `#1C1C1C`

### Typography
- **Display/Headers:** A bold West African–inspired or editorial serif (e.g., *Playfair Display*, *Fraunces*, or *Canela*) — evokes warmth and cultural pride
- **Body:** A clean humanist sans-serif (e.g., *Lato*, *DM Sans*) — readable on mobile in low-bandwidth conditions
- **Accent Labels:** All-caps tracking for category tags and badges

### Aesthetic Direction
Go for a **"Modern Market"** aesthetic — the organised chaos and colour of a Lagos open market, but refined and digital. Think:
- Rich food photography with warm golden-hour lighting
- Overlapping cards, asymmetric grids, and bold typography
- Subtle texture overlays (fabric, woven pattern) referencing Ankara or raffia
- Micro-interactions that feel tactile and satisfying

---

## Pages & Screens to Design

### 1. 🏠 Homepage
- Hero section with rotating featured meal deals (e.g., *"Today's Special: Egusi Soup + Eba — ₦2,500"*)
- Quick-access category pills: `Soups` · `Rice Dishes` · `Snacks` · `Drinks` · `Raw Ingredients` · `Combos`
- "Order in 3 Steps" trust section
- Featured restaurants/vendors section
- Testimonials with Nigerian names and city tags

### 2. 🍲 Menu / Product Listing Page
- Filter sidebar: meal type, dietary (halal, vegetarian), price range, delivery time
- Product cards showing: food photo, name, vendor, price in ₦, rating, and an instant **"Add to Cart"** button
- Lazy-loaded grid with skeleton loaders
- Sticky filter bar on scroll

### 3. 🛒 Product Detail Page
- Large hero food image with zoom-on-hover
- Meal description written in a conversational, appetising tone
- Portion/size selector, quantity picker
- Spice level selector for applicable dishes *(Mild / Medium / 🔥 Naija Hot)*
- Vendor profile mini-card
- Reviews section with star ratings
- "Customers Also Ordered" carousel

### 4. 🛍️ Cart & Checkout Flow
- Slide-out cart drawer (not a full-page interrupt)
- Order summary with itemised ₦ breakdown
- Delivery address input with Nigerian state/LGA dropdowns
- Payment options: **Card**, **Bank Transfer**, **USSD**, **Pay on Delivery**
- Order confirmation screen with estimated delivery time and tracking CTA

### 5. 👤 User Profile / Dashboard
- Order history with reorder shortcut
- Saved addresses
- Loyalty points / Naija Chop Rewards tracker
- Favourite meals

---

## Key UX Principles

1. **Mobile-First** — Over 80% of Nigerian internet users are on mobile. Every screen must be thumb-friendly, fast-loading, and work gracefully on 3G.
2. **₦ Currency Everywhere** — Prices always display in Nigerian Naira with no ambiguity.
3. **Local Trust Signals** — Vendor verification badges, "Lagos Fast Delivery" tags, and payment logos (Paystack, Flutterwave, USSD codes) increase conversion.
4. **Low-Data Mode** — Consider a lightweight image toggle for users managing data costs.
5. **Language Nuance** — Copy should occasionally use friendly Pidgin phrases (*"E don ready!"*, *"Add to Cart, abeg"*) as microcopy to delight users without alienating anyone.

---

## Interaction & Motion Guidelines

- **Page transitions:** Smooth slide-up on mobile, fade on desktop
- **Add to Cart:** Satisfying "pop" animation — item flies into cart icon
- **Loading states:** Branded skeleton screens with warm cream shimmer, not generic grey
- **Toast notifications:** Bottom-of-screen toasts (*"Jollof Rice added! 🔥"*)
- **Hover states:** Cards lift with a warm drop shadow on desktop

---

## Deliverables Expected

| # | Deliverable |
|---|------------|
| 1 | Homepage (desktop + mobile) |
| 2 | Menu listing page |
| 3 | Product detail page |
| 4 | Cart drawer + Checkout flow (3 steps) |
| 5 | Order confirmation screen |
| 6 | Component library: buttons, cards, tags, inputs, nav |
| 7 | Design tokens: colours, type scale, spacing, shadows |

---

## Inspiration References

- **Chowdeck** and **Glovo Nigeria** — local delivery UX patterns
- **Jumia Food** — Nigerian e-commerce familiarity
- **Editorial food photography** from *Kinfolk* or *Cherry Bombe* — for plating aesthetic
- **Ankara fabric patterns** — for texture and cultural motifs

---

## Success Metrics (Design KPIs)

- Time-to-first-add-to-cart < 60 seconds from landing
- Checkout abandonment reduced via single-page checkout
- Mobile usability score > 90 (Lighthouse)
- Brand recall: users should feel the Nigerian-ness immediately

---

> **Designer's Note:** This is not a generic food delivery app with a Nigerian flag slapped on. Every design decision — from the colour of a button to the phrasing of an error message — should feel like it was made *for* Nigerians, *by* someone who knows what it means to wait for jollof rice at a party. Design with that love.