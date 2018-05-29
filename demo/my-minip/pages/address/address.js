import {
  goBackSetData,
  ghbRequest,
  zerofillBack,
  showToastError
} from '../../utils/index';
import API from '../../api/api';
import {
  eventBusEmit,
  eventBusRemove,
  eventBusOn,
  ghbEvent
} from '../../utils/event';

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
        // console.log(res);
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
    this.data.start += 10;
    this.getAddressBookRest(false);
  },
  // 新增地址，去搜素页面 -> 联系人页面 -> 确认 -> 回来
  addNewAddress() {
    const from = `${this.data.from}_new`;
    wx.navigateTo({
      url: `../search/search?from=${from}`
    });
  },
  // 编辑
  edit(e) {
    const dataset = e.target.dataset;
    const item = dataset.item;

    const searchInfo = {
      id: item.id,
      name: item.name,
      mobile: item.mobile,
      siteName: item.address,
      address: item.addressName,
      location: {
        lng: item.longitude,
        lat: item.latitude
      },
      cityCode: item.cityCode,
      street: item.street,
      from: 'edit',
      remark: item.remark
    };

    wx.navigateTo({
      url: `../contact/contact?searchInfo=${JSON.stringify(searchInfo)}`
    });
  },

  // 选择当前地址，发消息通知首页，返回首页
  select(e) {
    const mapPosInfo = e.currentTarget.dataset.info;
    // 只有从 首页的出发点（start）和 目的地（des）进来才能点击选择
    if (this.data.from === 'start' || this.data.from === 'des') {

      const searchInfo = {
        desIndex: this.data.desIndex,
        from: this.data.from,
        address: mapPosInfo.addressName,
        siteName: mapPosInfo.address,
        location: {
          lat: mapPosInfo.latitude,
          lng: mapPosInfo.longitude
        },
        uid: mapPosInfo.uid || '',
        name: mapPosInfo.name,
        mobile: mapPosInfo.mobile || '',
        street: mapPosInfo.street || '',
        cityCode: mapPosInfo.cityCode || ''
      };

      eventBusEmit(ghbEvent.getSiteInfo, searchInfo);
      wx.navigateBack();
    }
  },


  // 删除
  del(e) {
    const dataset = e.target.dataset;
    const list = dataset.list;
    const group = dataset.group;
    const groupIndex = dataset.groupIndex;

    const _this = this;
    wx.showModal({
      title: '删除地址',
      content: '是否确定取消该删除地址？',
      success(res) {
        if (res.confirm) {
          _this.delItem(list, group, groupIndex);
        }
      }
    });
  },

  // 根据ID删除对应的地址
  delItem(list, group, groupIndex) {
    wx.showLoading({
      title: '删除中'
    });

    ghbRequest({
        method: 'DELETE',
        url: `${API.ADDRESS}/${list.id}/delete`,
      })
      .then((res) => {
        if (res.statusCode === 200) {
          // 删除成功
          let addressList = this.data.addressList;
          let addressListNone = this.data.addressListNone;
          let isShowNomore = this.data.isShowNomore;

          addressList[group].splice(groupIndex, 1);
          for (let item of addressList) {
            if (!(item && item.length)) {
              if (!this.data.start) {
                addressListNone = true;
                isShowNomore = false;
              }
            }
          }

          this.setData({
            addressList,
            addressListNone,
            isShowNomore
          }, () => {
            showToastError('删除成功');
          });

        } else {
          showToastError(res.data.message);
        }
      })
      .catch(() => {
        showToastError('删除失败');
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

    // 如果是保存回来此页面，刷新一下
    eventBusOn(ghbEvent.gobackReload, this, (isReload) => {
      setTimeout(() => {
        this.getAddressBookRest(isReload, false);
        showToastError(isReload ? '保存成功' : '编辑成功');
      }, 150);
    });

  },

  onUnload() {
    eventBusRemove(ghbEvent.gobackReload, this);
  }
})