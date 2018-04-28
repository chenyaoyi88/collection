//index.js
// import tabbarList from './tabbar_list';
import {
  tabbarList,
  iconList
} from './utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    tabIndex: 0,
    tabbarList,
    iconList
  },
  tabClickEvent: function (e) {
    console.log(e.detail);
    this.setData({
      tabIndex: e.detail.tabIndex
    });
  },
  // itemClick1: function (e) {
  //   console.log(e);
  // },
  onLoad: function () {
    console.log(wx.getSystemInfoSync());

    switch (this.data.tabIndex) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }
});