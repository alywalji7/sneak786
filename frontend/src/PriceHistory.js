import React from 'react';

export default function PriceHistory({ history }) {
  if (!history.length) return null;
  return (
    <div>
      <h2>Price History</h2>
      <table>
        <thead>
          <tr><th>Platform</th><th>Price</th><th>Fetched At</th></tr>
        </thead>
        <tbody>
          {history.map(row => (
            <tr key={row.id}>
              <td>{row.platform}</td>
              <td>${row.price}</td>
              <td>{row.fetchedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
