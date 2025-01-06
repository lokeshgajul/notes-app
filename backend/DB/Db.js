import mongoose from "mongoose";

const mongoDbConnection = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://lokeshgajul465:6v4Lo2dZHDE9J367@notescluster.d8rzg.mongodb.net/NOTES-APP?retryWrites=true&w=majority&appName=NotesCluster"
    );

    console.log("Db connected successfully..");
  } catch (error) {
    console.log(error);
  }
};

export default mongoDbConnection;
