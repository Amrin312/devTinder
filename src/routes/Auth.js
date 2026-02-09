const express = require('express');
const User = require('../model/User');
const cookie = require('js-cookie');
const authRouter = express.Router();
const bcrypt = require('bcrypt');


authRouter.post('/signup', async (req, res)=>{
    try{
        const {firstName, lastName, age, email, gender, skills, photoUrl, about} = req.body;
        
        const data = req.body;

        const allowed_field = ['firstName', 'lastName', 'age', 'email', 'gender', 'password', 'skills', 'photoUrl', 'about'];
        
        const check_allowed_fields = Object.keys(data).every(k => allowed_field.includes(k));

        if(!check_allowed_fields) throw new Error("You cannot add extra fields!");

        const hashPassword = await bcrypt.hash(data.password, 10);

        const user = new User({firstName, lastName, age, email, gender, password: hashPassword, skills, photoUrl, about});

        await user.save();

        res.send('User Added!');
         
    }catch(err){
        res.status(500).send('Error adding user: ' + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try{
        const { email, password} = req.body;
        
        const user = await User.findOne({email: email});
    
        if(!user){ throw new Error('User Not found!')}

        const validPassword = await user.checkPassword(password);
        
        if(!validPassword){ throw new Error('Invalid credentials!')}

        const token = await user.getJWT();

        res.cookie('token', token);
        res.send(user);

    }catch(err){
        res.send('Login Failed!' + err.message)
    }
});

authRouter.post('/logout', async (req, res) => {
    res.cookie('token', null, {expires: new Date(0)});
    res.send('Logged out successfully!')
});

module.exports = authRouter;