const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const products = require('./data/products.json');
const productModel = require('./models/productModel');

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.DB_URL)
  .then(async () => {
    console.log('MongoDB connected');

    await productModel.deleteMany({});
    await productModel.insertMany(products);

    console.log('Products seeded successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  });
