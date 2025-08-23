const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskRoutes = require("./taskRoutes");
const cors = require("cors");
const path = require("path");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON body

// Connect to MongoDB and then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Stop the app if DB connection fails
  });

// API routes
app.use("/api/tasks", taskRoutes);

// Serve frontend (static files in /public)
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));