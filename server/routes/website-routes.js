const express = require('express');
const { updateCarbonEmission, myCarbon } = require('../controllers/website-controller');
const router = express.Router()
router.route('/').post(updateCarbonEmission);
router.route('/myCarbon').post(myCarbon)
module.exports = router;