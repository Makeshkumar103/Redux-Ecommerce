# FILE: `frontend/src/App.js`

## Purpose of this File

This is the **main component** of the frontend application.
It acts like the **skeleton** of the entire website.
It sets up:
- The navigation bar (Header)
- Page routing (which page to show based on URL)
- The shopping cart state (shared across all pages)
- Popup notifications (Toast)
- The footer

---

## How It Connects to Other Files

```
  src/index.js
       │
       │  Renders <App />
       ▼
  src/App.js  ◄── WE ARE HERE
       │
       │  Manages cart state (useState)
       │  Sets up routes (React Router)
       │
       ├──► Header.js  (receives cartItems count)
       ├──► Home.js    (no cart props - just displays products)
       ├──► ProductDetail.js  (receives cartItems, setCartItems)
       ├──► Cart.js    (receives cartItems, setCartItems)
       ├──► Search.js  (inside Header)
       └──► Footer.js
```

---

## ASCII Connection Diagram

```
                               ┌─────────────────┐
                               │    index.js      │
                               └────────┬────────┘
                                        │
                                        ▼
                               ┌─────────────────┐
                        ┌──────│    App.js       │──────┐
                        │      └─────────────────┘      │
                        │                               │
              ┌─────────▼─────────┐           ┌─────────▼─────────┐
              │    useState()     │           │   React Router    │
              │   cartItems = []  │           │  (Routes/Route)   │
              └───────────────────┘           └───────────────────┘
                                                       │
                         ┌─────────────────────────────┼─────────────────────────────┐
                         │               │             │              │              │
                   ┌─────▼────┐   ┌──────▼─────┐ ┌─────▼──────┐ ┌────▼────┐   ┌─────▼─────┐
                   │ Toast    │   │  Header    │ │  Routes    │ │ Footer  │   │ (closed)  │
                   │Container │   │(nav bar)   │ │            │ │         │   │ProductDet │
                   └──────────┘   └──────┬─────┘ └──────┬─────┘ └─────────┘   └───────────┘
                                         │              │
                                   ┌─────▼─────┐       ├───────────────────┐
                                   │  Search   │       │                   │
                                   └───────────┘  ┌────▼────┐      ┌──────▼──────┐
                                                  │  Home   │      │  Cart       │
                                                  └─────────┘      └─────────────┘
                                                           │
                                                    ┌──────▼──────┐
                                                    │ProductDetail│
                                                    └─────────────┘
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
import './App.css';
```

**What it does:**
Imports the CSS styles for the application.

**What if we remove this line?**
All the custom styles in `App.css` would not apply. The website would look unstyled and messy.

---

### Line 2

```javascript
import Header from './components/Header';
```

**What it does:**
Imports the Header component (navigation bar).

---

### Line 3

```javascript
import Footer from './components/Footer';
```

**What it does:**
Imports the Footer component.

---

### Line 4

```javascript
import Home from './pages/Home';
```

**What it does:**
Imports the Home page component.

---

