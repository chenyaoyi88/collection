import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    msg: '',
  },
  mutations: {
    msgChange: (state, newState) => {
      state.msg = newState.msg;
      return state.msg;
    },
    goBackSendParams: (state, newState) => {
      state.text = newState.text;
      return state.text;
    }
  }
});

export default store;
