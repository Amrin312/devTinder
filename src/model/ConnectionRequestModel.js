const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema(
    {
        fromId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        toId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: ['interested', 'ingored', 'accepted', 'rejected'],
            message: `{VALUE} is incorrect status type!`,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const ConnectionRequest = mongoose.model('connectionRequest', ConnectionRequestSchema);

module.exports = ConnectionRequest; 