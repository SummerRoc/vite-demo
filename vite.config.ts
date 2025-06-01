import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Inspect from 'vite-plugin-inspect';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathSrc = path.resolve(__dirname, 'src');
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  plugins: [
    vue(),
    Inspect(),
    AutoImport({
      imports: ['vue'], // 自动导入 Vue 相关函数
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: 'css' }),
        IconsResolver({
          prefix: 'i', // 图标组件前缀， 使用方法： <i-ep-edit />
          enabledCollections: ['ep'], // 使用 Element Plus 图标集
        }),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    ElementPlus({
      useSource: true, // 启用源码路径
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins.scss" as *;`,
      },
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const parts = id.toString().split('node_modules/')[1].split('/');
            return parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];
          }
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
});
