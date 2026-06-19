const productModel = require('../models/productModel');
// const ProductModel = require('../models/productModel');

// Get Products API - /api/v1/product
exports.getProducts = async (req, res, next) => {
    const query = req.query.keyword? { name : {
        $regex: req.query.keyword,
        $options: 'i'
    }}:{}

    const products = await productModel.find(query);

    res.json({
        success: true,
        products,
        message: 'Get products working!'
    })
}


// Get Single Product API - /api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id)
        res.json({
            success: true,
            message: 'Get single product working!',
            product
    })
    } catch (error) {
         res.status(404).json({
            success: false,
            message: 'Unable to get the product with that ID ',
    })
    }
    
}