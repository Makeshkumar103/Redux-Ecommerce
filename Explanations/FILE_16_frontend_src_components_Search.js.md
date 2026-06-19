# FILE: `frontend/src/components/Search.js`

## Purpose of this File

This component renders a **search bar** where users can type a product name and search.
When the user types and clicks search (or blurs), it navigates to `/search?keyword=...`.

---

## How It Connects to Other Files

```
  Header.js
       │
       │  <Search />
       ▼
  Search.js  ◄── WE ARE HERE
       │
       │  Navigates to /search?keyword=...
       ▼
  App.js route:
       <Route path='/search' element={<Home />} />
       ▼
  Home.js:
       Reads searchParams, filters products via API
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
import { useState } from "react";
```

**What it does:**
Imports the `useState` hook for managing the search input value.

---

### Line 2

```javascript
import { useNavigate } from "react-router-dom";
```

**What it does:**
Imports the `useNavigate` hook from React Router.

**Keyword explanation:**
- `useNavigate` = A hook that returns a function to programmatically navigate to different URLs.
- Unlike `<Link>` which needs to be clicked, `useNavigate` lets you navigate from code (like after a button click or form submission).

---

### Lines 4-29

```javascript
export default function Search () {

 const [keyword, setKeyword] = useState("");
 const navigate = useNavigate();

 const searchHandler = () => {
  navigate('/search?keyword='+keyword)
 }
return (
     <div className="input-group">
          <input
            type="text"
            id="search_field"
            onChange={ (e) => setKeyword(e.target.value)}
            onBlur={searchHandler}
            className="form-control"
            placeholder="Enter Product Name ..."
          />
          <div className="input-group-append">
            <button onClick={ searchHandler } id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
)
}
```

---

### Line 4:

```javascript
export default function Search () {
```
Defines the Search component with no props.

---

### Line 6:

```javascript
 const [keyword, setKeyword] = useState("");
```
Creates state for the search input:
- `keyword` = The current text in the search box (initially empty string `""`).
- `setKeyword` = Function to update the keyword when the user types.

---

### Line 7:

```javascript
 const navigate = useNavigate();
```
Gets the `navigate` function from React Router.

---

### Lines 9-11:

```javascript
 const searchHandler = () => {
  navigate('/search?keyword='+keyword)
 }
```

**What it does:**
This function is called when the user searches.

**Breaking it down:**
1. Takes the current `keyword` from state.
2. Navigates to `/search?keyword=THE_KEYWORD`.
3. Example: If user typed "phone", it navigates to `/search?keyword=phone`.

**Real-world example:**
This is like typing "Nike shoes" on Amazon's search bar and pressing Enter. The URL changes to show search results.

---

### Lines 12-27 - The JSX:

**Line 13:**
```html
<div className="input-group">
```
A Bootstrap class for grouping an input with a button.

**Lines 14-21 - The input field:**
```html
<input
    type="text"
    id="search_field"
    onChange={ (e) => setKeyword(e.target.value)}
    onBlur={searchHandler}
    className="form-control"
    placeholder="Enter Product Name ..."
/>
```

**Key attributes:**
- `type="text"` = A text input field.
- `id="search_field"` = CSS ID for styling.
- `onChange={ (e) => setKeyword(e.target.value)}` = Every time the user types, update the `keyword` state.
  - `e` = The event object.
  - `e.target.value` = The current text in the input.
- `onBlur={searchHandler}` = When the user clicks AWAY from the input (blur), trigger search.
- `placeholder="Enter Product Name ..."` = Gray hint text inside the input.

**Lines 22-26 - The search button:**
```html
<div className="input-group-append">
    <button onClick={ searchHandler } id="search_btn" className="btn">
      <i className="fa fa-search" aria-hidden="true"></i>
    </button>
</div>
```
- A button with a search icon (Font Awesome).
- `onClick={ searchHandler }` = When clicked, trigger the search.

---

## Execution Flow

```
User types "phone" in search box
       │
       ▼
  onChange fires → setKeyword("phone") updates state
       │
       ▼
  User clicks search button (or focuses away)
       │
       ▼
  searchHandler() runs
       │
       ▼
  navigate('/search?keyword=phone') changes URL
       │
       ▼
  React Router sees /search route
       │
       ▼
  Home.js component renders
       │
       ▼
  Home.js reads searchParams → "keyword=phone"
       │
       ▼
  fetch() call: /api/v1/products?keyword=phone
       │
       ▼
  Backend returns filtered products
       │
       ▼
  Page shows only matching products
```

---

## Summary

`Search.js`:
1. Maintains the search keyword in state
2. When user triggers search (blur or button click), navigates to `/search?keyword=...`
3. The search is actually performed by `Home.js` which reads the URL parameter

---

## Knowledge Check

### Q1: What is the difference between `onChange` and `onBlur`?

**Answer:**
- `onChange` fires EVERY time the user types a character. Used here to update the keyword state in real-time.
- `onBlur` fires when the user leaves the input field (clicks elsewhere or presses Tab).

In this component:
- `onChange` captures the typed text.
- `onBlur` triggers the search when the user clicks away.

---

### Q2: What does `useNavigate()` return?

**Answer:** A function (`navigate`) that can be called to navigate to different URLs. Example: `navigate('/cart')` takes the user to the cart page. It's like calling `window.location.href = '/cart'` but without reloading the page.

---

### Q3: Why does the search navigate to a new URL instead of just filtering products directly?

**Answer:** Using URL-based search has benefits:
1. The user can bookmark the search results page.
2. The browser's back/forward buttons work correctly.
3. The URL can be shared with others.

---

### Q4: What would happen if `placeholder` attribute was missing?

**Answer:** The input would be empty with no hint text. Users might not know what to type. The `placeholder` provides a hint: "Enter Product Name ..."

---

### Q5: What is the `fa fa-search` class?

**Answer:** It's a Font Awesome icon class. `fa` = Font Awesome base class, `fa-search` = the search magnifying glass icon. This displays as a small magnifying glass inside the button.

---

### Common Beginner Mistakes

1. **Forgetting `useState` import**: Using `useState` without importing it leads to an error.

2. **Not preventing default behavior**: If this was inside a `<form>`, submitting would reload the page. There's no form here, so it's fine.

3. **Empty search**: If the user searches with an empty string, `navigate('/search?keyword=')` would send an empty keyword. The backend would return all products.

4. **Using `onKeyDown` instead of `onChange`**: `onChange` captures the current value correctly. `onKeyDown` might miss some input methods.

5. **Not trimming the search**: If the user types " phone " (with spaces), the backend gets " phone " with spaces. A `keyword.trim()` would be useful.
