const jwt = require('jsonwebtoken');
const User = require('../models/user-model')
const auth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'jwtsecret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(500).send()
            } else {
                const user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        })
    } else {
        res.status(500).send()
    }
}

module.exports = { auth };