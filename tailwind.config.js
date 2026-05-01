/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ruta: {
          primary: "#0B8A6B", // Verde oscuro de la marca
          secondary: "#39B98F", // Verde claro
          bg: "#F3F4F6", // Fondo gris claro
          sidebar: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
