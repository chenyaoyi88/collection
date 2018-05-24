import { goBackSetData, ghbRequest, zerofillBack, showToastError } from '../../utils/index';
import API from '../../api/api';

Page({
  data: {
    from: '',
    desIndex: -1,
    isShowEdit: false,
    start: 0,
    limit: 20,
    addressList: [],
    addressListNone: false,
    isShowNomore: false,
  },

  // 获取常用联系人列表
  getAddressBookRest(reload = false, isShowLoading = true) {
    if (isShowLoading) {
      wx.showLoading({
        title: '加载中',
        mask: true
      });
    }

    let addressList = this.data.addressList;
    let addressListNone = this.data.addressListNone;
    let isShowNomore = false;

    if (reload) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.data.start = 0;
    }

    ghbRequest({
      url: API.ADDRESSBOOKREST,
      data: {
        start: this.data.start,
        limit: this.data.limit,
        serviceType: 1
      }
    }, !isShowLoading)
      .then((res) => {
        console.log(res);
        if (res.data && res.data.length) {

          if (res.data.length < this.data.limit) {
            isShowNomore = true;
          }

          if (reload) {
            addressList = [];
          }

          addressList[this.data.start] = res.data;
          addressListNone = false;

        } else {

          if (reload) {
            addressListNone = true;
            addressList = [];
          } else {
            if (addressList.length) {
              isShowNomore = true;
            } else {
              addressListNone = true;
            }
          }

        }

        this.setData({
          start: this.data.start,
          addressList,
          addressListNone,
          isShowNomore
        });

        wx.stopPullDownRefresh();
      })
      .catch(() => {
        this.setData({
          addressListNone: true
        });
      });

  },
  // 加载更多
  getMoreListData() {
    if (this.data.isShowNomore) return;
    this.data.start+=10;
    this.getAddressBookRest(false);
  },
  // 新增地址，去搜素页面 -> 联系人页面 -> 确认 -> 回来
  addNewAddress() {
    const from = `${this.data.from}_new`;
    wx.navigateTo({
      url: `../search/search?from=${from}`
    });
  },
  // 滚动条触底事件
  onReachBottom() {
    // 获取数据
    this.getMoreListData();
  },
  onLoad(options) {
    const from = options.from;
    const desIndex = options.desIndex || -1;
    const isShowEdit = from.includes('me') ? true : false;

    this.setData({
      from,
      desIndex,
      isShowEdit
    }, () => {
      this.getAddressBookRest(true);
    });

    // // 如果是保存回来此页面，刷新一下
    // eventBus.$on(ghbEvent.gobackReload, (isReload: boolean) => {
    //   // NOTE：没有定时器新创建完返回刷新的时候会回不到顶部，而且会请求2次
    //   setTimeout(() => {
    //     this.getAddressBookRest(isReload, false);
    //     showToastError(isReload ? '保存成功' : '编辑成功');
    //   }, 150);
    // });

  }
})
