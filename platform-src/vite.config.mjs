import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base نسبي ليشتغل الموقع تحت أي مسار فرعي على GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096
  }
});
