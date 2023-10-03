/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      outline: {
        none: 'none'
      },
      colors: {
        "primary-black": "#252525",
        "primary-yellow":"#FFB800",
        "primary-red": "#E43535"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
