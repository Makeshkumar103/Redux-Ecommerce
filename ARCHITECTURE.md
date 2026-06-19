# JVLcart Architecture

## System Overview

```mermaid
graph TB
    subgraph Frontend ["Frontend - React 19 (port 3000)"]
        A[index.js] --> B[Provider store]
        B --> C[App.js]
        C --> D[Header.js]
        C --> E[Footer.js]
        C --> F[Home.js]
        C --> G[ProductDetail.js]
        C --> H[Cart.js]
        D --> I[Search.js]
        F --> J[ProductCard.js]
        subgraph Redux Store
            K[store.js] --> L[cartSlice.js]
            K --> M[productSlice.js]
        end
        F --> M
        G --> M
        H --> L
    end

    subgraph Backend ["Backend - Express 5 (port 8000)"]
        N[app.js] --> O[routes/product.js]
        N --> P[routes/order.js]
        O --> Q[controllers/productControllers.js]
        P --> R[controllers/orderControllers.js]
        Q --> S[models/productModel.js]
        R --> T[models/orderModel.js]
        R --> S
        N --> U[config/connectDatabase.js]
    end

    subgraph Database ["MongoDB"]
        V[(Redux-Ecommerce)]
    end

    Frontend -- HTTP fetch --> Backend
    U --> V
    S --> V
    T --> V
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser as React SPA
    participant Redux as Redux Store
    participant API as Express API
    participant DB as MongoDB

    User->>Browser: Open / (Home)
    Browser->>Redux: dispatch(fetchProducts)
    Redux->>API: GET /api/v1/products
    API->>DB: Product.find({})
    DB-->>API: products[]
    API-->>Redux: JSON { products }
    Redux-->>Browser: re-render ProductCards

    User->>Browser: Click product link
    Browser->>Redux: dispatch(fetchProductDetails(id))
    Redux->>API: GET /api/v1/product/:id
    API->>DB: Product.findById(id)
    DB-->>API: product
    API-->>Redux: JSON { product }
    Redux-->>Browser: re-render ProductDetail

    User->>Browser: Add to Cart
    Browser->>Redux: dispatch(addToCart({product, qty}))
    Redux-->>Browser: re-render (badge + cart)

    User->>Browser: Place Order
    Browser->>API: POST /api/v1/order (cartItems from Redux)
    API->>DB: Order.create({cartItems, amount, status})
    API->>DB: Product.findByIdAndUpdate(stock - qty)
    DB-->>API: order
    API-->>Browser: JSON { success: true }
    Browser->>Redux: dispatch(clearCart())
    Browser-->>User: "Order Completed"

    User->>Browser: Search keyword
    Browser->>Redux: dispatch(fetchProducts(keyword))
    Redux->>API: GET /api/v1/products?keyword=phone
    API->>DB: Product.find({name: /phone/i})
    DB-->>API: filtered products
    API-->>Redux: JSON { products }
    Redux-->>Browser: re-render filtered ProductCards
```

## File Dependency Graph

