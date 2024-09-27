import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B85F4",
        secondary: "#43B9FB",
        black: "#121217",
        outline: {
          gray: "#8A8AA3"
        }
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
