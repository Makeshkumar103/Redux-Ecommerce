# FILE: `backend/routes/product.js`

## Purpose of this File

This file defines the **API routes** for products.
Routes are like **signposts** that direct incoming requests to the right controller function.
Think of this file as a **menu** - it lists what product-related URLs are available.

---

## How It Connects to Other Files

```
  backend/app.js
       │
       │  app.use('/api/v1/', products);
       ▼
  routes/product.js  ◄── WE ARE HERE
       │
       │  Defines:
       │    GET /products     → getProducts controller
       │    GET /product/:id  → getSingleProduct controller
       ▼
  controllers/productControllers.js
       │
       │  Contains the actual logic
       ▼
  models/productModel.js → MongoDB
```

**URL Construction:**
```
Base:     /api/v1/        (from app.js)
Route:    /products       (from product.js)
Full URL: /api/v1/products
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
const express = require('express');
```

**What it does:**
Imports Express to access the Router.

---

### Line 2

```javascript
const router = express.Router();
```

**What it does:**
Creates a new **Router** object.

**Keyword explanation:**
- `Router()` = A mini Express application that only handles routing. It's like a smaller, specialized server.
- Think of a Router as a **sector** in a sports stadium. The main Express app is the whole stadium, and the Router is the section that handles only one type of event (products).

**What if we remove this line?**
We couldn't define routes because there's no `router` variable. `router.route()` on line 8 would fail.

---

### Line 3

```javascript
const { getProducts } = require('../controllers/productControllers');
```

**What it does:**
Imports only the `getProducts` function from the controller file.

**Keyword explanation:**
- `{ getProducts }` = **Destructuring**. It's like saying "from this file, I only want the `getProducts` part."
- The controller file exports multiple functions using `exports.getProducts` and `exports.getSingleProduct`. Here we only take what we need.

**What if we remove this line?**
The `getProducts` reference on line 8 would be `undefined`, and the route wouldn't work.

---

### Line 4

```javascript
const { getSingleProduct } = require('../controllers/productControllers');
```

**What it does:**
Imports the `getSingleProduct` function separately (could also be done on line 3 in one destructuring).

**What if we remove this line?**
The `getSingleProduct` reference on line 9 would fail.

---

### Line 8

```javascript
router.route('/products').get(getProducts);
```

**What it does:**
Creates a route for getting all products.

**Breaking it down:**
- `router.route('/products')` = Defines a route for the URL path `/products`.
- `.get(getProducts)` = When someone sends a GET request to this path, run the `getProducts` function.

**Full URL becomes:**
```
Base: /api/v1/  +  Route: /products  =  /api/v1/products
```

**HTTP Methods:**
- `GET` = Used to retrieve data (read). Like looking at a menu.
- `POST` = Used to send data (create). Like placing an order.
- `PUT` = Used to update data.
- `DELETE` = Used to remove data.

**What if we remove this line?**
Going to `/api/v1/products` would return a 404 error (page not found).

---

### Line 9

```javascript
router.route('/product/:id').get(getSingleProduct);
```

**What it does:**
Creates a route for getting a single product by ID.

**Breaking it down:**
- `'/product/:id'` = The path with a **route parameter**.
- `:id` = A placeholder. This part of the URL can be any value.
  - `/product/abc123` → `req.params.id` = `"abc123"`
  - `/product/xyz789` → `req.params.id` = `"xyz789"`
- `.get(getSingleProduct)` = Handle GET requests with this function.

**Full URL becomes:**
```
/api/v1/product/abc123
```

**What if we remove this line?**
Going to `/api/v1/product/some-id` would return a 404 error.

---

### Line 12

```javascript
module.exports = router;
```

**What it does:**
Exports the router so `app.js` can use it.

**What if we remove this line?**
`app.js` would get an empty object when it does `require('./routes/product')`, and the routes would never be registered.

---

## Complete Route Table

| Method | Route Path | Full URL | Controller | Description |
|---|---|---|---|---|
| GET | `/products` | `/api/v1/products` | `getProducts` | Get all products (with optional `?keyword=...`) |
| GET | `/product/:id` | `/api/v1/product/:id` | `getSingleProduct` | Get one product by ID |

---

## Summary

`routes/product.js`:
1. Creates an Express Router
2. Imports two controller functions from `productControllers.js`
3. Defines two routes:
   - GET `/products` → list all products
   - GET `/product/:id` → get single product
4. Exports the router for `app.js` to use

---

## Knowledge Check

### Q1: What is the difference between a Route and a Controller?

**Answer:**
- **Route** (`product.js`) = Tells the server "when this URL is visited, use this function." It's like a receptionist who directs visitors to the right department.
- **Controller** (`productControllers.js`) = Contains the actual logic. It's like the department that actually does the work.

---

### Q2: What does `:id` in the route path mean?

**Answer:** `:id` is a route parameter - a placeholder for any value. When the URL is `/product/abc123`, the `abc123` part is stored in `req.params.id`. It's like saying "whatever comes after `/product/` is the product ID."

---

### Q3: Why use `.get()` and not `.post()` for getting products?

**Answer:** Because HTTP methods have specific meanings:
- `GET` = Retrieve data (read-only). Should not change anything on the server.
- `POST` = Create new data.
- `PUT` = Update existing data.
- `DELETE` = Remove data.

Getting a list of products is a read operation, so `GET` is correct.

---

### Q4: What would happen if we wrote `router.route('/products').post(getProducts)` instead of `.get(getProducts)`?

**Answer:** The route would only respond to POST requests to `/api/v1/products`. A browser visiting this URL in the address bar (which uses GET) would get a 404 error. This is a common mistake.

---

### Q5: Could we import both functions in one line instead of two?

**Answer:** Yes! We could write:
```javascript
const { getProducts, getSingleProduct } = require('../controllers/productControllers');
```
This would get both functions in one line. The current code does it in two lines, which works fine but is slightly repetitive.

---

### Common Beginner Mistakes

1. **Forgetting to export the router**: If you don't have `module.exports = router`, `app.js` can't use the routes.

2. **Wrong HTTP method**: Using `.post()` when you mean `.get()`, or vice versa.

3. **Route order matters**: More specific routes should come before general ones. Here it's fine, but if you had `/product/new` and `/product/:id`, the `/product/new` should come first.

4. **Missing leading slash**: Writing `'products'` instead of `'/products'` could cause unexpected behavior.

5. **Not using `express.Router()`**: Trying to use `router` without creating it first.
