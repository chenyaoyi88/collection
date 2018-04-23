import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    msg: '',
    tabIndex: 0,
  },
  mutations: {
    msgChange: (state, newState) => {
      state.msg = newState.msg;
      return state.msg;
    },
    tabIndexChange: (state, newState) => {
      state.tabIndex = newState.tabIndex;
      return state.tabIndex;
    },
  }
});

export default store;
