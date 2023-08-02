import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVfm } from 'vue-final-modal'

createApp(App).use(createVfm()).mount('#app')
