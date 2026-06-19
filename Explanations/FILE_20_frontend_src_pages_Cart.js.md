# FILE: `frontend/src/pages/Cart.js`

## Purpose of this File

This is the **Shopping Cart Page**.
Users can:
- See all items they've added to the cart
- Increase or decrease item quantities
- Remove items from the cart
- See the order summary (total items, total price)
- Place an order

---

## How It Connects to Other Files

```
  App.js
       │
       │  <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
       ▼
  Cart.js  ◄── WE ARE HERE
       │
       │  Reads cartItems from App.js
       │  Modifies cartItems using setCartItems
       │  Sends POST request to /api/v1/order to place order
       ▼
  Backend: /api/v1/order (POST) → orderControllers.createOrder()
```

---

## Line-by-Line Explanation

---

### Lines 1-3

```javascript
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useState } from "react";
```
- `Fragment` = Empty wrapper component.
- `Link` = Navigation component.
- `useState` = State hook (used for `complete` state).

---

### Lines 4-118

```javascript
export default function Cart ( { cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false)

    function increaseQty(item) {
        if (item.product.stock == item.qty){
            return;
        }
       const updatedItems = cartItems.map((i) => {
            if (i.product._id == item.product._id) {
                i.qty++
            }
            return i;
        })
        setCartItems(updatedItems)
    }
    
    function decreaseQty(item) {
        if (item.qty > 0) {
            const updatedItems = cartItems.map((i) => {
            if (i.product._id == item.product._id) {
                i.qty--
            }
            return i;
        })
        setCartItems(updatedItems)
        }
    }

    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => {
            if (i.product._id !== item.product._id) {
                return true;
            }
        })
        setCartItems(updatedItems)
    }

    function placeOrderHandler() {
                fetch(process.env.REACT_APP_API_URL+'/order',{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(cartItems)
                })
                .then((res) => { 
                    if (res.ok) {
                        setCartItems([]);
                        setComplete(true);
                    }
                })
    }               
    // ... JSX rendering below
}
```

---

### Line 4:

```javascript
export default function Cart ( { cartItems, setCartItems }) {
```
- Receives `cartItems` (the array of items) and `setCartItems` (function to update it) as props.

---

### Line 5:

```javascript
    const [complete, setComplete] = useState(false)
```
- `complete` = Boolean flag. `false` means order not placed yet. `true` means order completed.
- Used to show a success message after placing an order.

---

### Lines 7-19 - increaseQty function:

```javascript
    function increaseQty(item) {
        if (item.product.stock == item.qty){
            return;
        }
       const updatedItems = cartItems.map((i) => {
            if (i.product._id == item.product._id) {
                i.qty++
            }
            return i;
        })
        setCartItems(updatedItems)
    }
```

**What it does:**
Increases the quantity of a specific cart item.

**Line 8-10:**
```javascript
        if (item.product.stock == item.qty){
            return;
        }
```
- If the current quantity equals the available stock, don't increase (can't buy more than available).

**Lines 11-16:**
```javascript
       const updatedItems = cartItems.map((i) => {
            if (i.product._id == item.product._id) {
                i.qty++
            }
            return i;
        })
```
- `cartItems.map()` = Goes through every item in the cart.
- For each item:
  - If the item's ID matches the one we want to increase: increase its `qty` by 1.
  - Otherwise: return the item as-is.

**Line 17:**
```javascript
        setCartItems(updatedItems)
```
- Update the cart with the new array.

**⚠️ Issue:** The code modifies `i.qty++` directly on the original object, which mutates state. This should create a new object instead.

---

### Lines 21-32 - decreaseQty function:

```javascript
    function decreaseQty(item) {
        if (item.qty > 0) {
            const updatedItems = cartItems.map((i) => {
            if (i.product._id == item.product._id) {
                i.qty--
            }
            return i;
        })
        setCartItems(updatedItems)
        }
    }
```
- **Line 22**: Only decrease if quantity is greater than 0.
- **Line 24**: Find the matching item by ID.
- **Line 25**: Decrease its quantity by 1.
- **Line 30**: Update the cart state.

