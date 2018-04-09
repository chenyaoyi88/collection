import { Vue, Component, Provide } from 'vue-property-decorator';

@Component
class Order extends Vue {
  @Provide() msg: string = '';
  @Provide() isLogin: boolean = false;

  created() {
    this.msg = '订单页面';

    // wx.login({
    //   success: function (res) {
    //     console.log(res);
    //     if (res.code) {
    //       //发起网络请求
    //       // wx.request({
    //       //   url: 'https://test.com/onLogin',
    //       //   data: {
    //       //     code: res.code
    //       //   }
    //       // })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
  }

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
  }
  
  gotoLogin() {
    wx.navigateTo({
      url: '../../login/main'
    });
  }
}

export default Order;
