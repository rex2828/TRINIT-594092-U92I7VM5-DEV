const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Website'
        },
        carbonEmitted: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session;