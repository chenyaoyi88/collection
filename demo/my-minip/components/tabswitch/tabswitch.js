Component({
  externalClasses: ['tabswitch-class'],
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },
  properties: {
    tabList: {
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
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal === oldVal) return;
        this.tabSet(newVal);
      }
    }
  },
  data: {
    width: 0,
    left: 0
  },
  methods: {
    tabSwitch(e) {
      this.tabSet(e.currentTarget.dataset.listIndex);
    },
    tabSet(index) {
      this.setData({
        tabIndex: index,
        left: 100 * index
      });
      const myEventDetail = {
        tabIndex: index
      };
      const myEventOption = {};
      this.triggerEvent('tabSwitchEvent', myEventDetail, myEventOption);
    }
  },
  attached() {
    this.setData({
      width: 100 / this.data.tabList.length,
    });
  }
});
