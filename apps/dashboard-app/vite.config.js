import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: /^react$/, replacement: 'shared-ui/src/shims/react.js' },
      { find: /^react-dom$/, replacement: 'shared-ui/src/shims/react-dom.js' },
    ],
  },
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'dashboard_app',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardComponent': './src/DashboardComponent.jsx',
      },
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
