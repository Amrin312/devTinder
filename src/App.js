const express = require('express');
require('dotenv').config();
const User = require('../model/User');

const connectDB = require('../config/database');

const app = express();

app.use(express.json());

app.post('/addUser', async (req, res)=>{
    try{
        const user = new User(req.body);

        await user.save();
        res.send('User Added!');
         
    }catch(err){
        res.status(500).send('Error adding user: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.send('Hello world!');
})

 app.listen(7777, () => {
 console.log(`Server is successfully running on 7777`);
 });


