import {
  isInputEmpty,
  isPhoneNumber,
  showToastError,
  ghbRequest
} from '../../utils/index';
import API from '../../api/api';
import {
  eventBusEmit,
  eventBusRemove,
  eventBusOn,
  ghbEvent
} from '../../utils/event';

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
      url: '../webview/webview?webUrl=' +
        'https://www.guanghuobao.com/static/app-h5/html/logisticFee.html'
    });
  },

  logout() {

    const _this = this;

    wx.showModal({
      title: '温馨提示',
      content: '是否退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在退出...'
          });

          ghbRequest({
            url: API.LOGOUT,
            method: 'DELETE'
          }).then((res) => {
            if (res.statusCode === 200) {

              // 退出之后重置所有数据
              // 重置首页
              eventBusEmit(ghbEvent.resetIndex);
              // 重置订单页
              eventBusEmit(ghbEvent.resetOrderList);

              wx.removeStorageSync('token');
              wx.removeStorageSync('mobile');

              // 重置当前页面
              _this.reset();
            } else {
              showToastError('操作失败，请稍后再试');
            }
          });
        }
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

  reload(isPullDownRefresh = false) {
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
      isPullDownRefresh && wx.stopPullDownRefresh();
    });
  },

  // 用户下拉动作，刷新当前列表
  onPullDownRefresh() {
    this.reload(true);
  },

  onShow() {
    this.reload();
  },

  onLoad() {
    eventBusOn(ghbEvent.resetMe, this, () => {
      this.reset();
    });
  },

  onUnload() {
    eventBusRemove(ghbEvent.resetMe, this);
  }

})