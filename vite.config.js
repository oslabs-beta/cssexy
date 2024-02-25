import { defineConfig } from 'vite';

export default defineConfig({
  // points Vite to the correct directory where index.html is located
  root: './client',
  // sets the development server to run on port 8080
  server: {
    port: 8080,
    // proxy API requests to the Express server
    proxy: {
      'api': 'http://localhost:3000'
    }
  }
});