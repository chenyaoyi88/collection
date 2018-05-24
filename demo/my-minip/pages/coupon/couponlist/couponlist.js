import { formatTime } from '../../../utils/index';

Component({
  externalClasses: ['couponlist-class'],
  properties: {
    coupon: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        if (newVal.listTmp.length) {
          if (newVal.listTmp.length === newVal.list.length) {
            this.setData({
              isListNomore: true
            });
          }
        }
      }
    },
    couponNoneText: {
      type: String,
      value: ''
    },
    isFailColor: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isListNomore: false,
    isNoData: false
  },
  methods: {
  }
});
