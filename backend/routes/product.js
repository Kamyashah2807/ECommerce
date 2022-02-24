const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controller/product");
const { isAuntheticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router()

router.route("/products").get(getAllProducts);

router
    .route("/admin/product/new")
    .post(isAuntheticatedUser, authorizeRoles("admin"), createProduct);

router
    .route("/admin/product/:id")
    .put(isAuntheticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuntheticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuntheticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuntheticatedUser, deleteReview)

module.exports = router;