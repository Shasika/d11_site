/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'c-gold': '#B28B47',
        'c-dark': '#141414',
        'c-light': '#FFFFFF',
        'bg-default': 'var(--bg-default)',
        'text-default': 'var(--text-default)',
        'text-secondary': 'var(--text-secondary)',
        'bg-card': 'var(--bg-card)',
      },
      fontFamily: {
        'elegant-serif': ['Playfair Display', 'serif'],
        'sans': ['Roboto', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blink: {
          '0%, 100%': { 'border-right-color': 'transparent' },
          '50%': { 'border-right-color': '#B28B47' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'cursor-blink': 'blink 0.75s step-end infinite',
        'spin-slow': 'spin 1s linear infinite',
      }
    }
  },
  plugins: [],
}
