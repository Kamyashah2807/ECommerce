const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register User
exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: 'sample id',
            url: 'profileUrl'
        }
    })

    sendToken(user, 201, res)
}

// Login User 
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Email & Password"
        })
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    sendToken(user, 200, res)
}

// Logout User
exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
}

// Forgot password
exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    //Get Resetpassword Token
    const resetToken = user.getResetPaswordToken();

    await user.save({ validateBeforeSave: false });

    const resetpasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;
    const message = `Your Password reset token is: \n\n ${resetpasswordUrl} \n\n If you haven't request then ignore this message`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully!!`
        })

    } catch {
        user.resetPasswordToken = undefined,
            user.resetpasswordExpire = undefined

        await user.save({ validateBeforeSave: false });
        return next();
    }
}

// Reset Password
exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetpasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(404).json({
            message: "Reset token password is invalid or expired"
        })
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            message: "Password and confirm password does not matched"
        })
    }

    user.password = req.body.password,
        user.resetPasswordToken = undefined,
        user.resetpasswordExpire = undefined

    await user.save();
    sendToken(user, 200, res);
}

// Get Userdetails by id
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
}

// Update Password
exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: "old password is incorrect"
        })
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(401).json({
            success: false,
            message: "password does not matched"
        })
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);
}

// Update Profile
exports.updateProfile = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

    sendToken(user, 200, res);
}

// Get all users --admin
exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
}

// Get single user --admin
exports.getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: `User does not exists with Id: ${req.params.id}`
        })
    }

    res.status(200).json({
        success: true,
        user
    })
}

// Update user role --admin
exports.updateUserRole = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

    sendToken(user, 200, res);
}

// Delete user role --admin
exports.deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: `User does not exists with Id: ${req.params.id}`
        })
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })

    sendToken(user, 200, res);
}