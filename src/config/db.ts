


import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI as string;
  if (!uri) throw new Error("MONGO_URI missing in .env");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("🟢 MongoDB connected");
}
