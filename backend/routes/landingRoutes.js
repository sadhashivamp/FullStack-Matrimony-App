const express = require("express");
const { getSuccessStories, createSuccessStory } = require("../controllers/landingController");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage

// GET: Fetch all success stories
router.get("/success-stories", getSuccessStories);

// POST: Create a new success story (Supports form-data)
router.post("/success-stories", upload.single("image"), createSuccessStory);

module.exports = router;
