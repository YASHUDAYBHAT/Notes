import express, { Router } from "express";
import { getallnotes, createallnotes, updatenotes, deletenotes, getNoteById } from "../Controllers/notesController.js"

const router = express.Router()

router.get("/", getallnotes);
router.post("/",createallnotes);
router.put("/:id",updatenotes);
router.delete("/:id",deletenotes);
router.get("/:id", getNoteById);


export default router;
