import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import MyApp from './App.vue';
import store from './store';

Vue.config.productionTip = false
// MyApp['mpType'] = 'app';
Vue.prototype.$store = store;

// 添加小程序 hooks http://mpvue.com/mpvue/#_4
Component.registerHooks([
  // pages
  'onLoad', // 监听页面加载
  'onShow', // 监听页面显示
  'onReady', // 监听页面初次渲染完成
  'onHide', // 监听页面隐藏
  'onUnload', // 监听页面卸载
  'onPullDownRefresh', // 监听用户下拉动作
  'onReachBottom', // 页面上拉触底事件的处理函数
  'onShareAppMessage', // 用户点击右上角分享
  'onPageScroll', // 页面滚动
  'onTabItemTap', //当前是 tab 页时 // 点击 tab 时触发 （mpvue 0.0.16 支持）
])

const app = new Vue(MyApp);
app.$mount();



export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/a_tab/index/main'],
    // pages: ['^pages/cartype/main'],
    // pages: ['^pages/test/main'],
    // pages: ['^pages/login/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '广货宝-同城货运',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      selectedColor: '#F13744',
      list: [{
        pagePath: 'pages/a_tab/index/main',
        text: '叫车',
        iconPath: 'static/images/callcar.png',
        selectedIconPath: 'static/images/callcar_active.png'
      }, {
        pagePath: 'pages/a_tab/order/main',
        text: '订单',
        iconPath: 'static/images/order.png',
        selectedIconPath: 'static/images/order_active.png'
      }, {
        pagePath: 'pages/a_tab/me/main',
        text: '我的',
        iconPath: 'static/images/me.png',
        selectedIconPath: 'static/images/me_active.png'
      }]
    }
  },
};
