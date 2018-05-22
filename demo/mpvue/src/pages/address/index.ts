import { Vue, Component } from 'vue-property-decorator';
import { ghbRequest, showToastError } from '../../utils';
import API from '../../api';
import { eventBus, ghbEvent } from '../eventbus';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  from: string = '';
  desIndex: number = -1;
  isShowEdit: boolean = false;
  start: number = 0;
  limit: number = 20;
  addressList: Array<any> = [];
  addressListNone: boolean = false;
  isShowNomore: boolean = false;

  get addressListData() {
    return this.addressList;
  }

  // 获取常用联系人列表
  getAddressBookRest(reload: boolean = false) {
    wx.showLoading({
      title: '加载中'
    });

    if (reload) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.isShowNomore = false;
    }

    ghbRequest({
      url: API.ADDRESSBOOKREST,
      data: {
        start: reload ? (this.start = 0) : this.start,
        limit: this.limit,
        serviceType: 1
      }
    })
      .then((res: any) => {
        if (res.data && res.data.length) {
          if (res.data.length < this.limit) {
            this.isShowNomore = true;
          }

          if (reload) {
            this.addressList = [];
          }

          this.$set(this.addressList, this.start, res.data);
          this.addressListNone = false;
        } else {
          if (reload) {
            this.addressListNone = true;
            this.addressList = [];
          } else {
            if (this.addressList.length) {
              this.isShowNomore = true;
            } else {
              this.addressListNone = true;
            }
          }
        }

        wx.stopPullDownRefresh();
      })
      .catch(() => {
        this.addressListNone = true;
      });
  }

  // 加载更多
  getMoreListData() {
    if (this.isShowNomore) return;
    this.start += 1;
    this.getAddressBookRest(false);
  }

  // 新增地址，去搜素页面 -> 联系人页面 -> 确认 -> 回来
  addNewAddress() {
    const from: string = `${this.from}_new`;

    wx.navigateTo({
      url: `../search/main?from=${from}`
    });
  }

  // 选择当前地址
  select(mapPosInfo: any) {
    // console.log('mapPosInfo', mapPosInfo);

    // 只有从 首页的出发点（start）和 目的地（des）进来才能点击选择
    if (this.from === 'start' || this.from === 'des') {

      const searchInfo = {
        desIndex: this.desIndex,
        from: this.from,
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

      eventBus.$emit(ghbEvent.getSiteInfo, searchInfo);
      wx.navigateBack();

    }
  }

  // 编辑
  edit(item: any) {
    // console.log(item);
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
      url: `../contact/main?searchInfo=${JSON.stringify(searchInfo)}`
    });
  }

  // 删除
  del(list: any, group: number, groupIndex: number) {
    // console.log('group', group);
    // console.log('groupIndex', groupIndex);
    const _this = this;
    wx.showModal({
      title: '删除地址',
      content: '是否确定取消该删除地址？',
      success(res: { confirm: boolean; cancel: boolean }) {
        if (res.confirm) {
          // _this.addressList[group].splice(groupIndex, 1);
          _this.delItem(list, group, groupIndex);
        }
      }
    });
  }

  // 根据ID删除对应的地址
  delItem(list: any, group: number, groupIndex: number) {
    wx.showLoading({
      title: '删除中'
    });

    ghbRequest({
      method: 'DELETE',
      url: `${API.ADDRESS}/${list.id}/delete`,
    })
      .then((res: any) => {
        if (res.statusCode === 200) {
          // 删除成功
          this.addressList[group].splice(groupIndex, 1);
          for (let item of this.addressList) {
            if (!(item && item.length)) {
              this.addressListNone = true;
              this.isShowNomore = false;
            }
          }
        } else {
          showToastError(res.data.message);
        }
      })
      .catch(() => {
        showToastError('删除失败');
      });
  }

  reset() {
    this.from = '';
    this.desIndex = -1;
    this.start = 0;
    this.addressList = [];
    this.addressListNone = false;
    this.isShowNomore = false;
  }

  // 滚动条触底事件
  onReachBottom() {
    // 获取数据
    this.getMoreListData();
  }

  // 用户下拉动作，刷新当前列表
  onPullDownRefresh() {
    this.getAddressBookRest(true);
  }

  onLoad(options: any) {
    this.from = options.from;
    this.desIndex = options.desIndex;
    if (this.from.includes('me')) {
      this.isShowEdit = true;
    }
    this.getAddressBookRest(true);

    // 如果是保存回来此页面，刷新一下
    eventBus.$on(ghbEvent.gobackReload, (isReload: boolean) => {
      // NOTE：没有定时器新创建完返回刷新的时候会回不到顶部，而且会请求2次
      setTimeout(() => {
        this.getAddressBookRest(isReload);
      }, 200);
    });
  }

  onUnload() {
    this.reset();
    eventBus.$off(ghbEvent.gobackReload);
  }
}

export default Index;
