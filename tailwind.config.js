/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#279EFF",
        "secondary-blue": "#A0E9FF",
      },
    },
  },
  plugins: [],
};
