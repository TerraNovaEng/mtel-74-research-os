import { defineConfig } from 'vite'
import react from '@vitejs/react-vite'

export default defineConfig({
  plugins: [react()],
  base: '/mtel-74-research-os/', // Add this line!
})
