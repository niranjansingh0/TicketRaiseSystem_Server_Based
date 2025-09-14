# 🎫 Ticket Raise System (Server-based)

This is a server-based ticket raising system built using Node.js, Express, and MongoDB. Users can submit tickets, view all tickets, and manage basic status functionality.

---

## 📁 Project Structure
```
TicketRaiseSystem_Server_Based/
├── index.html            # Frontend UI: form to create tickets + view them
├── style.css             # Styling for frontend layout
├── index.js              # Frontend JavaScript handling form submissions & updates
├── server.js             # Backend server: Express + MongoDB
├── package.json          # Dependencies, scripts, project metadata
└── .gitignore            # Files/folders to ignore in Git
```

---

## ⚙️ Features
- Create a new ticket with name, department, and description.  
- Fetch and display all existing tickets.  
- Persist tickets into a MongoDB database using Mongoose.  
- Simple status tracking (Open / Completed).  
- Cross-origin support (CORS) and JSON-based API.  

---

## 🛠 Tech Stack
- **Node.js** for server runtime  
- **Express.js** for building REST API endpoints  
- **MongoDB** + **Mongoose** for data storage  
- **dotenv** for environment variable management  
- **cors** to allow API calls from front-end  
- Frontend: HTML, CSS, Vanilla JavaScript  

---

## 🔌 Getting Started (Local Development)

1. **Clone the repository**  
   ```bash
   git clone https://github.com/niranjansingh0/TicketRaiseSystem_Server_Based.git
   cd TicketRaiseSystem_Server_Based
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root folder.  
   Inside `.env`, include your MongoDB connection string, e.g.  
   ```env
   YOUR_MONGO_URI=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/databaseName
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Or if you have a custom script in package.json, use that.  
   The server listens usually on port 5000.

5. **Open the frontend**  
   Open `index.html` in your browser (if served statically) or use a static server if required.  
   The frontend will make requests to your server API, e.g. `http://localhost:5000/api/tickets`  

---

## 📡 API Endpoints

| Method | Endpoint                 | Description                | Required Body / Params |
|--------|--------------------------|----------------------------|-------------------------|
| GET    | `/api/tickets`           | Retrieve all tickets       | —                       |
| POST   | `/api/tickets`           | Create a new ticket        | `{ name, department, description }` |
| PUT    | `/api/tickets/:id/complete` | Mark a ticket “Completed” | `:id` param in URL      |

---

## 🧪 Usage Example

### Creating a Ticket
```js
fetch('http://localhost:5000/api/tickets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Alice',
    department: 'IT Support',
    description: 'Issue with login'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Fetching All Tickets
```js
fetch('http://localhost:5000/api/tickets')
  .then(res => res.json())
  .then(tickets => console.log(tickets))
  .catch(err => console.error(err));
```

---

## 📦 Dependencies
Some of the main npm packages used:
- **express** — HTTP server & routing  
- **mongoose** — MongoDB ODM  
- **dotenv** — Load environment variables  
- **cors** — Enable cross-origin requests  

---

## 🔐 Environment Variables
Important variables you need to configure:
```text
YOUR_MONGO_URI=your-mongodb-connection-string
PORT=5000  # or whatever port you want, if configurable
```
⚠️ Make sure not to commit your `.env` file. Add `.env` to `.gitignore`.


---

## 🔧 Troubleshooting
- If server fails to connect to MongoDB → check `YOUR_MONGO_URI` value, ensure network & credentials are correct.  
- If CORS issues appear → ensure front-end is calling correct origin (port/domain).  
- If frontend not seeing new tickets → clear browser cache or ensure the JS is fetching from correct API endpoint.  

---

## 📜 License & Author
Author: **Niranjan Singh**  


---

## ✅ Getting it Deployed
When you’re ready to deploy, you can use services like:
- **Heroku**  
- **Render.com**  
- **Railway.app**  


You’ll need to set up environment variables there, especially the MongoDB URI.
