import { isInputEmpty, isPhoneNumber, showToastError, ghbRequest } from '../../utils/index';
import API from '../../api/api';
const app = getApp();

Page({
  data: {
    version: app.globalData.version,
    isLogin: false,
    userInfo: {},
    mobile: '',
    avantarImg: '../../assets/images/avantar.png',
    avantar: '../../assets/images/avantar.png',
    LogisticsCoupons: []
  },

  reset() {
    this.setData({
      isLogin: false,
      userInfo: {},
      mobile: '点击登录',
      avantar: this.data.avantarImg,
      LogisticsCoupons: []
    });
  },

  // 点击去登录页面
  gotoLogin() {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
  },

  // 点击去优惠券页面
  gotoCoupon() {
    wx.navigateTo({
      url: '../coupon/coupon?from=me'
    });
  },

  // 点击去地址管理页面
  gotoAddress() {
    wx.navigateTo({
      url: '../address/address?from=me'
    });
  },

  // 收费标准 webview h5页面
  ghbLogisticFee() {
    wx.navigateTo({
      url:
      '../webview/webview?webUrl=' +
      'https://www.guanghuobao.com/static/app-h5/html/logisticFee.html'
    });
  },

  logout() {
    wx.showLoading({
      title: '正在退出...'
    });

    ghbRequest({
      url: API.LOGOUT,
      method: 'DELETE'
    }).then((res) => {
      if (res.statusCode === 200) {

        // // 退出之后重置所有数据
        // this.$store.commit('isIndexResetChange', {
        //   isIndexReset: true
        // });

        // eventBus.$emit(ghbEvent.resetOrderList);

        wx.removeStorageSync('token');
        wx.removeStorageSync('mobile');
        // 重置当前页面
        this.reset();
      } else {
        showToastError('操作失败，请稍后再试');
      }
    });
  },

  // 获取可使用优惠券列表
  getCouponListFormIndex() {
    ghbRequest({
      url: API.LISTCOUPONBYTYPE,
      data: {
        type: 1
      }
    }).then(res => {
      this.setData({
        LogisticsCoupons: res.data
      });
    });
  },

  onShow() {
    const _this = this;
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    }, () => {
      if (this.data.isLogin) {
        this.setData({
          mobile: wx.getStorageSync('mobile')
        });

        wx.getUserInfo({
          lang: 'zh_CN',
          success: function (res) {
            _this.setData({
              userInfo: res.userInfo,
              avantar: res.userInfo.avatarUrl
            });
          }
        });

        this.getCouponListFormIndex();
      } else {
        this.setData({
          mobile: '点击登录',
          avantar: this.data.avantarImg
        });
      }
    });
  }

})
