# FILE: `frontend/src/components/ProductCard.js`

## Purpose of this File

This component renders a **single product card** - like a small rectangular box showing one product.
You see these on the home page in a grid layout.
Think of it as the product listings on Amazon's home page.

---

## How It Connects to Other Files

```
  Home.js
       │
       │  {products.map(product => <ProductCard product={product} />)}
       ▼
  ProductCard.js  ◄── WE ARE HERE
       │
       │  Shows product image, name, rating, price
       │  Links to /product/:id for details
       ▼
  ProductDetail.js (when user clicks "View Details")
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
import { Link } from "react-router-dom";
```
Imports the `Link` component for navigation.

---

### Lines 3-41

```javascript
export default function ProductCard ( {product} ) {

    const imgSrc = product?.images?.[0]?.image || "/images/no-image-placeholder.png";
    const handleImageError = (e) => {
        e.target.src = "/images/no-image-placeholder.png";
    }

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                    <img
                        className="card-img-top mx-auto"
                        src={imgSrc}
                        alt="product-image"
                        onError={handleImageError}
                        />  
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <Link to={`/product/${product._id}`}> {product.name}</Link>
                        </h5>
                        <p> {product.description}</p>

                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width : `${product.ratings/5 *100}%`}}></div>
                        </div>
                    </div>
                    <p className="card-text">{product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div>
    );
}
```

---

### Line 3:

```javascript
export default function ProductCard ( {product} ) {
```
- Exporting a React component called `ProductCard`.
- `{product}` = Destructuring the `product` prop. The Home page passes each product as a prop.

---

### Line 5:

```javascript
    const imgSrc = product?.images?.[0]?.image || "/images/no-image-placeholder.png";
```

**What it does:**
Determines which image to display.

**Breaking down the `?.` (optional chaining):**
- `product?.images` = If `product` exists, get `images`. Otherwise, stop and return `undefined`.
- `?.[0]` = If `images` exists and is an array, get the first element.
- `?.image` = If the first element exists, get its `image` property.

**The `||` (OR) operator:**
- If the left side is `undefined` or `null`, use the fallback: `"/images/no-image-placeholder.png"`.

**Real-world example:**
You're looking for a photo in an album:
1. Do I have an album? (`product?.images`)
2. Does it have a first photo? (`?.[0]`)
3. Is there actually a photo there? (`?.image`)
4. If anything is missing, use a placeholder.

**What if we remove this line?**
Line 15 would use an undefined `imgSrc`, and the image would not display.

---

### Lines 6-8:

```javascript
    const handleImageError = (e) => {
        e.target.src = "/images/no-image-placeholder.png";
    }
```

**What it does:**
This function runs if the product image fails to load (e.g., file not found).

**How it works:**
- `e` = The error event.
- `e.target` = The `<img>` element that failed.
- `e.target.src = "/images/no-image-placeholder.png"` = Change the image source to the placeholder image.

**Real-world example:**
At a store, if a product photo is missing, the store puts a sign saying "Image coming soon." This does the same thing - shows a placeholder when the real image is unavailable.

**What if we remove this function?**
Broken images would show as an empty box with a broken image icon.

---

### Lines 10-38 - The JSX:

**Line 10:**
```html
<div className="col-sm-12 col-md-6 col-lg-3 my-3">
```
- Bootstrap grid: On small screens (sm), full width. On medium (md), half width. On large (lg), quarter width.
- `my-3` = Top and bottom margin.

**Lines 11-18 - Product image:**
```html
<div className="card p-3 rounded">
    <img
        className="card-img-top mx-auto"
        src={imgSrc}
        alt="product-image"
        onError={handleImageError}
    />  
```
- `card` = Bootstrap card component (a box with rounded corners, shadow).
- `p-3` = Padding.
- `rounded` = Rounded corners.
- `src={imgSrc}` = The image source we determined above.
- `onError={handleImageError}` = If image fails to load, run the error handler.

**Lines 20-21 - Product name:**
```html
<Link to={`/product/${product._id}`}> {product.name}</Link>
```
- Clickable product name that links to the product detail page.
- `${product._id}` = Inserts the product's unique ID into the URL.
- Example: If product ID is `abc123`, the link goes to `/product/abc123`.

**Line 22 - Description:**
```html
<p> {product.description}</p>
```
- Shows a short description of the product.

**Lines 24-28 - Star ratings:**
```html
<div className="ratings mt-auto">
    <div className="rating-outer">
        <div className="rating-inner" style={{width : `${product.ratings/5 *100}%`}}></div>
    </div>
</div>
```
- Creates a visual star rating display.
- `rating-outer` = The background (empty stars).
- `rating-inner` = The filled stars.
- `style={{width: `${product.ratings/5 *100}%`}}` = Sets the width to represent the rating percentage.
  - If rating is 4.5 out of 5: `4.5/5 * 100 = 90%`
  - So 90% of the stars are filled.
- This is a CSS trick using Font Awesome star characters and overflow hidden.

**Line 29 - Price:**
```html
<p className="card-text">{product.price}</p>
```
- Displays the product price.

**Lines 30-31 - View Details button:**
```html
<Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
```
- A button that links to the product detail page.

---

## Summary

`ProductCard.js`:
1. Receives a `product` object as a prop
2. Shows the product image (with fallback if missing)
3. Displays product name (clickable), description, star rating, and price
4. Provides a "View Details" link to the product detail page

---

## Knowledge Check

### Q1: What does the `?.` (optional chaining) operator do?

**Answer:** It safely accesses nested properties without throwing an error if any intermediate property is `null` or `undefined`. Instead of crashing, it returns `undefined`. Example: `product?.images?.[0]?.image` safely checks each level before accessing the next.

---

### Q2: How does the star rating work visually?

**Answer:** The rating uses a CSS technique:
1. `rating-outer` has 5 empty star characters (☆) via CSS `::before` pseudo-element.
2. `rating-inner` has 5 filled star characters (★) via CSS `::before`.
3. The inner div's width is set as a percentage (rating/5 * 100%).
4. Overflow is hidden, so only the fill percentage of stars shows.

If rating is 4.5/5: width = 90%, so 4.5 filled stars and 0.5 empty stars appear.

---

### Q3: What happens if the product image URL is wrong?

**Answer:** The `<img>` tag's `onError` handler fires. The handler changes `e.target.src` to the fallback image (`/images/no-image-placeholder.png`). The user sees the placeholder instead of a broken image.

---

### Q4: Why use `Link` instead of `<a>` for the product name?

**Answer:** `<Link>` from React Router navigates without reloading the page. An `<a>` tag would cause a full page reload, losing the React app state.

---

### Q5: What would happen if `product` is `undefined`?

**Answer:** The optional chaining `product?.images?.[0]?.image` prevents a crash - it safely returns `undefined`, and the `||` operator provides the placeholder. However, other references like `product.name` would crash. The Home page should only render ProductCard when `product` exists.

---

### Common Beginner Mistakes

1. **Not handling missing images**: Forgetting the `onError` handler means users see broken images when image files are missing.

2. **Forgetting `key` prop when mapping**: In Home.js, each ProductCard needs a unique `key={product._id}` prop for React's reconciliation.

3. **Directly modifying props**: Trying to change `product` inside ProductCard.

4. **Wrong path for placeholder image**: If `/images/no-image-placeholder.png` doesn't exist, the fallback image itself is broken.

5. **Not extracting props correctly**: Using `props` without destructuring and accessing `props.product` everywhere.
