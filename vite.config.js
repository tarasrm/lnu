import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: use your repo name. For local dev, base is '/'.
// https://vitejs.dev/guide/static-deploy.html#github-pages
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/lnu-time-table/' : '/',
})
