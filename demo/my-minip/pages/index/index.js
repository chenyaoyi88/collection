import { iconList } from './utils';
// 获取应用实例
const app = getApp();

Page({
  data: {
    iconList,
    isLogin: app.globalData.isLogin,
    sCoupon: ''
  },
  onLoad: function() {
    console.log(this.data.isLogin);
  }
});
