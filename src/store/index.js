import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portalId: null,
  },
  mutations: {
    setPortalId (state, pid) {
      state.portalId = pid;
    },
  },
  actions: {
  },
  modules: {
  }
})
