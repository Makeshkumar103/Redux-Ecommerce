const express = require('express');
const router = express.Router();
const { getProducts, getSingleProduct, createProduct } = require('../controllers/productControllers');
const { protect, admin } = require('../middleware/auth');



router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/new').post(protect, admin, createProduct);


module.exports = router;