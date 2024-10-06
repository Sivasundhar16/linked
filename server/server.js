import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectDB from "../client/lib/db.js"; // Import connectDB as a named import
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables

const app = express();

// Simple route to check if server is running

app.use(express.json());
app.use(cookieParser());

// Use authentication routes
app.use("/api/v1/auth", authRoute);
app.get("/", (req, res) => {
  res.send("server is running");
});
// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start the server:", error.message);
  }
};

// Start the server

startServer();
