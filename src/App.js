const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter= require('./router/Auth');
const profileRouter= require('./router/Profile');
const requestRouter= require('./router/Request');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRouter, profileRouter, requestRouter);

 app.listen(7777, () => {
    console.log(`Server is successfully running on 7777`);
 });