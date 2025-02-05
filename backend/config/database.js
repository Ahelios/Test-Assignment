const mysql = require('mysql2/promise');

// Debug connection config
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'currency_exchange',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

console.log('Database connection config:', {
  ...config,
  password: config.password ? '[HIDDEN]' : 'empty',
});

const pool = mysql.createPool(config);

module.exports = pool;
