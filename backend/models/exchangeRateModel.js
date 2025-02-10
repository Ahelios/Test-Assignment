const db = require('../config/database');

// Initialize database and tables
const initializeDatabase = async () => {
  try {
    await db.query('CREATE DATABASE IF NOT EXISTS currency_exchange');
    await db.query('USE currency_exchange');

    await db.query(`
      CREATE TABLE IF NOT EXISTS rates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        base_currency VARCHAR(3) NOT NULL,
        target_currency VARCHAR(3) NOT NULL,
        exchange_rate DECIMAL(10, 4),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_currency_time (base_currency, target_currency, updated_at DESC)
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

// Get rates for specific target currency
const getRatesForCurrency = async (targetCurrency) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM rates WHERE target_currency = ? ORDER BY updated_at DESC',
      [targetCurrency]
    );

    return rows;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};

// Get all rates with proper ordering
const getAllRates = async () => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM rates ORDER BY updated_at DESC'
    );

    return rows;
  } catch (error) {
    console.error('Error fetching all rates:', error);
    throw error;
  }
};

// Update or insert new rate
const updateRates = async (baseCurrency, targetCurrency, rate) => {
  try {
    const [result] = await db.query(
      'INSERT INTO rates (base_currency, target_currency, exchange_rate) VALUES (?, ?, ?)',
      [baseCurrency, targetCurrency, rate]
    );

    return result;
  } catch (error) {
    console.error('Error inserting rate:', error);
    throw error;
  }
};

// Get statistics for specific currency pair
const getStatistics = async (targetCurrency) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        MIN(exchange_rate) as minimum,
        MAX(exchange_rate) as maximum,
        AVG(exchange_rate) as average
      FROM rates
      WHERE base_currency = 'EUR' 
      AND target_currency = ?
    `,
      [targetCurrency]
    );

    return rows[0];
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

module.exports = {
  initializeDatabase,
  getRatesForCurrency,
  getAllRates,
  updateRates,
  getStatistics
};
