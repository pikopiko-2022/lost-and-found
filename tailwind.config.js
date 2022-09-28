/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/components/**/*.{html,js,jsx}', './server/public/index.html'],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#387C6D",
        "secondary": "#E9896A",
        "accent": "#37cdbe",
        "neutral": "#3d4451",
        "base-100": "#F8F5F1",
        "info": "#E8DFCA",
      }
    }]
  },
  theme: {
    extend: {},
    fontFamily: {
      'body': ['Railway','Helvetica', 'Arial'],
      'secondary': ['Open Sans'],
    },
  },
  plugins: [require("daisyui")],
}

// F8F5F1