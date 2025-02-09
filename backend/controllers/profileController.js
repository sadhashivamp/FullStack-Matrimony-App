const Profile = require("../models/Profile");
const User = require("../models/User");



exports.createUserProfile = async (req, res) => {
    try {

        const {
            userId, name, age, gender, dob, bio, religion, caste, motherTongue,
            education, occupation, income, height, weight, diet, drinking, smoking,
            fatherName, motherName, siblings, native, preferredAge, preferredHeight, preferredLocation, verified
        } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        let profilePhotoUrl = "";
        if (req.file) {
            profilePhotoUrl = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
        }

        const profileData = {
            userId,
            name,
            age,
            gender,
            dob,
            bio,
            religion,
            caste,
            motherTongue,
            education,
            occupation,
            income,
            height,
            weight,
            diet,
            drinking,
            smoking,
            fatherName,
            motherName,
            siblings,
            native,
            preferredAge: preferredAge.split(","), // Convert to array
            preferredHeight: preferredHeight.split(","), // Convert to array
            preferredLocation,
            verified,
            profilePhoto: profilePhotoUrl, // ✅ Store image URL
        };

        console.log("Profile Data to Save:", profileData);

        res.status(201).json({ message: "Profile created successfully", profile: profileData });
    } catch (error) {
        console.error("Profile creation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Create or Update User Profile (Resume from Last Step)
exports.createUserProfile = async (req, res) => {
    try {
        const {
            userId, name, age, gender, dob, bio, religion, caste, motherTongue,
            education, occupation, income, height, weight, diet, drinking, smoking,
            fatherName, motherName, siblings, native, preferredAge, preferredHeight, preferredLocation, verified
        } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // ✅ Convert Stringified Arrays to JSON
        const parsedPreferredAge = preferredAge ? preferredAge.split(",").map(Number) : [];
        const parsedPreferredHeight = preferredHeight ? preferredHeight.split(",").map(Number) : [];

        // ✅ Handle Image Uploads
        let profilePhotoUrl = "";
        if (req.file) {
            profilePhotoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.files.profilePhoto[0].filename}`;
        }

        // ✅ Check if Profile Already Exists (for Update)
        let profile = await Profile.findOne({ userId });

        if (profile) {
            // ✅ Update Existing Profile
            profile = await Profile.findOneAndUpdate(
                { userId },
                {
                    name, age, gender, dob, bio, religion, caste, motherTongue,
                    education, occupation, income, height, weight, diet, drinking, smoking,
                    fatherName, motherName, siblings, native,
                    preferredAge: parsedPreferredAge,
                    preferredHeight: parsedPreferredHeight,
                    preferredLocation,
                    verified,
                    profilePhoto: profilePhotoUrl, // ✅ Retain previous image if not updated
                    profileCompleted: true,
                },
                { new: true }
            );
        } else {
            // ✅ Create New Profile
            profile = new Profile({
                userId, name, age, gender, dob, bio, religion, caste, motherTongue,
                education, occupation, income, height, weight, diet, drinking, smoking,
                fatherName, motherName, siblings, native,
                preferredAge: parsedPreferredAge,
                preferredHeight: parsedPreferredHeight,
                preferredLocation,
                verified,
                profilePhoto: profilePhotoUrl,
                profileCompleted: true,
            });

            await profile.save();
        }

        res.status(201).json({ message: "Profile created successfully", profile });
    } catch (error) {
        console.error("Profile Creation Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// ✅ Get Profile
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.params.userId });
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        // ✅ Return Image URL
        profile.profilePhoto = profile.profilePhoto ? `http://localhost:5000${profile.profilePhoto}` : null;

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Delete Profile
exports.deleteAccount = async (req, res) => {
    try {
        await Profile.findOneAndDelete({ userId: req.params.userId });
        res.json({ message: "User account deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
