import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    federation({
      name: 'project_app',
      filename: 'remoteEntry.js',
      exposes: {
        './mount': './src/mount.js',
      },
      shared: ['vue'],
    }),
  ],
  preview: {
    cors: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
