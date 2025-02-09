const Profile = require("../models/Profile");

// ✅ Get Recommended Matches
exports.getRecommendedMatches = async (req, res) => {
    try {
        const { userId } = req.params;
        const userProfile = await Profile.findOne({ userId });

        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        // ✅ Fetch users with similar interests, education, or occupation
        const matches = await Profile.find({
            _id: { $ne: userProfile._id }, // Exclude the current user
            occupation: userProfile.occupation, // Match based on occupation
        });

        res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get Caste-Based Matches
exports.getCasteMatches = async (req, res) => {
    try {
        const { userId } = req.params;
        const userProfile = await Profile.findOne({ userId });

        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        const matches = await Profile.find({
            caste: userProfile.caste,
            _id: { $ne: userProfile._id }
        });

        res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get All Matches
exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Profile.find({});
        res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
