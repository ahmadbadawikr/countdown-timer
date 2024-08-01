// src/QuotesSlideshow.js
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const quotes = [
    {
      text: "Freedom is not worth having if it does not include the freedom to make mistakes.",
      author: "Mahatma Gandhi",
    },
    {
      text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
      author: "Albert Camus",
    },
    {
      text: "Freedom is never voluntarily given by the oppressor; it must be demanded by the oppressed.",
      author: "Martin Luther King Jr.",
    },
    {
      text: "Those who deny freedom to others, deserve it not for themselves.",
      author: "Abraham Lincoln",
    },
    {
      text: "For to be free is not merely to cast off one’s chains, but to live in a way that respects and enhances the freedom of others.",
      author: "Nelson Mandela",
    },
    {
      text: "Freedom is the right of all sentient beings.",
      author: "Optimus Prime",
    },
    {
      text: "With great power comes great responsibility.",
      author: "Uncle Ben (Spider-Man)",
    },
    {
      text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
      author: "Albus Dumbledore (Harry Potter)",
    }
  ];

const QuotesSlideshow = () => {
  return (
    <div className="slide-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Slide>
        {quotes.map((quote, index) => (
          <div className="each-slide" key={index}>
            <div style={{ background: '#282c34', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
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
