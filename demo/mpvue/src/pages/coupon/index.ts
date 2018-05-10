import { Vue, Component } from 'vue-property-decorator';
import coupon from './coupon.vue';
import { ghbRequest } from '../../utils';
import API from '../../api';
import { eventBus, ghbEvent } from '../eventbus';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    coupon
  }
})
class Index extends Vue {
  // 已使用的优惠券
  usedList: any = [];
  // 过期的优惠券
  expireList: any = [];
  // 可使用的优惠券
  LogisticsCoupons: any = [];

  // 是否显示没有数据
  isUsedListNone: boolean = false;
  isExpireListNone: boolean = false;
  isLogisticsCouponsNone: boolean = false;

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

  // 滑块滑动 + 切换 tab + 加载数据 
  tabSwitch(index: number) {
    this.titleSlider.left = 100 * (this.currentIndex = index);
    this.getCouponListFromPageMe(this.currentIndex);
  }

  // 从【我的】页面进来，加载不同 tab 的数据
  getCouponListFromPageMe(tabIndex: number = 0) {
    wx.showLoading({
      title: '加载中'
    });

    ghbRequest({
      url: API.LISTCOUPONBYTYPE,
      data: {
        type: tabIndex + 1
      }
    }).then((res: any) => {
      switch (tabIndex) {
        case 0:
          this.LogisticsCoupons = res.data;
          this.tabTitle[tabIndex].count = this.LogisticsCoupons.length;
          if (!this.LogisticsCoupons.length) {
            this.isLogisticsCouponsNone = true;
          }
          break;
        case 1:
          this.expireList = res.data;
          this.tabTitle[tabIndex].count = this.expireList.length;
          if (!this.expireList.length) {
            this.isExpireListNone = true;
          }
          break;
        case 2:
          this.usedList = res.data;
          this.tabTitle[tabIndex].count = this.usedList.length;
          if (!this.usedList.length) {
            this.isUsedListNone = true;
          }
          break;
        default:
      }

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });

      wx.hideLoading();
      wx.stopPullDownRefresh();
    });
  }

  // 获取可使用优惠券列表
  getCouponListFormIndex(data: any) {
    wx.showLoading({
      title: '加载中'
    });
    ghbRequest({
      method: 'POST',
      url: API.LOGISTICSCOUPONS,
      data
    }).then((res: any) => {
      this.LogisticsCoupons = res.data;
      if (!this.LogisticsCoupons.length) {
        this.isLogisticsCouponsNone = true;
      }
    });
  }

  // 选择优惠券之后返回首页
  couponSelectFormIndex(item: any) {
    eventBus.$emit(ghbEvent.getCoupon, item);
    wx.navigateBack();
  }

  // 重置所有数据
  resetData() {
    this.usedList = [];
    this.expireList = [];
    this.LogisticsCoupons = [];
    this.isUsedListNone = false;
    this.isExpireListNone = false;
    this.isLogisticsCouponsNone = false;
    this.currentIndex = 0;
    this.from = '';
  }

  // 获取传过来的参数
  onLoad() {
    const options = this.$root['$mp'].query || {};
    this.from = options.from || 'me';

    if (this.from === 'index') {
      // 来自 首页
      this.getCouponListFormIndex(JSON.parse(options.LogisticsCoupons));
    } else {
      // 来自 我的
      this.tabSwitch(0);
      this.getCouponListFromPageMe(1);
      this.getCouponListFromPageMe(2);
    }
  }

  // 页面退出，清空列表，避免下次进来有缓存
  onUnload() {
    this.resetData();
  }

  // 用户下拉动作，刷新当前列表
  onPullDownRefresh() {
    if (this.from === 'index') {
      wx.stopPullDownRefresh();
    } else {
      this.getCouponListFromPageMe(this.currentIndex);
    }
  }
}

export default Index;
