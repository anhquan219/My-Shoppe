import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()], //visualizer: phân tích cấu trúc file build
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
