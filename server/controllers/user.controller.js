import User from "../models/user.models.js";

export const getSuggestedConnections = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");

    // find user that already connected and also do not recommend our own profile
  } catch (error) {}
};
