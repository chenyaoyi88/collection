import { iconList } from './utils';
// 获取应用实例
const app = getApp();

Page({
  data: {
    iconList,
    isLogin: false,
    sCoupon: ''
  },
  onLoad() {
    console.log(this.data.isLogin);
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    });
  }
});
