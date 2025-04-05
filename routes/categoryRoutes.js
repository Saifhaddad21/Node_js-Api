const express = require("express");
const {
  getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator
} = require("../utils/Validators/categoryValidator");

const {
  getCategories,  
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const router = express.Router();

// Routes
router.route("/").get(getCategories).post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
