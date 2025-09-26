import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.route';
import messageRoutes from './controllers/message.controller';
import chatRoomRoutes from "./controllers/chatRoom.controller"
const app: Application = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//Test user output
/*app.post('/test user', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "The app is Crashing",
      error
    });
  }
});*/

//Route

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/chatroom', chatRoomRoutes);
app.use('/api/v1/messages', messageRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send("App running Successfully");
});


export default app;