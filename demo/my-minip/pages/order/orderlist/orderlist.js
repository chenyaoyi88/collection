Component({
  externalClasses: ['my-class'],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tabIndex: {
      type: Number,
      value: 0
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    orderList: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        if (oldVal && oldVal.hasOwnProperty('list')) {
          // 如果数组为空（没有数据）
          if (!newVal.list.length && !oldVal.list.length) {
            let text = '';
            let isShowNoneText = '';
            switch (this.data.tabIndex) {
              case 0:
                text = '进行中';
                break;
              case 1:
                text = '已完成';
                break;
              case 2:
                text = '已取消';
                break;
              default:
            }
            isShowNoneText = `您最近没有${text}订单`;
            this.setData({
              isShowNoneText
            });
          }
        }
      }
    }
  },
  data: {
    isShowNoneText: ''
  },
  methods: {
    orderCancel(e) {
      this.triggerEvent('orderCancel', {
        id: e.target.dataset.orderid
      }, {});
    },
    orderPay(e) {
      this.triggerEvent('orderPay', {
        order: e.target.dataset.order
      }, {});
    },
    attached() {
      console.log(this.data);
    }
  }
});