import { Vue, Component, Provide } from 'vue-property-decorator';

@Component
class Order extends Vue {
  @Provide() isLogin: boolean = false;
  @Provide() tabList: Array<string> = ['进行中', '已完成', '已取消'];
  @Provide() tab1List: Array<any> = [];
  @Provide() tab1ListLen: number = 30;
  @Provide() tabText: string = 'bitch';
  @Provide() currentIndex: number = 0;
  @Provide() contentHeight: number = 0;
  @Provide() headerHeight: number = 30;

  created() {

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

    // wx.getUserInfo({
    //   lang: 'zh_CN',
    //   success: function (res) {
    //     console.log(res);
    //     var userInfo = res.userInfo
    //     var nickName = userInfo.nickName
    //     var avatarUrl = userInfo.avatarUrl
    //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //     var province = userInfo.province
    //     var city = userInfo.city
    //     var country = userInfo.country
    //   }
    // })

    // console.log('获取设备信息', wx.getSystemInfoSync());
  }

  mounted() {
    const oTab = this;
    wx.getSystemInfo({
      success(res) {
        oTab.contentHeight = res.windowHeight - oTab.headerHeight;
      }
    });
    // this.$emit('tabChange', this.currentIndex);
  }

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
  }

  tabClick(index: number) {
    console.log(index);
    this.currentIndex = index;
  }

  tabChange(e: any) {
    this.currentIndex = e.target.current;
  }

  sayFuck() {
    this.tabText = 'fuck you!';
  }

  gotoLogin() {
    wx.navigateTo({
      url: '../../login/main'
    });
  }
}

export default Order;
