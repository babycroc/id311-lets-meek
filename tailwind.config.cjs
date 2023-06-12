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
          purple: "#7e22ce",
          blue: "#1d4ed8",
          orange: "#c2410c",
          red: "#b91c1c",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};

module.exports = config;
