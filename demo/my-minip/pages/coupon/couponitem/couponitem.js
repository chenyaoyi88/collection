import { formatTime } from '../../../utils/index';

Component({
  externalClasses: ['vcode-class'],
  properties: {
    couponInfo: {
      type: Object,
      value: {}
    },
    isFail: {
      type: Boolean,
      value: false
    },
    isShowSelect: {
      type: Boolean,
      value: false
    }
  },
  data: {
    IMG_COUPONBG: '../../../assets/images/couponbg.png',
    IMG_COUPONBG_FAIL: '../../../assets/images/couponbg_fail.png',
    IMG_ARROW: '../../../assets/images/arrow-coupon.png',
    IMG_SELECT: '../../../assets/images/selected.png'
  },
  methods: {
    couponClick(e) {
      this.triggerEvent('couponClickEvent', {
        item: this.data.couponInfo
      }, {});
    },
    couponRuleClick() {
      wx.showModal({
        title: '使用说明',
        content: this.data.couponInfo.termOfUse,
        showCancel: false
      });
    }
  }
});
