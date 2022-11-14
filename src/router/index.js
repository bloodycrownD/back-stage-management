import {createRouter, createWebHashHistory} from 'vue-router';
import cookieJs from "js-cookie";

const router = createRouter(
    {
        history: createWebHashHistory(process.env.BASE_URL),
        routes:[
            {
                path:'/login',
                component: () => import('../pages/LoginPage')
            }
        ]
    })
/**
 * 全局路由守卫一般用于登录
 */
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