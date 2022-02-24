const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Routes
const product = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");

//Database
mongoose.connect("mongodb://localhost:27017/E-commerce")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);

app.listen(2000, () => {
    console.log("Server is runing on port 2000");
});