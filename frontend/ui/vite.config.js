import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PHONEBOOK_FRONTEND_PORT = process.env.PHONEBOOK_FRONTEND_PORT || 3001;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: +PHONEBOOK_FRONTEND_PORT
  },
  define: {
    'process.env': {}
  }
})
