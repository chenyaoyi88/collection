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
    // 这里是一个自定义方法
    tabSwitch: function(e) {
      // console.log(e);

      const listIndex = e.currentTarget.dataset.listIndex;

      this.setData({
        tabIndex: listIndex
      });

      const myEventDetail = {
        tabIndex: listIndex
      }; // detail对象，提供给事件监听函数
      const myEventOption = {};
      this.triggerEvent('tabClickEvent', myEventDetail, myEventOption);
    }
  }
});
