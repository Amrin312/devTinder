const jwt = require('jsonwebtoken');
const User = require('../model/User');



const authCheck = async (req, res, next) => {
    try{
        const { token } = req.cookies;

        console.log(token);

        if(!token) throw new Error('Please login!');

        const decodeObj = jwt.verify(token, "devTender@$1234");

        const { _id } = decodeObj;

        const user = await User.findById(_id);

        if(!user) throw new Error('User Not found!');

        req.user = user;

        next();
    }catch(err){
        res.status(400).send('Bad Request! ' + err.message)
    }
}

module.exports = authCheck;
