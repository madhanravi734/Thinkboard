import express from "express";
import { getAllnotes,postNewNotes,updateNotes,deleteNotes,getByIdnotes} from "../controllers/notesController.js";
const router=express.Router();

router.get("/",getAllnotes);
router.get("/:id",getByIdnotes);
router.post("/",postNewNotes);
router.put("/:id",updateNotes)
router.delete("/:id",deleteNotes)

export default router
