const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter= require('./routes/Auth');
const profileRouter= require('./routes/Profile');
const requestRouter= require('./routes/Request');
const userRouter= require('./routes/User');
const cors = require('cors');
const path = require("path");

const app = express();

app.use(cors({
   origin: process.env.CLIENT_UR,
   credentials: true
}));

app.use(express.json());
app.use(cookieParser());
// app.use(authRouter, profileRouter, requestRouter, userRouter);

app.use('/api', authRouter);
app.use('/api', profileRouter);
app.use('/api', requestRouter);
app.use('/api', userRouter);

// app.use('/uploads', require("express").static("uploads"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);


app.listen(7777, () => {
    console.log(`Server is successfully running on 7777`);
 });