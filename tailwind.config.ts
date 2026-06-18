import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yes: {
          ink: "#11110F",
          panel: "#191914",
          line: "#2C2B24",
          mist: "#F7F4E8",
          muted: "#A9A38F",
          green: "#7AE582",
          teal: "#00C2A8",
          rose: "#F45B69",
          gold: "#F9C74F",
        },
      },
      boxShadow: {
        phone: "0 30px 90px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
