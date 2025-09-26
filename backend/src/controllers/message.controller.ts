
import { Request,Response } from "express";
import Message from "../models/message.model";
import ChatRoom from "../models/chatRoom.model";

export const sendMessage = async (req:Request, res:Response)  => {
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
      chatRoom: room,
      sender: req.user._id
    });

    res.status(201).json(message);

    room.messages.push(message._id);
    await room.save();
   } catch(error) {
    console.error("Error sending message", error.message);
    res.status(500).json({
      message: "Internal server error"
    });
   }
};


export const getMessages = async (req: Request, res: Response) => {
//process
//variables
//find the room and then ensure i belong to the room

try {
  const { roomId } = req.params;

  //find the room 
  const room = await ChatRoom.findById(roomId);
  if (!room) {
    return res.status(404).json({
      message: "Room not found"
    });
  }

  //ensure that user belongs to the room 
  if (!room.users.includes(req.user.Id)) {
    return res.status(403).json({
      message:"You do not belong here"
    });
  }

  const messages = await Message.find({ chatRoom: roomId })
  .populate("sender", "fullName profilePic email") // get sender details
  .sort({ createdAt: 1 }); // oldest → newest

res.json(messages);
}catch (error: any) {
  console.error('internal server error', error.message);
  res.status(201).json({
    message: 'internal server bullshit'
  });
}
};



