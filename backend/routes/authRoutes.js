const express = require("express");
const { loginAdmin, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/auth/login
router.post("/login", loginAdmin);

// @route   GET /api/auth/me
router.get("/me", protect, getMe);

module.exports = router;
