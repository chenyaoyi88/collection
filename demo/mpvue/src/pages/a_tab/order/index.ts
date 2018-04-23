import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest, getOrderStatusText, showToastError } from '../../../utils';
import API from '../../../api';
import noorder from './noorder.vue';
import sliderSelect from '@/components/slider/slider_select.vue';

import mockData from './mock.json';

// NOTE：/api/v1/logistics/logisticsorders 接口缺少【车型】 和 【额外服务】字段

@Component({
  components: {
    item,
    noorder,
    sliderSelect
  }
})
class Order extends Vue {
  mockData: any = mockData;

  // 是否登录
  isLogin: boolean = false;
  // tab 标题
  tabTitle: Array<string> = ['进行中', '已完成', '已取消'];
  // tab 标题滑块
  titleSlider = {
    width: 100 / this.tabTitle.length,
    left: 0
  };

  // 当前 tab 索引
  currentIndex: number = 0;
  // 每页请求个数
  pageLimit: number = 10;

  // 进行中渲染列表
  ingList: Array<any> = [];
  // 进行中渲染列表（临时）
  ingListTmp: Array<any> = [];
  // 进行中渲染列表页码
  ingListOffset: number = 0;

  finishList: Array<any> = [];
  finishListTmp: Array<any> = [];
  finishListOffset: number = 0;

  cancelListTmp: Array<any> = [];
  cancelListOffset: number = 0;
  cancelList: Array<any> = [];

  // 取消原因列表
  cancelReasonList: Array<any> = [];
  // 取消原因 id
  cancelReasonId: any = 0;
  // 取消原因物流 id
  cancelReasonWLId: any = 0;
  // 控制额外服务的 slider 显示隐藏
  selectSlider: boolean = false;

  // 页面无数据时显示图片
  isListNoData: boolean = false;

  // 点击 tab
  tabClick(index: number) {
    if (this.currentIndex === index) return;
    this.currentIndex = index;
    this.isListNoData = false;
    this.titleSlider.left = this.titleSlider.width * this.currentIndex;
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
          console.log(res);
          // 请求取消订单之后，切换到取消订单列表
          _this.tabClick(2);
        }
      });
    }
  }

  // 请求接口
  getList(listType: string, searchType: number, reload: boolean) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const oTab = this;

    let offset: number = 0;

    if (!reload) {
      offset = oTab[listType + 'Offset'];
    } else {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });

      for (let j = 0; j <= oTab[listType + 'Offset'] / 10; j++) {
        oTab[listType][j] = [];
      }
      offset = oTab[listType + 'Offset'] = 0;
    }

    ghbRequest({
      url: API.LOGISTICSORDERS,
      data: {
        searchType,
        offset,
        limit: this.pageLimit
      }
    }).then((res: any) => {
      wx.hideLoading();
      if (res.statusCode === 200) {
        oTab[listType + 'Tmp'] = res.data;

        let aShowList = [];

        if (res.data && res.data.length) {
          for (let i = 0; i < res.data.length; i++) {
            const order = res.data[i];
            let json = {
              paymentAmount: order.paymentAmount,
              logisticsOrderTime: order.logisticsOrderTime,
              statusText: getOrderStatusText(order),
              senderAddressName: order.senderAddressName,
              senderSiteName: order.senderSiteName,
              receiverAddressName: order.receiverAddressName,
              receiverSiteName: order.receiverSiteName,
              goodsDesc: order.goodsDesc,
              paymentStatus: order.paymentStatus,
              carTypeName: order.carTypeName,
              additionalRequests: order.additionalRequests.join('、'),
              id: order.id
            };
            aShowList.push(json);
          }
          oTab[listType][offset / 10] = aShowList;
        } else {
          this.isListNoData = true;
        }
        wx.stopPullDownRefresh();
      }
    });

    // setTimeout(() => {
    //   wx.hideLoading();
    //   oTab[listType + 'Tmp'] = mockData;

    //   let aShowList = [];

    //   if (mockData && mockData.length) {
    //     for (let i = 0; i < mockData.length; i++) {
    //       const order = mockData[i];
    //       let json = {
    //         paymentAmount: order.paymentAmount,
    //         logisticsOrderTime: order.logisticsOrderTime,
    //         statusText: getOrderStatusText(order.status),
    //         senderAddressName: order.senderAddressName,
    //         senderSiteName: order.senderSiteName,
    //         receiverAddressName: order.receiverAddressName,
    //         goodsDesc: order.goodsDesc,
    //         paymentStatus: order.paymentStatus,
    //         id: order.id
    //       };
    //       aShowList.push(json);
    //     }

    //     if (reload) {
    //       wx.pageScrollTo({
    //         scrollTop: 0,
    //         duration: 0
    //       });

    //       for (let j = 0; j <= oTab[listType + 'Offset'] / 10; j++) {
    //         oTab[listType][j] = [];
    //       }
    //       oTab[listType + 'Offset'] = 0;
    //     }
    //     oTab[listType][oTab[listType + 'Offset'] / 10] = aShowList;
    //   } else {
    //     this.isListNoData = true;
    //   }
    // }, 100);
  }

  // 向上滚动获取更多数据
  getMoreListData(name: string, type: number) {
    if (this[name + 'Tmp'].length < this.pageLimit) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      });
      return;
    }
    this[name + 'Offset'] += 10;
    this.getList(name, type, false);
  }

  // 重载/加载数据
  loadCurrentListData(isReload: boolean = false) {
    switch (this.currentIndex) {
      // 进行中
      case 0:
        if (isReload) {
          this.getList('ingList', 2, isReload);
        } else {
          this.getMoreListData('ingList', 2);
        }
        break;
      // 已完成
      case 1:
        if (isReload) {
          this.getList('finishList', 3, isReload);
        } else {
          this.getMoreListData('finishList', 3);
        }
        break;
      // 已取消
      case 2:
        if (isReload) {
          this.getList('cancelList', 4, isReload);
        } else {
          this.getMoreListData('cancelList', 4);
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
      success: function (res: { confirm: boolean; cancel: boolean }) {
        if (res.confirm) {
          _this.cancelReasonWLId = id;
          // TODO：请求取消原因列表 -> 请求取消订单接口
          ghbRequest({
            url: API.CANCELREASONS
          }).then((res: any) => {
            if (res.statusCode === 200) {
              if (res.data && res.data.length) {
                _this.cancelReasonList = res.data;
                _this.selectSlider = true;
              }
            }
          });
        }
      }
    });
  }

  // 订单支付
  orderPay(order?: any) {
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
      const PARAMS_PAY = JSON.parse(res.data.payData);

      PARAMS_PAY.success = function (res: any) {
        // 支付成功，刷新当前列表
        this.loadCurrentListData(true);
      };

      PARAMS_PAY.fail = function (res: any) {
        // 支付失败，无操作
      };

      wx.requestPayment(PARAMS_PAY);
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
    this.isLogin && this.loadCurrentListData(true);
  }
}

export default Order;
