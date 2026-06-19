# APPLICATION FLOW

## Complete User Journey: From Opening the Website to Placing an Order

---

## Flow 1: Viewing Products (Home Page)

```
User opens http://localhost:3000
       │
       ▼
[1] Browser loads frontend/public/index.html
       │
       ▼
[2] index.html loads React JavaScript bundle
       │
       ▼
[3] src/index.js runs
       ├── Imports React, ReactDOM, App component
       └── Renders <App /> inside <div id="root">
       │
       ▼
[4] src/App.js renders
       ├── Creates cart state: cartItems = [] (empty)
       ├── Shows <ToastContainer /> (notification area)
       ├── Shows <Header cartItems={cartItems} />
       │     └── Header.js renders:
       │           ├── Logo (links to /)
       │           ├── <Search /> component
       │           └── Cart link with count=0
       ├── Shows <Routes>
       │     └── URL is "/" → <Home /> renders
       └── Shows <Footer />
       │
       ▼
[5] src/pages/Home.js renders
       ├── State: products = [] (empty)
       ├── useEffect() runs (first load)
       │     └── fetch('http://localhost:8000/api/v1/products')
       │           │
       │           ▼
       │     [BACKEND] Express receives GET /api/v1/products
       │           │
       │           ▼
       │     [BACKEND] app.js processes request
       │           ├── CORS middleware: allows cross-origin
       │           ├── express.json() middleware
       │           └── Routes: matches /api/v1/products
       │                 │
       │                 ▼
       │     [BACKEND] routes/product.js
       │           └── router.route('/products').get(getProducts)
       │                 │
       │                 ▼
       │     [BACKEND] controllers/productControllers.js
       │           └── getProducts() runs
       │                 ├── req.query.keyword = undefined (no search)
       │                 ├── query = {} (empty - get all)
       │                 ├── productModel.find({}) → MongoDB
       │                 │     │
       │                 │     ▼
       │                 │     MongoDB returns all 10 products
       │                 │
       │                 └── res.json({ success: true, products: [...] })
       │                       │
       │                       ▼
       │     Response travels back to React
       │           │
       │           ▼
       ├── .then(res => res.json())  ← parse JSON
       ├── .then(res => setProducts(res.products))
       │     └── State updated! products = [10 products]
       │
       ▼
[6] Home.js re-renders (because state changed)
       ├── products.map(product => <ProductCard product={product} />)
       └── 10 ProductCard components appear on screen
             │
             ▼
       Each ProductCard shows:
       ├── Product image (with fallback on error)
       ├── Product name (clickable link)
       ├── Star rating (CSS-based visual)
       ├── Price
       └── "View Details" button
```

---

## Flow 2: Searching Products

```
User types "phone" in search bar, clicks search button
       │
       ▼
[1] src/components/Search.js
       ├── onChange fires: setKeyword("phone") updates keyword state
       ├── searchHandler() runs
       └── navigate('/search?keyword=phone')
       │
       ▼
[2] React Router sees URL change → "/search?keyword=phone"
       ├── App.js: <Route path='/search' element={<Home />} />
       └── Home.js renders again
       │
       ▼
[3] Home.js
       ├── useSearchParams() → searchParams = {keyword: "phone"}
       ├── useEffect runs (because searchParams changed)
       └── fetch('http://localhost:8000/api/v1/products?keyword=phone')
             │
             ▼
[4] Backend receives GET /api/v1/products?keyword=phone
       ├── req.query.keyword = "phone"
       ├── Builds query: { name: { $regex: "phone", $options: 'i' } }
       ├── productModel.find(query) → finds products with "phone" in name
       └── Returns filtered products
             │
             ▼
[5] Home.js re-renders with filtered products
       └── Shows only matching product cards
```

---

## Flow 3: Viewing Product Details

