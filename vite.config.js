import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) =>
{
  if (command === 'dev'){
  return {
    plugins: [vue()]
  } }
  else return {
    plugins: [vue()]
  }
}
)
