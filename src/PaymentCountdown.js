// src/PaymentCountdown.js
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

const PaymentCountdown = () => {
  const totalAmount = 200000000; // IDR 200,000,000
  const startDate = useMemo(() => new Date('2024-08-01T17:00:00'), []);
  const endDate = useMemo(() => new Date('2027-08-01T17:00:00'), []);
  const totalTime = useMemo(() => endDate - startDate, [endDate, startDate]);

  // Format currency in Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format large numbers with K, M suffix
  const formatShortNumber = (amount) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + 'M';
    } else if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'Jt';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toFixed(0);
  };

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = endDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        totalMilliseconds: difference,
        years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 365),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milliseconds: Math.floor(difference % 1000),
      };
    }

    return timeLeft;
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [amountLeft, setAmountLeft] = useState(totalAmount);
  const [amountGained, setAmountGained] = useState(0);

  // Calculate milestones
  const calculateMilestones = useCallback(() => {
    const milestonePercentages = [10, 25, 50, 75, 90];
    const milestones = milestonePercentages.map(percentage => {
      const targetTime = totalTime * (percentage / 100);
      const milestoneDate = new Date(startDate.getTime() + targetTime);
      const now = new Date();
      const isReached = now >= milestoneDate;
      
      return {
        percentage,
        date: milestoneDate,
        isReached,
        timeFromStart: targetTime,
        formattedDate: milestoneDate.toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
    });
    
    return milestones;
  }, [startDate, totalTime]);

  const milestones = calculateMilestones();

  // Calculate burn rates
  const calculateBurnRates = useCallback(() => {
    const now = new Date();
    const elapsedTime = now - startDate;
    const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24);
    
    if (elapsedDays <= 0) return { daily: 0, weekly: 0, monthly: 0 };
    
    const currentAmountGained = totalAmount - amountLeft;
    const dailyBurn = currentAmountGained / elapsedDays;
    const weeklyBurn = dailyBurn * 7;
    const monthlyBurn = dailyBurn * 30.44; // Average days per month
    
    return { daily: dailyBurn, weekly: weeklyBurn, monthly: monthlyBurn };
  }, [startDate, totalAmount, amountLeft]);

  const burnRates = calculateBurnRates();

  const generateChartData = useCallback(() => {
    const monthlyData = [];
    const months = [];
    const pointBackgroundColors1 = [];
    const pointBackgroundColors2 = [];
    const pointBorderColors1 = [];
    const pointBorderColors2 = [];
    const pointRadii1 = [];
    const pointRadii2 = [];
    
    let currentDate = new Date(startDate);
    let currentAmountLeft = totalAmount;
    const now = new Date();
    const currentMonthYear = now.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });

    while (currentDate <= endDate) {
      const elapsedTime = currentDate - startDate;
      currentAmountLeft = totalAmount - (totalAmount * elapsedTime) / totalTime;
      
      const monthLabel = currentDate.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });
      const isCurrentMonth = monthLabel === currentMonthYear;
      
      monthlyData.push({
        date: currentDate,
        amountLeft: currentAmountLeft,
        amountGained: totalAmount - currentAmountLeft,
      });

      months.push(monthLabel);
      
      // Highlight current month point
      if (isCurrentMonth) {
        pointBackgroundColors1.push('#f39c12');
        pointBackgroundColors2.push('#f39c12');
        pointBorderColors1.push('#ffffff');
        pointBorderColors2.push('#ffffff');
        pointRadii1.push(8);
        pointRadii2.push(8);
      } else {
        pointBackgroundColors1.push('#ff6b6b');
        pointBackgroundColors2.push('#4ecdc4');
        pointBorderColors1.push('#ff6b6b');
        pointBorderColors2.push('#4ecdc4');
        pointRadii1.push(4);
        pointRadii2.push(4);
      }
      
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return {
      labels: months,
      datasets: [
        {
          label: 'Sisa Denda',
          data: monthlyData.map(data => data.amountLeft),
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: pointBackgroundColors1,
          pointBorderColor: pointBorderColors1,
          pointRadius: pointRadii1,
          pointBorderWidth: 2,
        },
        {
          label: 'Sudah Terbayar',
          data: monthlyData.map(data => data.amountGained),
          borderColor: '#4ecdc4',
          backgroundColor: 'rgba(78, 205, 196, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: pointBackgroundColors2,
          pointBorderColor: pointBorderColors2,
          pointRadius: pointRadii2,
          pointBorderWidth: 2,
        },
      ],
    };
  }, [startDate, endDate, totalAmount, totalTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      const elapsedTime = totalTime - newTimeLeft.totalMilliseconds;
      const newAmountLeft = Math.max(0, totalAmount - (totalAmount * elapsedTime) / totalTime);
      const newAmountGained = totalAmount - newAmountLeft;
      setAmountLeft(newAmountLeft);
      setAmountGained(newAmountGained);
    }, 100); // Update every 100ms for smoother animation

    return () => clearInterval(timer);
  }, [calculateTimeLeft, totalTime, totalAmount]);

  const progress = (amountGained / totalAmount) * 100;
  const chartData = generateChartData();

  const chartOptions = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#4ecdc4',
        borderWidth: 1,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const value = context.parsed.y;
            const label = context.dataset.label;
            return `${label}: ${formatRupiah(value)}`;
          },
                     afterBody: function(context) {
             const now = new Date();
             const currentMonth = now.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });
             if (context[0].label === currentMonth) {
               return ['', '📍 Anda Berada Di Sini!'];
             }
             return '';
           },
           footer: function(context) {
             if (context.length > 0) {
               const dataIndex = context[0].dataIndex;
               const totalPoints = context[0].chart.data.labels.length;
               const progressPercent = ((dataIndex / (totalPoints - 1)) * 100).toFixed(1);
               return `Progress Timeline: ${progressPercent}%`;
             }
             return '';
           }
        }
      },
      annotation: {
        annotations: {
          currentDateLine: {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: getCurrentChartPosition(),
            borderColor: '#f39c12',
            borderWidth: 3,
            borderDash: [5, 5],
            label: {
              enabled: true,
              content: '📍 Sekarang',
              position: 'top',
              backgroundColor: '#f39c12',
              color: 'white',
              font: {
                size: 12,
                weight: 'bold'
              },
              padding: 4
            }
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { 
          color: 'white',
          callback: function(value) {
            return 'Rp ' + formatShortNumber(value);
          }
        },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  // Function to get current position on chart
  function getCurrentChartPosition() {
    const now = new Date();
    let currentDate = new Date(startDate);
    let position = 0;

    while (currentDate <= endDate) {
      if (now.getFullYear() === currentDate.getFullYear() && 
          now.getMonth() === currentDate.getMonth()) {
        return position;
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
      position++;
    }
    return position;
  }

  return (
    <div className="payment-countdown">
      <div className="header-section">
        <h1 className="main-title">⏰ Countdown to Freedom</h1>
      </div>

      <div className="time-display">
        <div className="time-grid">
          <div className="time-unit">
            <span className="time-value">{timeLeft.years}</span>
            <span className="time-label">Tahun</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeLeft.days}</span>
            <span className="time-label">Hari</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeLeft.hours}</span>
            <span className="time-label">Jam</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeLeft.minutes}</span>
            <span className="time-label">Menit</span>
          </div>
          <div className="time-unit">
            <span className="time-value">{timeLeft.seconds}</span>
            <span className="time-label">Detik</span>
          </div>
        </div>
      </div>

      <div className="financial-section">
        <div className="amount-cards">
          <div className="amount-card danger">
            <h3>💸 Sisa Denda</h3>
            <div className="amount">{formatRupiah(amountLeft)}</div>
            <div className="percentage">{(100 - progress).toFixed(2)}%</div>
          </div>
          <div className="amount-card success">
            <h3>✅ Sudah Terbayar</h3>
            <div className="amount">{formatRupiah(amountGained)}</div>
            <div className="percentage">{progress.toFixed(2)}%</div>
          </div>
        </div>

        <div className="progress-section">
          <h3>Progress Pembayaran</h3>
          <ProgressBar 
            completed={progress} 
            bgColor="#4ecdc4"
            baseBgColor="#2c3e50"
            height="25px"
            borderRadius="15px"
            labelColor="#ffffff"
            labelSize="14px"
          />
        </div>

        <div className="burn-rates">
          <h3>📊 Tingkat Pembayaran (Burn Rate)</h3>
          <div className="burn-grid">
            <div className="burn-card">
              <div className="burn-period">Harian</div>
              <div className="burn-amount">{formatRupiah(burnRates.daily)}</div>
            </div>
            <div className="burn-card">
              <div className="burn-period">Mingguan</div>
              <div className="burn-amount">{formatRupiah(burnRates.weekly)}</div>
            </div>
            <div className="burn-card">
              <div className="burn-period">Bulanan</div>
              <div className="burn-amount">{formatRupiah(burnRates.monthly)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>📈 Proyeksi Pembayaran</h3>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
        
        <div className="milestones-section">
          <h4 style={{ color: '#4ecdc4', marginBottom: '20px', textAlign: 'center' }}>
            🎯 Milestone Progress
          </h4>
          <div className="milestones-grid">
            {milestones.map((milestone) => (
              <div 
                key={milestone.percentage}
                className={`milestone-card ${milestone.isReached ? 'reached' : 'upcoming'}`}
              >
                <div className="milestone-percentage">
                  {milestone.percentage}%
                </div>
                <div className="milestone-date">
                  {milestone.formattedDate}
                </div>
                <div className="milestone-status">
                  {milestone.isReached ? '✅ Tercapai' : '⏳ Mendatang'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCountdown;
