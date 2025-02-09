const express = require("express");
const multer = require("multer");
const path = require("path");
const { createUserProfile, getProfile, deleteAccount } = require("../controllers/profileController");

const router = express.Router();

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ Create Profile API
router.post("/", upload.fields([{ name: "profilePhoto", maxCount: 1 }, { name: "gallery", maxCount: 10 }]), createUserProfile);
router.get("/:userId", getProfile);
router.delete("/:userId", deleteAccount);

module.exports = router;
