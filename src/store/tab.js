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
}

export default {
  mutations,
  state,
}
