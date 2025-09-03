import mongoose, { Document, Schema } from 'mongoose';

export interface IChatRoom extends Document {
  name: string;
  users: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}


const chatRoomSchema = new Schema<IChatRoom>(
  {
    name: { type: String, required: True },
    users: [{ type: mongoose.Types.ObjectId[], ref: Users }]
  },
  { timeStamp: true },
);

export default mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);
