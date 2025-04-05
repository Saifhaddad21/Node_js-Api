const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/ValidatorMiddleware");

exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('category name is required')
    .isLength({min: 3})
    .withMessage('category name must be at least 3 characters')
    .isLength({max: 50})
    .withMessage('category name must be less than 50 characters'),
    validatorMiddleware
];


exports.updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
  ];

  exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
  ];  


  