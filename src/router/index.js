import Vue from 'vue'
import VueRouter from 'vue-router'

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/manager-main'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home'),
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('@/views/mall')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/user'),
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('@/views/others/pageOne')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('@/views/others/pageTwo')
            },
            {
                path: '*',
                redirect: '/home'
            }
        ],
    },
]

export default new VueRouter({
    mode: 'history',
    routes,
})
