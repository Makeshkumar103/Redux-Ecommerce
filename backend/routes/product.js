const express = require('express');
const router = express.Router();
const { getProducts, getSingleProduct, createProduct, updateProduct } = require('../controllers/productControllers');
const { protect, admin } = require('../middleware/auth');



router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/new').post(protect, admin, createProduct);
router.route('/admin/product/:id').put(protect, admin, updateProduct);


module.exports = router;