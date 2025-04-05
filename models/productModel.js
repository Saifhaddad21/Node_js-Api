const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Too short product title"],
        maxlength: [50, "Too long product title"]
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [20, "Too short product description"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"]
    },
    sold: {
        type: Number,
        default: 0,
    },
    pric: {
        type: Number,
        required: [true, "Price product is required"],
        trim: true,
        max: [20, "Too long product price"],
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],

    imageCover: {
        type: String,
        required: [true, "Product cover image is required"],
    },

    images: [String],

    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, "Product must be belong to category"] ,
    },
    subcategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory',
        },
    ],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    ratingsAvarege: {
        type: Number,
        min: [1, "Rating must be above or equal to 1.0"],
        max: [5, "Rating must be below or equal to 5.0"],
    },
    ratingQuantities: {
        type: Number,
        default: 0,
    }
  }
  , {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema)