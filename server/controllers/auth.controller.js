import User from "../models/user.models.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingemail = await User.findOne({ email });
    if (existingemail) {
      res.status(400).json({ message: "Email Already Exists" });
    }
    const existingusername = await User.findOne({ username });
    if (existingusername) {
      res.status(400).json({ message: "Email Already Exists" });
    }
  } catch (err) {}
};

export const login = (req, res) => {
  res.send("login page");
};

export const logout = (req, res) => {
  res.send("logout page");
};
