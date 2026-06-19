# JVLcart Architecture

## System Overview

```mermaid
graph TB
    subgraph Frontend ["Frontend - React 19 (port 3000)"]
        A[index.js] --> B[Provider store]
        B --> C[App.js]
        C --> D[Header.js]
        C --> E[Footer.js]
        C --> F[PrivateRoute.js]
        F --> G[Home.js]
        F --> H[ProductDetail.js]
        F --> I[Cart.js]
        C --> J[Login.js]
        C --> K[Register.js]
        D --> L[Search.js]
        G --> M[ProductCard.js]
        subgraph Redux Store
            N[store.js] --> O[authSlice.js]
            N --> P[cartSlice.js]
            N --> Q[productSlice.js]
        end
        G --> Q
        H --> Q
        I --> P
        J --> O
        K --> O
        D --> O
    end

    subgraph Backend ["Backend - Express 5 (port 8000)"]
        R[app.js] --> S[routes/product.js]
        R --> T[routes/order.js]
        R --> U[routes/auth.js]
        S --> V[controllers/productControllers.js]
        T --> W[controllers/orderControllers.js]
        U --> X[controllers/authController.js]
        V --> Y[models/productModel.js]
        W --> Z[models/orderModel.js]
        W --> Y
        X --> AA[models/userModel.js]
        X --> AB[middleware/auth.js]
        AB --> AA
        R --> AC[config/connectDatabase.js]
        R --> AD[middleware/auth.js]
    end

    subgraph Database ["MongoDB"]
        AE[(Redux-Ecommerce)]
    end

    Frontend -- HTTP fetch --> Backend
    AC --> AE
    Y --> AE
    Z --> AE
    AA --> AE
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser as React SPA
    participant Redux as Redux Store
    participant API as Express API
    participant DB as MongoDB

    User->>Browser: Open /login
    Browser->>API: POST /api/v1/auth/login (email, password)
    API->>DB: User.findOne({email})
    DB-->>API: user (with hashed password)
    API->>API: bcrypt.compare + JWT.sign
    API-->>Browser: { token, user }
    Browser->>Redux: dispatch(loginUser.fulfilled)
    Redux-->>Browser: store token in localStorage + state

    User->>Browser: Open / (Home)
    Browser->>API: GET /api/v1/products (JWT in header)
    API->>API: JWT.verify (protect middleware)
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
    API->>DB: Product.findById(id) + product.save() (stock -= qty)
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
  │     ├── ./authSlice          → authSlice.reducer
  │     ├── ./cartSlice          → cartSlice.reducer
  │     └── ./productSlice       → productSlice.reducer
  └── ./App

frontend/src/App.js
  ├── ./App.css                          (styling)
  ├── ./components/PrivateRoute          (route guard — checks JWT token)
  │     ├── react-redux (useSelector)
  │     └── react-router-dom (Navigate)
  ├── ./components/Header                (nav bar, reads Redux cart + logout)
  │     ├── ./Search                     (keyword input)
  │     │     ├── react (useState)
  │     │     └── react-router-dom (useNavigate)
  │     ├── react-redux (useSelector, useDispatch)
  │     ├── ../store/authSlice (logout)
  │     └── react-router-dom (Link)
  ├── ./components/Footer                (static footer)
  ├── ./pages/Home                       (product listing from Redux, requires auth)
  │     ├── react (useEffect)
  │     ├── react-router-dom (useSearchParams)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/productSlice (fetchProducts async thunk)
  │     └── ../components/ProductCard    (card UI)
  │           └── react-router-dom (Link)
  ├── ./pages/ProductDetail              (product details + add to cart, requires auth)
  │     ├── react (useEffect, useState)
  │     ├── react-router-dom (useParams)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/productSlice (fetchProductDetails async thunk)
  │     ├── ../store/cartSlice (addToCart action)
  │     └── react-toastify (toast)
  ├── ./pages/Cart                       (cart management + order, requires auth)
  │     ├── react (useState)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/cartSlice (increaseQty, decreaseQty, removeFromCart, clearCart)
  │     └── react-router-dom (Link)
  ├── ./pages/Login                      (login form)
  │     ├── react (useEffect, useState)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/authSlice (loginUser async thunk, clearError)
  │     └── react-router-dom (useNavigate)
  ├── ./pages/Register                   (registration form)
  │     ├── react (useEffect, useState)
  │     ├── react-redux (useDispatch, useSelector)
  │     ├── ../store/authSlice (registerUser async thunk, clearError)
  │     └── react-router-dom (useNavigate)
  ├── react-router-dom (BrowserRouter, Routes, Route)
  └── react-toastify (ToastContainer, CSS)

backend/app.js (entry point)
  ├── dotenv         →  backend/.env
  ├── express
  ├── cors
  ├── express.json()
  ├── express.static(frontend/public)
  ├── ./config/connectDatabase
  │     └── mongoose  →  backend/.env (DB_URL)
  ├── ./routes/product
  │     └── ../controllers/productControllers
  │           └── ../models/productModel → mongoose
  ├── ./routes/order
  │     └── ../controllers/orderControllers
  │           ├── ../models/orderModel  → mongoose
  │           └── ../models/productModel → mongoose
  └── ./routes/auth
        └── ../controllers/authController
              ├── ../models/userModel → mongoose (bcrypt)
              └── ../middleware/auth
                    └── jsonwebtoken (JWT.verify)

```

