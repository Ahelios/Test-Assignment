const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const axios = require('axios');
const schedule = require('node-schedule');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'currency_exchange'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Function to fetch and update currency rates
async function fetchCurrencyRates() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD'); // Example API endpoint
    const rates = response.data.rates;

    // Insert or update rates in the database
    for (const [currency, rate] of Object.entries(rates)) {
      db.query('INSERT INTO rates (currency_code, exchange_rate) VALUES (?, ?) ON DUPLICATE KEY UPDATE exchange_rate = ?', [currency, rate, rate]);
    }
  } catch (error) {
    console.error(error);
  }
}

// Schedule the job to run every 24 hours
schedule.scheduleJob('0 0 * * *', fetchCurrencyRates); // Runs at midnight every day

// Define API route to get currency rates
app.get('/api/rates', (req, res) => {
  db.query('SELECT * FROM rates', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
