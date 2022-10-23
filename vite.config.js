import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    base: "/sharedmemory/view/",
    rollupOptions: {
      base: "/sharedmemory/view/"
    }
  }
})