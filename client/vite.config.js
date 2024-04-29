// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Make sure to add any other external dependencies here if needed
      external: [
        '@fortawesome/react-fontawesome',
        '@fortawesome/free-brands-svg-icons',
      ],
    },
  },
});
