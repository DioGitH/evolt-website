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
        "login-page-bg": "url('/assets/img/loginBackground.svg')",
      },
      colors: {
        'palette-1': '#322C39',
        'palette-2': '#609FA1',
        'palette-3': '#EFEEEC',
        'pallete-4': '#C82C6D',
      },
      fontFamily: {
        robotoMono: ['Roboto Mono'],
      },
    },
  },
  plugins: [],
};
export default config;
