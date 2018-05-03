//index.js
import { tabbarList, iconList } from './utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    tabIndex: 0,
    tabbarList,
    iconList,

    show: false,
  },
  tabClickEvent: function(e) {
    console.log(e.detail);
    this.setData({
      tabIndex: e.detail.tabIndex
    });
  },
  show() {
    this.setData({
      show: true
    });
  },
  hide() {
    this.setData({
      show: false
    });
  },
  onLoad: function() {
    console.log(app);

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