```
frontend/public/index.html
  └── (loads React bundle via CRA)

frontend/src/index.js
  ├── React
  ├── ReactDOM
  ├── ./index.css
  ├── ./store/store              → Redux Provider wrapper
  │     ├── @reduxjs/toolkit (configureStore)
  │     ├── ./cartSlice          → cartSlice.reducer
  │     └── ./productSlice       → productSlice.reducer
  └── ./App

frontend/src/App.js
  ├── ./App.css                          (styling)
  ├── ./components/Header                (nav bar, reads Redux cart)
  │     ├── ./Search                     (keyword input)
  │     │     ├── react (useState)
  │     │     └── react-router-dom (useNavigate)
  │     ├── react-redux (useSelector)
  │     └── react-router-dom (Link)
  ├── ./components/Footer                (static footer)
  ├── ./pages/Home                       (product listing from Redux)
  │     ├── react (useEffect)
  │     ├── react-router-dom (useSearchParams)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/productSlice (fetchProducts async thunk)
  │     └── ../components/ProductCard    (card UI)
  │           └── react-router-dom (Link)
  ├── ./pages/ProductDetail              (product details + add to cart)
  │     ├── react (useEffect, useState)
  │     ├── react-router-dom (useParams)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/productSlice (fetchProductDetails async thunk)
  │     ├── ../store/cartSlice (addToCart action)
  │     └── react-toastify (toast)
  ├── ./pages/Cart                       (cart management + order)
  │     ├── react (useState)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/cartSlice (increaseQty, decreaseQty, removeFromCart, clearCart)
  │     └── react-router-dom (Link)
  ├── react-router-dom (BrowserRouter, Routes, Route)
  └── react-toastify (ToastContainer, CSS)

backend/app.js (entry point)
  ├── dotenv         →  backend/.env
  ├── express
  ├── cors
  ├── ./config/connectDatabase
  │     └── mongoose  →  backend/.env (DB_URL)
  ├── ./routes/product
  │     └── ../controllers/productControllers
  │           └── ../models/productModel → mongoose
  └── ./routes/order
        └── ../controllers/orderControllers
              ├── ../models/orderModel  → mongoose
              └── ../models/productModel → mongoose
```

## Route Map

| Method | URL | Component / Controller | Description |
|--------|-----|----------------------|-------------|
| `GET` | `/` | `Home.js` | Product listing page (Redux) |
| `GET` | `/search?keyword=...` | `Home.js` | Filtered product listing (Redux) |
| `GET` | `/product/:id` | `ProductDetail.js` | Single product details (Redux) |
| `GET` | `/cart` | `Cart.js` | Shopping cart (Redux) |
| `GET` | `/api/v1/products` | `getProducts` | API: all/filtered products |
| `GET` | `/api/v1/product/:id` | `getSingleProduct` | API: single product |
| `POST` | `/api/v1/order` | `createOrder` | API: place order |

## State Management (Redux Toolkit)

```
store.js (configureStore)
  ├── cart: cartSlice.reducer
  │     └── initialState: { items: [] }
  │     └── reducers: addToCart, increaseQty, decreaseQty, removeFromCart, clearCart
  │     └── consumed by: Header.js (badge), ProductDetail.js (addToCart), Cart.js (display/modify/order)
  │
  └── products: productSlice.reducer
        └── initialState: { products: [], product: null, loading: false, error: null }
        └── async thunks: fetchProducts, fetchProductDetails
        └── consumed by: Home.js (product list), ProductDetail.js (single product)

index.js
  └── <Provider store={store}> wraps <App />
```

All components access state via `useSelector()` and dispatch actions via `useDispatch()` — no prop drilling.

## Component Tree

```mermaid
graph TB
    Provider[Provider store]
    Provider --> App[App.js - BrowserRouter]
    App --> Toast[ToastContainer]
    App --> Header[Header.js]
    Header --> Search[Search.js]
    App --> Routes
    Routes --> Home[Home.js /]
    Home --> PC[ProductCard.js]
    Routes --> PD[ProductDetail.js /product/:id]
    Routes --> Cart[Cart.js /cart]
    App --> Footer[Footer.js]

    subgraph Redux [Redux Store]
        Store[store.js] --> CS[cartSlice]
        Store --> PS[productSlice]
    end

    Home -.->|useSelector useDispatch| PS
    PD -.->|useSelector useDispatch| PS
    PD -.->|useDispatch| CS
    Cart -.->|useSelector useDispatch| CS
    Header -.->|useSelector| CS
```

## Key Configuration

| File | Key Settings |
|------|-------------|
| `backend/.env` | PORT=8000, NODE_ENV=Development, DB_URL=mongodb://localhost:27017/Redux-Ecommerce |
| `frontend/.env` | REACT_APP_API_URL=http://localhost:8000/api/v1 |
| `backend/package.json` | Express 5, Mongoose 9, Cors, Dotenv, Nodemon (dev) |
| `frontend/package.json` | React 19, React Router DOM 7, Redux Toolkit 2, React Redux 9, React Toastify 11 |
