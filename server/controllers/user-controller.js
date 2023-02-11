const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');
// const jwt = require('jsonwebtoken');

// const createToken = (id) => {
//     return jwt.sign({ id }, 'jwtsecret', {
//         expiresIn: 3 * 24 * 60 * 60
//     });
// };

const authUser = asyncHandler(async (req, res) => {
    const { email, pass } = req.body;
    let user;
    user = await User.findOne({ email })
    if (user) {
        if (user && (await user.matchPassword(pass))) {
            // const token = createToken(user._id);
            // res.cookie('jwt', token, { httpOnly: false, maxAge: 3 * 24 * 60 * 60 * 1000 });
            res.status(200).json({ status: 'SUCCESS', user: user });
        } else {
            res.status(400).json({ status: 'FAILED', message: 'Invalid email or password' })
        }
    } else {
        user = await User.create({
            email, password: pass
        });
        if (user) {
            res.status(201).json({ status: 'SUCCESS', user: user });
        } else {
            res.status(400)
            throw new Error('Error Occured');
        }
    }
})

const getUserdata = asyncHandler(async (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.json('no user found!')
    }
})

module.exports = { authUser, getUserdata };
