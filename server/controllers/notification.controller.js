import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profilePicture");

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const notificationId = req.param.id;
  try {
    const notificaiton = await Notification.findByIdAndUpdate({
      _id: notificationId,
      recipient: req.user._id,
    });
  } catch (error) {}
};
