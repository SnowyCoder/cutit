import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVfm } from 'vue-final-modal'
import { i18n } from './i18n'



createApp(App)
    .use(createVfm())
    .use(i18n)
    .mount('#app')
