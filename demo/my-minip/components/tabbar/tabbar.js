Component({
  externalClasses: ['tabbar-class'],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    list: {
      type: Array,
      value: []
    },
    color: {
      type: String,
      value: '#B2B2B2'
    },
    selectedColor: {
      type: String,
      value: '#F13744'
    },
    tabIndex: {
      type: Number,
      value: 0
    }
  },
  methods: {
    tabSwitch(e) {
      // console.log(e);

      const listIndex = e.currentTarget.dataset.listIndex;

      this.setData({
        tabIndex: listIndex
      });

      const myEventDetail = {
        tabIndex: listIndex
      };

      const myEventOption = {};
      this.triggerEvent('tabClickEvent', myEventDetail, myEventOption);
    }
  }
});