import User from "../models/user.models.js";
import cloudinary from "../cloud/cloudnary.js";

export const getSuggestedConnections = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");

    // find user that already connected and also do not recommend our own profile
    const suggestedUser = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: currentUser.connections,
      },
    })
      .select("name username profilePicture headline ")
      .limit(3);

    res.json(suggestedUser);
  } catch (error) {
    console.log("Error in the controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("Error in the controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "headline",
      "about",
      "location",
      "profilePicture",
      "bannerImg",
      "skills",
      "experience",
      "education",
    ];
    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    // do profile img and banner img

    if (req.body.profilePicture) {
      const result = await cloudinary.uploader.upload(req.body.profilePicture);
      updatedData.profilePicture = result.secure_url;
    }
    if (req.body.bannerImg) {
      const result = await cloudinary.uploader.upload(req.body.bannerImg);
      updatedData.bannerImg = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
