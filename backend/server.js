require('dotenv').config();
const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');
const rateRoutes = require('./routes/rateRoutes');
const { initializeDatabase } = require('./models/exchangeRateModel');
const { fetchAndUpdateRates } = require('./services/rateService');

const app = express();

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
    message: err.message 
  });
});

// Initialize database and fetch initial rates
const initializeApp = async () => {
  try {
    await initializeDatabase();
    await fetchAndUpdateRates();
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

// Schedule rate updates - runs at midnight every day
schedule.scheduleJob('0 0 * * *', fetchAndUpdateRates);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeApp();
});