import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

// import {
//   getUserNotifications,
//   markNotificationAsRead,
//   deleteNotification,
// } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/request/:userId", protectRoute, sendConnectioRequest);
router.put("/request/:requestId", protectRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);

////////////////////
router.get("/requests", protectRoute, getConnectionRequests);

///////////////////
router.get("/", protectRoute, getUserNotifications);
router.delete("/:userId", protectRoute, removeConnection);
router.get("/status/:usedId", protectRoute, getConnectionStatus);

export default router;
