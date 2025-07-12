/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of your template files
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Enable dark mode using the 'class' strategy (use 'dark' class on <html> or <body>)
  darkMode: 'class',

  theme: {
    // Extend the default Tailwind theme here
    extend: {
      // Example: add custom colors, spacing, fonts, etc.
    },
  },

  // Register any Tailwind plugins here (e.g., forms, typography)
  plugins: [],
};
