import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    msg: '',
  },
  mutations: {
    msgChange: (state, newState) => {
      state.msg = newState.msg;
      return state.msg;
    }
  }
});

export default store;
