/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A", // Dark Blue for primary buttons, headers
          hover: "#2563EB", // Lighter Blue for hover
        },
        secondary: {
          DEFAULT: "#10B981", // Green for success messages, secondary buttons
          hover: "#34D399", // Lighter Green for hover
        },
        danger: {
          DEFAULT: "#EF4444", // Red for delete buttons, errors
          hover: "#F87171", // Lighter Red for hover
        },
        background: {
          DEFAULT: "#F3F4F6", // Light Gray for background
          dark: "#E5E7EB", // Slightly darker for cards
        },
        text: {
          DEFAULT: "#1F2937", // Dark Gray for text
          light: "#6B7280", // Lighter Gray for secondary text
        },
        border: {
          DEFAULT: "#D1D5DB", // Gray for borders
        },
      },
    },
  },
  plugins: [],
};