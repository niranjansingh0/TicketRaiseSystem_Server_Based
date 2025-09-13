import mongoose from "mongoose";
import Ticket from "./models/Ticket"; // Create a Ticket model file

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    return res.status(200).json(tickets);
  }

  if (req.method === "POST") {
    const { name, department, description } = JSON.parse(req.body);
    const ticket = new Ticket({
      name,
      department,
      description,
      status: "Open",
      createdAt: new Date(),
    });
    await ticket.save();
    return res.status(200).json({ success: true, ticket });
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    const ticket = await Ticket.findByIdAndUpdate(id, { status: "Completed" }, { new: true });
    if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });
    return res.json({ success: true, ticket });
  }

  res.status(405).json({ message: "Method not allowed" });
}
