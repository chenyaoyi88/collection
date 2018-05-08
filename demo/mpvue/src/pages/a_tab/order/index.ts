import { Vue, Component } from 'vue-property-decorator';
import { ghbRequest, getOrderStatusText, showToastError } from '../../../utils';
import API from '../../../api';

import noorder from './noorder.vue';
import orderlist from './orderlist.vue';
import item from '@/components/item/item.vue';
import sliderSelect from '@/components/slider/slider_select.vue';

@Component({
  components: {
    item,
    noorder,
    sliderSelect,
    orderlist
  }
})
class Order extends Vue {
  // 是否登录
  isLogin: boolean = false;
  // tab 标题
  tabTitle: Array<any> = [
    {
      name: '进行中',
      value: 'ingList'
    },
    {
      name: '已完成',
      value: 'finishList'
    },
    {
      name: '已取消',
      value: 'cancelList'
    }
  ];
  // tab 标题滑块
  titleSlider = {
    width: 100 / this.tabTitle.length,
    left: 0
  };

  // 当前 tab 索引
  currentIndex: number = 0;
  // 每页请求个数
  pageLimit: number = 10;

  ingList: Array<any> = [];
  ingListTmp: Array<any> = [];
  ingListOffset: number = 0;
  ingListNone: boolean = false;

  finishList: Array<any> = [];
  finishListTmp: Array<any> = [];
  finishListOffset: number = 0;
  finishListNone: boolean = false;

  cancelListTmp: Array<any> = [];
  cancelListOffset: number = 0;
  cancelList: Array<any> = [];
  cancelListNone: boolean = false;

  // 取消原因列表
  cancelReasonList: Array<any> = [];
  // 取消原因 id
  cancelReasonId: any = 0;
  // 取消原因物流 id
  cancelReasonWLId: any = 0;
  // 控制额外服务的 slider 显示隐藏
  selectSlider: boolean = false;

  // 点击 tab
  tabClick(index: number) {
    if (this.currentIndex === index) return;
    this.tabSwitch(index);
  }

  // 切换 tab
  tabSwitch(index: number) {
    this.currentIndex = index;
    this.ingListNone = false;
    this.finishListNone = false;
    this.cancelListNone = false;
    this.titleSlider.left = 100 * this.currentIndex;
    this.loadCurrentListData(true);
  }

  // 底部滑动隐藏
  fnHideSlider(isSliderShow: boolean) {
    this.selectSlider = isSliderShow;
    this.cancelReasonId = null;
  }

  // 点击确定取消订单
  fnRadioComfirm(item: any) {
    const _this = this;
    if (item && item.id) {
      this.cancelReasonId = item.id;
      ghbRequest({
        url: API.CANCEL,
        method: 'POST',
        data: {
          id: _this.cancelReasonWLId,
          canelReasonId: _this.cancelReasonId
        }
      }).then((res: any) => {
        if (res.statusCode === 200) {
          // 请求取消订单之后，切换到取消订单列表
          _this.tabClick(2);
        }
      });
    }
  }

  // 请求接口
  getList(listType: string, reload: boolean) {
    const oTab = this;
    let searchType: number = 2;

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    const pageSize = oTab[listType + 'Offset'] / 10;

    if (reload) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });

      for (let j = 0; j <= oTab[listType + 'Offset'] / 10; j++) {
        oTab[listType][j] = [];
      }
      oTab[listType + 'Offset'] = 0;
    }

    switch (listType) {
      case 'ingList':
        searchType = 2;
        break;
      case 'finishList':
        searchType = 3;
        break;
      case 'cancelList':
        searchType = 4;
        break;
    }

    ghbRequest({
      url: API.LOGISTICSORDERS,
      data: {
        searchType,
        offset: reload ? 0 : oTab[listType + 'Offset'],
        limit: this.pageLimit
      }
    }).then((res: any) => {
      if (res.statusCode === 200) {
        oTab[listType + 'Tmp'] = res.data;
        let aShowList = [];
        if (res.data && res.data.length) {
          for (let i = 0; i < res.data.length; i++) {
            const order = res.data[i];
            order.statusText = getOrderStatusText(order);
            aShowList.push(order);
          }
          oTab[listType][pageSize] = aShowList;
        } else {
          if (reload) {
            oTab[listType + 'None'] = true;
          } else {
            if (oTab[listType].length) {
              showToastError('没有更多数据了');
            } else {
              oTab[listType + 'None'] = true;
            }
          }
        }
        wx.stopPullDownRefresh();
      }
    });
  }

  // 向上滚动获取更多数据
  getMoreListData(name: string) {
    if (this[name + 'Tmp'].length < this.pageLimit) {
      showToastError('没有更多数据了');
      return;
    }
    this[name + 'Offset'] += 10;
    this.getList(name, false);
  }

  // 重载/加载数据
  loadCurrentListData(isReload: boolean = false) {
    switch (this.currentIndex) {
      // 进行中
      case 0:
        if (isReload) {
          this.getList('ingList', isReload);
        } else {
          this.getMoreListData('ingList');
        }
        break;
      // 已完成
      case 1:
        if (isReload) {
          this.getList('finishList', isReload);
        } else {
          this.getMoreListData('finishList');
        }
        break;
      // 已取消
      case 2:
        if (isReload) {
          this.getList('cancelList', isReload);
        } else {
          this.getMoreListData('cancelList');
        }
        break;
      default:
    }
  }

  // 未登录->去登录
  gotoLogin() {
    wx.navigateTo({
      url: '../../login/main'
    });
  }

  // 取消订单
  orderCancel(id?: number) {
    const _this = this;
    wx.showModal({
      title: '取消订单',
      content: '是否确定取消该订单？',
      success: function(res: { confirm: boolean; cancel: boolean }) {
        if (res.confirm) {
          _this.cancelReasonWLId = id;
          // 请求取消原因列表 -> 请求取消订单接口
          ghbRequest({
            url: API.CANCELREASONS
          }).then((res: any) => {
            if (res.statusCode === 200) {
              if (res.data && res.data.length) {
                _this.cancelReasonList = res.data;
                // 弹出底部滑动选项
                _this.selectSlider = true;
              }
            } else {
              showToastError(res.data.message);
            }
          });
        }
      }
    });
  }

  // 订单支付
  orderPay(order?: any) {
    const _this = this;
    wx.showLoading({
      title: '支付请求中',
      mask: true
    });
    ghbRequest({
      url: API.PAY,
      method: 'POST',
      data: {
        orderId: order.id,
        method: 'WX_SMALL_PROGRAM',
        paymentType: 'ZPT',
        productName: '物流运费',
        productDesc: `物流运费 ¥${order.paymentAmount}`
      }
    }).then((res: any) => {
      if (res.statusCode === 200) {
        const PARAMS_PAY = JSON.parse(res.data.payData);
        PARAMS_PAY.success = function(res: any) {
          // 支付成功，刷新当前列表
          _this.tabSwitch(0);
        };
        PARAMS_PAY.fail = function(res: any) {
          // 支付失败，无操作
        };
        wx.requestPayment(PARAMS_PAY);
      } else {
        showToastError(res.data.message);
      }
    });
  }

  // 滚动条触底事件
  onReachBottom() {
    // 获取数据
    this.loadCurrentListData();
  }

  // 用户下拉动作，刷新当前列表
  onPullDownRefresh() {
    this.loadCurrentListData(true);
  }

  // 每次打开当前页面执行的事件
  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
    if (this.isLogin) {
      this.tabSwitch(0);
    }
  }
}

export default Order;
