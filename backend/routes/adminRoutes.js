const express = require("express");
const { getUserStats, deleteUser } = require("../controllers/adminController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get All User Accounts & Gender Stats (Admin Only)
router.get("/user-stats", authenticateAdmin, getUserStats);
router.delete("/delete-user/:userId", authenticateAdmin, deleteUser);

module.exports = router;
