const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productControllers');
const { getSingleProduct } = require('../controllers/productControllers');



router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);


module.exports = router;