```
User clicks "View Details" or product name on a card
       │
       ▼
[1] <Link to={`/product/${product._id}`}> navigates to /product/abc123
       │
       ▼
[2] App.js: <Route path='/product/:id' element={<ProductDetail ... />} />
       └── ProductDetail.js renders
       │
       ▼
[3] src/pages/ProductDetail.js
       ├── useParams() → {id: "abc123"}
       ├── State: product = null, qty = 1
       ├── useEffect runs
       │     └── fetch('http://localhost:8000/api/v1/product/abc123')
       │           │
       │           ▼
       │     [BACKEND] GET /api/v1/product/:id
       │           ├── routes/product.js matches
       │           ├── getSingleProduct() runs
       │           ├── productModel.findById("abc123")
       │           └── Returns product data
       │                 │
       │                 ▼
       ├── setProduct(res.product) updates state
       │
       ▼
[4] Component re-renders with product data
       ├── Shows large product image
       ├── Shows description, price, rating
       ├── Quantity selector (+/- buttons)
       ├── Stock status (In Stock / Out of Stock)
       ├── Seller info
       └── "Add to Cart" button
       │
       ▼
[5] User adjusts quantity (clicks +/-)
       └── setQty() updates quantity state
       │
       ▼
[6] User clicks "Add to Cart"
       ├── addtoCart() runs
       ├── Checks if product already in cart
       ├── Creates newItem = {product, qty}
       ├── setCartItems([...cartItems, newItem]) ← updates App state
       └── toast("Cart Item added successfully!") ← notification
       │
       ▼
[7] Header re-renders (because cartItems state changed)
       └── Cart count increases
```

---

## Flow 4: Managing Cart

```
User navigates to /cart (clicks Cart link in header)
       │
       ▼
[1] App.js: <Route path='/cart' element={<Cart ... />} />
       └── Cart.js renders
       │
       ▼
[2] src/pages/Cart.js
       ├── Receives cartItems array and setCartItems function
       ├── Shows cart items (if any)
       │     └── For each item:
       │           ├── Product image
       │           ├── Product name (link to details)
       │           ├── Price
       │           ├── Quantity controls (+/-)
       │           └── Delete button (trash icon)
       │
       ▼
[3] User adjusts quantity (clicks + or -)
       ├── increaseQty(item) or decreaseQty(item) runs
       ├── Creates updatedItems array
       └── setCartItems(updatedItems) ← updates cart
       │
       ▼
[4] User removes item (clicks trash icon)
       ├── removeItem(item) runs
       ├── .filter() removes item from array
       └── setCartItems(filtered)
       │
       ▼
[5] Order Summary updates in real-time
       ├── Subtotal: total units
       └── Est. total: sum of (price × quantity) for all items
```

---

## Flow 5: Placing an Order

```
User clicks "Place Order" button
       │
       ▼
[1] placeOrderHandler() runs (Cart.js line 42)
       │
       ▼
[2] Fetch POST request to backend
       ├── URL: http://localhost:8000/api/v1/order
       ├── Method: POST
       ├── Headers: { 'Content-Type': 'application/json' }
       └── Body: JSON.stringify(cartItems)
             │
             ▼
[3] [BACKEND] Express receives POST /api/v1/order
       ├── app.js routes to /api/v1/ → routes/order.js
       ├── router.route('/order').post(createOrder)
       └── orderControllers.createOrder() runs
             │
             ▼
[4] Backend processes order:
       ├── Reads cartItems from req.body
       ├── Calculates total amount using .reduce()
       ├── Sets status = 'pending'
       ├── orderModel.create({cartItems, amount, status})
       │     └── MongoDB: new order saved to "orders" collection
       │
       ├── For each item in cart:
       │     ├── productModel.findById(item.product._id)
       │     ├── product.stock = product.stock - item.qty
       │     └── product.save()
       │     └── MongoDB: product stock updated
       │
       └── res.json({ success: true, message: 'Order placed!', order })
             │
             ▼
[5] Frontend receives response
       ├── res.ok = true (200 OK)
       ├── setCartItems([]) ← Empties the cart
       └── setComplete(true) ← Shows completion message
       │
       ▼
[6] User sees:
       ┌─────────────────────┐
       │  Order Completed    │
       │  Your Order has     │
       │  been placed!       │
       └─────────────────────┘
       
       Header cart count: 0
```

---

## Complete Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   REACT APPLICATION                          │   │
│  │                                                               │   │
│  │  index.js (Entry Point)                                      │   │
│  │     └── <App />                                              │   │
│  │           ├── useState() → cart management                    │   │
│  │           ├── <Header /> (Nav bar + Search)                   │   │
│  │           ├── <Routes>                                       │   │
│  │           │     ├── "/" → <Home /> (product list)            │   │
│  │           │     ├── "/search" → <Home /> (filtered)          │   │
│  │           │     ├── "/product/:id" → <ProductDetail />      │   │
│  │           │     └── "/cart" → <Cart />                      │   │
│  │           └── <Footer />                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│              fetch() API calls (HTTP Requests)                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
              ╔════════════════╧══════════════════╗
              ║         NETWORK (HTTP)             ║
              ║    http://localhost:8000/api/v1    ║
              ╚════════════════╤══════════════════╝
                               │
