import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import packageJSON from './package.json'

export default  defineConfig({
  mode: "production",
  // 配置选项
  build: {
    // minify: false,
    lib: {
      entry: [ './src/index.ts'], // 设置入口文件

      name: packageJSON.name, 
      formats: ['es','cjs'],
    },
    // sourcemap: true, // 输出.map文件
    rollupOptions: {
      external: ['react','react-dom','react/jsx-runtime'],
    }
  },
  plugins: [react()]
})