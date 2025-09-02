import dotenv from 'dotenv';

//Env Setup
dotenv.config();

import app from ./app;
import connectDB from 'db.lib';

const PORT = process.env.PORT || 3000;

//Call DB
connectDB():

//Start APP
app.listen(PORT, () => {
  console.log("Mongo is Active at ${PORT}");
});
