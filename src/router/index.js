import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导出的应当是Router实例工厂函数
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () => import('@/layout/default'),
                children: [
                    {
                        path: '/',
                        name: 'index',
                        component: () => import('@/pages/home/home')
                    },
                ]
            },
            {
                path: '/404',
                name: '404',
                component: () => import('@/pages/404'),
                hidden: true
            },
            { path: '*', redirect: '/404', hidden: true }
        ]
    })
}