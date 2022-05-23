import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/less/index.less'
import router from '@/router'
import store from '@/store'
import '@/api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  store.commit('GETTOKEN')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({name: 'login'})
  } else if (token && to.name === 'login') {
    next({name: 'home'})
  } else {
    next()
  }
})


new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('ADDMENU', router)
  }
}).$mount('#app')
