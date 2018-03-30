import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    msg: ''
  },
  mutations: {
    msgChange: (state, newState) => {
      state.msg = newState.msg
      return state.msg
    }
  },
  actions: {
    msgChange (context) {
      context.commit('msgChange')
    }
  }
})

export default store
