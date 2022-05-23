import jsCookie from 'js-cookie'

const mutations = {
  SETISCOLLAPSE(state) {
    state.iscollapse = !state.iscollapse
  },
  SELECTMENU(state, val) {
    state.currentTab = val
    if (val.name !== 'home') {
      const result = state.tabs.findIndex(item => item.name === val.name)
      if (result === -1) {
        state.tabs.push(val)
      }
    }
  },
  DELETETAGS(state, index) {
    state.tabs.splice(index, 1)
    if (index >= state.tabs.length - 1)
      index = state.tabs.length - 1
    state.currentTab = state.tabs[index]
  },
  SETMENU(state, value) {
    state.menu = value
    jsCookie.set('menu', JSON.stringify(value))
  },
  CLEARMENU(state) {
    state.menu = []
    jsCookie.remove('menu')
  },
  ADDMENU(state, router) {
    if (!jsCookie.get('menu')) return
    const menu = JSON.parse(jsCookie.get('menu'))
    state.menu = menu
    const menuArry = []
    menu.forEach(item => {
      if (item.children) {
        item.children = item.children.map(citem => {
          citem.component = () => import(`@/views/${citem.url}/`)
          return citem
        })
        menuArry.push(...item.children)
      } else {
        item.component = () => import(`@/views/${item.url}/`)
        menuArry.push(item)
      }
    })
    menuArry.forEach(item => {
      router.addRoute('main', item)
    })
  }
}
const state = {
  iscollapse: false,
  tabs: [
    {
      path: '/',
      name: 'home',
      label: '首页',
      icon: 'home'
    },
  ],
  currentTab: {
    path: '/',
    name: 'home',
    label: '首页',
    icon: 'home'
  },
  menu: [],
}

export default {
  mutations,
  state,
}
