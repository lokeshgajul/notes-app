import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDbConnection from "./DB/Db.js";
import { GenerateNote, getNotes } from "./Controller/NoteController.js";

dotenv.config();
mongoDbConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/backend", (req, res) => {
  res.send({ message: "Backend is working!" });
});

app.post("/createNote", GenerateNote);

app.get("/getNotes", getNotes);

app.listen(3000, (req, res) => {
  console.log("Server is running...");
});
