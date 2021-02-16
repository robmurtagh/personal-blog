module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // Manual overrides for typography plugin, see:
      // https://github.com/tailwindlabs/tailwindcss-typography/issues/32
      // prettier-ignore
      typography: {
        "DEFAULT": { css: { pre: false } },
        "sm":      { css: { pre: false } },
        "lg":      { css: { pre: false } },
        "xl":      { css: { pre: false } },
        "2xl":     { css: { pre: false } },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
