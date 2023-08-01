import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/scss/tailwind.css'
import '@/assets/scss/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
createApp(App).use(router).use(Vant).mount('#app')