### Line 5

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```

**What it does:**
Imports React Router components for navigation.

**Breaking it down:**
- `{ BrowserRouter as Router }` = Import BrowserRouter and rename it to Router.
  - `BrowserRouter` = A component that enables routing in React apps. It listens to URL changes.
  - `as Router` = A shorter alias.
- `Routes` = A container for all Route components (replaces `Switch` in older React Router versions).
- `Route` = Defines a single URL path and what component to render.

**Real-world example:**
- `BrowserRouter` = Like a GPS system that's always watching the current address (URL).
- `Routes` = Like a list of destinations.
- `Route` = A single destination on that list: "When at `/cart`, show the Cart page."

---

### Line 6

```javascript
import ProductDetail from './pages/ProductDetail';
```

**What it does:**
Imports the ProductDetail page component.

---

### Line 7

```javascript
import Cart from './pages/Cart';
```

**What it does:**
Imports the Cart page component.

---

### Line 9

```javascript
import { useState } from 'react';
```

**What it does:**
Imports the `useState` hook from React.

**Keyword explanation:**
- `useState` = A React **Hook** that lets components remember data.
- **Hook** = A special function that lets you "hook into" React features.
- `useState` specifically manages **state** (data that can change over time).

**What if we remove this line?**
Line 15 (`useState([])`) would fail because `useState` is undefined.

---

### Line 10

```javascript
import { ToastContainer } from 'react-toastify';
```

**What it does:**
Imports the ToastContainer component from react-toastify.

**What is react-toastify?**
A library for showing pop-up notification messages (toasts).

---

### Line 11

```javascript
import 'react-toastify/dist/ReactToastify.css'
```

**What it does:**
Imports the CSS styles for the toast notifications.

---

### Lines 13-35

```javascript
function App() {

  const [cartItems, setCartItems] = useState([]); 

  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer theme='dark' position='top-center' />
          <Header cartItems ={cartItems}/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
          <Footer />    
        </div>
      </Router>
    </div>
  );
}

export default App;
```

---

### Line 13 - Function declaration:

```javascript
function App() {
```
- Defines a React component called `App`.
- Components are reusable pieces of UI. Like building blocks.

---

### Line 15 - Cart State:

```javascript
  const [cartItems, setCartItems] = useState([]); 
```

**What it does:**
Creates a **state variable** called `cartItems` and a function to update it called `setCartItems`.

**Breaking it down:**
- `useState([])` = Initialize state with an empty array `[]`.
- `cartItems` = The current value of the cart (initially empty).
- `setCartItems` = The function used to update `cartItems`.

**Why is state important?**
When `setCartItems` is called to change the cart, React automatically re-renders all components that use `cartItems`. So the Header updates the cart count, and the Cart page updates the items list.

**Real-world example:**
Think of state as a **whiteboard**.
- Write items on the board (`cartItems`).
- When you buy something, you add it (using `setCartItems`).
- Everyone in the room can see the updated board because React re-renders.

**Why is cart state here (in App)?**
Because multiple components need access to it:
- **Header** needs to show the cart count.
- **ProductDetail** needs to add items to the cart.
- **Cart** needs to display and modify cart items.

By putting state in App (the common parent), all child components can access it. This is called **lifting state up**.

---

### Lines 17-33 - The Return (What to render):

```javascript
  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer theme='dark' position='top-center' />
          <Header cartItems ={cartItems}/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
          <Footer />    
        </div>
      </Router>
    </div>
  );
```

**Line 18 - `<div className="App">`:**
Wrapper div with the class "App".

**Line 19 - `<Router>`:**
The BrowserRouter component. Wraps everything that needs routing.

**Line 21 - `<ToastContainer>`:**
Shows toast notifications.
- `theme='dark'` = Dark color scheme.
- `position='top-center'` = Notifications appear at the top center of the screen.

**Line 22 - `<Header cartItems={cartItems}>`:**
Renders the Header component and passes `cartItems` as a **prop**.
- `cartItems` = The current cart array.
- Header uses `cartItems.length` to show the item count.

**Lines 23-28 - `<Routes>` and `<Route>` components:**

| Route Path | Component | Props |
|---|---|---|
| `/` | `<Home />` | None |
| `/search` | `<Home />` | None |
| `/product/:id` | `<ProductDetail />` | `cartItems`, `setCartItems` |
| `/cart` | `<Cart />` | `cartItems`, `setCartItems` |

**Line 24 - `<Route path='/' element={<Home />} />`:**
- `path='/'` = When URL is exactly `http://localhost:3000/`.
- `element={<Home />}` = Show the Home component.

**Line 25 - `<Route path='/search' element={<Home />} />`:**
- When URL is `/search?keyword=phone`.
- Still shows the Home component (which reads search params to filter products).

