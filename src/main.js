import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import floatingVue from "floating-vue"
import 'floating-vue/dist/style.css'
import { initializeApp } from "firebase/app"
import config from "./config.js"

initializeApp(config);

createApp(App).use(floatingVue).mount('#app')