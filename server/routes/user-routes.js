const express = require('express');
const { authUser, getUserdata } = require('../controllers/user-controller');
const { auth } = require('../middleware/auth')
const router = express.Router()
router.route('/login').post(authUser);
router.route('/logout').post(authUser);
// router.route('/me').get(auth, getUserdata);
module.exports = router;