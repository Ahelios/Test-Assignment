const {
  getAllRates: getAllRatesService,
  getRatesByCurrency: getRatesByCurrencyService,
  getStats: getStatsService,
  updateRates: updateRatesService,
} = require('../services/rateService');

// Get all rates
const getAllRates = async (req, res) => {
  try {
    const rates = await getAllRatesService();
    res.json(rates);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch rates',
      message: error.message,
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
      message: error.message,
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
      message: error.message,
    });
  }
};

// Manual trigger to update rates
const updateRates = async (req, res) => {
  try {
    await updateRatesService();
    res.json({ message: 'Rates updated successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update rates',
      message: error.message,
    });
  }
};

module.exports = {
  getAllRates,
  getRatesByCurrency,
  getStats,
  updateRates,
};
