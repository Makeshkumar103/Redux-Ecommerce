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
| `backend/.env` | `PORT=8000`, `NODE_ENV=Development`, `DB_URL=mongodb://localhost:27017/Redux-Ecommerce` |
| `frontend/.env` | `REACT_APP_API_URL=http://localhost:8000/api/v1` |

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, React Router 7, Redux Toolkit, React Toastify 11 |
| Backend  | Express 5, Mongoose 9, CORS, Dotenv |
| Database | MongoDB |
| Dev tools| Nodemon, CRA |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/products?keyword=...` | List / search products |
| `GET` | `/api/v1/product/:id` | Single product details |
| `POST` | `/api/v1/order` | Place order (body: `[{product, qty}]`) |

## Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Product listing |
| `/search?keyword=...` | Home | Filtered products |
| `/product/:id` | ProductDetail | Single product |
| `/cart` | Cart | Shopping cart + order |

## Scripts

| Directory | Command | Action |
|-----------|---------|--------|
| `backend/` | `npm start` | Dev server via nodemon |
| `backend/` | `npm run seed` | Seed DB from `data/products.json` |
| `frontend/` | `npm start` | CRA dev server |
| `frontend/` | `npm test` | CRA Jest + Testing Library |
| `frontend/` | `npm run build` | Production build |
