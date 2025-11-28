/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
    './resources/**/*.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1DAA61',
        'primary-light': '#CBF2DC',
        'primary-hover': '#137241',
        'primary-content': '#000000bf',
        
        // Secondary Colors
        'secondary': '#E1E1E4',
        'secondary-content': '#FFFFFF',
        
        // Base Colors
        'base-100': '#F7F5F3',
        'base-200': '#FFFFFF',
        'base-300': '#F2EFED',
        'base-content': '#2F2B3DE6',
        
        // Accent & Neutral
        'accent': '#E5E7EB',
        'neutral': '#F6F5F4',
        
        // Status Colors
        'info': '#139451',
        'success': '#4CAF50',
        'warning': '#FBBD23',
        'error': '#fb2c36e8',
        
        // Dark Theme
        'dark': '#2A2E42',
        'dark-light': '#DEDEE2',
        'dark-content': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'primary': '0 4px 12px rgba(29, 170, 97, 0.3)',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#1DAA61",
          "primary-content": "#000000bf",
          "secondary": "#E1E1E4",
          "secondary-content": "#FFFFFF",
          "accent": "#E5E7EB",
          "neutral": "#F6F5F4",
          "base-100": "#F7F5F3",
          "base-200": "#FFFFFF",
          "base-300": "#F2EFED",
          "base-content": "#2F2B3DE6",
          "info": "#139451",
          "success": "#4CAF50",
          "warning": "#FBBD23",
          "error": "#fb2c36e8",
        },
        dark: {
          "primary": "#1DAA61",
          "primary-content": "#FFFFFF",
          "secondary": "#4B5563",
          "secondary-content": "#FFFFFF",
          "accent": "#4B5563",
          "neutral": "#3a3f5c",
          "base-100": "#1a1d2e",
          "base-200": "#2A2E42",
          "base-300": "#3a3f5c",
          "base-content": "#FFFFFF",
          "info": "#139451",
          "success": "#4CAF50",
          "warning": "#FBBD23",
          "error": "#fb2c36e8",
        },
      },
    ],
  },
};
