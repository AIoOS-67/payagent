import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paypal: {
          blue: "#003087",
          sky: "#0070BA",
          light: "#E5F4FC",
          yellow: "#FFC439",
          dark: "#001C64",
        },
      },
    },
  },
  plugins: [],
};
export default config;
