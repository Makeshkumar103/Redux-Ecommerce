# JWT Authentication Flow

## Overview

This app uses **JSON Web Tokens (JWT)** for stateless authentication. When a user registers or logs in, the backend signs a token containing the user's `_id` and returns it to the frontend. The frontend stores the token in **localStorage** and sends it as a `Bearer` header on subsequent authenticated requests.

---

## Backend: How tokens are created and verified

### 1. Token generation — `backend/controllers/authController.js:4-6`

```js
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
```

`jwt.sign()` creates a HMAC-SHA256 signature using `JWT_SECRET` (from `backend/.env`). The payload is `{ id: user._id }`. The token expires in 7 days.

### 2. Registration — `authController.js:register`

- Checks if email already exists.
- Hashes password via `bcryptjs` in a Mongoose `pre('save')` hook (`backend/models/userModel.js:11-14`).
- Creates the user, calls `generateToken(user._id)`, returns `{ success, token, user }`.

### 3. Login — `authController.js:login`

- Finds user by email.
- Compares candidate password against the stored hash with `user.comparePassword()` (`userModel.js:16-18`).
- On match, calls `generateToken(user._id)`, returns the same shape.

### 4. Token verification — `backend/middleware/auth.js:protect`

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select('-password');
```

- Extracts the token from `Authorization: Bearer <token>`.
- Calls `jwt.verify()` — if the signature is invalid or expired, it throws.
- Looks up the user by `decoded.id` and attaches `req.user` (without password).
- Used as middleware on protected routes (e.g., `GET /auth/profile`).

### 5. Protected route wiring — `backend/routes/auth.js:8`

```js
router.get('/auth/profile', protect, getProfile);
```

The `protect` middleware runs before `getProfile`. If the token is missing or invalid, it returns `401` before the controller ever runs.

---

## Frontend: How tokens are stored and sent

### 1. On login/register — `frontend/src/store/authSlice.js`

The `loginUser` and `registerUser` async thunks:

```js
const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
localStorage.setItem('token', response.data.token);
```

The token is saved to **localStorage** so it survives page refreshes. The Redux store's initial state reads from it:

```js
const storedToken = localStorage.getItem('token');
const initialState = {
  token: storedToken || null,
  ...
};
```

### 2. On authenticated requests — `fetchProfile` thunk (`authSlice.js:33-46`)

```js
const token = thunkAPI.getState().auth.token || localStorage.getItem('token');
const response = await axios.get(`${API_URL}/auth/profile`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

The token is read from the Redux store (or localStorage as fallback) and sent as `Authorization: Bearer <token>`.

### 3. Logout — `authSlice.js:logout` reducer

```js
logout(state) {
  state.token = null;
  state.user = null;
  state.status = 'idle';
  state.error = null;
  localStorage.removeItem('token');
},
```

Clears both the Redux store and localStorage.

### 4. Route protection — `frontend/src/components/PrivateRoute.js`

```js
const { token } = useSelector((state) => state.auth);
return token ? children : <Navigate to="/login" replace />;
```

If there's no token, the user is redirected to `/login`. This guards all routes except `/login`, `/register`, `/unauthpage`, and `*` (404).

---

## End-to-end flow diagram

```
Register/Login
   │
   ▼
Frontend POST /api/v1/auth/login  ───►  Backend validates credentials
   │                                         │
   │                                         ▼
   │                                   jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })
   │                                         │
   │                                         ▼
   ◄─────── { success, token, user } ────────
   │
   ▼
Save token in localStorage + Redux store
   │
   ▼
Navigate to protected page (e.g. Home)
   │
   ├── PrivateRoute checks token exists ──► Yes
   │
   ▼
Frontend GET /api/v1/auth/profile
  Headers: { Authorization: Bearer <token> }
   │
   ▼
Backend protect middleware:
  jwt.verify(token, JWT_SECRET) ──► decoded = { id, iat, exp }
  User.findById(decoded.id)      ──► req.user
   │
   ▼
getProfile controller returns user data
```

---

## Security notes

- **Password storage**: bcrypt with salt rounds = 10 (`pre('save')` hook).
- **JWT secret**: stored in `backend/.env`, gitignored.
- **Token expiry**: 7 days (`expiresIn: '7d'`).
- **No refresh token**: if the token expires, the user must log in again.
- **No CSRF**: the app uses `Bearer` tokens in the `Authorization` header, which is immune to simple CSRF attacks (not sent automatically by browsers like cookies).
- **Token exposed in localStorage**: vulnerable to XSS — this app has no XSS protections beyond React's default output escaping.
