import {defineStore} from 'pinia'

export default defineStore('store', {
    persist: {
        key: 'temp',
        storage: window.sessionStorage,
        paths: ['menuData'],
    },
    // 其它配置项
    state: () => {
        return {
            menuState: false,
            tabList: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
            ],
            menuData: []
        }
    },
    actions: {
        addRoute(router) {
            const children = []
            this.menuData.forEach(item => {
                if (!item.children) {
                    children.push({
                        path: item.path,
                        component: () => import(`../${item.url}`)
                    })
                } else {
                    children.push(...item.children.map(childItem => {
                        return {
                            path: childItem.path,
                            component: () => import(`../${childItem.url}`)
                        }
                    }))
                }
            })
            router.addRoute({
                path: '/',
                component: () => import('../pages/MainPage'),
                redirect: 'home',
                children: children
            })
        }
    }
})