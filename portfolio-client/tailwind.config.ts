import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: '#010314',
      secondary: '#7241FF',
      textPrimary: '#77798F',
      textSecondary: '#ffffff',
      button: '#2A2B3A',
      link: '#865BFF',
      headline: '#627FFF',
      success: '#84cc16',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        'button': '0 0 10px rgba(114, 65, 255, 0.4)',
        'custom': '0 0 20px rgba(114, 65, 255, 0.4)',
      },
      boxShadow: {
        'custom': '0 0 20px rgba(114, 65, 255, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
