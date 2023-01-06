import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenInfo:JSON.parse(window.localStorage.getItem('tokenInfo')) || null
  },
  getters: {
  },
  mutations: {
    saveTokenInfo(state,payload) {
      state.tokenInfo = payload
      window.localStorage.setItem('tokenInfo',JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
