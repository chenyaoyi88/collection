import { Vue, Component } from 'vue-property-decorator';
import coupon from './coupon.vue';
import { ghbRequest, setArrayGroup, showToastError } from '../../utils';
import API from '../../api';
import { eventBus, ghbEvent } from '../eventbus';

import IMG_SELECT from '../../../static/images/selected.png';

interface CouponList {
  list: Array<any>;
  listNone: boolean;
  listTmp: Array<any>;
};

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    coupon
  }
})
class Index extends Vue {

  IMG_SELECT: any = IMG_SELECT;
  isNotUseCoupon: boolean = true;

  couponInfo: any = {};

  LogisticsCoupons: Array<any> = [];
  LogisticsCouponsNone: boolean = false;

  listCount: number = 0;

  canUse: CouponList = {
    list: [],
    listNone: false,
    listTmp: [],
  };

  expire: CouponList = {
    list: [],
    listNone: false,
    listTmp: [],
  };

  used: CouponList = {
    list: [],
    listNone: false,
    listTmp: [],
  };

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
    this.getCouponListFromPageMe(this.currentIndex, true);
  }

  // 从【我的】页面进来，加载不同 tab 的数据
  getCouponListFromPageMe(tabIndex: number = 0, isReload: boolean = false) {

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
          this.listRender('canUse', tabIndex, res, isReload);
          break;
        case 1:
          this.listRender('expire', tabIndex, res, isReload);
          break;
        case 2:
          this.listRender('used', tabIndex, res, isReload);
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

  // 列表渲染
  listRender(listName: string, tabIndex: number, res: any, isReload: boolean) {
    this[listName].listTmp = setArrayGroup(res.data);
    if (isReload) {
      for (let i = 0; i <= this[listName].listTmp.length; i++) {
        if (i > 0) {
          this[listName].list[i] = [];
        }
      }
      this.listCount = 0;
    }
    this[listName].list[this.listCount] = this[listName].listTmp[this.listCount];
    this.tabTitle[tabIndex].count = res.data.length;
    if (!this.tabTitle[tabIndex].count) {
      this[listName].listNone = true;
    }
  }

  // 列表滚动加载
  listRenderLoad(listName: string) {
    if (this.listCount === this[listName].listTmp.length - 1) {
      showToastError('没有更多数据了');
      return;
    };
    wx.showLoading({
      title: '加载中'
    });
    setTimeout(() => {
      this.listCount++;
      this[listName].list[this.listCount] = this[listName].listTmp[this.listCount];
      wx.hideLoading();
    }, 300);
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
      if (res.data && res.data.length) {
        for (let item of res.data) {
          if (item.id === this.couponInfo.id) {
            item.select = true;
          }
        }
        this.LogisticsCoupons = res.data;
      }
      if (!this.LogisticsCoupons.length) {
        this.LogisticsCouponsNone = true;
      }
    });
  }

  // 选择优惠券之后返回首页
  couponSelectFormIndex(item: any) {
    this.isNotUseCoupon = item ? false : true;
    eventBus.$emit(ghbEvent.getCoupon, item);
    wx.navigateBack();
  }

  // 重置所有数据
  resetData() {
    this.canUse = {
      list: [],
      listNone: false,
      listTmp: [],
    };

    this.expire = {
      list: [],
      listNone: false,
      listTmp: [],
    };

    this.used = {
      list: [],
      listNone: false,
      listTmp: [],
    };

    this.listCount = 0;

    this.LogisticsCoupons = [];
    this.LogisticsCouponsNone = false;

    this.couponInfo = {};

    this.currentIndex = 0;
    this.from = '';
  }

  // 滚动条触底事件
  onReachBottom() {
    if (this.from === 'me') {
      // 获取数据
      switch (this.currentIndex) {
        case 0:
          this.listRenderLoad('canUse');
          break;
        case 1:
          this.listRenderLoad('expire');
          break;
        case 2:
          this.listRenderLoad('used');
          break;
      }
    }
  }

  // 获取传过来的参数
  onLoad() {
    const options = this.$root['$mp'].query || {};
    this.from = options.from || 'index';

    if (this.from === 'index') {
      // 来自 首页
      this.couponInfo = JSON.parse(options.couponInfo);
      if (this.couponInfo) {
        this.isNotUseCoupon = this.couponInfo.id ? false : true;
      }
      this.getCouponListFormIndex(JSON.parse(options.LogisticsCoupons));

    } else {
      // 来自 我的
      this.tabSwitch(0);
      this.getCouponListFromPageMe(1, true);
      this.getCouponListFromPageMe(2, true);
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
      this.getCouponListFromPageMe(this.currentIndex, true);
    }
  }
}

export default Index;
