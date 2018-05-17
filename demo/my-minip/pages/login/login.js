import { isInputEmpty, isPhoneNumber, showToastError, ghbRequest } from '../../utils/index';
import API from '../../api/api';

const app = getApp();

Page({
  data: {
    // 手机号码
    mobile: '',
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
  getMsgCode(e) {
    if (isInputEmpty(this.data.mobile, '手机号码不能为空')) return;
    if (isPhoneNumber(this.data.mobile, '手机号码格式有误')) return;

    wx.showLoading({
      title: '短信发送中',
      mask: true
    });

    const PARAMS_VCODE_REQUEST = {
      type: 0,
      mobile: this.data.mobile
    };

    ghbRequest({
      url: API.VCODE,
      method: 'POST',
      data: PARAMS_VCODE_REQUEST
    }).then(res => {
      if (!res.data.mobile) {
        showToastError();
        return;
      } else {
        wx.showToast({
          title: '短信已发送'
        });
        // 启用倒计时
        e.detail.run();

        if (app.globalData.appEnv !== 'prod') {
          this.setData({
            msgCode: res.data.code
          });
        }
      }
    });

  },
  login() {
    if (isInputEmpty(this.data.phone, '手机号码不能为空')) return;
    if (isInputEmpty(this.data.msgCode, '短信验证码不能为空')) return;

    wx.showLoading({
      title: '登陆中',
      mask: true
    });

    const PARAMS_LOGIN_REQUEST = {
      username: this.data.mobile,
      validcode: this.data.msgCode,
      deviceId: 'wxmina',
      deviceType: 5
    };

    if (this.data.isBtnClick) return;

    this.setData({
      isBtnClick: true
    });

    ghbRequest({
      url: API.LOGIN,
      method: 'POST',
      data: PARAMS_LOGIN_REQUEST
    }, true).then(res => {
      if (res.data.token) {
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('mobile', this.data.mobile);

        // eventBus.$emit(ghbEvent.resetOrderList);

        // 获取 code
        wx.login({
          success: function (e) {
            // 获取 openid 
            ghbRequest({
              url: API.JSCODE2SESSION,
              data: {
                code: e.code
              },
            }).then(res => {
              wx.navigateBack();
            });
          }
        });
      } else {
        showToastError(res.data.message);
      }
      this.setData({
        isBtnClick: false
      });
    }).catch(() => {
      this.setData({
        isBtnClick: false
      });
    });
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
