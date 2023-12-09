import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import { createPinia } from 'pinia'
const pinia = createPinia()

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
