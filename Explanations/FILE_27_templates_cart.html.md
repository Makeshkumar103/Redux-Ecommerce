# FILE: `templates/cart.html`

## Purpose of this File

Static HTML prototype for the **Cart** page.
Shows what the final React component (`Cart.js`) should look like.

---

## Compare with React Version

| Feature | Template (static) | React (dynamic) |
|---|---|---|
| Items | 1 hardcoded item | Dynamic list from `cartItems` state |
| Quantity | Static "1" | Interactive +/- buttons |
| Delete | Non-functional icon | `removeItem()` function |
| Subtotal | Hardcoded "1 (Units)" | `cartItems.reduce(...)` calculation |
| Total | Hardcoded "$245.67" | `cartItems.reduce(...)` calculation |
| Place Order | Non-functional button | `placeOrderHandler()` sends POST API |
