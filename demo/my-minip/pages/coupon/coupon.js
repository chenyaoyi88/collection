
import { ghbRequest, setArrayGroup, showToastError, formatTime } from '../../utils/index';
import API from '../../api/api';
import { aMockListCanUse } from './mock';
import { tabTitleList } from './utils';

Page({
  data: {
    IMG_SELECT: '../../assets/images/selected.png',
    isNotUseCoupon: true,
    couponInfo: {},
    LogisticsCoupons: [],
    LogisticsCouponsParams: {},
    LogisticsCouponsNone: false,
    // 当前 tab 索引
    currentIndex: 0,
    // 来自何处
    from: '',
    // tab 标题
    tabTitle: tabTitleList,
    listCount: 0,
    canUse: {
      list: [],
      listNone: false,
      listTmp: [],
    },
    expire: {
      list: [],
      listNone: false,
      listTmp: [],
    },
    used: {
      list: [],
      listNone: false,
      listTmp: [],
    },
  },
  tabSwitch(e) {
    const currentIndex = isNaN(e) ? e.detail.tabIndex : e;
    this.setData({
      currentIndex
    }, () => {
      this.getCouponListFromPageMe(currentIndex, true);
    });
  },

  // 从【我的】页面进来，加载不同 tab 的数据
  getCouponListFromPageMe(tabIndex = 0, isReload = false) {

    wx.showLoading({
      title: '加载中'
    });

    ghbRequest({
      url: API.LISTCOUPONBYTYPE,
      data: {
        type: tabIndex + 1
      }
    }).then(res => {

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
  },
  // 列表渲染
  listRender(listName, tabIndex, res, isReload) {

    for (let item of res.data) {
      item.beginDateFormat = this.formatCouponTime(item.beginDate);
      item.endDateFormat = this.formatCouponTime(item.endDate);
      item.usedDateFormat = this.formatCouponTime(item.usedDate);
    }

    const listTmp = setArrayGroup(res.data);
    let renderList = this.data[listName];
    let listCount = this.data.listCount;
    let tabTitle = this.data.tabTitle;

    if (isReload) {
      for (let i = 0; i <= listTmp.length; i++) {
        if (i > 0) {
          renderList.list[i] = [];
        }
      }
      listCount = 0;
    }

    renderList.listTmp = listTmp;
    renderList.list[listCount] = listTmp[listCount];
    tabTitle[tabIndex].count = res.data.length;

    tabTitle[tabIndex].name = tabTitleList[tabIndex].name + '(' + res.data.length + ')';

    if (!tabTitle[tabIndex].count) {
      renderList.listNone = true;
    }

    let data = {
      [listName]: renderList,
      listCount,
      tabTitle
    };

    this.setData(data);

  },
  listRenderLoad(listName) {
    if (this.data.listCount === this.data[listName].listTmp.length - 1) {
      showToastError('没有更多数据了');
      return;
    };

    wx.showLoading({
      title: '加载中'
    });

    setTimeout(() => {

      let listCount = this.data.listCount;
      listCount++;
      let renderList = this.data[listName];
      renderList.list[listCount] = renderList.listTmp[listCount];

      this.setData({
        listCount,
        [listName]: renderList
      });

      wx.hideLoading();
    }, 300);

  },
  // 获取可使用优惠券列表
  getCouponListFormIndex(data) {
    wx.showLoading({
      title: '加载中'
    });

    ghbRequest({
      method: 'POST',
      url: API.LOGISTICSCOUPONS,
      data
    }).then(res => {
      let data = {};
      if (res.data && res.data.length) {
        for (let item of res.data) {
          if (item.id === this.data.couponInfo.id) {
            item.select = true;
          }
        }
        data = {
          LogisticsCoupons: res.data
        };
      }
      if (!this.LogisticsCoupons.length) {
        data = {
          LogisticsCouponsNone: true
        };
      }
      this.setData(data);
    });
  },
  formatCouponTime(timestamp) {
    return formatTime(new Date(timestamp))
      .split(' ')[0]
      .replace(/\//g, '.');
  },
  // 获取传过来的参数
  onLoad(options) {

    let data = {
      from: options.from || 'me'
    };

    if (data.from === 'index') {
      // 来自 首页

      const couponInfo = JSON.parse(options.couponInfo || '{}');
      const LogisticsCouponsParams = JSON.parse(options.LogisticsCoupons || '{}');
      let isNotUseCoupon = true;
      if (couponInfo) {
        isNotUseCoupon = couponInfo.id ? false : true;
      }

      Object.assign({}, data, {
        couponInfo,
        isNotUseCoupon,
        LogisticsCouponsParams
      });

      // this.getCouponListFormIndex(LogisticsCouponsParams);
    } else {
      // 来自 我的

      this.tabSwitch(0);
      this.getCouponListFromPageMe(1, true);
      this.getCouponListFromPageMe(2, true);
    }

    this.setData(data);

  },
  // 滚动条触底事件
  onReachBottom() {
    if (this.data.from === 'me') {
      // 获取数据
      switch (this.data.currentIndex) {
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
  },
  // 用户下拉动作，刷新当前列表
  onPullDownRefresh() {
    if (this.data.from === 'index') {
      this.getCouponListFormIndex(this.data.LogisticsCouponsParams);
      wx.stopPullDownRefresh();
    } else {
      this.getCouponListFromPageMe(this.data.currentIndex, true);
    }
  }
})
