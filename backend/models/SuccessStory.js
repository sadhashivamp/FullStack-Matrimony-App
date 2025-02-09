const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    story: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const SuccessStory = mongoose.model("SuccessStory", successStorySchema);
module.exports = SuccessStory;
