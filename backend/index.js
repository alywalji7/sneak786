const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('prices.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId TEXT,
    platform TEXT,
    price REAL,
    fetchedAt TEXT
  )`);
});

// Fetch prices from RapidAPI
async function fetchPrices(productId) {
  const options = {
    method: 'GET',
    url: 'https://v1-sneakers.p.rapidapi.com/v1/sneakers',
    params: {limit: '1', sku: productId},
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);
  return response.data;
}

// Save price to database
function savePrice(productId, platform, price) {
  db.run(`INSERT INTO prices (productId, platform, price, fetchedAt) VALUES (?,?,?,datetime('now'))`,
    [productId, platform, price]);
}

// Compare prices from StockX and GOAT
app.get('/api/compare/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const data = await fetchPrices(productId);
    const result = data.results[0];
    const stockxPrice = result.retailPrice;
    const goatPrice = result.lowestResellPrice && result.lowestResellPrice.goat;

    if (stockxPrice) savePrice(productId, 'StockX', stockxPrice);
    if (goatPrice) savePrice(productId, 'GOAT', goatPrice);

    const profit = goatPrice && stockxPrice ? goatPrice - stockxPrice : null;

    res.json({
      productId,
      stockxPrice,
      goatPrice,
      potentialProfit: profit
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to fetch prices'});
  }
});

// Get price history
app.get('/api/history/:productId', (req, res) => {
  db.all(`SELECT * FROM prices WHERE productId = ? ORDER BY fetchedAt DESC`, [req.params.productId], (err, rows) => {
    if (err) return res.status(500).json({error: 'DB error'});
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
