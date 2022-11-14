export const routes = [
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
    }
]


