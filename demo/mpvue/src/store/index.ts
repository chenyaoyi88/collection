import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    carTypeList: [],
    additionalServicesList: [],
    isIndexReset: false,
    gobackAction: ''
  },
  mutations: {
    carTypeListChange: (state, newState) => {
      state.carTypeList = newState.carTypeList;
      return state.carTypeList;
    },
    additionalServicesListChange: (state, newState) => {
      state.additionalServicesList = newState.additionalServicesList;
      return state.additionalServicesList;
    },
    isIndexResetChange: (state, newState) => {
      state.isIndexReset = newState.isIndexReset;
      return state.isIndexReset;
    },
    gobackActionChange: (state, newState) => {
      state.gobackAction = newState.gobackAction;
    }
  }
});

export default store;
