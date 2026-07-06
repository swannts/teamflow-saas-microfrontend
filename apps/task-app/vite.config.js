import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  resolve: {
    alias: {
      react: 'shared-ui/src/shims/react.js',
      'react-dom': 'shared-ui/src/shims/react-dom.js',
    },
  },
  plugins: [
    react(),
    federation({
      name: 'task_app',
      filename: 'remoteEntry.js',
      exposes: {
        './TaskKanbanComponent': './src/TaskKanbanComponent.jsx',
      },
      shared: ['react', 'react-dom'],
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
