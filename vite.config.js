import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/shelf/",
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8080
  }
})
