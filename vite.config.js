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
  css: {
    devSourcemap: true
  },
  server: {
   middlewareMode:true,
   proxy:{
    
    '/app': 'http://localhost:6969/app',
    '/cdp': 'http://localhost:6969/cdp'
   }
  },
  base:'/app'
});
