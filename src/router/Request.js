const express = require('express');
const authCheck = require('../middlewares/Auth')

const requestRouter = express.Router();

requestRouter.post('/send/request', authCheck, async (req, res) => {
    try{
        res.send('Connection sent!');
    }catch(err){
        res.status(400).send('Error' + err.message)
    }
})


module.exports = requestRouter;