**Line 26 - `<Route path='/product/:id' ...>`:**
- `path='/product/:id'` = Matches URLs like `/product/abc123`.
- `:id` is a URL parameter captured by `useParams()` in ProductDetail.
- Passes `cartItems` and `setCartItems` as props.

**Line 27 - `<Route path='/cart' ...>`:**
- Shows the Cart component with cart state as props.

**Line 29 - `<Footer />`:**
Renders the Footer component.

---

### Line 37

```javascript
export default App;
```

**What it does:**
Exports the App component so `index.js` can import and render it.

---

## Data Flow in App.js

```
                    ┌─────────────────────────────────┐
                    │        App.js (Parent)           │
                    │                                 │
                    │  cartItems = useState([])        │
                    │  setCartItems = update function  │
                    └──────┬────────────────────┬──────┘
                           │                    │
              Props go DOWN                    │
           ┌──────────────────┐                │
           ▼                  ▼                │
     ┌──────────┐     ┌──────────────┐         │
     │  Header  │     │  Routes      │         │
     │          │     │              │         │
     │count =   │     │  /product/:id──────────┤
     │length    │     │  /cart ─────────────────┤
     └──────────┘     └──────────────┘         │
                                               │
                                    setCartItems passed as prop
                                    (so children can UPDATE the cart)
```

---

## Summary

`App.js` is the **main hub** of the frontend. It:
1. Imports all major components (Header, Footer, Home, ProductDetail, Cart)
2. Creates the shared cart state using `useState`
3. Sets up React Router for page navigation
4. Renders the Header (with cart count), current page (based on URL), and Footer
5. Passes cart state to components that need it

---

## Knowledge Check

### Q1: Why is the cart state (`useState([])`) in App.js and not in Cart.js?

**Answer:** Because multiple components need access to the cart:
- **Header** needs to display the cart count.
- **ProductDetail** needs to add items.
- **Cart** needs to display and modify items.

If the cart state was in Cart.js, Header.js couldn't access it. By putting it in App.js (the common parent), all children can receive it as props. This is called **lifting state up**.

---

### Q2: What does `cartItems={cartItems}` mean?

**Answer:** It's passing the `cartItems` state as a **prop** (property) named `cartItems` to the child component. The child can access it via its props (e.g., `props.cartItems` or destructured as `{ cartItems }`).

---

### Q3: What would happen if a user visits `/product/abc123`?

**Answer:** React Router matches the route `/product/:id` where `:id` = `abc123`. The `<ProductDetail />` component is rendered. Inside ProductDetail, `useParams()` extracts `id = "abc123"` and uses it to fetch the product from the API.

---

### Q4: Why are there two routes (`/` and `/search`) that both show Home?

**Answer:** The Home page component handles both cases:
- `/` = Show all products (no search filter).
- `/search?keyword=phone` = Show only matching products.

The `Home` component uses `useSearchParams()` to check if there's a search keyword. This way, one component handles both scenarios.

---

### Q5: What is the role of `setCartItems` being passed to child components?

**Answer:** `setCartItems` is the **only** way to update the cart state. By passing it to ProductDetail and Cart, those components can add, remove, or modify cart items. Without it, children could read the cart but not change it.

---

### Common Beginner Mistakes

1. **Putting `useState` outside the component**: `useState` must be called inside a React component function, not outside or inside loops/conditions.

2. **Modifying state directly**: Writing `cartItems.push(newItem)` instead of `setCartItems([...cartItems, newItem])`. State should never be modified directly - always use the update function.

3. **Forgetting to pass props**: If you forget `cartItems={cartItems}` on `<Header />`, Header shows 0 items even when the cart has items.

4. **Overcomplicating state management**: For a simple app like this, `useState` is perfect. Beginners sometimes jump to Redux unnecessarily.

5. **Not wrapping routes in `<Router>`**: All `<Route>` components must be inside a `<Router>` component, or they won't work.
