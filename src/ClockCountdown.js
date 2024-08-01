// src/ClockCountdown.js
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';

const ClockCountdown = () => {
  const startDate = new Date('2024-08-01T17:00:00').getTime();
  const endDate = new Date('2027-08-01T17:00:00').getTime();
  const duration = (endDate - startDate) / 1000; // duration in seconds

  return (
    <div className="clock-countdown">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        initialRemainingTime={duration - ((Date.now() - startDate) / 1000)}
        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000', 0.33]]}
        onComplete={() => [true, 0]} // loop animation
      >
        {({ remainingTime }) => {
          const percentage = ((remainingTime / duration) * 100).toFixed(2);
          return (
            <div className="timer">
              <div className="value">{percentage}%</div>
            </div>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default ClockCountdown;
