const Product = require("../models/product");
const ApiFeature = require("../utils/apiFeature");

// Create Product --admin
exports.createProduct = async (req, res) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product Added",
        product
    })
}

// Get Product 
exports.getAllProducts = async (req, res) => {
    const resultPerPage = 6;

    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeature(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
       
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
    });
}

// Update Product --admin
exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Product Updated",
        product
    })
}

// Delete Product --admin
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not Found"
        })
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product Deleted"
    })
}

// Get Single id Product
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not Found"
        })
    }

    res.status(200).json({
        success: true,
        product,
    })
}

// create or update review
exports.createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        i => i.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(i => {
            if (i.user.toString() === req.user._id.toString())
                (i.rating = rating),
                    (i.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;

        let avg = 0;

        product.reviews.forEach(i => {
            avg += i.rating
        })

        product.ratings = avg / product.reviews.length;

        await product.save({
            validateBeforeSave: false
        })

        res.status(200).json({
            success: true
        })
    }
}

// Get All Reviews 
exports.getProductReviews = async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not Found"
        })
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
}

//Delete Review
exports.deleteReview = async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not Found"
        })
    }

    const reviews = product.reviews.filter(
        (i) => i._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach(i => {
        avg += i.rating
    })

    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
}