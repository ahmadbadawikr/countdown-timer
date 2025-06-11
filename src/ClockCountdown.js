// src/ClockCountdown.js
import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';

const ClockCountdown = () => {
  const startDate = new Date('2024-08-01T17:00:00').getTime();
  const endDate = new Date('2027-08-01T17:00:00').getTime();
  const duration = (endDate - startDate) / 1000; // duration in seconds
  const totalAmount = 200000000; // IDR 200,000,000
  
  const [currentTime, setCurrentTime] = useState(Date.now());
  const remainingTime = Math.max(0, (endDate - currentTime) / 1000);
  const progressPercentage = ((duration - remainingTime) / duration * 100);
  const amountPaid = (progressPercentage / 100) * totalAmount;
  const amountRemaining = totalAmount - amountPaid;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  const formatDetailedTime = (timeInMs) => {
    const totalDays = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = (totalDays % 365) % 30;

    let result = [];
    if (years > 0) result.push(`${years} tahun`);
    if (months > 0) result.push(`${months} bulan`);
    if (days > 0) result.push(`${days} hari`);
    
    return result.join(', ') || '0 hari';
  };

  const getProgressStatus = () => {
    if (progressPercentage >= 90) return { text: '🏆 Hampir Selesai!', color: '#27ae60' };
    if (progressPercentage >= 75) return { text: '🎯 Tinggal Sedikit', color: '#2ecc71' };
    if (progressPercentage >= 50) return { text: '📈 Lebih dari Separuh', color: '#3498db' };
    if (progressPercentage >= 25) return { text: '🔄 Dalam Progress', color: '#f39c12' };
    return { text: '🚀 Baru Dimulai', color: '#e74c3c' };
  };

  const status = getProgressStatus();

  return (
    <div className="enhanced-progress-section">
      <div className="progress-header">
        <h2>🎯 Progress Keseluruhan</h2>
        <div className="status-badge" style={{ backgroundColor: status.color }}>
          {status.text}
        </div>
      </div>

      <div className="progress-main-content">
        <div className="circular-progress-container">
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            initialRemainingTime={remainingTime}
            colors={[
              ['#4ecdc4', 0.6],
              ['#f39c12', 0.25], 
              ['#e74c3c', 0.15]
            ]}
            strokeWidth={12}
            size={280}
            trailColor="rgba(255,255,255,0.1)"
            onComplete={() => [true, 0]}
          >
            {({ remainingTime }) => {
              const percentage = ((duration - remainingTime) / duration * 100);
              return (
                <div className="enhanced-timer">
                  <div className="percentage-value">{percentage.toFixed(1)}%</div>
                  <div className="percentage-label">Terselesaikan</div>
                  <div className="time-remaining">{formatTime(remainingTime)}</div>
                </div>
              );
            }}
          </CountdownCircleTimer>
          
          <div className="progress-ring-info">
            <div className="ring-info-item">
              <span className="ring-label">Dimulai</span>
              <span className="ring-date">1 Agt 2024</span>
            </div>
            <div className="ring-info-item">
              <span className="ring-label">Berakhir</span>
              <span className="ring-date">1 Agt 2027</span>
            </div>
          </div>
        </div>

        <div className="progress-stats">
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <div className="stat-label">Waktu Tersisa</div>
                <div className="stat-value">{formatDetailedTime(endDate - currentTime)}</div>
              </div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-label">Sudah Terbayar</div>
                <div className="stat-value">{formatRupiah(amountPaid)}</div>
              </div>
            </div>

            <div className="stat-card danger">
              <div className="stat-icon">💸</div>
              <div className="stat-content">
                <div className="stat-label">Sisa Denda</div>
                <div className="stat-value">{formatRupiah(amountRemaining)}</div>
              </div>
            </div>

            <div className="stat-card info">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-label">Progress Harian</div>
                <div className="stat-value">{(progressPercentage / ((currentTime - startDate) / (1000 * 60 * 60 * 24))).toFixed(3)}%</div>
              </div>
            </div>
          </div>

          <div className="milestone-progress">
            <h4>🏁 Milestone Terdekat</h4>
            <div className="milestone-bar">
              {[25, 50, 75, 90, 100].map((milestone) => (
                <div key={milestone} className="milestone-point">
                  <div 
                    className={`milestone-dot ${progressPercentage >= milestone ? 'reached' : 'upcoming'}`}
                    title={`${milestone}% - ${milestone === 100 ? 'Selesai!' : `Target ${milestone}%`}`}
                  >
                    {milestone}%
                  </div>
                  {progressPercentage < milestone && progressPercentage >= milestone - 25 && (
                    <div className="next-milestone">
                      <span>Target Berikutnya</span>
                      <span>{milestone}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="progress-insights">
        <div className="insight-card">
          <h4>📈 Analisis Progress</h4>
          <div className="insights-grid">
            <div className="insight-item">
              <span className="insight-label">Hari tersisa:</span>
              <span className="insight-value">{Math.ceil((endDate - currentTime) / (1000 * 60 * 60 * 24))} hari</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockCountdown;
