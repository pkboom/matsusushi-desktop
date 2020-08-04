module.exports = {
  plugins: [
    require("postcss-nesting"),
    require("postcss-import"),
    require("tailwindcss")("./tailwind.config.js"),
  ],
};
