import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
    });

    console.log("✅ MongoDB Connected");
    console.log("Host:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Error:");
    console.error(error);
  }
};

export default connectDB;