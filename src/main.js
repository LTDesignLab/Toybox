import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueFullPage from 'vue-fullpage.js'

createApp(App).use(store).use(router).use(VueFullPage).mount('#app')