**Note**: This doesn't remove the item when qty reaches 0. It just lets it stay at 0. The `removeItem` function handles deletion.

---

### Lines 34-40 - removeItem function:

```javascript
    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => {
            if (i.product._id !== item.product._id) {
                return true;
            }
        })
        setCartItems(updatedItems)
    }
```

**What it does:**
Removes an item from the cart.

**How `.filter()` works:**
- Goes through every item in the cart.
- For each item, if the condition returns `true`, the item stays.
- If the condition returns `false`, the item is removed.
- Here: items with ID NOT matching the removed item stay (`return true`).
- The item with the matching ID is filtered out.

**Simplified version:**
```javascript
const updatedItems = cartItems.filter((i) => i.product._id !== item.product._id);
```

---

### Lines 42-54 - placeOrderHandler function:

```javascript
    function placeOrderHandler() {
                fetch(process.env.REACT_APP_API_URL+'/order',{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(cartItems)
                })
                .then((res) => { 
                    if (res.ok) {
                        setCartItems([]);
                        setComplete(true);
                    }
                })
    }
```

**What it does:**
Sends the order to the backend.

**Line 43:**
```javascript
                fetch(process.env.REACT_APP_API_URL+'/order',{
```
- URL: `http://localhost:8000/api/v1/order`

**Line 44:**
```javascript
                    method:'POST',
```
- This is a POST request (creating a new order).

**Line 45:**
```javascript
                    headers: {'Content-Type': 'application/json'},
```
- Tells the server we're sending JSON data.

**Line 46:**
```javascript
                    body: JSON.stringify(cartItems)
```
- `JSON.stringify()` = Converts the JavaScript array into a JSON string.
- `cartItems` = The array of items in the cart.
- This becomes the request body that the backend receives as `req.body`.

**Lines 47-52:**
```javascript
                .then((res) => { 
                    if (res.ok) {
                        setCartItems([]);
                        setComplete(true);
                    }
                })
```
- After the server responds:
  - `res.ok` = `true` if the HTTP status code is 200-299 (success).
  - If successful:
    - `setCartItems([])` = Empty the cart (order was placed).
    - `setComplete(true)` = Show the "Order Completed" message.

---

### Lines 55-118 - The JSX:

The component renders different content based on two conditions:

**If cart has items (`cartItems.length > 0`):**
```javascript
cartItems.length > 0 ? <Fragment>...</Fragment> : ...
```

**Lines 56-113 - Cart display:**

**Header:**
```html
<h2 className="mt-5">Your Cart: <b>{cartItems.length}</b></h2>
```

**Item list (lines 63-96):**
```javascript
{cartItems.map((item) => (<Fragment>...</Fragment>))}
```
For each item, displays:
1. Product image (`Line 69`)
2. Product name (linked to product detail page) (`Line 73`)
3. Price (`Line 78`)
4. Quantity controls (`Lines 80-87`):
   - Minus button → `decreaseQty(item)`
   - Read-only input showing `item.qty`
   - Plus button → `increaseQty(item)`
5. Delete button → `removeItem(item)` (`Line 90`)

**Order Summary (lines 100-110):**
```html
<div id="order_summary">
    <h4>Order Summary</h4>
    <hr />
    <p>Subtotal: <span>{cartItems.reduce((acc,item) => (acc + item.qty), 0)} (units)</span></p>
    <p>Est. total: <span>{cartItems.reduce((acc,item) => (acc + item.product.price * item.qty), 0)}</span></p>
    <hr />
    <button onClick={placeOrderHandler}>Place Order</button>
</div>
```

**Subtotal calculation:**
```javascript
cartItems.reduce((acc,item) => (acc + item.qty), 0)
```
- Adds up all quantities. Returns total number of units.

