module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right bottom, rgba(167, 190, 182, 0.85), rgba(167, 190, 182, 0.85)), url('/public/img/background.jpg')",
      },
      fontFamily: {
        heading: ["Shadows Into Light"],
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
