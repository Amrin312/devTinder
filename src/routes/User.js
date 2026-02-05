const express = require('express');
const authCheck = require('../middlewares/Auth');
const ConnectionRequestModel = require('../model/ConnectionRequestModel');

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age email gender";

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
        if(row._id.toString() === user._id.toString()){
            return row.toId;
        }
        return row.fromId;
    });

    res.json({data: data});
});

userRouter.get('/user/feed', authCheck, async (req, res) => {
    // should not present in connection request (fromId, toId)
    // 
    // try{

    // }catch(err){
    //     res.status(400).
    // }

});

module.exports = userRouter;