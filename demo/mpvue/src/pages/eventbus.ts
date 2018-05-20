import { Vue } from 'vue-property-decorator';

const ghbEvent = {
  resetOrderList: 'resetOrderList',
  resetMe: 'resetMe',
  getCoupon: 'getCoupon',
  getSiteInfo: 'getSiteInfo'
};

const eventBus = new Vue();

export { eventBus, ghbEvent };
