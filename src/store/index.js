import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 全局token */
    token: localStorage.getItem('token'),
    /* 全局存储用户信息 */
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    /* 登录状态,false表示未登录 */
    loginFlag: false
  },
  // set方法
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token) // token存储在客户端
    },
    SET_USERINFO: (state, userInfo) => { // 设置用户信息
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      // sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    SET_LOGIN_FLAG: (state, loginFlag) => { // 设置登录状态
      state.loginFlag = loginFlag
    },
    SET_LOGOUT: state => { // 登出时，清空state
      state.token = ''
      state.userInfo = {}
      state.loginFlag = false
      localStorage.setItem('token', '')
      localStorage.setItem('userInfo', JSON.stringify({}))
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
    getToken: state => {
      return state.token
    }
  },
  actions: {},
  modules: {}
})
