import mongoose from "mongoose";
let isConnected: boolean = false;

export const connnectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("No connection");
  }
  if (isConnected) {
    return console.log("Already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "solutionvault",
    });
    isConnected = true;
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err);
  }
};
