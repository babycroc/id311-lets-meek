/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config}*/

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7e22ce",
          "base-100": "#ffffff",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};

module.exports = config;
