import Note from "../Schema/NoteModel.js";

export const GenerateNote = async (req, res) => {
  console.log("Request received:", req.body); // Log request body
  const { title, description } = req.body;

  if (!title || !description) {
    console.log("Validation failed");
    return res.status(400).json({ message: "title and desc are required" });
  }

  try {
    const newNote = new Note({ title, description });
    const savedNote = await newNote.save();
    console.log("Note saved:", savedNote); // Log saved note
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ message: "error", error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().lean();
    res.status(200).json(notes);
  } catch (error) {
    console.log("error", error);
  }
};
