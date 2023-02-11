const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        visitedWebsites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Website'
        }],
        totalCarbonEmitted: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

userSchema.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}


const User = mongoose.model('User', userSchema)

module.exports = User;