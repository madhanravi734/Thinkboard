import Note from "../models/Note.js";

export async function getAllnotes(req,res){
   try {
    const notes=await Note.find().sort({createAt:-1});
    res.status(200).json(notes);
   } catch (error) {
    console.error("Error in getAllnotes",error)
    res.status(500).json({message:"Internal server error"});
   }
}
export async function getByIdnotes(req,res) {
 try {
    const getnotes=await Note.findById(req.params.id)
     if(! getnotes) return res.status(404).json({message:"Not found"});
    res.status(200).json(getnotes)
 } catch (error) {
    console.error("Error in getByIdnotes",error)
    res.status(500).json({message:"Internal server error"});
 }   
}
export async function postNewNotes(req,res){
    try {
       const {title,content}=req.body;
       const newNote=new Note({title,content});
       await newNote.save();
      res.status(201).json({message:"Note created successfully"})    
    } 
    catch (error) {
        console.error("Error in createNewnote",error)
    res.status(500).json({message:"Internal server error"});
    }
    
}
export async function updateNotes(req,res){
    try {
     const {title,content}=req.body;
     const updatednote=await Note.findByIdAndUpdate(req.params.id,{title,content});   
     if(! updatednote) return res.status(404).json({message:"Not found"});
     res.status(200).json(updatednote)   
    } catch (error) {
         console.error("Error in updateNote",error)
    res.status(500).json({message:"Internal server error"});
    }
}
export async function deleteNotes(req,res){
    try {
        const{title,content}=req.body;
        const deletenote=await Note.findByIdAndDelete(req.params.id,{title,content})
         if(! deletenote) return res.status(404).json({message:"Not found"});
        res.status(200).json({message:"Note deleted successfully"})
    } catch (error) {
        console.error("Error in deletenote",error)
    res.status(500).json({message:"Internal server error"});
    }
    
}