/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        surface: {
          DEFAULT: '#0e0e1a',
          50:  '#f8f8ff',
          100: '#16162a',
          200: '#1c1c30',
          300: '#232336',
          400: '#2a2a40',
        },
      },
      backgroundImage: {
        'hero': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.25) 0%, transparent 60%), linear-gradient(180deg, #0a0a12 0%, #0e0e1a 100%)',
        'card-glow': 'linear-gradient(145deg, rgba(99,102,241,0.06), rgba(139,92,246,0.03))',
        'gradient-text': 'linear-gradient(135deg, #818cf8, #c084fc)',
        'btn-primary': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'btn-primary-hover': 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(139,92,246,0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset',
        'glow-sm': '0 0 20px rgba(99,102,241,0.3)',
        'glow-md': '0 0 40px rgba(99,102,241,0.4)',
        'glow-lg': '0 0 60px rgba(99,102,241,0.5)',
      },
    },
  },
  plugins: [],
};
