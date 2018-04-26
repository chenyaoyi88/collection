Component({
  externalClasses: ['tabbar-class'],
  properties: {
    list: {
      type: Array,
      value: [],
    },
    color: {
      type: String,
      value: '#B2B2B2',
    },
    selectedColor: {
      type: String,
      value: '#F13744',
    }
  },
  data: {
    // 这里是一些组件内部数据
    currentTabIndex: 0
  },
  methods: {
    // 这里是一个自定义方法
    tabSwitch: function (e) {
      console.log(e);

      const listIndex = e.currentTarget.dataset.listIndex;
      const pagePath = e.currentTarget.dataset.pagePath;

      this.setData({
        currentTabIndex: listIndex
      });
    }
  },
  ready: function () {
    console.log(this);
  }
})