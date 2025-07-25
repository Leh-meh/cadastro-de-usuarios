import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cadastro-de-usuarios/',
  build: {
    outDir: 'dist'
  }
})