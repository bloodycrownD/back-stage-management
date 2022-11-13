import { defineStore } from 'pinia'

export default defineStore('store', {
    // 其它配置项
    state:()=>{
        return {
            menuState:false,
            tabList:[
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
            ]
        }
    },
    actions:{

    }
})