import { defineConfig } from 'vite'

import packageJSON from './package.json'

export default  defineConfig({
  mode: "production",
  // 配置选项
  build: {
    // minify: false,
    lib: {
      entry: [ './index.ts'], // 设置入口文件
      name: packageJSON.name, 
      formats: ['es','cjs'],
  
    },
  },
})