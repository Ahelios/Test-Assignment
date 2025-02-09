const axios = require('axios');
const db = require('../config/database');
const {
  getAllRates,
  updateRates,
  getStatistics,
  getRatesForCurrency
} = require('../models/exchangeRateModel');

const API_KEY = process.env.ANYAPI_KEY;
const TARGET_CURRENCIES = ['GBP', 'USD', 'AUD'];

let requestCount = 0;
const MAX_TEST_REQUESTS = 100;
const REQUEST_TIMEOUT = 1800000; // 30 minutes

const fetchAndUpdateRates = async () => {
  try {
    if (requestCount >= MAX_TEST_REQUESTS) {
      return {
        success: false,
        message: `Maximum test requests (${MAX_TEST_REQUESTS}) reached. Please wait for production mode.`
      };
    }

    const lastCallTime = global.lastApiCall || 0;
    const now = Date.now();

    if (now - lastCallTime < REQUEST_TIMEOUT) {
      return {
        success: false,
        message: 'Rate limit in effect',
        nextAllowedRequest: new Date(lastCallTime + REQUEST_TIMEOUT)
      };
    }

    const response = await axios.get(
      `https://anyapi.io/api/v1/exchange/rates?base=EUR&apiKey=${API_KEY}`
    );

    if (response.data && response.data.rates) {
      global.lastApiCall = now;
      requestCount++;

      // Update rates for each target currency
      for (const currency of TARGET_CURRENCIES) {
        const rate = response.data.rates[currency];
        await updateRates('EUR', currency, rate);
      }

      // Log after insertion
      const allRates = await getAllRates();

      return {
        success: true,
        message: 'Rates updated successfully',
        requestCount,
        remainingRequests: MAX_TEST_REQUESTS - requestCount
      };
    }
    return { success: false, message: 'Invalid API response' };
  } catch (error) {
    if (error.response?.status === 429) {
      return { success: false, message: 'API rate limit exceeded' };
    }
    throw new Error(error.message || 'Failed to fetch rates');
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
