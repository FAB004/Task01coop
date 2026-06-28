import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // ASP.NET يقدّم حزمة React من المجلد /react/، لذلك يجب أن تشير روابط
  // الأصول المُجمّعة (الصور/الخطوط) إلى /react/assets/ في بناء الإنتاج.
  // أثناء التطوير (vite serve) يبقى الجذر / حتى تعمل الأصول وملفات public كالمعتاد.
  base: command === 'build' ? '/react/' : '/',
  plugins: [react()],
  // أثناء التطوير (vite serve على 5173) نمرّر طلبات /api إلى الـ backend
  // (ASP.NET على 5080) حتى تعمل بيانات المحتوى الحيّة بنفس الروابط النسبية.
  // في الإنتاج يقدّم ASP.NET كلاً من الموقع والـ API من نفس الأصل فلا حاجة للـ proxy.
  server: {
    proxy: {
      '/api': 'http://localhost:5080',
      '/uploads': 'http://localhost:5080',
    },
  },
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
}))