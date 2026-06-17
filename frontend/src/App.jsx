import React, { useState, useEffect } from 'react';
import { submitFootprintData, fetchHistory } from './services/api';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import TrendHistory from './components/TrendHistory';

function App() {
  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleCalculate = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await submitFootprintData(formData);
      setCurrentResult(result);
      setHistory(prev => [...prev, result]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HouseholdCarbon</h1>
        <p>Track your energy footprint and get AI-powered reduction tips</p>
      </header>
      
      <main className="app-main">
        <section className="input-section">
          <h2>Enter Monthly Usage</h2>
          <InputForm onSubmit={handleCalculate} isLoading={isLoading} />
          {error && <div className="error-message" role="alert" aria-live="assertive">{error}</div>}
        </section>

        <section className="dashboard-section">
          {currentResult ? (
            <Dashboard result={currentResult} />
          ) : (
            <div className="empty-state">
              <p>Submit your usage to see your carbon footprint breakdown and personalized tips.</p>
            </div>
          )}
        </section>
      </main>

      <section className="history-section">
        {history.length > 0 && <TrendHistory history={history} />}
      </section>
    </div>
  );
}

export default App;
