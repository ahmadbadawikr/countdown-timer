// src/App.js
import React from 'react';
import PaymentCountdown from './PaymentCountdown';
import QuotesSlideshow from './QuotesSlideshow';
import ClockCountdown from './ClockCountdown';
import ResignationCalculator from './ResignationCalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <PaymentCountdown />
      <ResignationCalculator />
      <QuotesSlideshow />
      <ClockCountdown />
    </div>
  );
}

export default App;
