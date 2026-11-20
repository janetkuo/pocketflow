/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './app.js'],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: 'rgb(var(--pf-primary-rgb) / 0.12)',
          100: '#F1F5F9',
          200: 'rgb(var(--pf-primary-rgb) / 0.35)',
          300: 'rgb(var(--pf-primary-rgb) / 0.5)',
          400: 'rgb(var(--pf-primary-rgb) / 0.7)',
          500: 'rgb(var(--pf-primary-rgb) / <alpha-value>)',
          600: 'rgb(var(--pf-primary-rgb) / <alpha-value>)',
          700: 'rgb(var(--pf-primary-dark-rgb) / <alpha-value>)',
          800: 'rgb(var(--pf-primary-dark-rgb) / 0.85)',
          900: 'rgb(var(--pf-primary-dark-rgb) / 0.95)',
          950: 'rgb(var(--pf-primary-dark-rgb) / 0.4)',
        },
        emerald: {
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: 'var(--pf-income)',
          600: 'rgb(var(--pf-income-rgb) / 0.9)',
        },
        rose: {
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: 'var(--pf-expense)',
          600: 'rgb(var(--pf-expense-rgb) / 0.9)',
        },
        pocket: {
          primary: 'var(--pf-primary, #5B7C75)',
          income: 'var(--pf-income, #5E8C78)',
          expense: 'var(--pf-expense, #B86968)',
          card: '#ffffff',
          darkcard: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Noto Sans TC', 'sans-serif']
      }
    }
  }
};
