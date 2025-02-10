const axios = require('axios');
const {
  getAllRates,
  updateRates,
  getStatistics,
  getRatesForCurrency
} = require('../models/exchangeRateModel');

const API_KEY = process.env.ANYAPI_KEY;
const TARGET_CURRENCIES = ['GBP', 'USD', 'AUD'];

const fetchAndUpdateRates = async () => {
  try {
    console.log('Fetching daily rates update...');

    const response = await axios.get(
      `https://anyapi.io/api/v1/exchange/rates?base=EUR&apiKey=${API_KEY}`
    );

    if (response.data && response.data.rates) {
      // Update rates for each target currency
      for (const currency of TARGET_CURRENCIES) {
        const rate = response.data.rates[currency];
        await updateRates('EUR', currency, rate);
      }

      console.log('Daily rates updated successfully');
      return { success: true, message: 'Rates updated successfully' };
    }

    return { success: false, message: 'Invalid API response' };
  } catch (error) {
    console.error('Failed to fetch daily rates:', error);
    throw error;
  }
};

const getRatesByCurrency = async (currency) => {
  try {
    return await getRatesForCurrency(currency);
  } catch (error) {
    throw error;
  }
};

const getStats = async (currency) => {
  try {
    return await getStatistics(currency);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchAndUpdateRates,
  getAllRates,
  getRatesByCurrency,
  getStats
};
