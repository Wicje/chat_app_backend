import express, { Application } from 'express';
import User from './models/user.model';

const app:Application = express();

//middleware
app.use(express.json());

//Test user output
app.post('/test user', async (req, res) => {
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
});

//Route
app.get('/', (req:Request, res: Response ) => {
  res.send("App running Successfully");
});


export default app;
