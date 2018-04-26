//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    text: ''
  },
  onLoad: function () {
    this.setData({
      text: 'demo页面内容'
    })
  }
})
