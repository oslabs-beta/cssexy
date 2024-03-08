// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.join(__dirname, '/'),
  build: {
    outDir: path.join(__dirname, 'dist'),
    sourcemap: true,
  },
  // css: {
  //   devSourcemap: true
  // },
  server: {
    port: 8888,
    // proxy requests to API endpoint to the Express server
    proxy: {

      '/cdp':{
       target: 'http://localhost:5555',
       changeOrigin: true,
       secure:false
      },
      '/frame':{
        target: 'http://localhost:5555',
       
       }

    }
  }
});
