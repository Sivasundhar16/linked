import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendWelcomeEmail } from "../email/emailHandlers.js";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    const existingusername = await User.findOne({ username });
    if (existingusername) {
      //if it had a value it returns true .
      return res.status(400).json({ message: "Username Already Exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must contain atleast 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); //1234567 => @#@$$%!WSGSGs

    const user = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    //////  THE ABOVE PART STORES THE DETAILS IN THE DATABASE ////////////

    /////////GENERATE JWT TOKEN //////////////////

    //payload , secret key , expires date
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });

    res.cookie("jwt-linkedin", token, {
      httpOnly: true, //prevent xss attack
      maxAge: 3 * 24 * 60 * 1000,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production", //prevents man in the middle attacks
    });

    res.status(201).json({ message: "User register Successfully" });

    // send welcome email
    const profileUrl = process.env.CLIENT_URL + "/profile" + user.username;

    try {
      await sendWelcomeEmail(user.email, user.name, profileUrl);
    } catch (err) {
      console.log("Error in sending Email", err.message);
    }
  } catch (err) {
    console.log("Error in the setup", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // create and send token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });

    await res.cookie("jwt-linkedin", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    }); // 3 days

    res.status(200).json({
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error Occur " + error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt-linkedin");
  res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("Error in the getcurrentuser", error.message);
    res.status(500).json({ message: "server error" });
  }
};
