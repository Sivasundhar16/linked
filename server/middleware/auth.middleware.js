import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-linkedin"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unautharized - No token Provied" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorezed - Invalid Token" });
    }

    // token contains userId . we set in auth.controller.js file . look for refer

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; //put the user request . because it uses in multiple different place

    next();
  } catch (error) {
    console.log("Error in Protect route", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
