//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    text: '',
    list: [{
      pagePath: '../../pages/index/index',
      text: '叫车',
      iconPath: '../../assets/images/callcar.png',
      selectedIconPath: '../../assets/images/callcar_active.png'
    },{
      pagePath: '../../pages/demo/demo',
      text: '叫车',
      iconPath: '../../assets/images/order.png',
      selectedIconPath: '../../assets/images/order_active.png'
    },{
      pagePath: '../../pages/logs/logs',
      text: '叫车',
      iconPath: '../../assets/images/me.png',
      selectedIconPath: '../../assets/images/me_active.png'
    }]
  },
  onLoad: function () {
    this.setData({
      text: 'demo页面内容'
    })
  }
})
