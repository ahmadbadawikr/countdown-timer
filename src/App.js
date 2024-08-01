// src/App.js
import React from 'react';
import PaymentCountdown from './PaymentCountdown';
import QuotesSlideshow from './QuotesSlideshow';
import ClockCountdown from './ClockCountdown';
import './App.css';

function App() {
  return (
    <div className="App">
      <PaymentCountdown />
      <QuotesSlideshow />
      <ClockCountdown />
    </div>
  );
}

export default App;
