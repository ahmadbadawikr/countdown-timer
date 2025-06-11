// src/ClockCountdown.js
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';

const ClockCountdown = () => {
  const startDate = new Date('2024-08-01T17:00:00').getTime();
  const endDate = new Date('2027-08-01T17:00:00').getTime();
  const duration = (endDate - startDate) / 1000; // duration in seconds
  const currentTime = Date.now();
  const remainingTime = Math.max(0, (endDate - currentTime) / 1000);
  const progressPercentage = ((duration - remainingTime) / duration * 100);

  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="clock-countdown">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#4ecdc4', marginBottom: '10px' }}>🎯 Progress Keseluruhan</h2>
        <p style={{ color: '#bdc3c7', fontSize: '1.1rem' }}>
          Waktu tersisa: {formatTime(remainingTime)}
        </p>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          initialRemainingTime={remainingTime}
          colors={[
            ['#4ecdc4', 0.5],
            ['#f39c12', 0.3], 
            ['#e74c3c', 0.2]
          ]}
          strokeWidth={8}
          size={200}
          onComplete={() => [true, 0]}
        >
          {({ remainingTime }) => {
            const percentage = ((duration - remainingTime) / duration * 100);
            return (
              <div className="timer">
                <div className="value">{percentage.toFixed(1)}%</div>
                <div style={{ fontSize: '0.9rem', color: '#bdc3c7', marginTop: '5px' }}>
                  Selesai
                </div>
              </div>
            );
          }}
        </CountdownCircleTimer>

        <div style={{ textAlign: 'left', maxWidth: '300px' }}>
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#4ecdc4', marginBottom: '5px' }}>📅 Timeline</h4>
            <p style={{ color: '#ecf0f1', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Mulai: 1 Agustus 2024<br/>
              Berakhir: 1 Agustus 2027<br/>
              Total: 3 Tahun
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#4ecdc4', marginBottom: '5px' }}>💰 Info Finansial</h4>
            <p style={{ color: '#ecf0f1', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Total Denda: Rp 200.000.000<br/>
              Progress: {progressPercentage.toFixed(1)}% terbayar<br/>
              Status: {progressPercentage < 50 ? '🔄 Dalam Progress' : '🎯 Lebih dari Separuh'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockCountdown;
