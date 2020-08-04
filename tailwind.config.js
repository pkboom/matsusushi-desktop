const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        "2px": "2px",
      },
    },
    fill: (theme) => ({
      current: "currentColor",
      ...theme("colors"),
    }),
    stroke: (theme) => ({
      current: "currentColor",
      ...theme("colors"),
    }),
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "hover",
    "focus",
    "active",
    "odd",
    "first",
    "last",
  ],
  purge: {
    content: ["./src/**/*.js", "./src/**/*.vue"],
  },
};
