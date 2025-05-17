import React, { useState } from 'react';
import axios from 'axios';
import PriceHistory from './PriceHistory';

export default function App() {
  const [productId, setProductId] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const search = async () => {
    const res = await axios.get(`/api/compare/${productId}`);
    setResult(res.data);
    const hist = await axios.get(`/api/history/${productId}`);
    setHistory(hist.data);
  };

  return (
    <div>
      <h1>Sneaker Arbitrage Dashboard</h1>
      <input value={productId} onChange={e => setProductId(e.target.value)} placeholder="SKU" />
      <button onClick={search}>Search</button>
      {result && (
        <div>
          <h2>Current Prices</h2>
          <p>StockX: ${result.stockxPrice}</p>
          <p>GOAT: ${result.goatPrice}</p>
          <p>Potential Profit: ${result.potentialProfit}</p>
        </div>
      )}
      <PriceHistory history={history} />
    </div>
  );
}
