// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()] as any, //visualizer: phân tích cấu trúc file build
  test: {
    // Set môi trường test là jsdom để có thể sử dụng localStorage
    environment: 'jsdom' // Mặc định là môi trường "node"
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true // config source map css
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
