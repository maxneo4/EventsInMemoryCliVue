import { createApp } from 'vue'
import App from './App.vue'
import JsonTree from 'vue-json-tree'
import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";

createApp(App).component('json-tree', JsonTree).use(JsonViewer).mount('#app')
