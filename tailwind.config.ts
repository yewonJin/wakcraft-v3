import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s',
      },
      colors: {
        background: {
          primary: 'rgb(var(--background-primary))',
          secondary: 'rgb(var(--background-secondary))',
          tertiary: 'rgb(var(--background-tertiary))',
        },
        text: {
          primary: 'rgb(var(--text-primary))',
          secondary: 'rgb(var(--text-secondary))',
          tertiary: 'rgb(var(--text-tertiary))',
        },
      },
    },
  },

  plugins: [],
}

export default config
