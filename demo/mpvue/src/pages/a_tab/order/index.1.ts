import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest, getOrderStatusText } from '../../../utils';
import API from '../../../api';
import IMG_NOORDER from '../../../../static/images/callcar.png';
import IMG_NODATA from '../../../../static/images/nodata.png';
import nodata from '@/components/other/nodata.vue';

// NOTE：/api/v1/logistics/logisticsorders 接口缺少【车型】 和 【额外服务】字段

@Component({
  components: {
    item,
    nodata
  }
})
class Order extends Vue {
  imgNoOrder: any = IMG_NOORDER;
  imgNodata: any = IMG_NODATA;

  isLogin: boolean = false;
  tabList: Array<string> = ['进行中', '已完成', '已取消'];

  titleSlider = {
    width: 100 / this.tabList.length,
    left: 0
  };

  currentIndex: number = 0;
  pageLimit: number = 10;

  ingList: Array<any> = [];
  ingListTmp: Array<any> = [];
  ingListOffet: number = 10;

  finishList: Array<any> = [];
  finishListTmp: Array<any> = [];
  finishListOffet: number = 10;

  cancelListTmp: Array<any> = [];
  cancelListOffet: number = 10;
  cancelList: Array<any> = [];

  listLoaded: boolean = false;

  // tab1 触底事件
  v1bottom() {
    this.getMoreListData('ingList', 2);
  }

  // tab2 触底事件
  v2bottom() {
    this.getMoreListData('finishList', 3);
  }

  // tab3 触底事件
  v3bottom() {
    this.getMoreListData('cancelList', 4);
  }

  // 请求数据
  getList(listType: string, searchType: number, offset: number = 10, limit: number = 10) {
    wx.showLoading({
      title: '加载中'
    });
    const oTab = this;
    ghbRequest({
      url: API.LOGISTICSORDERS,
      data: {
        searchType,
        offset,
        limit
      }
    }).then((res: any) => {
      // console.log(res);
      wx.hideLoading();
      if (res.statusCode === 200) {
        oTab[listType + 'Tmp'] = res.data;
        if (res.data && res.data.length) {
          for (let item of res.data) {
            item.statusText = getOrderStatusText(item.status);
          }
          oTab[listType] = oTab[listType].concat(res.data);
        } else {
          this.listLoaded = true;
        }
      }
    });
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
    this.getList(name, type, (this[name + 'Offet'] += 10));
  }

  // 清空-重载数据
  reloadCurrentListData() {
    switch (this.currentIndex) {
      case 0:
        this.ingList = [];
        this.getList('ingList', 2, this.ingListOffet);
        break;
      case 1:
        this.finishList = [];
        this.getList('finishList', 3, this.finishListOffet);
        break;
      case 2:
        this.cancelList = [];
        this.getList('cancelList', 4, this.cancelListOffet);
        break;
      default:
    }
  }

  // 点击 tab
  tabClick(index: number) {
    this.currentIndex = index;
  }

  // tab 切换事件
  tabChange(e: any) {
    this.listLoaded = false;
    this.currentIndex = e.target.current;
    this.titleSlider.left = this.titleSlider.width * this.currentIndex;
    setTimeout(() => {
      this.reloadCurrentListData();
    }, 200);
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
          console.log('用户点击确定-取消订单', id || 'id');
          // TODO：请求取消订单接口
          // 请求取消订单
          _this.cancelList = [];
          _this.cancelListOffet = 10;
          _this.getList('cancelList', 4, _this.cancelListOffet);
        }
      }
    });
  }

  // 订单支付（TODO：支付页面所需参数未知）
  orderPay(order?: any) {
    wx.navigateTo({
      url: '../../paynow/main?order=' + JSON.stringify(order)
    });
  }

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
    if (this.isLogin) {
      this.reloadCurrentListData();
    }
  }
}

export default Order;
