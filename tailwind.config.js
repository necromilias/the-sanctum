/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // KDE Andromeda inspired palette
        void: {
          950: '#080b12',
          900: '#0d1117',
          800: '#111827',
          700: '#161d2b',
          600: '#1a2236',
        },
        panel: {
          900: '#0f1923',
          800: '#141f2e',
          700: '#1a2640',
          600: '#1f2e4a',
          500: '#243453',
        },
        cyan: {
          50:  '#e0f9ff',
          100: '#b8f3ff',
          200: '#7eeaff',
          300: '#38dcff',
          400: '#00ccf5',
          500: '#00b4d8',
          600: '#0090b5',
          700: '#006f8f',
          800: '#005470',
          900: '#003a50',
        },
        blue: {
          50:  '#e8f0ff',
          100: '#c4d5ff',
          200: '#93b0ff',
          300: '#5a87ff',
          400: '#3d6bff',
          500: '#2952f0',
          600: '#1d3fd6',
          700: '#142fb5',
          800: '#0d2090',
          900: '#071570',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        ghost: {
          50:  'rgba(255,255,255,0.95)',
          100: 'rgba(255,255,255,0.85)',
          200: 'rgba(255,255,255,0.70)',
          300: 'rgba(255,255,255,0.55)',
          400: 'rgba(255,255,255,0.40)',
          500: 'rgba(255,255,255,0.25)',
          600: 'rgba(255,255,255,0.12)',
          700: 'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,180,216,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,180,216,0.03) 1px, transparent 1px)`,
        'glow-cyan': 'radial-gradient(ellipse at 50% 0%, rgba(0,180,216,0.15) 0%, transparent 70%)',
        'glow-blue': 'radial-gradient(ellipse at 80% 20%, rgba(41,82,240,0.12) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(0,180,216,0.25)',
        'glow':    '0 0 24px rgba(0,180,216,0.30)',
        'glow-lg': '0 0 48px rgba(0,180,216,0.20)',
        'panel':   '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'fade-in':      'fade-in 0.6s ease forwards',
        'slide-up':     'slide-up 0.5s ease forwards',
        'scan':         'scan 8s linear infinite',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scan': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
