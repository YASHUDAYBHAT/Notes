import Note from "../model/notesModel.js";

export async function getallnotes(_, res) {
    try {
        const notes = await Note.find()
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getallnotes",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function createallnotes(req,res) {
    try {
        const { title, content} = req.body;
        const newnote = new Note({title , content});

        const savednote =  await newnote.save();
        res.status(201).json(savednote);

       
    }catch (error) {
        console.log("Error in createallnotes",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function deletenotes(req,res) {
    try {
        const deletenote = await Note.findByIdAndDelete(req.params.id);
        if (!deletenote) return res.status(404).json({message: "NOTES ARE NOT FOUND"});
            res.status(201).json({message: "Notes are deleted Successfully"});

    }catch (error) {
        console.log("Error in deleteallnotes",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function updatenotes(req, res) {
  try {
    const { title, content } = req.body;
    const Updatenote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!Updatenote) {
      return res.status(404).json({ message: "NOTES ARE NOT FOUND" });
    }

    res.status(200).json(Updatenote); // ✅ return the updated note object
  } catch (error) {
    console.log("Error in Updateallnotes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

