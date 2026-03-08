require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./Router/AuthRouter");
const goalRoutes = require("./Router/GoalRouter");

// Error Middleware
const errormiddleware = require("./Middlewares/errormiddleware");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// MongoDB Connection
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("API Running");
});

// Use Routes
app.use("/", authRoutes);
app.use("/goal", goalRoutes);

// Error Middleware
app.use(errormiddleware);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});