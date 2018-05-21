import { Vue } from 'vue-property-decorator';

const ghbEvent = {
  resetOrderList: 'resetOrderList',
  resetMe: 'resetMe',
  getCoupon: 'getCoupon',
  getSiteInfo: 'getSiteInfo',
  gobackReload: 'gobackReload'
};

const eventBus = new Vue();

export { eventBus, ghbEvent };
