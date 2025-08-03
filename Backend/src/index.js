import express from "express";
import notesRoute from "./Routes/notesRoute.js"
import dotenv from "dotenv";
import connectDB  from "./Lib/db.js"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
   { origin:"http://localhost:5173",}
));
app.use(express.json())
app.use("/api/notes", notesRoute);


connectDB();
app.listen( PORT , () => {
    console.log(`Server has started at: ${PORT}`)
});