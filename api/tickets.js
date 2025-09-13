import { MongoClient } from "mongodb";

let client;
let db;

async function connectToDatabase() {
  if (db) return db;
  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db("ticketDB");
  return db;
}

export default async function handler(req, res) {
  const db = await connectToDatabase();
  const tickets = db.collection("tickets");

  if (req.method === "POST") {
    const { name, department, description } = req.body;
    const newTicket = {
      name,
      department,
      description,
      status: "Open",
      createdAt: new Date(),
    };
    await tickets.insertOne(newTicket);
    return res.status(200).json({ success: true, ticket: newTicket });
  }

  if (req.method === "GET") {
    const allTickets = await tickets.find().toArray();
    return res.status(200).json(allTickets);
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    await tickets.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "Completed" } }
    );
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
