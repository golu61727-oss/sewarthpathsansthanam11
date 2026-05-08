import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  important: "#__next",
  theme: {
    extend: {
      colors: {
        saffron: "#E07B39",
        deepGreen: "#2D6A4F",
        gold: "#C9920C",
        cream: "#FFFBF5",
        warmBrown: "#6B3A1F",
      },
    },
  },
  plugins: [],
};

export default config;
