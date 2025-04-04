// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;
