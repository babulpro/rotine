import mongoose from "mongoose";

let isConnected = false; // global state

export async function connectToDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "unwind", // optional: specify DB name
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Atlas connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}


  