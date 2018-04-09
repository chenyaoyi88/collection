import { Vue, Component, Provide } from 'vue-property-decorator';
import Tab from '@/components/tab/index.vue';

@Component({
  components: {
    Tab
  }
})
class Order extends Vue {
  @Provide() msg: string = '';
  @Provide() isLogin: boolean = false;
  @Provide() tabList: Array<string> = ['进行中', '已完成', '已取消'];
  @Provide() tab1List: Array<any> = [];
  @Provide() tab1ListLen: number = 30;
  @Provide() tabText: string = 'bitch';

  created() {
    this.msg = '订单页面';
  }

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
  }

  tabChange(index: number) {
    console.log(index);
  }

  sayFuck() {
    console.log(123);
    this.tabText = 'fuck you!';
  }
  
  gotoLogin() {
    wx.navigateTo({
      url: '../../login/main'
    });
  }
}

export default Order;
