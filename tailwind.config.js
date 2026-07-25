/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        accent: '#10B981',
        dark: '#1F2937',
        light: '#F8F8F8',
        border: '#ECECEC',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.14)',
        sticky: '0 2px 16px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      },
    },
  },
  plugins: [],
}
