const express = require('express');
const router = express.Router();
const { getProducts, getSingleProduct, createProduct } = require('../controllers/productControllers');
const { protect, admin } = require('../middleware/auth');



router.route('/users').get(getusers);


module.exports = router;