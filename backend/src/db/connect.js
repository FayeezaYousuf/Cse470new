import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connect = async () => {
  try {
    console.log("Attempting to connect to database.....");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database.....");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

// Handle unhandled rejections globally
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

export default connect;
