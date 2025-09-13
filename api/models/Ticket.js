import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  name: String,
  department: String,
  description: String,
  status: { type: String, default: "Open" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
