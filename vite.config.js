import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue2';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}`,
    },
  },

  server: {
    port: 4399,
    host: '0.0.0.0',
    proxy: {},
  },

  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[name]',
    }),
  ],

  build: {
    minify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      input: {
        index: `${resolve(__dirname, 'index.html')}`,
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
