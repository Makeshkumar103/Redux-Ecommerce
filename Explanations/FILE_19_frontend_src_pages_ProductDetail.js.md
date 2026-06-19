# FILE: `frontend/src/pages/ProductDetail.js`

## Purpose of this File

This is the **Product Detail Page**. When a user clicks on a product (from the home page or search results), they come here to see:
- Large product image
- Full product description
- Price
- Star rating
- Stock status
- Seller information
- Add to Cart functionality

---

## How It Connects to Other Files

```
  App.js
       │
       │  <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
       ▼
  ProductDetail.js  ◄── WE ARE HERE
       │
       │  Reads :id from URL using useParams()
       │  Fetches product from API: GET /api/v1/product/:id
       │  Adds items to cart using setCartItems from App
       │  Uses toast to show notifications
       ▼
  react-toastify (notification popup)
  App.js cart state (shared)
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
import { useEffect, useState } from "react"
```
Imports `useEffect` and `useState` hooks.

---

### Line 2

```javascript
import { useParams } from "react-router-dom";
```

**What it does:**
Imports `useParams` hook to read URL parameters.

**How it works:**
- The route is `/product/:id`.
- If URL is `/product/abc123`, `useParams()` returns `{ id: "abc123" }`.
- This is how the component knows which product to fetch.

---

### Line 3

```javascript
import { toast } from "react-toastify";
```

**What it does:**
Imports the `toast` function for showing notifications.
- `toast("message")` = Shows a pop-up notification.

---

### Lines 6-89

```javascript
export default function ProductDetials({ cartItems, setCartItems }) {

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const {id} = useParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/product/'+id)
            .then(res => res.json())
            .then(res => setProduct(res.product))
        },[]) 

    function addtoCart() {
        const itemExist = cartItems.find((item) => item.product._id === product._id)
        if (!itemExist) {
            const newItem = {product, qty};
            setCartItems((state) => [...state, newItem]);
            toast("Cart Item added successfully!")
        } 
    }

    function increaseQty () {
        if (product.stock == qty){
            return;
        }
        setQty((state) => state + 1 );
    }
    
    function decreaseQty () {
        if (qty > 0) {
            setQty((state) => state - 1 );    
        }
    }

    return (
        product && <div className="container container-fluid">
            ...
        </div>
    )
}
```

---

### Line 6:

```javascript
export default function ProductDetials({ cartItems, setCartItems }) {
```

**Note:** There's a typo! The function is named `ProductDetials` (missing the 'l' in 'Details'). But it works because the same name is used consistently.

- Receives `cartItems` (current cart) and `setCartItems` (function to update cart) as props from App.js.

---

### Line 8:

```javascript
    const [product, setProduct] = useState(null);
```
- `product` = The current product data (starts as `null` because nothing is loaded yet).
- `setProduct` = Function to update the product when API responds.

---

### Line 9:

```javascript
    const [qty, setQty] = useState(1);
```
- `qty` = The quantity the user wants to buy (starts at 1).
- `setQty` = Function to update quantity.

---

### Line 10:

```javascript
    const {id} = useParams();
```
- Gets the product ID from the URL.
- If URL is `/product/xyz789`, then `id = "xyz789"`.

---

### Lines 12-18 - useEffect - Fetching product:

```javascript
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/product/'+id)
            .then(res => res.json())
            .then(res => setProduct(res.product))
        },[]) 
```

**What it does:**
Fetches the product details from the backend when the component mounts.

**Line 13:**
```javascript
        fetch(process.env.REACT_APP_API_URL+'/product/'+id)
```
- Makes a GET request to: `http://localhost:8000/api/v1/product/abc123` (where `abc123` is the product ID).

**Line 14:**
```javascript
            .then(res => res.json())
```
- Convert the response to JavaScript object.

**Line 15:**
```javascript
            .then(res => setProduct(res.product))
```
- Extract the product from the response and save it to state.

**Line 16:**
```javascript
        },[]) 
```
- `[]` = Empty dependency array means this effect runs only ONCE when the component first loads.
- **Problem**: If the user navigates from one product to another (same component, different ID), the effect won't re-run because `id` is not in the dependency array. The product wouldn't update.

---

### Lines 20-29 - addToCart function:

```javascript
    function addtoCart() {
        const itemExist = cartItems.find((item) => item.product._id === product._id)
        if (!itemExist) {
            const newItem = {product, qty};
            setCartItems((state) => [...state, newItem]);
            toast("Cart Item added successfully!")
        } 
    }
```

**What it does:**
Adds the current product to the cart.

**Line 21:**
```javascript
        const itemExist = cartItems.find((item) => item.product._id === product._id)
```
- Checks if this product is already in the cart.
- `cartItems.find()` = Looks through every cart item.
- If found, `itemExist` = the existing cart item.
- If not found, `itemExist` = `undefined`.

**Lines 22-27:**
```javascript
        if (!itemExist) {
            const newItem = {product, qty};
            setCartItems((state) => [...state, newItem]);
            toast("Cart Item added successfully!")
        } 
```
- `if (!itemExist)` = If the product is NOT already in the cart:
  1. Create a `newItem` object: `{ product: {all product data}, qty: 1 }`.
  2. `setCartItems((state) => [...state, newItem])` = Add the new item to the cart:
     - `(state) =>` = Get the current cart.
     - `[...state, newItem]` = Copy all existing items and add the new one.
     - `...` = The **spread operator** - it spreads out all existing items.
  3. `toast("Cart Item added successfully!")` = Show a success notification.

