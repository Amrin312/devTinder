const express = require('express');
const authCheck = require('../middlewares/Auth');
const ConnectionRequestModel = require('../model/ConnectionRequestModel');
const User = require('../model/User');

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age bio gender photoUrl";

userRouter.get('/user/requests', authCheck, async (req, res) => {
    const user = req.user;

    const connectionRequests = await ConnectionRequestModel.find({toId: user._id, status: 'interested'}).populate("fromId", USER_SAFE_DATA);

    res.json({message: 'Data fetched!', connectionRequests});
});

userRouter.get('/user/connections', authCheck, async (req, res) => {
    const user = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
        $or:[
            {fromId: user._id, status: 'accepted'},
            {toId: user._id, status: 'accepted'}
        ],
    }).populate('fromId', USER_SAFE_DATA).populate('toId', USER_SAFE_DATA);



    const data = connectionRequests.map(row => {
        if(row.fromId._id.toString() === user._id.toString()){
            return row.toId;
        }
        return row.fromId;
    });

    res.json({data: data});
});

userRouter.get('/user/feed', authCheck, async (req, res) => {
    // should not present in connection request (fromId, toId)
    try{
        const loggedInUser = req.user;

        let page = parseInt(req.query.skip) || 0;
        let limit = parseInt(req.query.limit) || 10;
        limit = (page -1) * limit;

        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                {fromId: loggedInUser._id }, { toId: loggedInUser._id } 
            ]
        }).select('fromId toId');

        const hideUsers = new Set();

        connectionRequest.forEach(row => {
            hideUsers.add(row.fromId);
            hideUsers.add(row.toId);
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsers) } },
                { _id: { $ne: loggedInUser._id } }
            ],
        }).select(USER_SAFE_DATA).skip(page).limit(limit);

        res.send(users)
    }catch(err){
        res.status(400).send('Error ' + err.message);
    }
});

module.exports = userRouter;