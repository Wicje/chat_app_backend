
import { Request,Response } from "express";
import Message from "../models/message.model";
import ChatRoom from "../models/chatRoom.model";

export const sendMessage = async (req:Request, res:Response) {
   try {

    const { content } = req.body;
    const { chatRoomId } = req.params;

    const room = await ChatRoom.findById(chatRoomId);

    if (!room) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    if (!room.users.includes(req.user._id)) {
        return res.status(403).json9({ 
            message: "You are not in this chat room"
        });
    }

    const message = new Message({
      content,
      chatRoom: roomId,
      sender: req.user._id
    });

    await message.save();

    room.messages.push(message._id);
    await room.save();
   }
}