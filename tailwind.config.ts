import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#EAEAEA',
        
        'main': '#FFA542',
        'light': '#fff',
        'dark': '#000',

        'gray': '#838383',
        
      },
      borderRadius: {
        '4xl': '30px',
      },
      boxShadow: {
        'card': '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',
      }
    },
  },
  plugins: [],
}
export default config
