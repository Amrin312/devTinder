const express = require('express');
require('dotenv').config();
const User = require('../model/User');
const bcrypt = require('bcrypt');

const connectDB = require('../config/database');

const app = express();

app.use(express.json());

app.post('/addUser', async (req, res)=>{
    try{
        const {firstName, lastName, age, email, gender} = req.body;
        const data = req.body;

        const allowed_field = ['firstName', 'lastName', 'age', 'email', 'gender', 'password'];
        
        const check_allowed_fields = Object.keys(data).every(k => allowed_field.includes(k));

        if(!check_allowed_fields) throw new Error("You cannot add extra fields!");

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({firstName, lastName, age, email, gender, password: hashPassword});

        await user.save();

        res.send('User Added!');
         
    }catch(err){
        res.status(500).send('Error adding user: ' + err.message);
    }
});

app.patch('/updateUser/:userId', async (req, res) => {

    try{
        const userId = req.params.userId;
        const data = req.body;

        const allowed_field = ['firstName', 'lastName', 'age', 'email', 'gender'];

        const check_allowed_fields = Object.keys(data).every(k => {
           return allowed_field.includes(k);
        });

        if(!check_allowed_fields) throw new Error("You cannot add extra fields!");

        await User.findOneAndUpdate({ _id: userId }, data, { new: true });

        res.send('User Updated!')

    }catch(err){
        res.send('Update failed!' + err.message)
    }
});


app.get('/', (req, res) => {
    res.send('Hello world!');
})

 app.listen(7777, () => {
    console.log(`Server is successfully running on 7777`);
 });


