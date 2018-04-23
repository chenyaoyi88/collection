import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    tabIndex: 0,
    carTypeList: [],
    isLogin: false,
    isIndexReset: false
  },
  mutations: {
    carTypeListChange: (state, newState) => {
      state.carTypeList = newState.carTypeList;
      return state.carTypeList;
    },
    tabIndexChange: (state, newState) => {
      state.tabIndex = newState.tabIndex;
      return state.tabIndex;
    },
    isLoginChange: (state, newState) => {
      state.isLogin = newState.isLogin;
      return state.isLogin;
    },
    isIndexResetChange: (state, newState) => {
      state.isIndexReset = newState.isIndexReset;
      return state.isIndexReset;
    }
  }
});

export default store;
