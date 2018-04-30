import { Vue } from 'vue-property-decorator';

const ghbEvent = {
  resetOrderList: 'resetOrderList',
  resetMe: 'resetMe',
  resetIndex: 'resetIndex'
};

const eventBus = new Vue();

export { eventBus, ghbEvent };
