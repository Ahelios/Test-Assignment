const db = require('../config/database');
const {
  getAllRates: getAllRatesFromService,
  getRatesByCurrency: getRatesByCurrencyService,
  getStats: getStatsService,
  fetchAndUpdateRates
} = require('../services/rateService');

// Get all rates
const getAllRates = async (req, res) => {
  try {
    const rates = await getAllRatesFromService();
    res.json(rates);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch rates',
      message: error.message
    });
  }
};

// Get rates for specific currency
const getRatesByCurrency = async (req, res) => {
  try {
    const { currency } = req.params;
    const rates = await getRatesByCurrencyService(currency);
    res.json(rates);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch rates for currency',
      message: error.message
    });
  }
};

// Get statistics for a currency
const getStats = async (req, res) => {
  try {
    const { currency } = req.params;
    const stats = await getStatsService(currency);
    res.json(stats);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
};

// Manual trigger to update rates
const updateRates = async (req, res) => {
  try {
    const result = await fetchAndUpdateRates();
    res.json(result);
  } catch (error) {
    console.error('Error updating rates:', error);
    res.status(500).json({
      error: 'Failed to update rates',
      message: error.message
    });
  }
};

module.exports = {
  getAllRates,
  getRatesByCurrency,
  getStats,
  updateRates
};
