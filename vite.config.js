import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',

  plugins: [tailwindcss()],

  server: {
    port: 5173
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})


