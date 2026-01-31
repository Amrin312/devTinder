const express = require('express');
require('dotenv').config();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const connectDB = require('../config/database');
const jwt = require('jsonwebtoken');
const cookie = require('js-cookie');
const cookieParser = require('cookie-parser');
const authCheck = require('../middlewares/Auth')
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res)=>{
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

app.patch('/updateUser/:userId', authCheck, async (req, res) => {

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

//login
app.post('/login', async (req, res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email: email});
    
        if(!user){ throw new Error('User Not foiund!')}

        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword){ throw new Error('Invalid credentials!')}

        const token = await jwt.sign({_id: user._id}, "devTender@$1234");

        res.cookie('token', token);
        res.send('Login successfull!');

    }catch(err){
        res.send('Login Failed!' + err.message)
    }
});

app.get('/profile', authCheck, async (req, res) => {
    try{
        const user = req.user;
        
        res.send(user);
    }catch(err){
        res.send('Error !' + err.message)
    }
});


app.get('/', (req, res) => {
    res.send('Hello world!');
})

 app.listen(7777, () => {
    console.log(`Server is successfully running on 7777`);
 });


