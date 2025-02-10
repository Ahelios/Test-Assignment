require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');
const rateRoutes = require('./routes/rateRoutes');
const {
  initializeDatabase,
  getAllRates,
} = require('./models/exchangeRateModel');
const { fetchAndUpdateRates } = require('./services/rateService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', rateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: err.message,
  });
});

// Initialize database and fetch initial rates
const initializeApp = async () => {
  try {
    await initializeDatabase();
    const existingRates = await getAllRates();
    if (!existingRates || existingRates.length === 0) {
      console.log('No existing rates found, fetching initial rates...');
      await fetchAndUpdateRates();
    } else {
      console.log('Using existing rates from database');
    }
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Don't exit the process, just log the error
    console.error('Continuing with application startup...');
  }
};

// Schedule rate updates - runs at midnight every day
schedule.scheduleJob('0 0 * * *', async () => {
  try {
    await fetchAndUpdateRates();
  } catch (error) {
    console.error('Daily rate update failed:', error);
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await initializeApp();
  } catch (error) {
    console.error('Application initialization error:', error);
  }
});
