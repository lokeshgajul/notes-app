import mongoose from "mongoose";
import Note from "../Schema/NoteModel.js";
import { v2 as cloudinary } from "cloudinary";
import NoteModel from "../Schema/NoteModel.js";

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

export const deleteNote = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted", note });
    console.log("Note deleted:", note);
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { id } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded" });
    }
    const file = req.files.image;

    // console.log("Temporary file path:", file.tempFilePath);

    // Check if the file exists temporarily
    // if (fs.existsSync(file.tempFilePath)) {
    //   console.log("File exists in temp directory.");
    // } else {
    //   console.log("File does not exist in temp directory.");
    // }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "notes-images",
    });

    // res.status(200).json({
    //   message: "File Uploaded Successfully to Cloudinary",
    //   secure_url: result.secure_url,
    // });

    const secureURl = result.secure_url;

    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { image: secureURl },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "File Uploaded Successfully to Cloudinary and saved to Note",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file." });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.body;
    const selectedNotes = await Note.findById(id);
    res.status(200).json({ message: "retrieved successfully ", selectedNotes });
  } catch (error) {
    console.error(error);
  }
};