**What if we remove this function?**
Users could not add items to the cart from the product detail page.

---

### Lines 31-38 - Quantity functions:

```javascript
    function increaseQty () {
        if (product.stock == qty){
            return;
        }
        setQty((state) => state + 1 );
    }
    
    function decreaseQty () {
        if (qty > 0) {
            setQty((state) => state - 1 );    
        }
    }
```

**increaseQty:**
- Checks if current quantity equals available stock.
- If yes (can't order more than available), do nothing (`return`).
- If no, increase quantity by 1.

**decreaseQty:**
- Only decreases if quantity is greater than 0.
- Prevents negative quantity.

---

### Lines 40-89 - The JSX:

```html
return (
    product && <div className="container container-fluid">
        ...
    </div>
)
```

**`product && <div>...`**: This is a conditional render.
- If `product` is `null` (still loading), nothing displays (returns `false`/nothing).
- If `product` exists, render the details.

**Lines 46-49 - Product image:**
```html
<div className="col-12 col-lg-5 img-fluid" id="product_image">
    <img src={product.images[0].image} alt="sdf" height="500" width="500" />
</div>
```
- Shows the first product image.
- Fixed size: 500x500 pixels.

**Lines 51-84 - Product information:**
- **Line 53**: `<h3>{product.description}</h3>` - Product description as heading.
- **Line 54**: `<p id="product_id">{product._id}</p>` - Shows the product's unique ID.
- **Lines 57-59**: Star rating (same CSS trick as ProductCard).
- **Line 62**: `<p id="product_price">{product.price}</p>` - Price.
- **Lines 63-69**: Quantity controls:
  ```html
  <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
  <input type="number" className="form-control count d-inline" value={qty} readOnly />
  <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
  ```
  - `-` button: decreases quantity (calls `decreaseQty`).
  - Input: displays current quantity (`value={qty}`, `readOnly` = can't type).
  - `+` button: increases quantity (calls `increaseQty`).

- **Line 71**: Add to Cart button:
  ```html
  <button type="button" onClick={addtoCart} disabled={product.stock == 0} ...>Add to Cart</button>
  ```
  - `onClick={addtoCart}` = Calls the add to cart function.
  - `disabled={product.stock == 0}` = Disables the button if stock is 0.

- **Line 74**: Stock status:
  ```html
  <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
      {product.stock > 0 ? "In Stock" : "Out of Stock"}
  </span>
  ```
  - If stock > 0: Green text "In Stock".
  - If stock == 0: Red text "Out of Stock".

- **Line 77-78**: Description section.
- **Line 80**: Seller information.

---

## Summary

`ProductDetail.js`:
1. Reads the product ID from the URL
2. Fetches the product from the backend API
3. Shows full product information (image, name, price, rating, stock, seller)
4. Allows users to select quantity with +/- buttons
5. Adds the product to the cart (shared state via App.js)
6. Shows a toast notification on successful add

---

## Knowledge Check

### Q1: What does `useParams()` return?

**Answer:** An object containing URL parameters. For the route `/product/:id` and URL `/product/abc123`, it returns `{ id: "abc123" }`. The parameter name `id` matches the `:id` in the route path.

---

### Q2: Why does the `useEffect` have an empty dependency array `[]`?

**Answer:** `[]` means the effect runs only once - when the component first mounts. This is fine for a simple product page, but if the user clicks on a different product while on this page, the component might re-use the same effect (since it's the same component) and the product wouldn't refresh. Ideally, `[id]` should be in the dependency array.

---

### Q3: What does `[...state, newItem]` mean?

**Answer:** This creates a new array by:
1. `...state` = Spreading all existing items from the current cart array.
2. `newItem` = Adding the new item at the end.

This creates a **new** array rather than modifying the old one, which is important for React state management.

---

### Q4: What does `disabled={product.stock == 0}` do?

**Answer:** It disables the "Add to Cart" button when stock is zero. Users cannot add out-of-stock products to their cart. The button appears grayed out and unclickable.

---

### Q5: What is the `readOnly` attribute on the quantity input?

**Answer:** It prevents users from typing into the input field directly. The quantity can ONLY be changed by clicking the +/- buttons. This prevents invalid values (like negative numbers or text).

---

### Common Beginner Mistakes

1. **Missing dependency in useEffect**: `[id]` should be included so the product re-fetches when navigating between products.

2. **Not handling the case where product is null**: The `product &&` check prevents rendering when data hasn't loaded yet.

3. **Mutating state directly**: Writing `cartItems.push(newItem)` instead of `setCartItems([...cartItems, newItem])`.

4. **Using single equals `=` for comparison**: In `product.stock == qty`, `==` compares values. Using a single `=` assigns a value, which would be wrong.

5. **Not checking if product is already in cart**: Currently, clicking "Add to Cart" multiple times for the same product does nothing (after the first add). But ideally, it should increase the quantity of the existing item.

6. **Typo in function name**: `ProductDetials` (missing 'l') could cause confusion.
