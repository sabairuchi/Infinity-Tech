import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ensureAssetsExist } from './server/setup-assets.js'

ensureAssetsExist();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
