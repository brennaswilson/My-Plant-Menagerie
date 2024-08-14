// Following configuration adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx"
  },
  server: {
    port: parseInt(process.env.VITE_PORT, 10) || 8521     // Use VITE_PORT from your .env, or default to a port if not specified
  }
})

