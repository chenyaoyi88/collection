Component({
  externalClasses: ['nodata-class'],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    text: {
      type: String,
      value: ''
    },
    isShow: {
      type: Boolean,
      value: false
    },
    isShowBtn: {
      type: Boolean,
      value: false
    }
  },
  data: {
    imgNodata: '../../assets/images/nodata.png'
  },
  methods: {
    btnEvent() {
      const myEventDetail = {};
      const myEventOption = {};
      this.triggerEvent('btnEvent', myEventDetail, myEventOption);
    }
  }
});
