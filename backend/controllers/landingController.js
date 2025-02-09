const SuccessStory = require("../models/SuccessStory");
const multer = require("multer");

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fetch all success stories
exports.getSuccessStories = async (req, res) => {
    try {
        const stories = await SuccessStory.find();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Create a new success story (Admin only)
exports.createSuccessStory = async (req, res) => {
    try {
        const { name, story } = req.body;
        const image = req.file ? req.file.buffer.toString("base64") : null; // Convert image to Base64 if uploaded

        if (!name || !story) {
            return res.status(400).json({ message: "Name and story are required" });
        }

        const newStory = new SuccessStory({
            name,
            image,
            story,
        });

        await newStory.save();
        res.status(201).json({ message: "Success story added successfully!", newStory });
    } catch (error) {
        res.status(500).json({ message: "Error creating success story", error });
    }
};
