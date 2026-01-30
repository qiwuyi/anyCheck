import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: UnoCSS } = await import('unocss/vite')

  return {
    plugins: [
      uni(),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
