import { formatTime } from '../../../utils/index';

Component({
  externalClasses: ['vcode-class'],
  properties: {
    couponInfo: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        const couponInfo = this.data.couponInfo;
        couponInfo.beginDateFormat = this.formatCouponTime(couponInfo.beginDate);
        couponInfo.endDateFormat = this.formatCouponTime(couponInfo.endDate);
        couponInfo.usedDateFormat = this.formatCouponTime(couponInfo.usedDate);
        this.setData({
          couponInfo
        });
      }
    },
    isFail: {
      type: Boolean,
      value: false
    },
    isShowSlect: {
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
    couponClick() {
      this.triggerEvent('couponClick', {}, {});
    },
    couponRuleClick() {
      wx.showModal({
        title: '使用说明',
        content: this.data.couponInfo.termOfUse,
        showCancel: false
      });
    },
    formatCouponTime(timestamp) {
      return formatTime(new Date(timestamp))
        .split(' ')[0]
        .replace(/\//g, '.');
    }
  }
});
