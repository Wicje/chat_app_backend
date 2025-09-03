import { request, response } from 'express';
import chatRoom from '../models/chatRoom.model';

//Create Chatroom
export const createRoom = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const room = await chatRoom.create({
      name,
      users: [req.users._id]// Creator in the room
    });

    res.status(201).json(room);
  } catch (error: any) {
    console.error("error  Creating chatRoom ", error.message);
    res.status(500).json({
      message: "Internal server Error"
    });
  }
};


///Join a server room
export const joinRoom = async (req: Request, res: Response) => {
  try {
    const room = await chatRoom.findById(req.params.id);

    if (!room) return res.status(404).json({ message: "Chat room not found" });

    if (!room.users.includes(req.user._id)) {
      room.users.push(req.user._id);
      await room.save();
    }
    res.json(room);
  } catch (error: any) {
    console.error("Error joining Chatroom", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//Get all User Chatrooms
export const getAllChatrooms = async (req: Request, res: Response) => {
  try {
    const rooms = await chatRooms.find({ users: req.users._id });
    res.json(rooms);
  } catch (error: any) {
    console.error("Error fetching user chat rooms:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
