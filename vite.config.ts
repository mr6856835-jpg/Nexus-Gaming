import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    // The sandbox preview is proxied from https://<port>-<sandboxId>.e2b.app,
    // so we must allow any host/origin rather than an allowlist.
    allowedHosts: true,
    cors: true,
  },
  preview: { host: '0.0.0.0', allowedHosts: true },
})
