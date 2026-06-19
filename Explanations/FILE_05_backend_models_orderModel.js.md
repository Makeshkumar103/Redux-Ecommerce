# FILE: `backend/models/orderModel.js`

## Purpose of this File

This file defines the **structure (Schema)** of an order in the MongoDB database.
It's the blueprint for what an order looks like when a user places one.

---

## How It Connects to Other Files

```
  controllers/orderControllers.js
       │
       │  const orderModel = require('../models/orderModel');
       │
       │  Uses orderModel.create({...})
       │
       ▼
  orderModel.js  ◄── WE ARE HERE
       │
       │  Defines what an "Order" looks like
       │
       ▼
  MongoDB "orders" collection
       │
       │  Stores actual order data
```

---

## Line-by-Line Explanation

---

### Line 1

```javascript
const mongoose = require('mongoose');
```

**What it does:**
Imports Mongoose to use Schema and Model.

---

### Lines 4-12

```javascript
const orderSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    },
    {
    timestamps: true,
    }
)
```

**What it does:**
Creates the blueprint for an order.

**Line 4:**
```javascript
const orderSchema = new mongoose.Schema({
```
- Creates a new Schema object.

**Line 5:**
```javascript
    cartItems: Array,
```
- `cartItems` = The list of products the user ordered.
- `Array` = A list. This will hold multiple items.
- Each item in the array looks like:
```json
{
    "product": {
        "_id": "...",
        "name": "...",
        "price": "...",
        "images": [...]
    },
    "qty": 2
}
```

**Line 6:**
```javascript
    amount: String,
```
- `amount` = The total price of the order.
- `String` = Stored as text. In the controller, the amount is calculated and stored.

**Line 7:**
```javascript
    status: String,
```
- `status` = The order status.
- In the controller, the initial status is set to `'pending'`.

**What if we remove any of these fields?**
The order would still be saved, but it would miss that information.

**Lines 8-11:**
```javascript
    },
    {
    timestamps: true,
    }
)
```

**What it does:**
`timestamps: true` tells Mongoose to automatically add two fields to every order:
- `createdAt` - When the order was created
- `updatedAt` - When the order was last updated

You don't need to define these fields manually. Mongoose adds them automatically.

**Real-world example:**
This is like a receipt that automatically gets stamped with the date and time when you buy something.

**What if we remove `timestamps: true`?**
The order would still be saved, but there would be no automatic `createdAt` or `updatedAt` fields. You wouldn't know when the order was placed.

---

### Line 14

```javascript
const orderModel = mongoose.model('Order', orderSchema);
```

**What it does:**
Creates a Model from the Schema.

- `'Order'` = Model name. Mongoose creates a collection called `orders` in MongoDB.
- `orderSchema` = The schema we defined.

---

### Line 16

```javascript
module.exports = orderModel;
```

**What it does:**
Exports the model so `orderControllers.js` can use it.

---

## Order Schema Diagram

```
A single Order document in MongoDB looks like this:

{
    "_id": ObjectId("..."),
    "cartItems": [
        {
            "product": {
                "_id": "ObjectId(...)",
                "name": "OPPO F21S Pro 5G",
                "price": "245.7",
                "images": [
                    { "image": "/images/products/1.jpg" },
                    { "image": "/images/products/2.jpg" }
                ]
            },
            "qty": 2
        }
    ],
    "amount": "491.40",
    "status": "pending",
    "createdAt": "2024-06-17T10:30:00.000Z",
    "updatedAt": "2024-06-17T10:30:00.000Z"
}
```

---

## Comparing productModel.js vs orderModel.js

| Feature | productModel.js | orderModel.js |
|---|---|---|
| Collection name | `products` | `orders` |
| Stores | Product information | Customer orders |
| Fields | name, price, description, etc. | cartItems, amount, status |
| timestamps | Not used | Used |
| Used by | productControllers.js | orderControllers.js |

---

## Summary

`orderModel.js`:
1. Imports Mongoose
2. Defines a Schema for orders with `cartItems` (array), `amount` (string), `status` (string)
3. Adds automatic timestamps (createdAt, updatedAt)
4. Creates a Model and exports it

---

## Knowledge Check

### Q1: Why does `orderModel` have fewer fields than `productModel`?

**Answer:** Because orders and products are different types of data.
- A **product** needs many details (name, price, description, seller, etc.)
- An **order** just needs to know: what items were bought (`cartItems`), how much it costs (`amount`), and the current state (`status`). The product details are stored inside `cartItems` as embedded data.

---

### Q2: What does `timestamps: true` do?

**Answer:** It automatically adds two fields to every document:
- `createdAt`: The date and time when the document was created.
- `updatedAt`: The date and time when the document was last changed.

This is very useful for tracking when orders were placed.

---

### Q3: Why is `cartItems` defined as `Array` without specifying what's inside?

**Answer:** Because the `cartItems` array contains a mix of data (product info + quantity). Instead of creating a complex nested schema, the developer chose the simpler `Array` type. This is less strict but faster to set up.

---

### Q4: What would happen if we changed `amount` from `String` to `Number`?

**Answer:** The amount would be stored as a number instead of text. This would allow mathematical operations (like summing all order amounts for a report). In this project, it doesn't matter much since the amount is calculated once and never used for calculations again.

---

### Q5: How does the `status` field get its value?

**Answer:** In `orderControllers.js` line 9, the status is set to `'pending'` when the order is created. Currently, the app doesn't have a way to change the status later (like "shipped" or "delivered"), so it always stays as "pending".

---

### Common Beginner Mistakes

1. **Forgetting commas between schema fields**: JavaScript objects need commas between properties.

2. **Confusing `Array` with array of specific types**: `cartItems: Array` accepts anything. For stricter validation, you could use `cartItems: [{ product: Object, qty: Number }]`.

3. **Not understanding `timestamps`**: Beginners might manually add `createdAt` and `updatedAt` fields to the schema, not knowing that `timestamps: true` does it automatically.

4. **Typo in model name**: `mongoose.model('Order', ...)` creates a collection called `orders`. A typo here creates a differently named collection.

5. **Not matching field names between controller and model**: If the controller sends `cartItems` but the model expects `items`, the data won't be saved correctly.
