import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/badge': {
        target: 'http://0.0.0.0:5001', // Your backend server URL
        changeOrigin: true,
      },
      '/provider': {
        target: 'http://0.0.0.0:5001', // Your backend server URL
        changeOrigin: true,
      },
      '/examiner': {
        target: 'http://0.0.0.0:5001', // Your backend server URL
        changeOrigin: true,
      },
      '/candidate': {
        target: 'http://0.0.0.0:5001', // Your backend server URL
        changeOrigin: true,
      }
    },
  },

})
