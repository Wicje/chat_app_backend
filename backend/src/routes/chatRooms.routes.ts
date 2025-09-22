import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { createRoom, joinRoom, getAllChatrooms } from "../controllers/chatRoomController";

const router = Router();

router.post("/", protect, createRoom);
router.post("/:id/join", protect, joinRoom);
router.get("/", protect, getAllChatrooms);

export default router;
