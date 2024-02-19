/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
      '3xl': '5px 3px 4px 0px rgba(0,0,0,0.25)',
      '4xl': '4px 4px 11px 0px rgba(0,0,0,0.3)',
      '5xl': 'inset -10px -10px 15px 0px rgba(0,0,0,0.15)',
    },
    keyframes: {
      trash: {
        "0%": {
          color: "#2D2A2A",
           top: "0"
         },
         "50%": {
           top: "100%"
         },
         "100%": {
           top: "0"
         }
      },
      up: {
        "0%": {
          top: "0%"
        },
        "100%": {
          top: "-20%"
        }  
      },
      spina: {
        "0%": {
            rotate: "0deg",
        },
        "100%": {
          rotate: "360deg"
        }
      }
    }, 
    animation : {
      trash: "trash 300ms ease-in-out",
      up: "up 300ms ease-out",
      spina: "spina 2s infinite",
    }
    
  },
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

