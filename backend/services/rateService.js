const {
  getAllRates,
  getRatesByCurrency,
  getStats,
  updateRates,
} = require('../models/exchangeRateModel');

const axios = require('axios');

const API_KEY = process.env.ANYAPI_KEY;
const TARGET_CURRENCIES = ['GBP', 'USD', 'AUD'];

const fetchAndUpdateRates = async () => {
  try {
    console.log('Fetching rates at:', new Date().toISOString());
    // Make only ONE API call
    const response = await axios.get(
      `https://anyapi.io/api/v1/exchange/rates?base=EUR&apiKey=${API_KEY}`
    );

    if (response.data && response.data.rates) {
      // Update rates for each target currency
      for (const currency of TARGET_CURRENCIES) {
        const rate = response.data.rates[currency];
        await updateRates('EUR', currency, rate);
      }
    }

    console.log('Rates updated successfully');
    return true;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};

const getRates = async () => {
  return await getAllRates();
};

const getCurrencyStatistics = async (targetCurrency) => {
  return await getStats(targetCurrency);
};

module.exports = {
  fetchAndUpdateRates,
  getRates,
  getCurrencyStatistics,
  getAllRates,
  getRatesByCurrency,
  getStats,
  updateRates,
};
