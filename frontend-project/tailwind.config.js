/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2C4A52", // Deep Teal for primary buttons, headers (modern and professional)
          hover: "#4A6A73", // Lighter Teal for hover
        },
        secondary: {
          DEFAULT: "#F4A261", // Warm Orange for success messages, secondary buttons (adds a pop of color)
          hover: "#F6B17A", // Lighter Orange for hover
        },
        danger: {
          DEFAULT: "#D9534F", // Soft Red for delete buttons, errors (less harsh than the previous red)
          hover: "#E57373", // Lighter Red for hover
        },
        background: {
          DEFAULT: "#F5F7FA", // Very Light Blue-Gray for background (clean and minimal)
          dark: "#E8ECEF", // Slightly darker Blue-Gray for cards
        },
        text: {
          DEFAULT: "#2D3748", // Dark Slate for text (good contrast for readability)
          light: "#718096", // Muted Slate for secondary text
        },
        border: {
          DEFAULT: "#CBD5E0", // Soft Gray for borders (subtle and clean)
        },
      },
    },
  },
  plugins: [],
};