Component({
  externalClasses: ['item-class'],
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },
  properties: {
    // item 类型（input/point/custom)
    itemType: {
      type: String,
      value: 'normal'
    },
    // item class 样式
    itemClass: {
      type: String,
      value: ''
    },
    // icon 图标地址
    itemIcon: {
      type: String,
      value: ''
    },
    // icon 类型（none/icon/start/end/custom）
    itemIconType: {
      type: String,
      value: 'none'
    },
    isHidePointline: {
      type: Boolean,
      value: false
    },
    // 是否隐藏 item 左边
    isHideItemLeft: {
      type: Boolean,
      value: false,
    },
    // 是否隐藏 item 箭头图标
    isHideItemArrow: {
      type: Boolean,
      value: false,
    },
    // 是否隐藏顶部边线
    isHideBorderTop: {
      type: Boolean,
      value: false,
    },
    // 是否显示淡颜色的样式
    isItemNameLight: {
      type: Boolean,
      value: false
    },
    isShowItemClose: {
      type: Boolean,
      value: false
    },
    // 是否显示淡颜色的样式
    isValueLight: {
      type: Boolean,
      value: false
    },
    // item 左侧的值 top
    itemValueLeftTop: {
      type: String,
      value: ''
    },
    // item 左侧的值 center
    itemValueLeftCenter: {
      type: String,
      value: ''
    },
    // item 左侧的值 bottom
    itemValueLeftBottom: {
      type: String,
      value: ''
    },
    // item 右侧的值
    itemValueRight: {
      type: String,
      value: ''
    },
    // input 的类型
    itemTnputType: {
      type: String,
      value: 'text'
    },
    // input 最大限制
    itemInputMaxlength: {
      type: Number,
      value: 140
    },
    // input 值
    itemInputValue: {
      type: String,
      value: ''
    },
    // placeholder 文字显示
    itemInputPlc: {
      type: String,
      value: ''
    },
    // placeholder style 样式
    itemInputPlcStyle: {
      type: String,
      value: 'color:#b2b2b2'
    },
    itemParams: {
      type: null,
      value: null
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 点击 item
    itemClickEvent(e) {
      const myEventDetail = {
        e,
        item: this
      };
      const myEventOption = {};
      this.triggerEvent('itemClickEvent', myEventDetail, myEventOption);
    },
    // input 输入
    itemInputEvent(e) {
      const myEventDetail = {
        e
      };
      const myEventOption = {};
      this.triggerEvent('itemInputEvent', myEventDetail, myEventOption);
    },
    itemClickCloseEvent(e) {
      const myEventDetail = {
        e,
        item: this
      };
      const myEventOption = {};
      this.triggerEvent('itemClickCloseEvent', myEventDetail, myEventOption);
    }
  }
})