const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Admin Authentication Middleware
exports.authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await User.findById(decoded.id);

        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Access Denied. Not Authorized." });
        }

        req.admin = adminUser;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         if (verified.role !== "admin") {
//             return res.status(403).json({ message: "Unauthorized: Admin access required" });
//         }
//         req.admin = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid Token" });
//     }
// };