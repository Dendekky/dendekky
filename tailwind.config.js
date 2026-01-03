/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        white: '#fff',
        lightText: '#eaeaea',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#eaeaea',
            maxWidth: 'none',
            a: {
              color: '#fff',
              textDecoration: 'underline',
              '&:hover': {
                color: '#eaeaea',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
            code: {
              color: '#fff',
              backgroundColor: '#1a1a1a',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#1a1a1a',
            },
            blockquote: {
              borderLeftColor: '#eaeaea',
              color: '#eaeaea',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
