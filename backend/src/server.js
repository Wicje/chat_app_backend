import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.lib.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

//env config
dotenv.config();

//Initialise Express app
const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT` + PORT);
  connectDB();
});
