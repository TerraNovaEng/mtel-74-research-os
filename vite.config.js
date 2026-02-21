import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mtel-74-research-os/', // This MUST match the repo name in your homepage URL
})