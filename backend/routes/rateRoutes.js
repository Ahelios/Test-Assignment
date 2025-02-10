const express = require('express');
const router = express.Router();
const { getAllRates } = require('../controllers/rateController');

// Get all rates
router.get('/rates', getAllRates);

module.exports = router;
