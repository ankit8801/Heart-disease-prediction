import { useState } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { PredictionReport } from './components/PredictionReport';

export default function App() {
  const [predictionState, setPredictionState] = useState(null);
  const [showResults, setShowResults] = useState(false);

  function handlePrediction(features, result) {
    setPredictionState({ features, result, createdAt: new Date() });
    setShowResults(false);
  }

  function startNewPrediction() {
    setPredictionState(null);
    setShowResults(false);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-lockup">
          <span className="brand-mark">⌁</span>
          <strong>HEARTCARE</strong>
        </div>
      </header>
      <main>{showResults && predictionState ? <PredictionReport {...predictionState} onNewPrediction={startNewPrediction} /> : <PredictionForm predictionState={predictionState} onPrediction={handlePrediction} onViewResults={() => setShowResults(true)} />}</main>
    </div>
  );
}
