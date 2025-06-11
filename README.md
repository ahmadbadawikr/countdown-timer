# Countdown Timer

A React-based countdown application that tracks progress toward financial freedom with visual countdown timers, progress tracking, and inspirational quotes.

## 🚀 Features

- **Financial Progress Tracking**: Tracks countdown from IDR 200,000,000 "tax" over a 3-year period (August 1, 2024 to August 1, 2027)
- **Real-time Updates**: Millisecond-precision countdown with live updates
- **Progress Visualization**: 
  - Linear progress bar showing percentage completion
  - Circular countdown timer with color-coded progress
  - Line chart projecting financial progress over time
- **Inspirational Quotes**: Rotating slideshow of freedom-themed quotes
- **Responsive Design**: Modern, dark-themed UI that adapts to different screen sizes

## 📋 Project Structure

```
countdown-timer/
├── public/                 # Static assets
├── src/
│   ├── App.js             # Main application component
│   ├── PaymentCountdown.js # Main countdown & financial tracking
│   ├── QuotesSlideshow.js  # Inspirational quotes slideshow
│   ├── ClockCountdown.js   # Circular countdown timer
│   ├── App.css            # Application styles
│   └── ...                # Other React files
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🛠️ Technologies Used

- **React 18.3.1** - Frontend framework
- **Chart.js** - Data visualization for financial projections
- **React Progress Bar** - Linear progress visualization
- **React Countdown Circle Timer** - Circular countdown component
- **React Slideshow Image** - Quote slideshow functionality

## 🎯 Components Overview

### PaymentCountdown
The main component that handles:
- Countdown calculation from start date (August 1, 2024) to end date (August 1, 2027)
- Financial progress tracking (IDR 200,000,000 total)
- Progress bar visualization
- Line chart showing projected amount left vs. amount gained over time
- Calculation of when "amount left equals amount gained"

### QuotesSlideshow
Displays rotating inspirational quotes about freedom from various notable figures including:
- Historical leaders (Gandhi, MLK Jr., Lincoln, Mandela)
- Fictional characters (Optimus Prime, Uncle Ben, Dumbledore)

### ClockCountdown
A circular timer showing the overall progress as a percentage with color-coded visualization:
- Blue (0-33%)
- Yellow (33-66%)
- Red (66-100%)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd countdown-timer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder with optimized performance

### `npm run eject`
⚠️ **One-way operation**: Removes Create React App build dependency and exposes configuration files

## 🎨 Customization

### Changing the Countdown Period
To modify the countdown dates, edit the values in `PaymentCountdown.js`:
```javascript
const startDate = useMemo(() => new Date('2024-08-01T17:00:00'), []);
const endDate = useMemo(() => new Date('2027-08-01T17:00:00'), []);
```

### Modifying the Financial Amount
Update the total amount in `PaymentCountdown.js`:
```javascript
const totalAmount = 200000000; // IDR 200,000,000
```

### Adding Custom Quotes
Edit the quotes array in `QuotesSlideshow.js`:
```javascript
const quotes = [
  {
    text: "Your custom quote here",
    author: "Author Name",
  },
  // ... add more quotes
];
```

## 🎯 Key Features Details

### Real-time Precision
- Updates every millisecond for precise countdown tracking
- Calculates elapsed time and remaining financial "tax"
- Shows years, days, hours, minutes, seconds, and milliseconds

### Data Visualization
- **Progress Bar**: Shows percentage completion with smooth animations
- **Line Chart**: Projects financial progress over the entire 3-year period
- **Circular Timer**: Visual countdown with color transitions

### Responsive Design
- Dark theme optimized for visibility
- Flexible layout that adapts to different screen sizes
- Clean, modern typography using Arial font family

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for personal use. Please respect the inspirational quotes' original sources.

## 🙏 Acknowledgments

- Inspirational quotes from various historical figures and fictional characters
- Built with Create React App for rapid development
- Uses Chart.js for beautiful data visualizations
