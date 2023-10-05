/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        slowPing: {
          '75%,100%': {
            transform: 'scale(2)',
            opacity: '0'
          },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        slowPing: 'slowPing 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    },

  },
  plugins: [],
}

