/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const goldenGradient = `0px 2px 2.4px -10px hsla(46deg, 98%, 47%, 0.13),
  0px 3px 5.4px -10px hsla(46deg, 100%, 45%, 0.2),
  0px 4px 9px -1px hsla(46deg, 100%, 43%, 0.26),
  0px 5px 13.6px -1px hsla(46deg, 100%, 37%, 0.3),
  0px 7px 19.7px -1px hsla(46deg, 100%, 34%, 0.35),
  0px 9px 27.8px -1px hsla(46deg, 100%, 32%, 0.4),
  0px 13px 39.5px -1px hsla(46deg, 100%, 29%, 0.44),
  0px 16px 57.3px -1px hsla(46deg, 100%, 30%, 0.5),
  0px 20px 20px -10px hsla(46deg, 97%, 32%, 0.57),
  0px 25px 15px -100px hsla(46deg, 93%, 34%, 0.7)`;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      boxShadow: {
        golden: goldenGradient,
      },
      fontFamily: {
        gambetta: ["Gambetta-Variable"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
