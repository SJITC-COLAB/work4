/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // Indigo for primary buttons, headers
          hover: "#6366F1",   // Slightly lighter Indigo for hover
        },
        secondary: {
          DEFAULT: "#14B8A6", // Teal for success messages, secondary buttons
          hover: "#2DD4BF",   // Lighter Teal for hover
        },
        danger: {
          DEFAULT: "#E11D48", // Rose Red for delete buttons, errors
          hover: "#FB7185",   // Lighter Rose for hover
        },
        background: {
          DEFAULT: "#F9FAFB", // Very Light Gray for background
          dark: "#E0E7FF",    // Soft Indigo-tinted Gray for cards
        },
        text: {
          DEFAULT: "#0F172A", // Very Dark Gray-Blue for text
          light: "#64748B",   // Muted Slate for secondary text
        },
        border: {
          DEFAULT: "#CBD5E1", // Slate Gray for borders
        },
      },
    },
  },
  plugins: [],
};
