import { Vue, Component } from 'vue-property-decorator';
import coupon from './coupon.vue';

import { isUsedList, isExpireList } from './mock';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    coupon
  }
})
class Index extends Vue {
  isUsedList: any = [];
  isExpireList: any = [];

  // 当前 tab 索引
  currentIndex: number = 0;
  // 来自何处
  from: string = '';

  // tab 标题
  tabTitle: Array<any> = [
    {
      name: '未使用',
      count: 0
    },
    {
      name: '已过期',
      count: 0
    },
    {
      name: '已使用',
      count: 0
    }
  ];

  // tab 标题滑块
  titleSlider = {
    width: 100 / this.tabTitle.length,
    left: 0
  };

  // 点击 tab
  tabClick(index: number) {
    if (this.currentIndex === index) return;
    this.tabSwitch(index);
  }

  // 切换 tab
  tabSwitch(index: number) {
    this.titleSlider.left = 100 * (this.currentIndex = index);
    this.getCouponListFromPageMe();
  }

  getCouponListFromPageMe() {
    wx.showLoading({
      title: '加载中'
    });

    setTimeout(() => {
      switch (this.currentIndex) {
        case 0:
          this.isUsedList = isUsedList;
          break;
        case 1:
          this.isExpireList = isExpireList;
          break;
        case 2:
          this.isUsedList = isUsedList;
          break;
        default:
      }

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });

      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 300);
  }

  onLoad() {
    const options = this.$root['$mp'].query || {};
    this.from = options.from || 'me';

    if (this.from === 'index') {
      // 来自 首页
      console.log('来自 首页');
    } else {
      // 来自 我的
      this.tabSwitch(0);
    }
  }

  // 用户下拉动作，刷新当前列表
  onPullDownRefresh() {
    if (this.from === 'index') {
      wx.stopPullDownRefresh();
    } else {
      this.getCouponListFromPageMe();
    }
  }
}

export default Index;
