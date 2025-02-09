const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile");

// ✅ Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// // ✅ Login User
// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//         // ✅ Fetch Profile (Returns `null` if not found)
//         const profile = await Profile.findOne({ userId: user._id }) || null;

//         res.status(200).json({ token, user, profile });
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// ✅ Login User or Admin
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Register Admin
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin already exists
        let admin = await User.findOne({ email });
        if (admin) return res.status(400).json({ message: "Admin already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin user
        admin = new User({ name, email, password: hashedPassword, role: "admin" });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Admin Registration Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
