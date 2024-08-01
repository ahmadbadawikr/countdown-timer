// src/PaymentCountdown.js
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const PaymentCountdown = () => {
  const totalAmount = 200000000; // IDR 200,000,000
  const startDate = useMemo(() => new Date('2024-08-01T17:00:00'), []);
  const endDate = useMemo(() => new Date('2027-08-01T17:00:00'), []);
  const totalTime = useMemo(() => endDate - startDate, [endDate, startDate]);

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

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      const elapsedTime = totalTime - newTimeLeft.totalMilliseconds;
      const newAmountLeft = totalAmount - (totalAmount * elapsedTime) / totalTime;
      setAmountLeft(newAmountLeft);
    }, 1); // Update every millisecond

    return () => clearInterval(timer);
  }, [calculateTimeLeft, totalTime, totalAmount]);

  const progress = ((totalAmount - amountLeft) / totalAmount) * 100;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Countdown to Freedom</h1>
      <div>
        <span>{timeLeft.years} years, </span>
        <span>{timeLeft.days} days, </span>
        <span>{timeLeft.hours} hours, </span>
        <span>{timeLeft.minutes} minutes, </span>
        <span>{timeLeft.seconds} seconds, </span>
        <span>{timeLeft.milliseconds} milliseconds</span>
      </div>
      <div>
        <h2>"I dont read what I sign" tax remaining: IDR {amountLeft.toFixed(2)}</h2>
        <ProgressBar completed={progress} />
      </div>
    </div>
  );
};

export default PaymentCountdown;
