/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '320px',
      // => @media (min-width: 640px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'mild-yellow': '#fef08a',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#78716c',
      'black': '#1C1C1C',
      'black2': '#2C2C2C',
      'red-400': '#f87171',
      'red-600': '#dc2626',
      'white': '#fff',

      green: {
        500: "#22C55E", // Grunge Revolution, Play button
      },
      orange: {
        300: "#FCD34D", // Emotional Dark Moments
        400: "#FB923C", // Sounds of the 90s
      },
      pink: {
        400: "#F472B6", // Darkness and Rebellion, Heart icon hover
      },
      blue: {
        400: "#60A5FA", // Cult Rock Albums
      },
      gray: {
        400: "#9CA3AF", // Light text
        600: "#4B5563", // Sidebar darker gray
        700: "#374151", // Main background darkest gray
      },
      black: {
        DEFAULT: "#000000", // Album cover background
      },
      white: {
        DEFAULT: "#FFFFFF", // Progress bar etc.
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        slide: 'slide 15s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'image1': "url('C:\\Users\\MCA\\Desktop\\Music Website\\music-website\\backend\\uploads\\covers\\chasingStars.jpg')",
        'image2': "url('C:\\Users\\MCA\\Desktop\\Music Website\\music-website\\backend\\uploads\\covers\\fadedAlanWalker.jpeg')",
        'image3': "url('C:\\Users\\MCA\\Desktop\\Music Website\\music-website\\backend\\uploads\\covers\\kitnaBechainHoke.jpg')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

