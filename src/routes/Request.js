const express = require('express');
const authCheck = require('../middlewares/Auth')
const connectionRequestModel = require('../model/ConnectionRequestModel');
const User = require('../model/User');
const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:userId', authCheck, async (req, res) => {
    try{
        const user = req.user;
        const fromId = user._id;
        const toId = req.params.userId;
        const status = req.params.status;

        const checkExisitingConnReq = await connectionRequestModel.findOne({
            $or:[
                { fromId, toId },
                { fromId: toId, toId: fromId}
            ]
        });

        if(checkExisitingConnReq) { return res.status(400).send('Connection already exist!')}

        if(!fromId || !toId) { return res.status(400).send('Invalid request!') }

        const checkToUser = User.findById(toId);

        if(!checkToUser || fromId == toId) { return res.status(400).send('Invalid request!') }

        const connectionReqtModel = new connectionRequestModel({fromId, toId, status});

        const data = await connectionReqtModel.save();

        res.status(200).json({
            message:'Connection sent!',
            data
        });
        
    }catch(err){
        res.status(400).send('Error' + err.message)
    }
});

requestRouter.post('/request/review/:status/:requestId', authCheck, (req, res) => {
    
});


module.exports = requestRouter;
