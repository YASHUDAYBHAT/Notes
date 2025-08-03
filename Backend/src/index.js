import express from "express";
import notesRoute from "./Routes/notesRoute.js";
import dotenv from "dotenv";
import connectDB from "./Lib/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS: allow frontend access
app.use(cors({
  origin: [
    "https://notes-frontend-cnqw.onrender.com", // your deployed frontend
    "http://localhost:5173" // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/notes", notesRoute);

// MongoDB connection
connectDB();

// (Optional) Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server has started at: ${PORT}`);
});