┌──────────────────────────────┴──────────────────────────────────────┐
│                       BACKEND SERVER                                │
│                                                                     │
│  app.js (Main Server)                                              │
│    ├── dotenv.config() → loads config.env                          │
│    ├── connectDatabase() → connects to MongoDB                     │
│    ├── Middleware: cors(), express.json(), express.static()        │
│    └── Routes:                                                     │
│          ├── /api/v1/products  GET   → productControllers.js      │
│          ├── /api/v1/product/:id GET → productControllers.js      │
│          └── /api/v1/order     POST  → orderControllers.js        │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  controllers/                                                │   │
│  │    ├── productControllers.js                                 │   │
│  │    │     ├── getProducts() → productModel.find()             │   │
│  │    │     └── getSingleProduct() → productModel.findById()    │   │
│  │    └── orderControllers.js                                   │   │
│  │          └── createOrder() → orderModel.create() + update    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  models/                                                    │   │
│  │    ├── productModel.js (Schema: name, price, stock, etc.)   │   │
│  │    └── orderModel.js (Schema: cartItems, amount, status)    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
└──────────────────────────────┴──────────────────────────────────────┘
                               │
┌──────────────────────────────┴──────────────────────────────────────┐
│                        MONGODB DATABASE                             │
│                                                                     │
│  Database: mini-ecommerce                                          │
│    ├── Collection: "products"                                       │
│    │     └── Documents: 10 products with name, price, stock, etc.   │
│    └── Collection: "orders"                                         │
│          └── Documents: Orders with cartItems, amount, status       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Summary

```
  REACT                        EXPRESS                    MONGODB
  ─────                        ───────                    ───────
  User sees UI                 Receives HTTP req          Stores data
       │                             │                        │
  Component renders                 │                        │
       │                             │                        │
  useEffect fires                   │                        │
       │                             │                        │
  fetch() call ─────────►     Route matched                  │
       │                             │                        │
       │                    Controller runs                   │
       │                             │                        │
       │                    Model queries ─────────►    Finds/saves
       │                             │                        │
       │                    Response JSON ◄──────────   Returns data
       │                             │
  setState updates ◄─────────  Response received
       │
  Component re-renders
       │
  User sees updated data
```

---

## HTTP Request/Response Examples

### GET /api/v1/products (All Products)
```
REQUEST:
  GET http://localhost:8000/api/v1/products

RESPONSE:
  Status: 200 OK
  Body: {
    "success": true,
    "products": [
      { "_id": "...", "name": "OPPO F21S Pro 5G", "price": "245.7", ... },
      { "_id": "...", "name": "Samsung Galaxy S24 Ultra", ... },
      ...
    ],
    "message": "Get products working!"
  }
```

### GET /api/v1/products?keyword=phone (Search)
```
REQUEST:
  GET http://localhost:8000/api/v1/products?keyword=phone

RESPONSE:
  Status: 200 OK
  Body: {
    "success": true,
    "products": [ { only products with "phone" in name } ],
    "message": "Get products working!"
  }
```

### GET /api/v1/product/abc123 (Single Product)
```
REQUEST:
  GET http://localhost:8000/api/v1/product/abc123

RESPONSE:
  Status: 200 OK
  Body: {
    "success": true,
    "message": "Get single product working!",
    "product": {
      "_id": "abc123",
      "name": "OPPO F21S Pro 5G",
      "price": "245.7",
      ...
    }
  }
```

### POST /api/v1/order (Place Order)
```
REQUEST:
  POST http://localhost:8000/api/v1/order
  Headers: { "Content-Type": "application/json" }
  Body: [
    {
      "product": {
        "_id": "abc123",
        "name": "OPPO F21S Pro 5G",
        "price": "245.7",
        "images": [{"image": "/images/products/1.jpg"}]
      },
      "qty": 2
    }
  ]

RESPONSE:
  Status: 200 OK
  Body: {
    "success": true,
    "message": "Order placed successfully!",
    "order": {
      "_id": "order123",
      "cartItems": [...],
      "amount": "491.40",
      "status": "pending",
      "createdAt": "2024-06-17T..."
    }
  }
```
