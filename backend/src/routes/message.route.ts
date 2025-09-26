import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { sendMessage, getMessages } from "../controllers/message.controller";

const router = Router();
router.post("/:roomId", protect, sendMessage);
router.get("/:roomId", protect, getMessages);

export default router;