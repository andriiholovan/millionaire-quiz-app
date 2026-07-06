import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname),
      '@actions': resolve(__dirname, 'app/_actions'),
      '@lib/client': resolve(__dirname, 'app/_lib/client'),
      '@lib/server': resolve(__dirname, 'app/_lib/server'),
      '@lib/shared': resolve(__dirname, 'app/_lib/shared'),
    },
  },
})
