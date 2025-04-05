const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const slugify = require("slugify");
const CategoryModel = require("../models/categoryModel");

// @desc Get All Categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(201).json({ results: categories.length, page, data: categories });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if id is valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Invalid category id format: ${id}` });
  }

  const category = await CategoryModel.findById(id);
  // if (!category) {
  //   return res.status(404).json({ msg: `No category for this id : ${id}` });
  // }
  res.status(200).json({ data: category });
});

// @desc Create Category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Update Specific Category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Invalid category id format: ${id}` });
  }

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  res.status(200).json({ data: category });
});

// @desc Delete Specific Category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Invalid category id format: ${id}` });
  }

  const category = await CategoryModel.findByIdAndDelete(id);
  res.status(204).send();
});
