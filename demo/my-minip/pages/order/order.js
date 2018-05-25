import { ghbRequest, getOrderStatusText, showToastError } from '../../utils/index';
import API from '../../api/api';
import { eventBusEmit, eventBusRemove, eventBusOn } from '../event';
import { tabList } from './utils';

// 获取应用实例
const app = getApp();

Page({
  data: {
    isLogin: wx.getStorageSync('token') ? true : false,
    tabTitle: tabList,
    // 当前 tab 索引
    currentIndex: 0,
    // 每页请求个数
    pageLimit: 10,

    ing: {
      list: [],
      tmp: [],
      offset: 0,
      none: false,
      nomore: false
    },

    finish: {
      list: [],
      tmp: [],
      offset: 0,
      none: false,
      nomore: false
    },

    cancel: {
      list: [],
      tmp: [],
      offset: 0,
      none: false,
      nomore: false
    },

    // 取消原因列表
    cancelReasonList: [],
    // 取消原因 id
    cancelReasonId: 0,
    // 取消原因物流 id
    cancelReasonWLId: 0,
    // 控制额外服务的 slider 显示隐藏
    selectSlider: false,

  },
  tabClick(e) {
    const index = isNaN(e) ? e.detail.tabIndex : e;
    if (this.data.currentIndex === index) return;
    this.tabSwitch(index);
  },
  // 切换 tab
  tabSwitch(index) {

    let ing = this.data.ing;
    let finish = this.data.finish;
    let cancel = this.data.cancel;
    ing.none = false;
    finish.none = false;
    cancel.none = false;

    this.setData({
      currentIndex: index,
      ing,
      finish,
      cancel
    }, () => {
      this.loadCurrentListData(true);
    });
  },

  // 请求接口
  getList(listType, reload) {
    const _this = this;
    let searchType = 2;
    let curOrderList = _this.data[listType];

    wx.showLoading({
      title: '加载中'
    });

    const pageSize = _this.data[listType].offset / 10;

    if (reload) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      curOrderList.nomore = false;
    }

    switch (listType) {
      case 'ing':
        searchType = 2;
        break;
      case 'finish':
        searchType = 3;
        break;
      case 'cancel':
        searchType = 4;
        break;
    }

    this.setData({
      [listType]: curOrderList
    }, () => {
      ghbRequest({
        url: API.LOGISTICSORDERS,
        data: {
          searchType,
          offset: reload ? 0 : _this.data[listType].offset,
          limit: this.data.pageLimit
        }
      })
        .then((res) => {
          if (res.statusCode === 200) {

            let dataList = _this.data[listType];

            dataList.tmp = res.data;

            let aShowList = [];
            if (res.data && res.data.length) {

              if (res.data.length < this.data.pageLimit) {
                dataList.nomore = true;
              }

              for (let i = 0; i < res.data.length; i++) {
                const order = res.data[i];
                order.statusText = getOrderStatusText(order);
                aShowList.push(order);
              }

              if (reload) {
                for (let j = 0; j <= pageSize; j++) {
                  if (j > 0) {
                    dataList.list[j] = [];
                  } else {
                    dataList.list[j] = aShowList;
                  }
                }
                dataList.offset = 0;
              } else {
                dataList.list[pageSize] = aShowList;
              }
            } else {
              if (reload) {
                dataList.none = true;
                dataList.list = [];
              } else {
                if (dataList.length) {
                  dataList.nomore = true;
                } else {
                  dataList.none = true;
                }
              }
            }

            this.setData({
              [listType]: dataList
            });

            wx.stopPullDownRefresh();

          }
        })
        .catch(() => {
          // TODO：接口出问题的时候列表展示处理
        });
    });
  },

  // 向上滚动获取更多数据
  getMoreListData(listType) {
    const dataList = this.data[listType];
    if (dataList.nomore) return;
    dataList.offset = 10;
    this.setData(dataList, () => {
      this.getList(listType, false);
    });
  }
  ,
  // 重载/加载数据
  loadCurrentListData(isReload = false) {
    switch (this.data.currentIndex) {
      // 进行中
      case 0:
        if (isReload) {
          this.getList('ing', isReload);
        } else {
          this.getMoreListData('ing');
        }
        break;
      // 已完成
      case 1:
        if (isReload) {
          this.getList('finish', isReload);
        } else {
          this.getMoreListData('finish');
        }
        break;
      // 已取消
      case 2:
        if (isReload) {
          this.getList('cancel', isReload);
        } else {
          this.getMoreListData('cancel');
        }
        break;
      default:
    }
  },

  // 页面重置
  resetPage(isLoadList = true) {
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    }, () => {
      if (this.data.isLogin) {
        isLoadList && this.tabSwitch(0);
        const aList = this.data.tabTitle;
        for (let i = 0; i < aList.length; i++) {
          let listName = aList[i].value;
          let dataList = this.data[listName];
          dataList = {
            list: [],
            tmp: [],
            offset: 0,
            none: false,
            nomore: false
          };
          this.setData({
            [listName]: dataList
          });
        }
      }
    });
  },
  // 未登录->去登录
  gotoLogin() {
    wx.navigateTo({
      url: '../login/login'
    });
  },

  // 滚动条触底事件
  onReachBottom() {
    // 获取数据
    this.loadCurrentListData();
  },

  // 用户下拉动作，刷新当前列表
  onPullDownRefresh() {
    this.loadCurrentListData(true);
  },

  onLoad() {
    eventBusOn('resetOrderList', this, () => {
      this.resetPage(false);
    });
  },
  onUnload() {
    eventBusRemove('resetOrderList', this);
  },
  onShow() {
    this.resetPage();
  }
})
