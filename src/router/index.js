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
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  }
]

export default new VueRouter({
  mode: 'history',
  routes,
})
