import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import store from './store'
import "./api/mock"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);
//先挂载pinia
app.use(pinia)

//再添加动态路由，此时pinia的store中有数据，vue的插件与vue是不相关的，可以在vue实例挂载前就使用
const myStore = store()
myStore.addRoute(router)
//使用router组件，此时router已经添加完路由了，再挂载app实例。
app.use(router).mount('#app')
/**
 * 页面的刷新会走这个流程，这样可以解决动态添加的路由，刷新页面变白屏
 */