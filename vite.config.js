import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Fixed the package name here

export default defineConfig({
  plugins: [react()],
  base: '/mtel-74-research-os/', // Essential for GitHub Pages
})