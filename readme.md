# 🌍 Currency Exchange Rate App

## 📌 Project Description

This project is a currency exchange rate tracker that fetches displays exchange rates updated once every 24 hours. It includes a frontend built with React (Vite) and a backend using Node.js & ExpressJS with a MySQL database.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Prerequisites

Make sure you have the following installed:

Node.js (v16 or later)

MySQL (or MariaDB)

### 2️⃣ Clone the Repository

Using SSH

`git clone git@github.com:Ahelios/Test-Assignment.git`

OR using HTTPS

`git clone https://github.com/Ahelios/Test-Assignment.git`

`cd Test-Assignment`

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory and fill in your credentials. You can copy the existing .env.example:

`cp .env.example .env`

Now edit .env and update the values, where necessary (e.g., your_api_key_here, your_db_user_here etc.):

Server Port

PORT=3000

API Key
Go to [AnyAPI](https://anyapi.io/marketplace/currency-exchange-api), generate a new API key and add your key as ANYAPI_KEY

ANYAPI_KEY=your_api_key_here

Database Configuration

DB_HOST=localhost

DB_USER=your_db_user_here

DB_PASSWORD=your_db_password_here

DB_NAME=currency_exchange

Frontend API URL

VITE_API_URL=http://localhost:3000

### 4️⃣ Install Dependencies

Run the following command in the project root to install dependencies for both the backend and frontend:

Install backend dependencies

`cd backend`

`npm install`

Install frontend dependencies

`cd ../frontend`

`npm install`

5️⃣ Set Up Database

Start MySQL Server.

Create the database manually by running command:

`CREATE DATABASE currency_exchange;`

6️⃣ Running the Project

Run Backend (Node.js Express Server)

`cd backend`

`npm run dev`

This starts the backend server on `http://localhost:3000`

Run Frontend (React/Vite)

`cd frontend`

`npm run dev`

This starts the frontend on `http://localhost:5173` (Vite's default port).

## 🎯 How The Project Works

Open `http://localhost:5173` in your browser.

You should see the exchange rate table and be able to view the different exchange rates and their history. Note that with the current setup exchange rates are fetched every 24 hours. If you want to see the history data fill in sooner, update the cron job as described below.

Check the backend by making a request in Postman or your browser: `GET http://localhost:3000/api/rates`

If everything is working, the backend should return exchange rate data in JSON format.

8️⃣ Common Issues & Fixes

❓ Frontend is not fetching rates?

Ensure the backend is running (`npm run dev in backend/`).

Check the `.env` file and confirm VITE_API_URL is correct.

❓ Database connection issues?

Ensure MySQL is running and the credentials in `.env` match your setup.

Check if the database exists (currency_exchange).

❓ Cron job isn’t updating rates?

The cron job only runs every 24 hours (`0 0 * * *`).

For development/testing purposes, you can modify the cron timing in `server.js` to run every 5 minutes using:
`*/5 * * * *`

You can also manually trigger it by calling `fetchAndUpdateRates()` in `server.js`.