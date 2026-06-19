# FILE: `frontend/src/pages/Home.js`

## Purpose of this File

This is the **Home Page** of the website.
It shows a grid of all available products.
When a user searches, this same page shows filtered results.

---

## How It Connects to Other Files

```
  App.js
       │
       │  <Route path='/' element={<Home />} />
       │  <Route path='/search' element={<Home />} />
       ▼
  Home.js  ◄── WE ARE HERE
       │
       │  Fetches products from backend API
       │  Maps through products and renders ProductCard
       ▼
  ProductCard.js
       │
       │  Each card links to ProductDetail.js
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
import { Fragment } from "react/jsx-runtime";
```

**What it does:**
Imports the `Fragment` component.

**Keyword explanation:**
- `Fragment` = A wrapper that groups elements without adding extra DOM nodes. It's like an invisible container.
- `react/jsx-runtime` = The module that handles JSX transformation in React 17+.

**What if we remove this line?**
Using `<Fragment>` on line 19 would fail. You could use `<>...</>` (short syntax) instead, which doesn't need an import.

---

### Line 2

```javascript
import ProductCard from "../components/ProductCard";
```
Imports the ProductCard component to display each product.

---

### Line 3

```javascript
import { useEffect, useState } from "react";
```

**What it does:**
Imports two React hooks:
- `useEffect` = Runs code AFTER the component renders (like making API calls).
- `useState` = Manages data that changes over time.

**What if we remove this line?**
Both `useState` and `useEffect` would be undefined. Lines 8, 9, and 11 would fail.

---

### Line 4

```javascript
import { useSearchParams } from "react-router-dom";
```

**What it does:**
Imports a hook that reads/writes search parameters from the URL.

**Keyword explanation:**
- `useSearchParams` = A hook that returns the current URL's query parameters (the part after `?`).
- Example: For URL `/search?keyword=phone`, it gives `{keyword: "phone"}`.

---

### Lines 6-32

```javascript
export default function Home() {

    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
        .then(res => res.json())
        .then(res => setProducts(res.products))
    },[searchParams]) 

    return <Fragment>
      <h1 id="products_heading">Latest Products</h1>
    
        <section id="products" className="container mt-5">
        <div className="row">
            {products.map(product =>
                <ProductCard 
                    product={product} 
                    key={product._id}
            />)}
        </div>
        </section>
    </Fragment>
}
```

---

### Line 8:

```javascript
    const [products, setProducts] = useState([]);
```
Creates state for storing the list of products.
- `products` = Array of products (initially empty `[]`).
- `setProducts` = Function to update the products when data arrives.

---

### Line 9:

```javascript
    const [searchParams, setSearchParams] = useSearchParams();
```
Gets the current URL's search parameters.
- If URL is `/search?keyword=phone`, `searchParams` contains `keyword=phone`.
- If URL is `/` (home), `searchParams` is empty.

---

### Lines 11-15 - useEffect - The API call:

```javascript
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
        .then(res => res.json())
        .then(res => setProducts(res.products))
    },[searchParams]) 
```

**What it does:**
Fetches products from the backend whenever the component loads or the search parameters change.

**Breaking it down:**

**Line 11:**
```javascript
    useEffect(() => {
```
- `useEffect` takes two arguments: a function and a dependency array.
- This function runs AFTER the component renders for the first time.

**Line 12:**
```javascript
        fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
```
- `fetch()` = A browser function that makes HTTP requests.
- `process.env.REACT_APP_API_URL` = From the `.env` file: `http://localhost:8000/api/v1`.
- So the URL becomes: `http://localhost:8000/api/v1/products?keyword=phone` (or just `/products` if no search).

**Line 13:**
```javascript
        .then(res => res.json())
```
- When the response arrives, convert it from JSON to a JavaScript object.
- `.then()` = Wait for the previous step to finish, then do this.

**Line 14:**
```javascript
        .then(res => setProducts(res.products))
```
- Take the response data and extract `res.products`.
- Update the `products` state with the fetched products.
- React automatically re-renders the component with the new products.

