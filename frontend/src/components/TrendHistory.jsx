import React from 'react';

function TrendHistory({ history }) {
  return (
    <div className="trend-history">
      <h2>History</h2>
      <div className="history-list">
        {history.map((entry, idx) => (
          <div key={entry.id} className="history-item">
            <div className="history-date">
              {new Date(entry.timestamp).toLocaleDateString()}
            </div>
            <div className="history-total">
              <strong>{entry.calculation.totalCO2e}</strong> kg CO2e
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendHistory;