## Route Map

| Method | URL | Component / Controller | Description |
|--------|-----|----------------------|-------------|
| `GET` | `/` | `Home.js` (via PrivateRoute) | Product listing page (Redux) |
| `GET` | `/search?keyword=...` | `Home.js` (via PrivateRoute) | Filtered product listing (Redux) |
| `GET` | `/product/:id` | `ProductDetail.js` (via PrivateRoute) | Single product details (Redux) |
| `GET` | `/cart` | `Cart.js` (via PrivateRoute) | Shopping cart (Redux) |
| `GET` | `/login` | `Login.js` | Login page |
| `GET` | `/register` | `Register.js` | Register page |
| `GET` | `/api/v1/products` | `getProducts` | API: all/filtered products |
| `GET` | `/api/v1/product/:id` | `getSingleProduct` | API: single product |
| `POST` | `/api/v1/order` | `createOrder` | API: place order |
| `POST` | `/api/v1/auth/register` | `register` | API: register user |
| `POST` | `/api/v1/auth/login` | `login` | API: login, returns JWT |
| `GET` | `/api/v1/auth/profile` | `getProfile` (protect) | API: get user profile |

## State Management (Redux Toolkit)

```
store.js (configureStore)
  ├── auth: authSlice.reducer
  │     └── initialState: { token: localStorage.getItem('token'), user: null, status: 'idle', error: null }
  │     └── async thunks: registerUser, loginUser, fetchProfile
  │     └── reducers: logout, clearError
  │     └── consumed by: Login.js, Register.js, Header.js (logout), PrivateRoute.js (token check)
  │
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
    Routes --> PR[PrivateRoute]
    PR --> Home[Home.js /]
    Home --> PC[ProductCard.js]
    PR --> PD[ProductDetail.js /product/:id]
    PR --> Cart[Cart.js /cart]
    Routes --> Login[Login.js /login]
    Routes --> Register[Register.js /register]
    App --> Footer[Footer.js]

    subgraph Redux [Redux Store]
        Store[store.js] --> AS[authSlice]
        Store --> CS[cartSlice]
        Store --> PS[productSlice]
    end

    Home -.->|useSelector useDispatch| PS
    PD -.->|useSelector useDispatch| PS
    PD -.->|useDispatch| CS
    Cart -.->|useSelector useDispatch| CS
    Header -.->|useSelector useDispatch| AS
    Header -.->|useSelector| CS
    Login -.->|useSelector useDispatch| AS
    Register -.->|useSelector useDispatch| AS
    PR -.->|useSelector| AS
```

## Key Configuration

| File | Key Settings |
|------|-------------|
| `backend/.env` | PORT=8000, NODE_ENV=Development, DB_URL=mongodb://localhost:27017/Redux-Ecommerce, JWT_SECRET=your-secret-key |
| `frontend/.env` | REACT_APP_API_URL=http://localhost:8000/api/v1 |
| `backend/package.json` | Express 5, Mongoose 9, Cors, Dotenv, Bcryptjs 3, JsonWebToken 9, Nodemon (dev) |
| `frontend/package.json` | React 19, React Router DOM 7, Redux Toolkit 2, React Redux 9, React Toastify 11, Axios |
