# FILE: `frontend/src/index.css`

## Purpose of this File

This is the **global CSS stylesheet** for the React application.
It sets base styles for the body and code elements.

---

## Line-by-Line Explanation

---

### Lines 1-8

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Line 2:** `margin: 0;` - Removes the default margin that browsers add to the body. Without this, there's a tiny gap around the page.

**Lines 3-5:** `font-family: ...` - Sets the default font. It lists multiple fonts as a "fallback chain":
1. `-apple-system` = Apple's system font (San Francisco).
2. `BlinkMacSystemFont` = Chrome on Mac.
3. `Segoe UI` = Windows system font.
4. `Roboto` = Android/Google font.
5. And so on...

If the first font isn't available, try the next, and so on. Finally, `sans-serif` is the generic fallback.

**Lines 6-7:** Font smoothing - Makes text look smoother on specific browsers:
- `-webkit-font-smoothing: antialiased` = Chrome/Safari.
- `-moz-osx-font-smoothing: grayscale` = Firefox on Mac.

---

### Lines 10-13

```css
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

Sets the font for `<code>` elements (used for displaying code snippets). Falls back to `monospace` if all other fonts are unavailable.

---

## Summary

`index.css` is a small file that:
1. Removes default body margin
2. Sets a nice system font stack
3. Enables font smoothing
4. Sets a monospace font for code elements

Most of the actual styling is in `App.css`.

---

## Knowledge Check

### Q1: What is a "font stack"?

**Answer:** A font stack is a list of fonts in order of preference. The browser tries each font from left to right until it finds one available on the user's system. The last font (`sans-serif` or `monospace`) is a generic fallback that always works.

---

### Q2: Why remove the default body margin?

**Answer:** Browsers add a default margin of about 8px around the body. Removing it with `margin: 0` gives you a clean slate and prevents unwanted white space around your design.
