import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "collection-1-font": "var(--collection-1-font)",
        "collection-1-primary": "var(--collection-1-primary)",
        "collection-1-secondary": "var(--collection-1-secondary)",
        "collection-1-shade-1": "var(--collection-1-shade-1)",
        "collection-1-shade-2": "var(--collection-1-shade-2)",
        "collection-1-shade-3": "var(--collection-1-shade-3)",
        "collection-1-shade-BG": "var(--collection-1-shade-BG)",
        "collection-1-stroke": "var(--collection-1-stroke)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [],
}
export default config
