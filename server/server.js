import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoutes from "./routes/post.routs.js";
import connectDB from "../client/lib/db.js"; // Import connectDB as a named import
import cookieParser from "cookie-parser";
import notificationRoutes from "./routes/notification.routes.js";
import connectionRoutes from "./routes/connection.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

// Simple route to check if server is running

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Use authentication routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist/")));
  app.get("*", (res, req) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start the server:", error.message);
  }
};

// Start the server

startServer();
