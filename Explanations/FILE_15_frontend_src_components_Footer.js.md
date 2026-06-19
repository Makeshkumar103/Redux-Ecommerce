# FILE: `frontend/src/components/Footer.js`

## Purpose of this File

This is the **footer** component that appears at the bottom of every page.
It shows copyright information.

---

## How It Connects to Other Files

```
  App.js
       │
       │  <Footer />  (rendered at the bottom)
       ▼
  Footer.js  ◄── WE ARE HERE
```

---

## Line-by-Line Explanation

---

### Lines 1-9

```javascript
export default function Footer(){
    return(
        <footer className="py-1 bg-dark">
            <p className="text-center text-white mt-1 ">
                JVLcart - 2023-2024, All Rights Reserved
            </p>
        </footer>
    )
}
```

**Line 1:**
```javascript
export default function Footer(){
```
- Defines and exports a React component called `Footer`.
- It has no props (no inputs from parent).

**Lines 3-7:**
- `<footer className="py-1 bg-dark">` = A footer element with Bootstrap classes for padding (`py-1`) and dark background (`bg-dark`).
- `<p className="text-center text-white mt-1 ">` = A paragraph, centered, white text, with top margin.
- `JVLcart - 2023-2024, All Rights Reserved` = The copyright text.

---

## Summary

A simple static component that displays copyright information. It has no logic, no state, and no props. It's purely presentational.

---

## Knowledge Check

### Q1: Why does Footer use `<footer>` HTML tag?

**Answer:** `<footer>` is a semantic HTML5 tag that tells browsers and search engines "this is the footer of the page." It's better than using a generic `<div>`.

---

### Q2: Does Footer accept any props?

**Answer:** No. It has no props. It always displays the same content regardless of what's happening in the app.

---

### Q3: What would happen if Footer.js didn't have `export default`?

**Answer:** App.js would not be able to import it. The import would fail silently or throw an error.
