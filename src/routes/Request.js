const express = require('express');
const authCheck = require('../middlewares/Auth')
const connectionRequestModel = require('../model/ConnectionRequestModel');

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:userId', authCheck, async (req, res) => {
    try{
        const user = req.user;
        const fromId = user._id;
        const toId = req.params.userId;
        const status = req.params.status;

        const connectionReqtModel = new connectionRequestModel({fromId, toId, status});

        const data = await connectionReqtModel.save();

        res.status(200).json({
            message:'Connection sent!',
            data
        });
        
    }catch(err){
        res.status(400).send('Error' + err.message)
    }
})


module.exports = requestRouter;
