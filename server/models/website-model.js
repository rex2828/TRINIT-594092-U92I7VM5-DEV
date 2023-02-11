const mongoose = require('mongoose');

const websiteSchema = mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        url: {
            type: String,
            required: true
        },
        carbonEmitted: {
            type: Number,
            required: true,
            default: 0
        },
        energyUsed: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const Website = mongoose.model('Website', websiteSchema)

module.exports = Website;