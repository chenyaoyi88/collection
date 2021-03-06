import { Vue, Component } from 'vue-property-decorator';
// import coupon from './coupon.vue';
import {
  ghbRequest,
  setArrayGroup,
  showToastError,
  formatTime
} from '../../utils';
import API from '../../api';
import { eventBus, ghbEvent } from '../eventbus';

import IMG_COUPONBG from '../../../static/images/couponbg.png';
import IMG_COUPONBG_FAIL from '../../../static/images/couponbg_fail.png';
import IMG_ARROW from '../../../static/images/arrow-coupon.png';
import IMG_SELECT from '../../../static/images/selected.png';

interface CouponList {
  list: Array<any>;
  listNone: boolean;
  listTmp: Array<any>;
  listnomore: boolean;
};

// 必须使用装饰器的方式来指定components
@Component({
  // components: {
  //   coupon
  // }
})
class Index extends Vue {

  // 各种模版所需图片
  IMG_COUPONBG: any = IMG_COUPONBG;
  IMG_COUPONBG_FAIL: any = IMG_COUPONBG_FAIL;
  IMG_ARROW: any = IMG_ARROW;
  IMG_SELECT: any = IMG_SELECT;

  // 是否显示不使用优惠券表示（那个未选中的圆圈）
  isNotUseCoupon: boolean = true;

  // 首页之前选中的优惠券信息
  couponInfo: any = {};

  // 首页点击优惠券进来所需变量
  LogisticsCoupons: Array<any> = [];
  LogisticsCouponsParams: any = {};
  LogisticsCouponsNone: boolean = false;
  LogisticsCouponsNomore: boolean = false;

  // 用来记录翻到当前优惠券列表的第几页
  listCount: number = 0;

  // 未使用
  canUse: CouponList = {
    list: [],
    listNone: false,
    listTmp: [],
    listnomore: false
  };

  // 已过期
  expire: CouponList = {
    list: [],
    listNone: false,
    listTmp: [],
    listnomore: false
  };

  // 已使用
  used: CouponList = {
    list: [],
    listNone: false,
    listTmp: [],
    listnomore: false
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

    for (let item of res.data) {
      item.beginDateFormat = this.formatCouponTime(item.beginDate);
      item.endDateFormat = this.formatCouponTime(item.endDate);
      item.usedDateFormat = this.formatCouponTime(item.usedDate);
    }

    this[listName].listTmp = setArrayGroup(res.data);

    if (isReload) {
      for (let i = 0; i <= this[listName].listTmp.length; i++) {
        if (i > 0) {
          this[listName].list[i] = [];
        }
      }
      this.listCount = 0;
      this[listName].listnomore = false;
    }
    this[listName].list[this.listCount] = this[listName].listTmp[this.listCount];
    if (this.listCount === this[listName].listTmp.length - 1) {
      this[listName].listnomore = true;
    };
    this.tabTitle[tabIndex].count = res.data.length;
    if (!this.tabTitle[tabIndex].count) {
      this[listName].listNone = true;
    }
  }

  // 列表滚动加载
  listRenderLoad(listName: string) {
    if (this.listCount === this[listName].listTmp.length - 1) {
      // showToastError('没有更多数据了');
      return;
    };
    wx.showLoading({
      title: '加载中'
    });
    setTimeout(() => {
      this.listCount++;
      this[listName].list[this.listCount] = this[listName].listTmp[this.listCount];

      if (this.listCount === this[listName].listTmp.length - 1) {
        this[listName].listnomore = true;
      };
      wx.hideLoading();
    }, 150);
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
          item.endDateFormat = this.formatCouponTime(item.endDate);
        }
        this.LogisticsCoupons = res.data;
        this.LogisticsCouponsNomore = true;
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
  
  // 时间戳转为 xxx.xx.xx 格式
  formatCouponTime(timestamp: Date) {
    return formatTime(new Date(timestamp))
      .split(' ')[0]
      .replace(/\//g, '.');
  }
  
  // 点击优惠券适用规则
  couponRuleClick(termOfUse: any) {
    wx.showModal({
      title: '使用说明',
      content: termOfUse,
      showCancel: false
    });
  }

  // 重置所有数据
  resetData() {
    this.canUse = {
      list: [],
      listNone: false,
      listTmp: [],
      listnomore: false
    };

    this.expire = {
      list: [],
      listNone: false,
      listTmp: [],
      listnomore: false
    };

    this.used = {
      list: [],
      listNone: false,
      listTmp: [],
      listnomore: false
    };

    this.listCount = 0;

    this.LogisticsCoupons = [];
    this.LogisticsCouponsParams = {};
    this.LogisticsCouponsNone = false;
    this.LogisticsCouponsNomore = false;

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
      this.LogisticsCouponsParams = JSON.parse(options.LogisticsCoupons);
      this.getCouponListFormIndex(this.LogisticsCouponsParams);
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
      this.getCouponListFormIndex(this.LogisticsCouponsParams);
      wx.stopPullDownRefresh();
    } else {
      this.getCouponListFromPageMe(this.currentIndex, true);
    }
  }
}

export default Index;
