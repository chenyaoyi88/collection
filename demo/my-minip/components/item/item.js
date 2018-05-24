
Component({
  relations: {
    '../itempicker': {
      type: 'parent', // 关联的目标节点应为父节点
      linked: function (target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },
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
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 点击 item
    itemClickEvent: function (e) {
      const myEventDetail = {
        e,
        item: this
      };
      const myEventOption = {};
      this.triggerEvent('itemClickEvent', myEventDetail, myEventOption);
    },
    // input 输入
    itemInputEvent: function (e) {
      const myEventDetail = {
        e
      };
      const myEventOption = {};
      this.triggerEvent('itemInputEvent', myEventDetail, myEventOption);
    }
  }
})