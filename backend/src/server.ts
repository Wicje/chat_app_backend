import dotenv from 'dotenv';
import app from './app';
import http from 'http';
import connectDB from 'db.lib';
import { SocketAuth } from './middleware/socketauth.middleware'
//Env Setup
dotenv.config();

const PORT = process.env.PORT || 3000;

//setup hhtp connection
const server = http.createServer(app);

//Call DB
connectDB();

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.data.user.id}`);

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${socket.data.user.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", (messageData) => {
    const { roomId, content } = messageData;

    io.to(roomId).emit("newMessage", {
      sender: socket.data.user.id,
      content,
      createdAt: new Date()
    });
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.data.user.id}`);
  });
});

//Start APP
app.listen(PORT, () => {
  console.log("Mongo is Active at ${PORT}");
});
