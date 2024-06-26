import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({
      manifest
    }),
    UnoCSS(),
  ],
})
