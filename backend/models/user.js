const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [15, "Cannot exceed more than 15"],
        minlength: [5, "Should 5 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [5, "Should 5 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

// jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, config.secret, {
        expiresIn: config.expires
    })
}

// compare pass
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// resetpassword token
userSchema.methods.getResetPaswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // hashing and resetpasswordtoken
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);