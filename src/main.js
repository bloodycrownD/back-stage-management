import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
const pinia = createPinia();
import "./api/mock"


const app = createApp(App);

    app
    .use(router)
    .use(pinia)
    .mount('#app')
