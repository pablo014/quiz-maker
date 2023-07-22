import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import plugin from '@pablo014/vue3-component-library';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin)

app.mount('#app')
