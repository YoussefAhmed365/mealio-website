import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    // Optional: Increase the warning limit if you are okay with slightly larger chunks
    // chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 1. Fix for "Some chunks are larger than 500 kB"
        // This separates the heavy lottie player into its own file
        manualChunks: {
          lottie: ['@lottiefiles/react-lottie-player', 'lottie-web'],
        },
      },
      // 2. Fix for "Use of eval" warning
      onwarn(warning, warn) {
        if (warning.code === 'EVAL' && /lottie/i.test(warning.id)) {
          return;
        }
        warn(warning);
      },
    },
  },
});