import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // منع تكرار نسخة React: مُحسِّن التطوير (esbuild) كان يحزم نسخة React ثانية
  // داخل platformscode-new-react، فتفشل خطافاتها (useRef = null) وتُفرّغ الصفحة.
  // dedupe يفرض نسخة واحدة، و include يضمن إعادة الحزم لمشاركتها.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['platformscode-new-react', 'react', 'react-dom', 'react/jsx-runtime'],
  },
  // مكتبة platformscode تُحمّل core.css الذي يحتوي على star-hack قديم (مثل *margin-left)
  // يرفضه مُصغّر LightningCSS الافتراضي في rolldown-vite. الخيار errorRecovery
  // يجعله يتجاهل هذه الأنماط القديمة بدل إيقاف البناء.
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
  build: {
    outDir: '../wwwroot/react',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        
        entryFileNames: 'assets/main.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})