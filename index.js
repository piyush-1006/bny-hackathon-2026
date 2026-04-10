const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Connected to MongoDB Atlas!"))
  .catch((err) => console.log("🔴 MongoDB Connection Error:", err));

// --- SERVER TEST ROUTE ---
app.get("/api/status", (req, res) => {
  res.json({
    message: "BNY Hackathon Server is LIVE & Database is Connected! 🚀",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
