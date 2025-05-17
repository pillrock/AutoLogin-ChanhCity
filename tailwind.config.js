/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-pink': '#ff00ff',
        'neon-purple': '#9d00ff',
        'cyber-dark': '#0a0a0a',
      },
      fontFamily: {
        cyber: ['"Orbitron"', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 5px #ff36f2, 0 0 15px #ff36f2',
        'neon-blue': '0 0 5px #00f2ff, 0 0 15px #00f2ff',
      },
      backgroundImage: {
        'cyberpunk-city': "url('/background.jpg')",
      },
    },
  },
  plugins: [],
};
