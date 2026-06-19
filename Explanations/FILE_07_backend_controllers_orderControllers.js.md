# FILE: `backend/controllers/orderControllers.js`

## Purpose of this File

This file contains the **logic** for placing an order.
When a user clicks "Place Order" on the cart page, this controller processes it.
It saves the order to MongoDB and updates the product stock quantities.

---

## How It Connects to Other Files

```
  Client (React Cart page)
       │
       │  POST /api/v1/order  { cartItems: [...] }
       ▼
  routes/order.js
       │
       │  Routes to createOrder controller
       ▼
  orderControllers.js  ◄── WE ARE HERE
       │
       ├──► orderModel.create({...})  → Save order to MongoDB
       │
       └──► productModel.findById() → Update stock for each product
```

---

## Line-by-Line Explanation

---

### Line 2

```javascript
const orderModel = require('../models/orderModel');
```

**What it does:**
Imports the Order model to save orders to the database.

---

### Line 3

```javascript
const productModel = require('../models/productModel');
```

**What it does:**
Imports the Product model so we can update product stock after an order.

---

### Lines 5-31

```javascript
exports.createOrder = async(req, res, next) => {
    try {
        const cartItems = req.body;
        const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
        const status = 'pending';
        const order = await orderModel.create({cartItems, amount, status})


        // Updating product stock
        cartItems.forEach(async (item)=> {
            const product = await productModel.findById(item.product._id);
            product.stock = product.stock - item.qty;
            await product.save();
        })

        res.json({
            success: true,
            message: 'Order placed successfully!',
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
```

**Line 5 - Function declaration:**
```javascript
exports.createOrder = async(req, res, next) => {
```
- Creates an exported function called `createOrder`.
- Takes `req` (request), `res` (response), `next` (next middleware).

**Line 6 - Try block:**
```javascript
    try {
```
- Attempt to run the code. If anything fails, go to `catch`.

**Line 7 - Get cart items:**
```javascript
        const cartItems = req.body;
```
- `req.body` = The data sent by the frontend.
- When the Cart page clicks "Place Order", it sends:
```json
[
    {
        "product": { "_id": "...", "name": "...", "price": "245.7", ... },
        "qty": 2
    }
]
```
- This is stored in the `cartItems` variable.

**What if we remove this line?**
The code would not know what items the user ordered. `cartItems` would be undefined.

---

### Line 8 (The complex calculation)

```javascript
const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
```

**What it does:**
Calculates the total price of all items in the cart.

**Breaking it down step by step:**

**Step 1: `.reduce()`**
- `.reduce()` is like a conveyor belt that goes through each item and keeps a running total.
- Think of it as a cashier scanning each item and adding to the running total.

**Step 2: The parameters**
- `acc` = accumulator (the running total, starts at 0)
- `item` = each cart item

**Step 3: The calculation**
```
acc + item.product.price * item.qty
```
For each item: `price × quantity`, add to running total.

**Step 4: Example**
```
Item 1: Phone ($245.70) × 2 = $491.40
Item 2: Headphones ($349.99) × 1 = $349.99
Total: $491.40 + $349.99 = $841.39
```

**Step 5: `.toFixed(2)`**
- Makes sure the price has exactly 2 decimal places. $841.39 not $841.391234.

**Step 6: `Number()`**
- Converts the result from a string (`.toFixed(2)` returns a string) back to a number.

**What if we remove this line?**
The order would not have an `amount` field, or `amount` would be `undefined`.

---

### Line 9

```javascript
const status = 'pending';
```

**What it does:**
Sets the initial order status to `'pending'`.

**Real-world example:**
When you order something online, the status first says "Order Placed" (pending). Later it changes to "Shipped", "Out for Delivery", "Delivered".

**What if we remove this line?**
The `status` would be `undefined`. The order would be saved without a status.

---

### Line 10

```javascript
const order = await orderModel.create({cartItems, amount, status})
```

**What it does:**
Creates a new order in the MongoDB database.

**Keyword explanation:**
- `orderModel.create()` = A Mongoose function that inserts a new document into the `orders` collection.
- `{cartItems, amount, status}` = This is JavaScript shorthand for:
  ```javascript
  { cartItems: cartItems, amount: amount, status: status }
  ```
- `await` = Wait for the database to finish saving.
- `order` = The saved order document (with `_id`, `createdAt`, etc.).

**What if we remove this line?**
The order would NOT be saved to the database. But the stock would still be updated (lines 14-18), causing a bug where stock decreases but no order is recorded.

---

### Lines 14-18 - Updating product stock

```javascript
        cartItems.forEach(async (item)=> {
            const product = await productModel.findById(item.product._id);
            product.stock = product.stock - item.qty;
            await product.save();
        })
```

**What it does:**
For each item in the cart, reduce the product's stock by the ordered quantity.

**Line 14:**
```javascript
        cartItems.forEach(async (item)=> {
```
- `forEach()` = Loop through each item in the cart.
- `async (item) =>` = Each iteration is asynchronous (needs to wait for database).

