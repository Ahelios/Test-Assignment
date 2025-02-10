🌍 Currency Exchange Rate App

📌 Project Description

This project is a currency exchange rate tracker that fetches and displays exchange rates once every 24 hours. It includes a frontend built with React (Vite) and a backend using Node.js & ExpressJS with a MySQL database.

🚀 Getting Started

Follow these steps to set up and run the project locally.

1️⃣ Prerequisites

Make sure you have the following installed:

Node.js (v16 or later) - Download here

MySQL (or MariaDB) - Download here

Git (for cloning the repository) - Download here

2️⃣ Clone the Repository

# Using SSH
git clone git@github.com:your-username/your-repo.git

# OR using HTTPS
git clone https://github.com/your-username/your-repo.git

cd your-repo

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and fill in your credentials. You can copy the existing .env.example:

cp .env.example .env

Now edit .env and update the values:

# Server Port
PORT=3000

# API Key (Replace with your own key)
ANYAPI_KEY=your_api_key_here

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=currency_exchange

# Frontend API URL
VITE_API_URL=http://localhost:3000

4️⃣ Install Dependencies

Run the following command in the project root to install dependencies for both the backend and frontend:

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

5️⃣ Set Up Database

Start MySQL Server.

Create the database manually:

CREATE DATABASE currency_exchange;

Run any necessary migrations (if applicable).

6️⃣ Running the Project

Run Backend (Node.js Express Server)

cd backend
npm run dev

This starts the backend server on http://localhost:3000

Run Frontend (React/Vite)

cd frontend
npm run dev

This starts the frontend on http://localhost:5173 (Vite's default port).

7️⃣ Verifying It Works

Open http://localhost:5173 in your browser.

You should see the exchange rate table.

Check the backend by making a request in Postman or your browser:

GET http://localhost:3000/api/rates

If everything is working, the backend should return exchange rate data in JSON format.

8️⃣ Common Issues & Fixes

❓ Frontend is not fetching rates?

Ensure the backend is running (npm run dev in backend/).

Check the .env file and confirm VITE_API_URL is correct.

❓ Database connection issues?

Ensure MySQL is running and the credentials in .env match your setup.

Check if the database exists (currency_exchange).

❓ Cron job isn’t updating rates?

The cron job only runs every 24 hours (0 0 * * *).

You can manually trigger it by calling fetchAndUpdateRates() in server.js.

🎯 Next Steps

Add unit tests for key components.

Improve the UI with more styling.

Deploy the project on Vercel/Netlify (frontend) and Render/Heroku (backend).

📜 License

This project is licensed under the MIT License.

👨‍💻 Built with ❤️ by [Your Name]