**Line 15:**
```javascript
    },[searchParams]) 
```
- `[searchParams]` = The **dependency array**.
- It means: "Re-run this effect whenever `searchParams` changes."
- If the user does a new search, `searchParams` changes, and the effect runs again with the new keyword.

**What if we remove `[searchParams]`?**
The effect would run after EVERY render (infinite loop). Or if we remove the array entirely, it runs only once (first load), and subsequent searches wouldn't work.

---

### Lines 17-31 - The JSX:

**Line 19:**
```html
<h1 id="products_heading">Latest Products</h1>
```
- Page heading.

**Lines 21-29:**
```html
<section id="products" className="container mt-5">
    <div className="row">
        {products.map(product =>
            <ProductCard 
                product={product} 
                key={product._id}
        />)}
    </div>
</section>
```

**Line 24 - `{products.map(product => ...)}`:**
- `products.map()` = Loop through each product in the array.
- For each product, render a `<ProductCard />` component.
- `product={product}` = Pass the current product as a prop.
- `key={product._id}` = A unique identifier for each card (helps React update efficiently).

**What if we remove the `key` prop?**
React would show a warning in the console and performance could suffer when the list changes.

---

## Execution Flow

```
User visits home page (or searches)
       │
       ▼
  Home component renders
       │
       ▼
  useState: products = [] (empty initially)
       │
       ▼
  useEffect runs (first time or when searchParams changes)
       │
       ▼
  fetch() calls: GET /api/v1/products?keyword=...
       │
       ▼
  Backend returns JSON: { products: [...], success: true, ... }
       │
       ▼
  res.json() parses the JSON
       │
       ▼
  setProducts(res.products) updates state
       │
       ▼
  Component re-renders
       │
       ▼
  products.map() generates ProductCard for each product
       │
       ▼
  User sees product grid
```

---

## Summary

`Home.js`:
1. Maintains a list of products in state
2. Uses `useEffect` to fetch products from the backend API
3. Reads search parameters from the URL to filter products
4. Renders a grid of `ProductCard` components
5. Re-fetches when the search keyword changes

---

## Knowledge Check

### Q1: What is `useEffect` and why is it used here?

**Answer:** `useEffect` is a React Hook that lets you run code after the component renders. It's used here to fetch products from the backend API. The API call happens after the component first appears on screen, and again whenever the search parameters change.

---

### Q2: What does `searchParams` contain for different URLs?

**Answer:**
- URL: `/` → `searchParams` = empty object (or empty URLSearchParams)
- URL: `/search?keyword=phone` → `searchParams` = `{keyword: "phone"}`
- URL: `/search?keyword=laptop` → `searchParams` = `{keyword: "laptop"}`

---

### Q3: What would happen if the API URL in `.env` is wrong?

**Answer:** The `fetch()` call would fail. The `.catch()` block is not present, so the error would be unhandled. The products would remain `[]` (empty), and the page would show no products.

---

### Q4: Why does `products.map()` need a `key` prop?

**Answer:** React uses the `key` to identify each item uniquely. When the list changes (items added/removed/reordered), React uses keys to figure out what changed efficiently. Without keys, React might re-render all items unnecessarily.

---

### Q5: What would happen if `setProducts(res.products)` receives `undefined`?

**Answer:** The products state would be set to `undefined`. Then `products.map()` would crash because `undefined` doesn't have a `.map()` method. A guard like `products?.map(...)` would prevent this.

---

### Common Beginner Mistakes

1. **Forgetting the dependency array**: Omitting `[searchParams]` causes the `useEffect` to run on every render, potentially causing infinite loops.

2. **Not handling loading state**: There's no "Loading..." message while waiting for the API response. Users see an empty page briefly.

3. **Not handling errors**: The `fetch()` call has no `.catch()` block. If the API fails (server down, network error), the error is silent.

4. **Using `fetch` directly instead of a library**: For simple apps it's fine, but for complex apps, libraries like Axios provide better error handling.

5. **Not cleaning up effects**: If the component unmounts before the fetch completes, setting state on an unmounted component causes a React warning.

6. **Forgetting `process.env.REACT_APP_` prefix**: In Create React App, custom environment variables MUST start with `REACT_APP_`.
