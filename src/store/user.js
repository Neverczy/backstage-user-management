import jsCookie from 'js-cookie'

export default {
  state: {
    token: ''
  },
  mutations: {
    SETTOKEN(state, value) {
      state.token = value
      jsCookie.set('token', value)
    },
    GETTOKEN(state) {
      state.token = state.token || jsCookie.get('token')
    },
    CLEARTOKEN(state) {
      state.token = ''
      jsCookie.remove('token')
    }
  }
}
