import Cookie from 'js-cookie'
const state = {
  token: ''
}
const actions = {}
const mutations = {
  // 设置token
  SETTOKEN(state, val) {
    state.token = val
    // 给cookie设置一个token字段
    Cookie.set('token', val)
  },
  CLEARTOKEN(state) {
    state.token = ''
    // 删除cookie里面的token字段
    Cookie.remove('token')
  },
  GETTOKEN(state) {
    state.token = state.token || Cookie.get('token')
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
