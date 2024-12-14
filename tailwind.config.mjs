import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto Mono', 'monospace'],
        Playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  variants: {},
  plugins: [],
  plugins: [daisyui],
};
