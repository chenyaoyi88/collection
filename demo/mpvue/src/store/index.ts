import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    tabIndex: 0,
    carTypeList: [],
    additionalServicesList: [],
    isIndexReset: false,
    logisticsorder: {}
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
    tabIndexChange: (state, newState) => {
      state.tabIndex = newState.tabIndex;
      return state.tabIndex;
    },
    isIndexResetChange: (state, newState) => {
      state.isIndexReset = newState.isIndexReset;
      return state.isIndexReset;
    },
    logisticsorderChange: (state, newState) => {
      state.logisticsorder = Object.assign({}, state.logisticsorder, newState.logisticsorder);
      return state.logisticsorder;
    }
  }
});

export default store;
