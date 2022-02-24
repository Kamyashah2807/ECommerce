var mongoose = require('mongoose');
var Schema = mongoose.Schema;

productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Enter product name"]
    },
    description: {
        type: String,
        required: [true, "Enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Enter product price"],
        maxlength: [8, "cannot more than 8"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Enter category"]
    },
    stock: {
        type: Number,
        required: [true, "Enter stock"],
        maxlength: [4],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

product = mongoose.model('Product', productSchema);

module.exports = product