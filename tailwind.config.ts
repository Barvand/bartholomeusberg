import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { fjord: { 50: "#f4f8fa", 100: "#e5eff4", 200: "#c9dde8", 300: "#9dbed1", 500: "#3b7896", 600: "#28647f", 700: "#1d4e68", 800: "#173e55", 900: "#102c3e", 950: "#091d2b" } },
      fontFamily: { sans: ["DM Sans", "Arial", "sans-serif"], display: ["Space Grotesk", "Arial", "sans-serif"] },
    },
  },
  plugins: [],
};

export default config;
