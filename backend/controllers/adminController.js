const User = require("../models/User");
const Profile = require("../models/Profile");

// exports.getUserStats = async (req, res) => {
//     try {
//         const totalUsers = await User.countDocuments();
//         const maleUsers = await Profile.countDocuments({ gender: "Male" });
//         const femaleUsers = await Profile.countDocuments({ gender: "Female" });

//         const maleUserProfiles = await Profile.find({ gender: "Male" }).populate("userId", "name email");
//         const femaleUserProfiles = await Profile.find({ gender: "Female" }).populate("userId", "name email");

//         res.status(200).json({
//             totalUsers,
//             maleUsers,
//             femaleUsers,
//             users: {
//                 male: maleUserProfiles,
//                 female: femaleUserProfiles,
//             }
//         });

//     } catch (error) {
//         console.error("Error fetching user stats:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// };


// ✅ DELETE USER API (Admin Only)
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // ✅ Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Delete user's profile first
        await Profile.findOneAndDelete({ userId });

        // ✅ Then delete the user account
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getUserStats = async (req, res) => {
    try {
        const totalUsers = await Profile.countDocuments({});
        const maleUsers = await Profile.countDocuments({ gender: { $regex: /^male$/i } });
        const femaleUsers = await Profile.countDocuments({ gender: { $regex: /^female$/i } });

        const maleProfiles = await Profile.find({ gender: { $regex: /^male$/i } });
        const femaleProfiles = await Profile.find({ gender: { $regex: /^female$/i } });

        res.status(200).json({
            totalUsers,
            maleUsers,
            femaleUsers,
            users: {
                male: maleProfiles,
                female: femaleProfiles
            }
        });
    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).json({ message: "Server error", error });
    }
};