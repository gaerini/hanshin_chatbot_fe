import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },

    screens:{
      sm: "375px",
      md: "768px",
      lg: "1440px"
    },

    colors: {
      neutral: {
        black: "#000000",
        "800": "#262626",
        "700": "#404040",
        "600": "#525252",
        "500": "#737373",
        "400": "#A3A3A3",
        "300": "#D4D4D4",
        "200": "#E5E5E5",
        "100": "#F5F5F5",
        "50": "#FAFAFA",
        white: "#FFFFFF"
      },

      blue: {
        original : "#5085EA",
        "800": "#014A97",
        "700": "#3270D2",
        "600": "#5184E7",
        "500": "#7298F6",
        "400": "#93AEFF",
        "300": "#B3C4FF",
        "200": "#D3DBFF",
        "100": "#F1F3FF"
      }
    },

    fontSize: {
      "title": ["1.125rem", "120%"], // text-title
      "paragraph-l" : ["1rem", "150%"],
      "paragraph-chatBot" : ["1rem", "200%"],
      "paragraph-m": ["0.875rem", "120%"],
      "caption": ["0.75rem", "150%"]
    },

  },
  plugins: [],
};
export default config;
