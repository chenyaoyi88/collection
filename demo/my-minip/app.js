//app.js
App({
  onLaunch: function () {
    // 小程序启动的时候要执行的逻辑
    this.globalData.isLogin = wx.getStorageSync('token') ? true : false;
  },
  // 全局变量
  globalData: {
    isLogin: false,
    value: ''
  }
})