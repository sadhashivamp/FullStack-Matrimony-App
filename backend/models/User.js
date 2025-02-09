const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    role: { type: String, default: "user", enum: ["user", "admin"] } // ✅ Admin Role
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);