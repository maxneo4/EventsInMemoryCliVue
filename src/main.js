import { createApp } from 'vue'
import App from './App.vue'
import JsonTree from 'vue-json-tree'

createApp(App).component('json-tree', JsonTree).mount('#app')
