import { createApp } from 'vue'
import App from './App.vue'
import WaveUI from 'wave-ui'
import store from '@/store/index.js'
import router from "./router/rout.js";
import 'wave-ui/dist/wave-ui.css'

const app = createApp(App)

new WaveUI(app)

app.use(store).use(router).mount('#app')