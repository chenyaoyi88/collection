// 获取应用实例
const app = getApp();

Page({
  data: {
    isLogin: false,
    tabIndex: 0,
    tabList: [
      {
        name: '进行中',
        value: 'ingList'
      },
      {
        name: '已完成',
        value: 'finishList'
      },
      {
        name: '已取消',
        value: 'cancelList'
      }
    ]
  },
  tabSwitch(e) {
    // console.log(e.detail.tabIndex);
  },
  tabChange() {
    this.setData({
      tabIndex: 1
    });
  },
  onShow() {
    console.log('onShow');
  }
})
