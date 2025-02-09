const express = require("express");
const { registerUser, registerAdmin, loginUser, resetPassword, sendOTP, verifyOTP } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/register", registerAdmin); // ✅ Admin Registration Route
router.post("/admin/login", loginUser);

module.exports = router;
