import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import mongoDbConnection from "./DB/Db.js";
import {
  deleteNote,
  GenerateNote,
  getNoteById,
  getNotes,
  uploadImage,
} from "./Controller/NoteController.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { handleSignup } from "./Controller/AuthController.js";
// import fspromises from "fs/promises";
// import fs from "fs";

dotenv.config();
mongoDbConnection();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename, " ", __dirname);

const tmpFolderPath = path.join(__dirname, "tmp");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tmpFolderPath,
  })
);

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });
})();

app.get("/backend", (req, res) => {
  res.send({ message: "Backend is working!" });
});

app.post("/createNote", GenerateNote);

app.get("/getNotes", getNotes);

app.post("/deleteNote", deleteNote);

// app.post("/uploadImage", async (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ message: "No files were uploaded " });
//     }
//     const file = req.files.image;

//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: "notes-images",
//     });

//     res.status(200).json({
//       message: "File Uploaded Successfully to Cloudinary ",
//       secure_url: result.secure_url,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error uploading file." });
//   }
// });

app.post("/uploadImage", uploadImage);

app.post("/getSingleNote", getNoteById);

app.post("/signup", handleSignup);

app.listen(3000, (req, res) => {
  console.log("Server is running...");
});
