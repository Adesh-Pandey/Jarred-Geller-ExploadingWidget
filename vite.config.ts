import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add the following line to enable HMR
    hmr: {
      overlay: true,
    },
  },
})

// vite.config.ts