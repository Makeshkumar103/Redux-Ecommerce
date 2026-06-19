# FILE: `templates/css/style.css`

## Purpose of this File

This is the CSS stylesheet for the static **template files** (index.html, details.html, cart.html).

---

## Relationship with App.css

This file is **almost identical** to `frontend/src/App.css`. The styles were copied from the templates to the React app. The template CSS was written first as a design prototype.

---

## Summary of template files

The entire `templates/` folder serves as a **design prototype**:
1. The developer designed the pages using plain HTML/CSS first
2. Then built the React components to match the design
3. The React version adds:
   - Dynamic data (from MongoDB)
   - User interactions (click, add to cart, search)
   - Real API calls (fetch products, place orders)

The templates are like a **paper sketch** before building the real thing.
