// src/QuotesSlideshow.js
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const quotes = [
    {
      text: "Kebebasan finansial bukan tentang memiliki banyak uang, tetapi tentang memiliki pilihan dalam hidup.",
      author: "Anonim",
    },
    {
      text: "Kontrak kerja adalah komitmen, bukan penjara. Tapi keluar dengan cara yang terhormat adalah investasi jangka panjang.",
      author: "Pepatah Bisnis",
    },
    {
      text: "Freedom is not worth having if it does not include the freedom to make mistakes.",
      author: "Mahatma Gandhi",
    },
    {
      text: "Setiap hari yang berlalu adalah investasi menuju kebebasan yang sesungguhnya.",
      author: "Motivasi Harian",
    },
    {
      text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
      author: "Albert Camus",
    },
    {
      text: "Bersabar dalam menjalani komitmen adalah tanda kedewasaan profesional.",
      author: "Wisdom Indonesia",
    },
    {
      text: "Those who deny freedom to others, deserve it not for themselves.",
      author: "Abraham Lincoln",
    },
    {
      text: "Setiap rupiah yang 'terbakar' hari ini adalah langkah menuju kebebasan di masa depan.",
      author: "Financial Freedom Quote",
    },
    {
      text: "For to be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.",
      author: "Nelson Mandela",
    },
    {
      text: "Menghitung hari menuju kebebasan sambil menghargai proses pembelajaran adalah kearifan sejati.",
      author: "Professional Wisdom",
    },
    {
      text: "With great power comes great responsibility.",
      author: "Uncle Ben (Spider-Man)",
    },
    {
      text: "Waktu adalah uang, tetapi pengalaman adalah harta yang tak ternilai.",
      author: "Pepatah Bisnis Indonesia",
    }
  ];

const QuotesSlideshow = () => {
  const slideProperties = {
    duration: 4000,
    autoplay: true,
    transitionDuration: 500,
    arrows: false,
    pauseOnHover: true,
    prevArrow: <div></div>,
    nextArrow: <div></div>,
    indicators: false
  };

  return (
    <div className="slide-container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#4ecdc4' }}>
        💭 Motivasi & Inspirasi
      </h2>
      <Slide {...slideProperties}>
        {quotes.map((quote, index) => (
          <div className="each-slide" key={index}>
            <div>
              <h3>"{quote.text}"</h3>
              <p>- {quote.author}</p>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default QuotesSlideshow;
