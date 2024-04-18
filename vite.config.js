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
    proxy: {
      '/cdp': 'http://localhost:8888',
      '/patch': 'http://localhost:8888',
      '/read': 'http://localhost:8888',
      '/app': 'http://localhost:8888'
    }
  }
});
