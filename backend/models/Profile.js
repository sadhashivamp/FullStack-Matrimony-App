const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    bio: { type: String },
    religion: { type: String },
    caste: { type: String },
    motherTongue: { type: String },
    education: { type: String },
    occupation: { type: String },
    income: { type: String },
    height: { type: String },
    weight: { type: String },
    diet: { type: String },
    drinking: { type: String },
    smoking: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    siblings: { type: String },
    native: { type: String },
    preferredAge: { type: Array },
    preferredHeight: { type: Array },
    preferredLocation: { type: String },
    profilePhoto: { type: String },
    gallery: [{ type: String }],
    verified: { type: Boolean, default: false },
    profileCompleted: { type: Boolean, default: false },
    lastCompletedStep: { type: Number, default: 0 },
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