**Line 15:**
```javascript
            const product = await productModel.findById(item.product._id);
```
- Find the product in the database using its ID.
- `item.product._id` = The product's unique ID.
- `await` = Wait for the database.

**Line 16:**
```javascript
            product.stock = product.stock - item.qty;
```
- Subtract the ordered quantity from the current stock.
- Example: If stock was 5 and user ordered 2, stock becomes 3.

**Line 17:**
```javascript
            await product.save();
```
- Save the updated product back to the database.
- `await` = Wait for the save to complete.

**Real-world example:**
A warehouse has 5 phones. A customer buys 2. The worker updates the inventory: 5 - 2 = 3 phones remaining.

**What if we remove these lines?**
The order would be placed, but the product stock would NOT be updated. The website would continue showing incorrect stock quantities. Customers might try to buy products that are actually out of stock.

---

### Lines 20-24 - Success response

```javascript
        res.json({
            success: true,
            message: 'Order placed successfully!',
            order
        })
```

**What it does:**
Sends a success response back to the frontend.

- `success: true` = Order was placed successfully.
- `message: 'Order placed successfully!'` = Friendly message.
- `order` = The saved order details (including the generated `_id`).

---

### Lines 25-29 - Error handling

```javascript
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
```

**What it does:**
If anything goes wrong in the `try` block, this runs.

- `res.status(500)` = Sets HTTP status to 500 (Internal Server Error).
- `error.message` = The actual error description (like "Database connection failed").

---

## Execution Flow

```
User clicks "Place Order" on Cart page
       │
       ▼
  Frontend sends POST request to /api/v1/order
  Body: [{ product: {...}, qty: 2 }, ...]
       │
       ▼
  Express receives request
       │
       ▼
  routes/order.js matches /order
       │
       ▼
  orderControllers.createOrder() runs
       │
       ▼
  Step 1: Read cart items from req.body
       │
       ▼
  Step 2: Calculate total amount using .reduce()
       │
       ▼
  Step 3: Set status = "pending"
       │
       ▼
  Step 4: Save order to MongoDB (orderModel.create)
       │
       ▼
  Step 5: For each item, update product stock
      ├── Find product by ID
      ├── Subtract ordered quantity
      └── Save updated product
       │
       ▼
  Step 6: Send success response
       │
       ▼
  Frontend shows "Order Completed" message
```

---

## Summary

`orderControllers.js` exports one function:

**createOrder:**
1. Gets cart items from the request body
2. Calculates total amount using `.reduce()`
3. Sets initial status to "pending"
4. Saves the order to MongoDB
5. Updates each product's stock quantity
6. Returns success or error response

---

## Knowledge Check

### Q1: What does `req.body` contain when a POST request arrives?

**Answer:** `req.body` contains the data sent by the client in the request body. For the order endpoint, it contains an array of cart items like:
```json
[
    { "product": { "_id": "...", "price": "100" }, "qty": 2 }
]
```

---

### Q2: What does `.reduce()` do in JavaScript?

**Answer:** `.reduce()` goes through every item in an array and "reduces" it to a single value. In this case, it calculates the total price by adding `price × quantity` for each item. It starts from 0 (the second parameter) and keeps a running total.

---

### Q3: Why does this file import BOTH `orderModel` AND `productModel`?

**Answer:** Because it needs to do two things:
1. `orderModel` = Save the order to the database
2. `productModel` = Update the stock of each product

If you only needed to save the order, you'd only need `orderModel`.

---

### Q4: What would happen if `productModel.findById()` can't find a product?

**Answer:** It would return `null`. Then trying to access `product.stock` would throw an error like "Cannot read property 'stock' of null", which would be caught by the `catch` block and return a 500 error.

---

### Q5: What is `res.status(500)` and why use it?

**Answer:** `res.status()` sets the HTTP status code for the response.
- `500` = Internal Server Error. Means something went wrong on the server side.
- Other common codes: `200` (OK), `201` (Created), `404` (Not Found), `401` (Unauthorized).

Using proper status codes helps the frontend understand what happened.

---

### Common Beginner Mistakes

1. **Not parsing `req.body`**: Forgetting `app.use(express.json())` in `app.js` means `req.body` is `undefined`.

2. **Confusing `req.body` with `req.query`**: POST requests send data in the body, not the URL.

3. **Stock going negative**: The code doesn't check if `product.stock >= item.qty`. A user could order 100 items when only 5 are in stock, resulting in negative stock (-95).

4. **Using `.forEach()` with `async/await`**: `forEach()` doesn't wait for promises. The stock updates might not complete before the response is sent. A better approach would be `for...of` loop or `Promise.all()`.

5. **No validation**: The code assumes the request body is always correct. If someone sends invalid data, it could break.

6. **Forgetting to `await` the `.save()`**: Without `await`, the stock update is started but not completed before the function continues. The response might be sent before stock is actually updated.
