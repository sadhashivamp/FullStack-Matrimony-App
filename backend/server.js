const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./config/db");
const path = require("path");

// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ Serve uploaded images


// API Prefix from .env
const API_PREFIX = process.env.API_PREFIX || "/api/matrimony-sadha-dev";

// Routes with custom prefix
app.use(`${API_PREFIX}/landing`, require("./routes/landingRoutes"));
app.use(`${API_PREFIX}/auth`, require("./routes/authRoutes"));
app.use(`${API_PREFIX}/profile`, require("./routes/profileRoutes"));
app.use(`${API_PREFIX}/admin`, require("./routes/adminRoutes"));
app.use(`${API_PREFIX}/matches`, require("./routes/matchesRoutes"));


// Default route
app.get("/", (req, res) => {
    res.send("Matrimony API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
