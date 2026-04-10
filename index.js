// 1. Import the tools you just installed
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 2. Initialize the server app
const app = express();

// 3. Set up Middleware (Security and Data handling)
app.use(cors()); // Lets your future frontend talk to this backend
app.use(express.json()); // Lets your backend read JSON data

// 4. Create your first Route (The API endpoint)
app.get("/api/status", (req, res) => {
  res.json({
    message: "BNY Hackathon Server is LIVE! 🚀",
    timestamp: new Date(),
  });
});

// 5. Define the port and turn the server on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
