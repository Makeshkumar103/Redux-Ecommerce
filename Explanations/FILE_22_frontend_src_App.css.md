# FILE: `frontend/src/App.css`

## Purpose of this File

This is the **main stylesheet** for the entire application.
It contains all the custom CSS that makes the website look like a real ecommerce store.
It styles:
- Navigation bar (Amazon-like dark header)
- Product cards
- Star ratings (using Font Awesome)
- Cart page
- Product details
- Footer
- Loading spinner
- And more

---

## File Size

This file is **658 lines** long. I'll explain the important sections rather than every individual line, since CSS is repetitive styling rules.

---

## Key Sections Explained

---

### Lines 1-38 - Default App Styles (from Create React App)

```css
.App { text-align: center; }
.App-logo { height: 40vmin; }
.App-header { background-color: #282c34; ... }
@keyframes App-logo-spin { ... }
```

These are default styles from Create React App's template. They're not used in this project (the logo and animation are from the default template).

---

### Lines 42-50 - Base Body Styles

```css
html, body {
  font-family: 'Amazon Ember';
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
}
```
- `font-family: 'Amazon Ember'` = Using Amazon's custom font (loaded from CDN in index.html).
- `overflow-x: hidden` = Prevents horizontal scrolling (no sideways scrollbar).

---

### Lines 54-68 - Custom Scrollbar

```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background-color: #f5f5f5; }
::-webkit-scrollbar-thumb { background-color: rgba(66, 66, 66, 0.2); border-radius: 5px; }
```
Customizes the scrollbar appearance in Chrome/Edge/Safari to be thinner and subtle gray.

---

### Lines 70-108 - Navigation Bar (Amazon-like)

```css
nav { background-color: #232f3e; padding: 1rem 1rem; }
#search_btn { background-color: #febd69; }
#cart { font-size: 1rem; color: white; }
#cart_count { background-color: #febd69; padding: 0.2rem 0.5rem; border-radius: 0.2rem; color: black; font-weight: bold; }
```
- Dark navy background (`#232f3e`) - same as Amazon.
- Orange accent (`#febd69`) for search button and cart count badge.
- White cart text, black cart count badge.

---

### Lines 111-155 - Home Page & Product Cards

```css
.card { height: 100%; }
.card-title a { color: #2e2e2e; }
.card-title a:hover { color: #fa9c23; }
.card-text { font-size: 1.4rem; }
.card-img-top { width: 200px; height: 150px; }
.ratings { font-size: 1.2rem; color: #fdcc0d; }
#view_btn { background-color: #fa9c23; color: white; }
```
- Products shown in equal-height cards.
- Link colors turn orange on hover (`#fa9c23`).
- Fixed image size (200x150).
- Gold star color (`#fdcc0d`).

---

### Lines 157-163 - Footer

```css
footer { margin-top: 8rem; color: grey; bottom: 0; width: 100%; }
```
- Pushed to the bottom with space above (`margin-top: 8rem`).

---

### Lines 165-191 - Star Ratings CSS Trick

```css
.rating-outer { display: inline-block; position: relative; font-family: FontAwesome; color: #fdcc0d; }
.rating-outer::before { content: '\f006 \f006 \f006 \f006 \f006'; }
.rating-inner { position: absolute; top: 0; left: 0; white-space: nowrap; overflow: hidden; width: 0; }
.rating-inner::before { content: '\f005 \f005 \f005 \f005 \f005'; color: #f8ce0b; }
```

This is how the star rating works:

