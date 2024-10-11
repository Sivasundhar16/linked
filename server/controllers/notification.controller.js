import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "content image");

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const notificationId = req.param.id;
  try {
    const notificaiton = await Notification.findByIdAndUpdate(
      {
        _id: notificationId,
        recipient: req.user._id,
      },
      { read: true },
      { new: true }
    );
    res.json(notificaiton);
  } catch (error) {
    console.log("Error occured", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteNotification = async (req, res) => {
  const notificationId = req.param.id;

  try {
    await Notification.findByIdAndDelete({
      _id: notificationId,
      recipient: req.user._id,
    });
    res.json({ message: "Notification Deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
