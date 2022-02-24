const config = require("../config/auth");

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now + config.cookieExpires
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken