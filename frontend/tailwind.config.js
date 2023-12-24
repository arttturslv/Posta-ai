/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'licorice': '#210f04',
      'seal-brown': '#582f0e',
      'light-blue': '#9bbec7',
      'salmon-pink': '#FFA5AB',
      'mindaro': '#c8e087',
      'jasmine': '#EECF6D',
      'light-green': '#aceb98',
      'tomato': '#f15946',
    },  
    backgroundImage: {
      'canvas': "url('https://img.freepik.com/free-photo/white-paper-texture_1194-2324.jpg?w=996&t=st=1703445028~exp=1703445628~hmac=a0e3642cf9ec4f9eaf72608b26e506aa9a1ffa3fd0bbbe19713820eb90d6414d')",
      'footer-texture': "url('/img/footer-texture.png')",
    }
  },
  plugins: [],
}

