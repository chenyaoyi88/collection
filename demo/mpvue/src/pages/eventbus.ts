import { Vue } from 'vue-property-decorator';

const ghbEvent = {
  resetOrderList: 'resetOrderList',
  resetMe: 'resetMe',
  getCoupon: 'getCoupon'
};

const eventBus = new Vue();

export { eventBus, ghbEvent };
