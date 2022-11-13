import {createRouter, createWebHashHistory} from 'vue-router';
import cookieJs from "js-cookie";

const router = createRouter(
    {
        history: createWebHashHistory(process.env.BASE_URL),
        routes: [
            {
                path:'/',
                component:()=>import('../pages/MainPage'),
                redirect:'home',
                children:[
                    {
                        path:'/user',//用户管理
                        component: () => import('../pages/UserPage')
                    },
                    {
                        path:'/home',//首页
                        component: () => import('../pages/HomePage')
                    },
                    {
                        path:'/mall',//商品管理
                        component: () => import('../pages/ShoppingMall')
                    },
                    {
                        path:'/mall',//商品管理
                        component: () => import('../pages/ShoppingMall')
                    },
                    {
                        path:'/page1',//商品管理
                        component: () => import('../pages/PageOne')
                    },
                    {
                        path:'/page2',//商品管理
                        component: () => import('../pages/PageTwo')
                    },

                ]
            },
            {
                path:'/login',
                component: () => import('../pages/LoginPage')
            }
        ]
    })

router.beforeEach((to, from, next) => {
    // 判断有没有登录
    if (!cookieJs.get('token')) {
        if (to.path === "/login") {
            next();
        } else {
            next({path:'/login'})
        }
    } else if (to.path !== '/login') {
        next();
    }
})

export default router