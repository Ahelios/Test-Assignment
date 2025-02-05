const express = require('express');
const router = express.Router();
const {
  getAllRates,
  getRatesByCurrency,
  getStats,
  updateRates,
} = require('../controllers/rateController');

// Get all rates
router.get('/rates', getAllRates);

// Get rates for specific currency
router.get('/rates/:currency', getRatesByCurrency);

// Get statistics for specific currency
router.get('/statistics/:currency', getStats);

// Manual trigger to update rates
router.post('/update-rates', updateRates);

module.exports = router;
