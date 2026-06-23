const productModel = require('../models/productModel');

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

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, seller, stock, imageUrl } = req.body;
        const product = await productModel.create({
            name,
            price,
            description,
            ratings: "0",
            images: [{ image: imageUrl }],
            category,
            seller,
            stock,
            numOfReviews: "0",
            createdAt: Date.now()
        });
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}