import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],server: {
    fs: {
      allow: [
        '/path/to/your/file', // You can specify specific file paths here
        'D:/file/vue/share',  // Add the directory you're trying to access
      ]
    }
  }
})
