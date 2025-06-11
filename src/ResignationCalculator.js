import React, { useState, useCallback, useMemo } from 'react';

const ResignationCalculator = () => {
  const totalAmount = 200000000; // IDR 200,000,000
  const startDate = useMemo(() => new Date('2024-08-01T17:00:00'), []);
  const endDate = useMemo(() => new Date('2027-08-01T17:00:00'), []);
  const totalTime = useMemo(() => endDate - startDate, [endDate, startDate]);

  const [selectedDate, setSelectedDate] = useState('');
  const [calculationResult, setCalculationResult] = useState(null);

  // Format currency in Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date to Indonesian
  const formatDateIndonesian = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate fine amount based on resignation date
  const calculateFine = useCallback((resignationDate) => {
    const resignDate = new Date(resignationDate);
    
    // Validation
    if (resignDate < startDate) {
      return {
        error: 'Tanggal pengunduran diri tidak boleh sebelum tanggal mulai kontrak (1 Agustus 2024)'
      };
    }
    
    if (resignDate >= endDate) {
      return {
        fine: 0,
        message: 'Selamat! Anda sudah menyelesaikan kontrak penuh, tidak ada denda!',
        percentage: 100,
        timeServed: totalTime,
        timeRemaining: 0
      };
    }

    // Calculate time served and remaining
    const timeServed = resignDate - startDate;
    const timeRemaining = endDate - resignDate;
    const percentageServed = (timeServed / totalTime) * 100;
    
    // Fine calculation: remaining percentage of total amount
    const fineAmount = (timeRemaining / totalTime) * totalAmount;
    
    return {
      fine: fineAmount,
      percentage: percentageServed,
      timeServed: timeServed,
      timeRemaining: timeRemaining,
      resignDate: resignDate
    };
  }, [startDate, endDate, totalTime, totalAmount]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    
    if (date) {
      const result = calculateFine(date);
      setCalculationResult(result);
    } else {
      setCalculationResult(null);
    }
  };

  const formatDuration = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const finalDays = remainingDays % 30;

    let result = [];
    if (years > 0) result.push(`${years} tahun`);
    if (months > 0) result.push(`${months} bulan`);
    if (finalDays > 0) result.push(`${finalDays} hari`);
    
    return result.join(', ') || '0 hari';
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];
  const maxDate = endDate.toISOString().split('T')[0];

  return (
    <div className="resignation-calculator">
      <div className="calculator-header">
        <h2>🧮 Kalkulator Denda Pengunduran Diri</h2>
        <p className="calculator-subtitle">
          Hitung berapa denda yang harus dibayar jika mengundurkan diri pada tanggal tertentu
        </p>
      </div>

      <div className="calculator-form">
        <div className="date-input-section">
          <label htmlFor="resignation-date" className="date-label">
            📅 Pilih Tanggal Pengunduran Diri:
          </label>
          <input
            type="date"
            id="resignation-date"
            value={selectedDate}
            onChange={handleDateChange}
            min={today}
            max={maxDate}
            className="date-input"
          />
          <small className="date-help">
            Pilih tanggal antara hari ini sampai {formatDateIndonesian(endDate)}
          </small>
        </div>

        {calculationResult && (
          <div className="calculation-result">
            {calculationResult.error ? (
              <div className="error-message">
                ❌ {calculationResult.error}
              </div>
            ) : (
              <div className="result-content">
                <div className="result-header">
                  <h3>💰 Hasil Perhitungan Denda</h3>
                  {calculationResult.message && (
                    <div className="success-message">
                      🎉 {calculationResult.message}
                    </div>
                  )}
                </div>

                {!calculationResult.message && (
                  <>
                    <div className="main-result">
                      <div className="fine-amount">
                        <span className="fine-label">Denda yang harus dibayar:</span>
                        <span className="fine-value">{formatRupiah(calculationResult.fine)}</span>
                      </div>
                    </div>

                    <div className="result-details">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <div className="detail-label">📊 Persentase Kontrak Terselesaikan:</div>
                          <div className="detail-value success">{calculationResult.percentage.toFixed(1)}%</div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-label">⏰ Waktu Sudah Dilayani:</div>
                          <div className="detail-value">{formatDuration(calculationResult.timeServed)}</div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-label">⏳ Waktu Tersisa:</div>
                          <div className="detail-value warning">{formatDuration(calculationResult.timeRemaining)}</div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-label">📅 Tanggal Pengunduran Diri:</div>
                          <div className="detail-value">{formatDateIndonesian(calculationResult.resignDate)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="advice-section">
                      <h4>💡 Saran:</h4>
                      <ul className="advice-list">
                        {calculationResult.percentage < 50 && (
                          <li>⚠️ Anda belum menyelesaikan 50% kontrak, denda masih cukup besar</li>
                        )}
                        {calculationResult.percentage >= 50 && calculationResult.percentage < 75 && (
                          <li>📈 Anda sudah menyelesaikan lebih dari setengah kontrak</li>
                        )}
                        {calculationResult.percentage >= 75 && calculationResult.percentage < 90 && (
                          <li>🎯 Anda sudah hampir menyelesaikan kontrak, denda relatif kecil</li>
                        )}
                        {calculationResult.percentage >= 90 && (
                          <li>🏆 Excellent! Anda sudah hampir selesai, denda sangat kecil</li>
                        )}
                        <li>💰 Semakin lama Anda bertahan, semakin kecil denda yang harus dibayar</li>
                        <li>📋 Pastikan untuk membaca ulang kontrak kerja sebelum mengambil keputusan</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResignationCalculator; 