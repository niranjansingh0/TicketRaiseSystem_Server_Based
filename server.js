require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000; // Use Render PORT

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname))); // serves index.html, style.css, etc.

// Connect to MongoDB
mongoose.connect(process.env.YOUR_MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// Ticket Schema
const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, default: "General" },
    description: { type: String, required: true },
    status: { type: String, default: "Open" },
    createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// Routes

// Test route
app.get("/api/test", (req, res) => {
    res.json({ success: true, message: "Backend is working!" });
});

// Get all tickets
app.get("/api/tickets", async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Create new ticket
app.post("/api/tickets", async (req, res) => {
    try {
        const { name, department, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ success: false, error: "Name and description are required" });
        }

        const ticket = new Ticket({ name, department, description });
        await ticket.save();

        res.json({ success: true, ticket });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Mark ticket complete
app.put("/api/tickets/:id/complete", async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { status: "Completed" },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ success: false, error: "Ticket not found" });
        }

        res.json({ success: true, ticket: updatedTicket });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Catch-all to serve index.html for any other route (frontend routing)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
