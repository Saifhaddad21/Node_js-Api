const mongoose = require("mongoose");

// 1- create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "category name must be unique"],
      minlength: [3, "category name must be at least 3 characters"],
      maxlength: [50, "category name must be less than 50 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// 2- create model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
