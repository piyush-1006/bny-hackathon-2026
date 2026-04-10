const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Official BNY Database Connected!"))
  .catch((err) => console.log("🔴 Database Error:", err));

// --- 2. DATABASE BLUEPRINT (The Trade Model) ---
const tradeSchema = new mongoose.Schema({
  tradeId: { type: String, required: true },
  clientName: { type: String, required: true },
  expectedAmount: { type: Number, required: true },
  actualAmount: { type: Number, required: true },
  variancePercentage: { type: Number, default: 0 },
  status: { type: String, default: "Pending" },
});
const Trade = mongoose.model("Trade", tradeSchema);

// --- 3. ROUTES (The Math Engine) ---
// POST: Calculate variance and save trade
app.post("/api/trades", async (req, res) => {
  try {
    const { tradeId, clientName, expectedAmount, actualAmount } = req.body;

    const difference = Math.abs(expectedAmount - actualAmount);
    const variancePercentage = (difference / expectedAmount) * 100;

    let status = "Auto-Approved";
    if (variancePercentage > 2.0) {
      status = "CRITICAL";
    }

    const newTrade = new Trade({
      tradeId,
      clientName,
      expectedAmount,
      actualAmount,
      variancePercentage: variancePercentage.toFixed(2),
      status,
    });

    await newTrade.save();
    res.status(201).json(newTrade);
  } catch (error) {
    res.status(500).json({ message: "Error processing trade" });
  }
});

// GET: Send trades to dashboard
app.get("/api/trades", async (req, res) => {
  try {
    const allTrades = await Trade.find().sort({ _id: -1 });
    res.json(allTrades);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trades" });
  }
});

// --- 4. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Official Server running on port ${PORT}`);
});
