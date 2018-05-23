import { formatTime } from '../../../utils/index';

Component({
  externalClasses: ['vcode-class'],
  properties: {
    coupon: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        if (newVal.listTmp.length) {
          // Math.ceil(newVal.listTmp.length/this.data.listPageSize)
          if (newVal.listTmp.length < this.data.listPageSize) {
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
    },
    isListNomore: {
      type: Boolean,
      value: false
    },
    listPageSize: {
      type: Number,
      value: 10
    }
  },
  data: {
  },
  methods: {
  },
  attached() {
    console.log(this.data.coupon);
  }
});
