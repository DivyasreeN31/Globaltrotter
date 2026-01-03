# GlobalTrotter - React Vite Project

A modern travel planning application built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design
- 🗺️ Multiple pages: Admin Panel, Explore, Profile, Trips, Itinerary, Community, and more
- 📊 Charts and analytics (Chart.js)
- 🧭 React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
globaltrotter/
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navigation header component
│   │   └── Footer.jsx      # Footer component
│   ├── pages/
│   │   ├── AdminPanel.jsx  # Admin dashboard with charts
│   │   ├── Explore.jsx     # Explore destinations
│   │   ├── Profile.jsx     # User profile page
│   │   ├── Register.jsx    # Registration form
│   │   ├── Trips.jsx       # User trips listing
│   │   ├── Itinerary.jsx   # Build itinerary page
│   │   ├── Community.jsx   # Community feed
│   │   ├── Budget.jsx      # Budget planning
│   │   ├── Calendar.jsx    # Calendar view
│   │   ├── CitySearch.jsx  # City and activity search
│   │   └── NewTrip.jsx     # Create new trip
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles and Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Available Routes

- `/` - Admin Panel (Dashboard)
- `/explore` - Explore destinations
- `/profile` - User profile
- `/register` - Registration page
- `/trips` - My trips listing
- `/itinerary` - Build itinerary
- `/community` - Community feed
- `/budget` - Budget planning
- `/calendar` - Calendar view
- `/citysearch` - City and activity search
- `/newtrip` - Create new trip

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Chart.js** - Charts and graphs
- **Material Icons** - Icon library

## Dark Mode

Dark mode can be toggled using the theme toggle button in the header. The preference is stored in the browser's local storage.

## License

© 2024 GlobalTrotter Inc. All rights reserved.

