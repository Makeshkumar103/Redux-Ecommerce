# FILE: `templates/index.html`

## Purpose of this File

This is a **static HTML template** for the home page.
It was created BEFORE the React frontend was built.
Think of it as a **wireframe** or **prototype** - a visual design to show how the final page should look.
This file is NOT used by the React application. It's just for reference/design.

---

## How It Connects to Other Files

```
templates/index.html  (static prototype - NOT connected to React)
templates/css/style.css (styles for the templates)

Compare with:
frontend/src/pages/Home.js  (React version of the same page)
frontend/src/App.css (React version of the same styles)
```

---

## Key Differences from React Version

| Feature | Static Template (templates/) | React App (src/) |
|---|---|---|
| Navigation | Hardcoded HTML | Header.js component |
| Products | Hardcoded 5 product cards | Dynamic: ProductCard.js + API |
| Search | Non-functional (just HTML) | Functional: Search.js + API |
| Cart count | Hardcoded "2" | Dynamic: `cartItems.length` |
| Data | Hardcoded in HTML | Fetched from MongoDB via API |
| Images | Links to `./images/...` | Links to `/images/...` |
| Ratings | Hardcoded in HTML | Calculated from API data |

---

## Summary

The `templates/` folder contains static HTML files that served as design prototypes:
- `index.html` = Home page prototype (5 hardcoded products)
- `details.html` = Product detail page prototype
- `cart.html` = Cart page prototype
- `css/style.css` = Styles for the templates

These files are **not used** by the actual React application. They're like an architect's blueprint before building the real house.
