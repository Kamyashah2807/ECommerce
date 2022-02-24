const express = require("express");
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controller/order");
const router = express.Router();
const { isAuntheticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuntheticatedUser, newOrder);
router.route("/order/:id").get(isAuntheticatedUser, authorizeRoles("admin"), getSingleOrder);
router.route("/orders/me").get(isAuntheticatedUser, myOrder);
router.route("/admin/orders").get(isAuntheticatedUser, authorizeRoles("admin"), getAllOrder);
router.route("/admin/order/:id")
    .put(isAuntheticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuntheticatedUser, authorizeRoles("admin"), deleteOrder);



module.exports = router; 