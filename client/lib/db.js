import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Check if the MONGO_URL environment variable is set
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message
    console.log("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
