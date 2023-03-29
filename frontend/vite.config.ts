import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/usage' : 'http://localhost:5000',
      '/upload' : 'http://localhost:5000',
    }},
})