# JVLcart - Redux Ecommerce

Full-stack e-commerce app built with **React 19** (frontend) and **Express 5** (backend), powered by **MongoDB** and **Redux Toolkit** for state management.

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally on `mongodb://localhost:27017/`

### Backend

```sh
cd backend
npm install
npm run seed      # populate DB with 10 products
npm start         # dev server on :8000 (nodemon)
```

### Frontend

```sh
cd frontend
npm install
npm start         # dev server on :3000
```

## Environment

| File | Key Variables |
|------|-------------|
| `backend/.env` | `PORT=8000`, `NODE_ENV=Development`, `DB_URL=mongodb://localhost:27017/Redux-Ecommerce`, `JWT_SECRET=<your-secret>` |
| `frontend/.env` | `REACT_APP_API_URL=http://localhost:8000/api/v1` |

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, React Router 7, Redux Toolkit, React Redux 9, React Toastify 11, Axios |
| Backend  | Express 5, Mongoose 9, CORS, Dotenv, Bcryptjs, JsonWebToken |
| Database | MongoDB |
| Dev tools| Nodemon, CRA |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/products?keyword=...` | List / search products |
| `GET` | `/api/v1/product/:id` | Single product details |
| `POST` | `/api/v1/order` | Place order (body: `[{product, qty}]`) |
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login / get JWT token |
| `GET` | `/api/v1/auth/profile` | Get logged-in user profile |

## Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Product listing (requires auth) |
| `/search?keyword=...` | Home | Filtered products (requires auth) |
| `/product/:id` | ProductDetail | Single product (requires auth) |
| `/cart` | Cart | Shopping cart + order (requires auth) |
| `/login` | Login | User login |
| `/register` | Register | User registration |
| `*` (catch-all) | NotFound | 404 page (no auth) |
| `/unauthpage` | UnauthPage | Access denied page (no auth) |

> **Note:** Routes `/`, `/search`, `/product/:id`, and `/cart` are wrapped in `<PrivateRoute>` and require a valid JWT token. Routes `/login`, `/register`, `*`, and `/unauthpage` are publicly accessible.

## Scripts

| Directory | Command | Action |
|-----------|---------|--------|
| `backend/` | `npm start` | Dev server via nodemon |
| `backend/` | `npm run seed` | Seed DB from `data/products.json` |
| `frontend/` | `npm start` | CRA dev server |
| `frontend/` | `npm test` | CRA Jest + Testing Library |
| `frontend/` | `npm run build` | Production build |
