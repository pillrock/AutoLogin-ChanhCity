import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['electron', 'electron-updater'],
    },
    outDir: '.vite/build',
  },
});
