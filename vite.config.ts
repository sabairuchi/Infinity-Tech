import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ensureAssetsExist } from './server/setup-assets.js'

try {
  ensureAssetsExist();
} catch (e) {
  console.warn('Asset setup notice:', e);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
