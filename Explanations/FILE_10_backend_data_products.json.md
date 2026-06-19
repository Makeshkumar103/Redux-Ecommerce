# FILE: `backend/data/products.json`

## Purpose of this File

This file contains **sample product data** in JSON format.
It is a static list of 10 products that would be used to **seed** (populate) the MongoDB database.
Think of this as a catalog of products that the store sells.

---

## How It Connects to Other Files

```
  backend/data/products.json
       │
       │  Contains product data (10 products)
       │
       ├──► Used to seed MongoDB (manually or via a script)
       │
       ▼
  MongoDB "products" collection
       │
       │  Stores the seeded data
       │
       ▼
  models/productModel.js (Schema)
       │
       │  Defines the structure
       │
       ▼
  controllers/productControllers.js
       │
       │  Queries products from MongoDB
       │
       ▼
  Frontend displays products
```

---

## What Each Product Contains

Each product object has these fields:

| Field | Type | Description | Example |
|---|---|---|---|
| `name` | String | Product name | "OPPO F21S Pro 5G" |
| `price` | Number | Product price | 245.7 |
| `description` | String | Detailed description | "OPPO F21S Pro 5G is a powerful..." |
| `ratings` | Number | Average customer rating (0-5) | 4.5 |
| `images` | Array | List of image objects | `[{image: "..."}, {image: "..."}]` |
| `category` | String | Product category | "Mobile Phones" |
| `seller` | String | Seller name | "Amazon" |
| `stock` | Number | Available quantity | 5 |

---

## The 10 Products

| # | Product Name | Price | Rating | Category | Stock |
|---|---|---|---|---|---|
| 1 | OPPO F21S Pro 5G | $245.70 | 4.5 | Mobile Phones | 5 |
| 2 | Samsung Galaxy S24 Ultra | $899.99 | 4.7 | Mobile Phones | 12 |
| 3 | Apple MacBook Air M3 | $1,099.00 | 4.8 | Laptops | 8 |
| 4 | Sony WH-1000XM5 Headphones | $349.99 | 4.6 | Electronics | 20 |
| 5 | Nike Air Max 270 | $149.99 | 4.3 | Footwear | 25 |
| 6 | Logitech MX Master 3S | $99.99 | 4.7 | Accessories | 30 |
| 7 | LG 65-inch OLED TV C3 | $1,799.99 | 4.5 | Televisions | 7 |
| 8 | Adidas Ultraboost Light | $189.99 | 4.4 | Footwear | 18 |
| 9 | Canon EOS R6 Mark II | $2,499.00 | 4.8 | Cameras | 3 |
| 10 | Dyson V15 Detect Vacuum | $749.99 | 4.6 | Home Appliances | 10 |

---

## Line-by-Line Explanation

Since the file is a JSON array, let me explain the structure:

### Line 1

```json
[
```

The file starts with an opening square bracket `[`. This tells us the file contains a JSON **array** (a list).

### Lines 2-14 - First Product

```json
  {
    "name": "OPPO F21S Pro 5G",
    "price": 245.7,
    "description": "OPPO F21S Pro 5G is a powerful mid-range smartphone with 5G connectivity, 64MP triple camera, and a 90Hz AMOLED display.",
    "ratings": 4.5,
    "images": [
      { "image": "/images/products/1.jpg" },
      { "image": "/images/products/2.jpg" }
    ],
    "category": "Mobile Phones",
    "seller": "Amazon",
    "stock": 5
  },
```

- Each product is enclosed in curly braces `{ }`.
- Each line has a **key** (field name) on the left and a **value** on the right, separated by `:`.
- `"images"` is an array (list) of objects, each with an `"image"` field pointing to the image file path.
- The comma `,` after the closing `}` separates this product from the next one.

### Lines 15-131 - Remaining 9 Products

Same structure as the first product, with different values for each product.

### Line 132

```json
]
```

The file ends with a closing square bracket `]`, closing the array.

---

## Image Files

Each product references two images:
- `/images/products/1.jpg` through `/images/products/20.jpg`

These image files exist in:
```
frontend/public/images/product/
    1.jpg   2.jpg   3.jpg   4.jpg   5.jpg
    6.jpg   7.jpg   8.jpg   9.jpg   10.jpg
    11.jpg  12.jpg  13.jpg  14.jpg  15.jpg
    16.jpg  17.jpg  18.jpg  19.jpg  20.jpg
```

---

## Summary

`products.json` is a static data file containing 10 sample products. It serves as a **seed data** source. In a real application, there would be a script that reads this file and inserts the products into MongoDB. Currently, the project doesn't have such a script - the products would need to be added manually or via a MongoDB import tool.

---

## Knowledge Check

### Q1: How would you get this product data into MongoDB?

**Answer:** You could:
1. Use `mongoimport` command: `mongoimport --db mini-ecommerce --collection products --file products.json --jsonArray`
2. Write a Node.js script that reads the file and uses `productModel.insertMany()` to insert all products.
3. Manually insert via MongoDB Compass (a GUI tool).

---

### Q2: Why do products have two images instead of one?

**Answer:** Having multiple images per product is common in ecommerce. The frontend can show different angles of the product. In this project, only the first image (`images[0].image`) is displayed on the ProductCard and ProductDetail pages.

---

### Q3: What happens if an image file doesn't exist on the server?

**Answer:** The browser shows a broken image icon. The `ProductCard.js` component has a fallback in `handleImageError` that replaces the broken image with `/images/no-image-placeholder.png`.

---

### Q4: Why is `price` a Number in this JSON file, but defined as `String` in productModel.js?

**Answer:** This is an inconsistency in the project. The JSON file has prices as numbers (like `245.7`), but the Mongoose schema expects strings. When Mongoose saves a number to a string field, it typically converts it automatically. However, this could cause issues with data types.

---

### Q5: What categories of products exist in this store?

**Answer:** 7 categories:
1. Mobile Phones
2. Laptops
3. Electronics
4. Footwear
5. Accessories
6. Televisions
7. Home Appliances
8. Cameras
