/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#FFFFFF',
        card: '#0a0a0a',
        primary: '#FFFFFF', // Black and White theme
        glow: '#ffffff44',
      },
      fontFamily: {
        sans: ['"Exo 2"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'fish-skeleton': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 M50 20 L50 80 M30 30 L70 70 M30 70 L70 30\' stroke=\'white\' stroke-opacity=\'0.05\' fill=\'none\' stroke-width=\'1\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'white-glow': '0 0 20px rgba(255, 255, 255, 0.3)',
      }
    },
  },
  plugins: [],
}