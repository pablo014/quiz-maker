import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import plugin from '@pablo014/vue3-component-library';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


/* add icons to the library */
library.add(fas, fab, far)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
