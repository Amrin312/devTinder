const mongoose = require('mongoose');

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
    }
  },
  { timestamps: true }
);

const user = mongoose.model('User', userSchema);
module.exports = user;