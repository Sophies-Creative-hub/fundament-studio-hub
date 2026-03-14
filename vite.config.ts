import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // WICHTIG: Repository-Name hier eintragen!
  base: '/fundament-studio-hub/',
  
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});