1. `rating-outer` has 5 empty star characters (`\f006` = Font Awesome's empty star ☆).
2. `rating-inner` has 5 filled star characters (`\f005` = Font Awesome's filled star ★).
3. `rating-inner` is positioned on top of `rating-outer`.
4. `overflow: hidden` clips the filled stars.
5. The width of `rating-inner` is set dynamically (e.g., 90% for 4.5/5 rating).

So you see: ★★★★☆ (4 filled, 1 empty) when width is 80%.

---

### Lines 192-234 - Product Details Page

```css
#product_price { font-size: 2rem; font-weight: bold; }
#cart_btn, #review_btn { border-radius: 2rem; background-color: #fa9c23; border: none; padding: 0.5rem 2rem; }
#stock_status { font-size: 1.1rem; font-weight: bold; }
```
- Large bold price.
- Rounded orange buttons.
- Bold stock status text.

---

### Lines 234-262 - Loading Spinner

```css
.loader { display: block; margin: auto; margin-top: 20%; width: 80px; height: 80px; }
.loader:after { content: ' '; border-radius: 50%; border: 6px solid #fa9c23; border-color: #fa9c23 transparent; animation: lds-dual-ring 1.2s linear infinite; }
@keyframes lds-dual-ring { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
```
Creates a spinning circle animation using CSS. This loader class is defined but not currently used in any component.

---

### Lines 264-333 - Cart Styles

```css
.cart-item { margin: 1.8rem 0rem; padding: 0rem 0.7rem; }
#card_item_price { color: #febd69; font-weight: bold; font-size: 1.4rem; }
#delete_cart_item { color: red; background: white; padding: 0.3rem 0.5rem; font-size: 1.1rem; border: none; }
#order_summary { border: 1px solid #e3e3e3; border-radius: 1rem; padding: 2rem 1.5rem; }
.stockCounter input { border: none; width: 3rem; text-align: center; }
```

---

### Lines 335-615 - Additional Styles

The remaining styles cover:
- **Login & Register** (lines 335-361): Form wrapper styles (not yet implemented in components).
- **Avatar** (lines 363-381): Profile picture styling.
- **User Profile** (lines 389-491): Profile page styling.
- **Checkout Steps** (lines 397-469): Multi-step checkout progress bar.
- **Pagination** (lines 510-523): Page number styling.
- **Admin Sidebar** (lines 524-569): Dashboard sidebar.
- **Reviews** (lines 580-658): Product review section styling.

These styles exist for features that might be added in the future (user authentication, admin panel, etc.) but are not yet connected to any components.

---

## Summary

`App.css` is the visual identity of the application:
1. Uses Amazon-inspired colors (dark navy + orange + white)
2. Styles the navigation bar, product cards, cart, and product details
3. Implements star ratings using a clever CSS technique
4. Includes styles for many potential future features (auth, admin, reviews)
5. Uses Bootstrap classes for layout + custom CSS for branding

---

## Knowledge Check

### Q1: How does the star rating work without any JavaScript for the stars?

**Answer:** It uses Font Awesome characters and CSS:
1. `rating-outer::before` displays 5 empty star characters (`\f006`).
2. `rating-inner::before` displays 5 filled star characters (`\f005`), positioned on top.
3. The `rating-inner` div has `overflow: hidden` and its width is set dynamically (e.g., 90%).
4. Only the filled stars up to that width are visible, creating the illusion of a partial star rating.

---

### Q2: What are `::before` pseudo-elements?

**Answer:** `::before` is a CSS pseudo-element that inserts content BEFORE the actual content of an element. It's commonly used with `content: ''` to add decorative elements (like stars) without changing the HTML.

---

### Q3: Why does the stylesheet include styles for Login, Admin, and Reviews if those features don't exist yet?

**Answer:** This suggests the developer planned to add those features later. They wrote the CSS first (possibly from a tutorial or template) but haven't implemented the components yet.

---

### Q4: What is the color scheme of this application?

**Answer:** The app uses an Amazon-inspired color scheme:
- **Dark Navy**: `#232f3e` (navigation bar, sidebar)
- **Orange**: `#febd69` / `#fa9c23` (buttons, highlights, cart badge)
- **Gold**: `#fdcc0d` / `#f8ce0b` (star ratings)
- **White**: Text, card backgrounds
- **Grey**: Secondary text, borders

---

### Q5: What does `overflow-x: hidden` on body do?

**Answer:** It prevents the page from scrolling horizontally. Without it, some elements might extend beyond the screen width and create an ugly horizontal scrollbar.
