import React from 'react';

function Dashboard({ result }) {
  const { calculation, insights, insightsSource } = result;
  const { totalCO2e, perCapitaCO2e, breakdown } = calculation;

  // Simple CSS bar widths relative to the maximum category
  const maxCategoryValue = Math.max(
    breakdown.electricity,
    breakdown.naturalGas,
    breakdown.water,
    breakdown.heatingAdjustment
  );

  const getPercentage = (val) => maxCategoryValue > 0 ? (val / maxCategoryValue) * 100 : 0;

  return (
    <div className="dashboard">
      <div className="results-card">
        <h3>Footprint Overview</h3>
        <div className="metrics">
          <div className="metric">
            <span className="metric-value">{totalCO2e}</span>
            <span className="metric-label">Total kg CO2e</span>
          </div>
          <div className="metric">
            <span className="metric-value">{perCapitaCO2e}</span>
            <span className="metric-label">Per Capita kg CO2e</span>
          </div>
        </div>

        <div className="breakdown-chart" aria-label="Carbon footprint breakdown chart">
          <h4>Breakdown</h4>
          
          <div className="bar-row">
            <div className="bar-label">Electricity ({breakdown.electricity} kg)</div>
            <div className="bar-track">
              <div className="bar-fill electricity-bar" style={{ width: `${getPercentage(breakdown.electricity)}%` }}></div>
            </div>
          </div>
          
          <div className="bar-row">
            <div className="bar-label">Natural Gas ({breakdown.naturalGas} kg)</div>
            <div className="bar-track">
              <div className="bar-fill gas-bar" style={{ width: `${getPercentage(breakdown.naturalGas)}%` }}></div>
            </div>
          </div>
          
          <div className="bar-row">
            <div className="bar-label">Water ({breakdown.water} kg)</div>
            <div className="bar-track">
              <div className="bar-fill water-bar" style={{ width: `${getPercentage(breakdown.water)}%` }}></div>
            </div>
          </div>

          {breakdown.heatingAdjustment > 0 && (
            <div className="bar-row">
              <div className="bar-label">Heating Penalty ({breakdown.heatingAdjustment} kg)</div>
              <div className="bar-track">
                <div className="bar-fill penalty-bar" style={{ width: `${getPercentage(breakdown.heatingAdjustment)}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="insights-card">
        <h3>Personalized Tips</h3>
        {insightsSource === 'fallback' && (
          <p className="fallback-notice">
            <em>Showing general tips as AI insights are currently unavailable.</em>
          </p>
        )}
        <ul className="insights-list">
          {insights.map((tip, idx) => (
            <li key={idx} className="insight-item">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
