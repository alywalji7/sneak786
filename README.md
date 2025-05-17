# Sneaker Arbitrage Dashboard

This project helps users identify potential sneaker arbitrage opportunities between StockX and GOAT. It consists of a Node.js/Express backend and a React frontend. The system does **not** perform automated bidding or marketplace interactions; it only provides data and visualizations for manual decision making.

## Structure

- `backend/` – Express API server that connects to the RapidAPI Sneaker Database and stores historical pricing data in SQLite.
- `frontend/` – React application displaying current price differences and history.

## Development

Navigate into each directory and install dependencies with `npm install`. Then start the backend (`npm start`) and the frontend (`npm start`). Ensure you have a `.env` file in the backend with your RapidAPI key.
