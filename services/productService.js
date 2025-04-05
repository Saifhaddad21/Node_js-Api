const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Product = require("../models/productModel");

// @desc Get All products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await Product.find({}).skip(skip).limit(limit);
  res.status(201).json({ results: products.length, page, data: products });
});

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if id is valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Invalid product id format: ${id}` });
  }

  const product = await Product.findById(id);
  // if (!category) {
  //   return res.status(404).json({ msg: `No category for this id : ${id}` });
  // }
  res.status(200).json({ data: product });
});

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title)
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Update Specific product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Invalid product id format: ${id}` });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  res.status(200).json({ data: product });
});

// @desc Delete Specific product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Invalid product id format: ${id}` });
  }

  const product = await Product.findByIdAndDelete(id);
  res.status(204).send();
});
