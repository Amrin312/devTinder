const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    gender: {
      type: String,
      required: true,
      validate(value){
        if(!['male', 'female', 'others'].includes(value)){
          throw new Error ('Gender data is not valid!');
        }
      }
    },
    password: {
      type: String,
      required: true
    }
  },
 
  { timestamps: true }
);

userSchema.methods.getJWT = async function (){
  let user = this;
  let token = await jwt.sign({_id: user._id}, "devTender@$1234");
  return token;
}

userSchema.methods.hashedPassword = async function (plainPassword){
  let hashedPassword = await bcrypt.hash(plainPassword, 10);
  return hashedPassword;
}

userSchema.methods.checkPassword = async function (userReturnedPassword) {
  let user = this;
  return await bcrypt.compare(userReturnedPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;