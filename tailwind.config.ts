import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'vt323': ['"VT323"', 'monospace'],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'pixel-pulse': 'pixel-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'pixel': '0 0 0 2px #1f2937, 0 0 0 4px #111827',
        'pixel-hover': '0 0 0 2px #374151, 0 0 0 4px #1f2937',
      },
    },
  },
  plugins: [],
} satisfies Config;