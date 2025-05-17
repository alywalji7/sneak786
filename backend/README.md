# Backend

This Express server fetches pricing data from the RapidAPI Sneaker Database and stores it in a local SQLite database. It exposes API endpoints used by the React frontend.

## Setup

1. Install dependencies: `npm install`
2. Create a `.env` file with your RapidAPI key:
   ```
   RAPIDAPI_KEY=your_key_here
   ```
3. Start the server: `npm start`

The server provides the following endpoints:

- `GET /api/compare/:productId` – fetches current prices from StockX and GOAT and returns a potential profit estimate.
- `GET /api/history/:productId` – returns historical prices stored in the SQLite database.
