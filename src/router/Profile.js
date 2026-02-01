const express = require('express');
const authCheck = require('../middlewares/Auth')
const User = require('../model/User');
const { validateEditProfile } = require('../utils/validation');
const profileRouter = express.Router();

profileRouter.get('/profile', authCheck, async (req, res) => {
    try{
        const user = req.user;
        
        res.send(user);
    }catch(err){
        res.send('Error !' + err.message)
    }
});

profileRouter.patch('profile/edit/:userId', authCheck, async (req, res) => {

    try{
        const userId = req.params.userId;
        const data = req.body;

        validateEditProfile(data);
        
        await User.findOneAndUpdate({ _id: userId }, data, { new: true });

        res.send('User Updated!')

    }catch(err){
        res.send('Update failed!' + err.message)
    }
});


profileRouter.patch('/profile/password', authCheck, async (req, res) => {
    try{
        const user = req.user;
        const { oldPassword, newPassword } = req.body;

        const checkOldPassword = await user.checkPassword(oldPassword);

        if(!oldPassword || !newPassword){
            throw new Error('All fields are required!');
        }

        if(!checkOldPassword){
            throw new Error('Old Password is not correct!');
        }

        const checknewANdOldPasswordSame = await user.checkPassword(newPassword);

        if(checknewANdOldPasswordSame){
            throw new Error('Old Password should not be your new password!');
        }

        const newPasswordHash = await user.hashedPassword(newPassword);
        user.password = newPasswordHash;
        await user.save();

        res.status(200).send('Password Changed successfully!');
    }catch(err){
        res.status(500).send("Error " + err.message);
    }
});


module.exports = profileRouter;
