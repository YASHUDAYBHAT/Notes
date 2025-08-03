import express from "express";
import notesRoute from "./Routes/notesRoute.js";
import dotenv from "dotenv";
import connectDB from "./Lib/db.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup: allow frontend access
app.use(
  cors({
    origin: [
      "https://notes-frontend-cnqw.onrender.com", // deployed frontend
      "http://localhost:5173"                     // dev frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// API routes
app.use("/api/notes", notesRoute);

// Connect to MongoDB
connectDB();

// No need to serve frontend — it's deployed separately on Render
app.listen(PORT, () => {
  console.log(`✅ Server has started on port ${PORT}`);
});
