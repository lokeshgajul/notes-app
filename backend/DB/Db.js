import mongoose from "mongoose";

const mongoDbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.mongoDbUrl);

    console.log("Db connected successfully..");
  } catch (error) {
    console.log(error);
  }
};

export default mongoDbConnection;
