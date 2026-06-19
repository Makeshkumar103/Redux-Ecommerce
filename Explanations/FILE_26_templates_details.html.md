# FILE: `templates/details.html`

## Purpose of this File

Static HTML prototype for the **Product Details** page.
Shows what the final React component (`ProductDetail.js`) should look like.

---

## Compare with React Version

| Feature | Template (static) | React (dynamic) |
|---|---|---|
| Product | Hardcoded "Dell Inspiron" | Loaded from API by ID |
| Price | Hardcoded "$456.00" | `product.price` |
| Quantity | Static input with value "1" | Interactive +/- buttons |
| Stock | Hardcoded "In Stock" | `product.stock > 0 ? "In Stock" : "Out of Stock"` |
| Seller | Hardcoded "Amazon" | `product.seller` |
