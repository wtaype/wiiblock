import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    modulePreload: false,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) return id.includes('firebase') ? 'firebase' : 'vendor';
        }
      },
      plugins: [{
        name: 'minify-html',
        generateBundle(_, b) {
          for (let f in b) if (f.endsWith('.html') && b[f].type === 'asset') 
            b[f].source = b[f].source.replace(/\n\s*/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').replace(/<!--.*?-->/g, '').trim();
        }
      }]
    }
  },
  publicDir: 'public'
});