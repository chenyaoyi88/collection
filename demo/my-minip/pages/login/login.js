Page({
  data: {
    // 手机号码
    phone: '',
    // 短信验证码
    msgCode: '',
    // 登录禁用控制
    isBtnClick: false
  },
  getValue(e) {
    const type = e.target.dataset.type;
    const value = e.detail.value;

    let data = {};
    data[type] = value;
    this.setData(data);
  },
  login() {
    console.log(this.data);
  },
  // 叫车规则跳 webview h5页面
  ghbRuleCallcar() {
    wx.navigateTo({
      url: '../webview/webview?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/html/rule/user_callcar.html'
    });
  },
  ghbRuleService() {
    wx.navigateTo({
      url: '../webview/webview?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/resources/agreements/agreement_use.html'
    });
  }
})
