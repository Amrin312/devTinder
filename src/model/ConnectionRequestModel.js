const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema(
    {
        fromId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        toId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: ['Interested', 'Ingored', 'Accepted', 'Rejected'],
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