# AGENTS.md — Redux-Ecommerce

## Two packages, each with own `npm` scripts

| Directory | What | Entry | Dev command |
|-----------|------|-------|-------------|
| `backend/` | Express 5 API (CommonJS) | `backend/app.js` | `cd backend && npm start` (nodemon, auto-restart) |
| `frontend/` | React 19 SPA (CRA, no TS) | `frontend/src/index.js` | `cd frontend && npm start` (port 3000) |

## Essential commands

```sh
# Backend
cd backend && npm start          # dev server on :8000
cd backend && npm run seed       # populate DB from data/products.json

# Frontend
cd frontend && npm start         # dev server on :3000
cd frontend && npm test          # CRA Jest + Testing Library (watch mode)
cd frontend && npm run build     # production build
```

## Architecture facts an agent will miss

- **State is Redux, not React `useState`** — ARCHITECTURE.md is stale; the app uses `@reduxjs/toolkit` with three slices:
  - `frontend/src/store/authSlice.js` — `registerUser`, `loginUser`, `fetchProfile` (async thunks); `logout`, `clearError` (reducers); state: `{ token, user, status, error }`
  - `frontend/src/store/cartSlice.js` — `addToCart`, `increaseQty`, `decreaseQty`, `removeFromCart`, `clearCart`
  - `frontend/src/store/productSlice.js` — `fetchProducts` (GET /products), `fetchProductDetails` (GET /product/:id) — both async thunks
- **Backend API** — routes mounted under `/api/v1/`:
  - `GET /api/v1/products?keyword=...` — list / search
  - `GET /api/v1/product/:id` — single product
  - `POST /api/v1/order` — place order (body: raw array of `{product, qty}`)
  - `POST /api/v1/auth/register` — register user
  - `POST /api/v1/auth/login` — login, returns JWT
  - `GET /api/v1/auth/profile` — get profile (requires JWT via `protect` middleware)
- **Frontend routes** (React Router 7):
  - `/` — Home (product listing, requires auth)
  - `/search?keyword=...` — same Home component with filtered results
  - `/product/:id` — ProductDetail (requires auth)
  - `/cart` — Cart (requires auth)
  - `/login` — Login page
  - `/register` — Register page
- **PrivateRoute guard** — `frontend/src/components/PrivateRoute.js` wraps all non-auth routes; redirects to `/login` if no JWT token in Redux store
- **Provider wrapping** — `<Provider store={store}>` in `index.js`, not in `App.js`

## Setup gotchas

- **MongoDB must be running locally** at `mongodb://localhost:27017/` — the backend won't start without it
- **`.env` files are gitignored** — replicating the repo needs manual `.env` creation:
  - `backend/.env`: `PORT=8000`, `NODE_ENV=Development`, `DB_URL=mongodb://localhost:27017/Redux-Ecommerce`, `JWT_SECRET=your-secret-key`
  - `frontend/.env`: `REACT_APP_API_URL=http://localhost:8000/api/v1`
  - **Gotcha:** `frontend/.gitignore` does NOT list `.env` (only `.env.local` variants), so `frontend/.env` would be committed if tracked
- **Image path bug** — `backend/data/products.json` references `/images/product/X.jpg` (singular) but files live in `frontend/public/images/products/X.jpg` (plural) — images will 404
- **No linter/formatter/typecheck config** beyond CRA defaults — no `eslintrc`, `prettier`, or `tsconfig`
- **Backend has zero tests** — `npm test` is a placeholder

## References

- `ARCHITECTURE.md` — useful overview but stale on state management (claims `useState`, actually Redux) and DB name (says `mini-ecommerce`, runs as `Redux-Ecommerce`)
- `backend/seeder.js` — connects directly to MongoDB with `deleteMany` then `insertMany`
