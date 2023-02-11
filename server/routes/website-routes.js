const express = require('express');
const { updateCarbonEmission } = require('../controllers/website-controller');
const router = express.Router()
router.route('/').post(updateCarbonEmission);
module.exports = router;