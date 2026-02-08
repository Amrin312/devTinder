const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter= require('./routes/Auth');
const profileRouter= require('./routes/Profile');
const requestRouter= require('./routes/Request');
const userRouter= require('./routes/User');
const cors = require('cors');

const app = express();

app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(authRouter, profileRouter, requestRouter, userRouter);

 app.listen(7777, () => {
    console.log(`Server is successfully running on 7777`);
 });