const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const trasnporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shahkamya89@gmail.com",
            pass: "ShahKamya@123"
        }
    })

    const mailOptions = {
        from: "shahkamya89@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    trasnporter.sendMail(mailOptions);
}

module.exports = sendEmail