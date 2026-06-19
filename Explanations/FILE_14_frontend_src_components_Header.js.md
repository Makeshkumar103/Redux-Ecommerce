# FILE: `frontend/src/components/Header.js`

## Purpose of this File

This component renders the **navigation bar** at the top of the website.
It contains:
- The store logo (links to home page)
- A search bar (the Search component)
- A cart icon with item count

Think of this as the top section of an Amazon-like website.

---

## How It Connects to Other Files

```
  App.js
       │
       │  <Header cartItems={cartItems} />
       ▼
  Header.js  ◄── WE ARE HERE
    │
    ├──► Uses Search component
    │
    └──► Shows cartItems.length from App
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
import Search from "./Search";
```

**What it does:**
Imports the Search component.

**What if we remove this line?**
The `Search` component reference on line 15 would fail.

---

### Line 2

```javascript
import { Link } from "react-router-dom";
```

**What it does:**
Imports the `Link` component from React Router.

**Keyword explanation:**
- `Link` = A React Router component used for navigation. It's like an `<a>` tag (hyperlink) but without reloading the page. It changes the URL and React Router handles showing the right page.

**What if we remove this line?**
Every `<Link>` in this component would fail because `Link` is undefined.

---

### Line 3-26

```javascript
export default function Header( {cartItems} ) {
    return  (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
          <img width="150px" src="/images/logo.png" alt="logo-image" />          
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
       <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to='/cart'>
        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
      </div>
    </nav>
    )
}
```

---

### Line 3 - Function declaration:

```javascript
export default function Header( {cartItems} ) {
```

**What it does:**
Defines and exports the Header component.

**Destructuring props:**
- `{cartItems}` = Take the `cartItems` prop that was passed from App.js.
- The component receives `props` and immediately extracts `cartItems` from it.

---

### Lines 4-25 - The JSX:

**Line 5:**
```html
<nav className="navbar row">
```
- `<nav>` = An HTML5 tag for navigation sections.
- `className` = React uses `className` instead of `class` (because `class` is a reserved word in JavaScript).

**Lines 6-12:**
```html
<div className="col-12 col-md-3">
    <div className="navbar-brand">
      <Link to="/">
        <img width="150px" src="/images/logo.png" alt="logo-image" />          
      </Link>
    </div>
</div>
```
- First column (takes 3 of 12 grid columns on desktop, full width on mobile).
- `<Link to="/">` = Clicking the logo navigates to the home page.
- `<img src="/images/logo.png">` = The store logo image.
- `width="150px"` = Logo width.

**Lines 14-16:**
```html
<div className="col-12 col-md-6 mt-2 mt-md-0">
    <Search />
</div>
```
- Second column (takes 6 of 12 grid columns on desktop).
- Contains the Search component.

**Lines 18-23:**
```html
<div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
    <Link to='/cart'>
        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
    </Link>
</div>
```
- Third column (takes 3 of 12 grid columns).
- `<Link to='/cart'>` = Clicking navigates to the cart page.
- `<span id="cart">` = Shows the text "Cart".
- `<span id="cart_count">` = Shows the number of items in the cart.
- `{cartItems.length}` = JavaScript expression inside JSX. Displayed as the cart badge.

**Real-world example:**
This is like Amazon's top bar:
- Left: Amazon logo (click to go home)
- Middle: Search bar
- Right: Cart with item count

---

## Summary

`Header.js` renders the top navigation bar with:
1. Logo (links to home)
2. Search bar
3. Cart link with item count

---

## Knowledge Check

### Q1: What does `Link` do that a regular `<a>` tag cannot?

**Answer:** `<Link>` changes the URL without reloading the page. A regular `<a>` tag causes a full page reload. `<Link>` uses client-side routing - React intercepts the click and renders the new component instantly.

---

### Q2: Where does `cartItems.length` value come from?

**Answer:** It comes from `App.js` where `const [cartItems, setCartItems] = useState([])` is defined. App passes `cartItems` as a prop to Header. The length shows how many items are in the cart.

---

### Q3: What is Bootstrap's grid system (col-12 col-md-3)?

**Answer:** Bootstrap uses a 12-column grid system:
- `col-12` = On small screens, take all 12 columns (full width).
- `col-md-3` = On medium+ screens, take 3 of 12 columns (25% width).

This makes the layout responsive (looks good on both phones and desktops).

---

### Q4: Why use `className` instead of `class`?

**Answer:** In React, JSX is JavaScript, not HTML. Since `class` is a reserved keyword in JavaScript, React uses `className` instead. When compiled, it becomes the HTML `class` attribute.

---

### Q5: What would happen if App.js forgot to pass `cartItems` to Header?

**Answer:** `cartItems` would be `undefined`. Accessing `cartItems.length` would crash with "Cannot read property 'length' of undefined". The Header would not render.

---

### Common Beginner Mistakes

1. **Using `class` instead of `className`**: Works in some older React setups with warnings, but `className` is the correct way.

2. **Forgetting to import `Link`**: Using `<Link>` without importing it gives an error.

3. **Wrong image path**: `/images/logo.png` is an absolute path from the `public` folder. If the file doesn't exist, the image won't show.

4. **Not wrapping multiple elements**: JSX must have a single parent element (here it's `<nav>`).

5. **Modifying props directly**: Attempting `cartItems.push()` in Header would mutate state, but Header shouldn't modify state - it should only read it.
