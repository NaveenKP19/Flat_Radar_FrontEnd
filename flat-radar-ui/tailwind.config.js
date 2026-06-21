/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // Flat Radar Theme Color Palette
        radar: {
          dark: '#0B0F19',       // Deep space background
          surface: '#151C2C',    // Card surfaces
          accent: '#10B981',     // Active radar green
          accentHover: '#059669',
          border: '#1F2937',      // Thin structural lines
        }
      }
    },
  },
  plugins: [],
}

