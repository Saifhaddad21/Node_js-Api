const express = require("express");
const {
  getCategoryValidator,
} = require("../utils/Validators/categoryValidator");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");

const router = express.Router();

// Routes
router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(
    // getCategoryValidator // when i use i give an error
    getCategory
  )
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
