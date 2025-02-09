const express = require("express");
const { getRecommendedMatches, getCasteMatches, getAllMatches } = require("../controllers/matchesController");

const router = express.Router();

router.get("/recommended/:userId", getRecommendedMatches);
router.get("/caste-wise/:userId", getCasteMatches);
router.get("/all", getAllMatches);

module.exports = router;
