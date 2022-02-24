const express = require("express");
const router = express.Router();

const { register, login, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controller/user");
const { isAuntheticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/details").get(isAuntheticatedUser, getUserDetails);

router.route("/password/update").put(isAuntheticatedUser, updatePassword);

router.route("/details/update").put(isAuntheticatedUser, updateProfile);

router.route("/admin/users").get(isAuntheticatedUser, authorizeRoles("admin"), getAllUsers)

router
    .route("/admin/user/:id")
    .get(isAuntheticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuntheticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuntheticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router; 