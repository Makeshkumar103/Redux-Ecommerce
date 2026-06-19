# FILE: `frontend/.env`

## Purpose of this File

This file stores the **backend API URL** that the frontend uses to make requests.

---

## Line-by-Line Explanation

---

### Line 1

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

**What it does:**
Sets the base URL for all API calls.

**Breaking it down:**
- `REACT_APP_` = **Required prefix** in Create React App. Only variables starting with `REACT_APP_` are available to the frontend.
- `API_URL` = The variable name. In code, accessed as `process.env.REACT_APP_API_URL`.
- `http://localhost:8000/api/v1` = The backend server address and base path.

**Where it's used:**

In `Home.js`:
```javascript
fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
// Result: fetch('http://localhost:8000/api/v1/products?keyword=phone')
```

In `ProductDetail.js`:
```javascript
fetch(process.env.REACT_APP_API_URL+'/product/'+id)
// Result: fetch('http://localhost:8000/api/v1/product/abc123')
```

In `Cart.js`:
```javascript
fetch(process.env.REACT_APP_API_URL+'/order', {...})
// Result: fetch('http://localhost:8000/api/v1/order')
```

**What if we remove this file?**
`process.env.REACT_APP_API_URL` would be `undefined`. API calls would go to `undefined/products` which would fail.

---

## Summary

A one-line file that tells the frontend where to find the backend API.
