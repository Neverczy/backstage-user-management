import Vue from 'vue'
import VueRouter from 'vue-router'

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originPush.call(this,location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'main',
        component: ()=>import('@/views/manager-main'),
        children:[
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
                component: ()=> import('@/views/user'),
            }

        ],
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default new VueRouter({
    mode:'history',
    routes,
})