**Est. total calculation:**
```javascript
cartItems.reduce((acc,item) => (acc + item.product.price * item.qty), 0)
```
- For each item: price × quantity, then adds to running total.

**If cart is empty (`cartItems.length === 0`):**

```javascript
(!complete ? <h2 className="mt-5">Your Cart is Empty</h2> : 
    <>
        <h2 className="mt-5">Order Completed</h2>
        <p>Your Order has been placed!</p>
    </>)
```

- If `complete` is `false`: Shows "Your Cart is Empty"
- If `complete` is `true`: Shows "Order Completed" message

---

## Execution Flow

```
User is on Cart page with items
       │
       ▼
  Shows list of cart items with quantities
       │
       ▼
  User adjusts quantities or removes items
       │
       ▼
  setCartItems updates the shared state
       │
       ▼
  Header updates cart count
       │
       ▼
  User clicks "Place Order"
       │
       ▼
  placeOrderHandler() runs
       │
       ▼
  Fetch POST /api/v1/order with cart data
       │
       ▼
  Backend saves order, updates stock
       │
       ▼
  Response received (res.ok = true)
       │
       ▼
  Cart is cleared (setCartItems([]))
       │
       ▼
  "Order Completed" message shown
```

---

## Summary

`Cart.js`:
1. Displays all items in the cart with product details
2. Allows quantity adjustment (+/- buttons)
3. Allows item removal (trash icon)
4. Shows order summary (subtotal, estimated total)
5. Handles order placement via POST API call
6. Shows different states: cart with items, empty cart, order completed

---

## Knowledge Check

### Q1: What does `cartItems.reduce((acc, item) => acc + item.qty, 0)` do?

**Answer:** The `.reduce()` method calculates a single value from an array.
- Start at `0` (the second argument).
- For each item, add `item.qty` to the accumulator (`acc`).
- Result: Total number of items in the cart.

Example: If cart has items with qty 2, 1, and 3: result = 6.

---

### Q2: Why use `JSON.stringify(cartItems)` when sending the order?

**Answer:** `fetch()` expects the body to be a string, not a JavaScript object. `JSON.stringify()` converts the JavaScript array `[{product: {...}, qty: 2}]` into a JSON string `'[{"product":{...},"qty":2}]'` that can be sent over the network.

---

### Q3: What does `res.ok` check?

**Answer:** `res.ok` is a property of the Response object that is `true` if the HTTP status code is in the 200-299 range (success). If the backend returns a 500 error, `res.ok` is `false` and the order completion logic doesn't run.

---

### Q4: How does the `removeItem` function work?

**Answer:** It uses `Array.filter()` to create a new array that excludes the item to be removed. `.filter()` keeps items where the function returns `true`. By returning `true` for items that DON'T match the removed item's ID, the matching item is excluded.

---

### Q5: What happens to the cart after placing an order?

**Answer:** `setCartItems([])` clears the cart (sets it to an empty array). `setComplete(true)` changes the state to show the "Order Completed" message. The common parent (App.js) also re-renders, so the Header cart count becomes 0.

---

### Common Beginner Mistakes

1. **Direct state mutation**: `i.qty++` modifies the original state object directly. This can cause bugs with React's change detection.

2. **Not handling API errors**: The `placeOrderHandler` only handles success (`res.ok`). If the order fails (400/500 errors), there's no error message shown.

3. **Not using `===` for comparison**: The code uses `==` instead of `===`. `==` does type coercion (e.g., `"5" == 5` is `true`), while `===` checks both value and type.

4. **Forgetting `Content-Type` header**: Without `'Content-Type': 'application/json'`, the backend might not parse the request body correctly.

5. **Allowing negative quantities**: `decreaseQty` checks `item.qty > 0`, so it prevents negative. But the item stays at 0 instead of being auto-removed.

6. **No loading state**: While the order is being placed (network delay), there's no loading indicator. The user might click "Place Order" multiple times.
