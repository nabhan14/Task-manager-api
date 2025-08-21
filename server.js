const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskRoutes = require("./taskRoutes");
dotenv.config();

const app = express();
app.use(express.json()); // to parse JSON body

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(" MongoDB connection error:", err));

// Simple test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// Import task routes

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));